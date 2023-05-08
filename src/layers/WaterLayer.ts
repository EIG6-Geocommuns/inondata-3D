import * as itowns from 'itowns';
import * as THREE from 'three';
import { Object3D } from 'three';

import Water from '../objects/Water';
import TestMesh from '../objects/TestMesh';

export interface WaterLayerOptions {
    source?: itowns.Source,
    zoom?: { max?: number, min?: number },
}

type TileMesh = {
    parent: TileMesh,
    layerUpdateState: { [id: string]: itowns.LayerUpdateState },
    link: Array<LinkObject<THREE.Mesh>>,
    getExtentsByProjection(crs: string): itowns.Extent[];
} & THREE.Mesh<THREE.BufferGeometry, THREE.RawShaderMaterial>

type WaterData = {
    height: THREE.Texture
}

class LinkObject<O extends Object3D> extends THREE.Group {
    layer: any;
    object: O;

    constructor(object: O, layer: itowns.Layer) {
        super();
        this.object = object;
        this.layer = layer;
        this.add(object);
    }
}

// From View#addLayer:
// - View#preprocessLayer (layer.crs = view.referenceCrs)
// - If no parentLayer
//   - check if Layer#update exists
//   - check if Layer#preUpdate exists
// - Adds Layer#object3D to the scene

// From MainLoop#update:
// - `preUpdate` returns an array of elements to update
//   const elementsToUpdate = geometryLayer.preUpdate(context, srcs);
// - `update` is called in `updateElements`.
//   updateElements(context, geometryLayer, elementsToUpdate);
// - `postUpdate` is called when this geom layer update process is finished
//   geometryLayer.postUpdate(context, geometryLayer, updateSources);


export default class WaterLayer extends itowns.GeometryLayer {
    readonly isWaterLayer = true;

    object3d!: THREE.Object3D;
    parent!: itowns.Layer;

    constructor(id: string, config: WaterLayerOptions = {}) {
        super(id, new THREE.Group(), config);
    }

    override convert(data: WaterData) {
        return data;
    }

    override getData(from: any, to: any) {
        const data = super.getData(from, to);
        return data;
    }

    /*
     * Pre-update of the layer.
     * @param {Object} context
     * @param {Camera} context.camera
     * @param {c3DEngine} context.engine
     * @param {Scheduler} context.scheduler
     * @param {View} context.view
     * @param {Set<GeometryLayer>} sources - Change sources notified to the view
     * using View#notifyChange.
     */
    preUpdate(context: any, sources: Set<any>) {
        if (sources.has(this.parent)) {
            // Parent geometry layer is being updated following a notifyChange
            // on the view. Clean our local "scene".
            this.object3d.clear();
        }
    }

    /*
     * Update of the layer.
     * @param {Object} context
     * @param {Camera} context.camera
     * @param {c3DEngine} context.engine
     * @param {Scheduler} context.scheduler
     * @param {View} context.view
     * @param {GeometryLayer} layer - The current layer? (seems to always equal
     * to `this`. Confirmed by gchoqueux.
     * @param {TileMesh} node
     */
    update(context: any, layer: any, node: TileMesh) {
        const nodeExtents = node.getExtentsByProjection(layer.source.crs);
        const nodeZoom = nodeExtents[0].zoom;
        const nodeExtent = nodeExtents[0];
        //console.log(`[${nodeExtent.zoom}, ${nodeExtent.row}, ${nodeExtent.col}] : ${node.visible}`)

        if (!node.parent && node.children.length) {
            // TODO: if node has beeen removed, dispose three.js resource
            return;
        }

        if (!node.visible) {
            return;
        }

        if(node.layerUpdateState[layer.id] === undefined) {
            // First update, initialize our layer state to idle
            node.layerUpdateState[layer.id] = new itowns.LayerUpdateState();
        } else if (!node.layerUpdateState[layer.id].canTryUpdate()) {
            // No more update possible, get our mesh from the node cache and add
            // it to our local "scene".
            let mesh = node.link.find(n => n.layer && n.layer.id == layer.id);
            mesh?.layer.object3d.add(mesh);
            // // TODO: Should we update mesh.matrixWorld ?
            return;
        }


        // Checks to prevent unecessary load of data
        // check if its tile level is equal to display level layer
        if (nodeZoom != 14) {
            // TODO: other checks to not load data
            // !this.source.extentsInsideLimit(node.extent, nodeDest);

            // Layer's source has no data for this node's extent and level, no
            // need to update/load data anymore.
            node.layerUpdateState[layer.id].noMoreUpdatePossible();
            return;
        }

        // Layer state is now pending
        node.layerUpdateState[layer.id].newTry();

        // Schedule the fetch, parse and convert
        const command = {
            layer,
            extentsSource: nodeExtents,
            view: context.view,
            requester: node
        };

        return context.scheduler.execute(command)
        .then(function(context: Array<THREE.DataTexture>) {
            const displacementMap = context[0];
            displacementMap.flipY = true;
            const imageData = new ImageData(
                new Uint8ClampedArray(displacementMap.image.data.buffer),
                256,
                256,
            );
            const map = new THREE.Texture(imageData);
            //console.warn(meshes[0].height.source.data);
            //console.warn(displacementMap);

            // Fetch, parse and convert were successful, no need for further
            // updates.
            node.layerUpdateState[layer.id].noMoreUpdatePossible();

            const textureLoader = new THREE.TextureLoader();
            Promise.all([
                textureLoader.load('water/flow.jpg'),
                textureLoader.load('water/normal0.jpg'),
                textureLoader.load('water/normal1.jpg'),
            ]).then(([flowMap, normalMap0, normalMap1]) => {
                const vector3 = new THREE.Vector3();
                const size = node.geometry.boundingBox?.getSize(vector3);
                const nodeUniforms = node.material.uniforms;
                if (size) {
                    const geometry = new THREE.PlaneGeometry(size.x, size.y, 10, 10);
                    //const geometry = node.geometry;
                    // const material = new THREE.MeshPhongMaterial();
                    // material.displacementMap = displacementMap;
                    // material.map = map;
                    const mesh = new TestMesh(geometry);
                    // const mesh = new Water(geometry, {
                    //     flowMap, normalMap0, normalMap1
                    // });
                    mesh.displacementMap = displacementMap;
                    console.log();
                    console.log(Object.keys(mesh.geometry.attributes));
                    console.log(mesh.material.uniforms);
                    console.log(Object.keys(mesh.material.defines));
                    console.log(displacementMap.source.data);
                    console.log(map.source.data);
                    mesh.matrixWorld = node.matrixWorld;
                    const helper = new LinkObject(mesh, layer);
                    node.link.push(helper);
                    layer.object3d.add(helper);
                }
            });
        });
    }

    override culling() {
        console.log('culling');
        return false;
    }
}
