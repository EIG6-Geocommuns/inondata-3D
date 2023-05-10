import * as itowns from 'itowns';
import * as THREE from 'three';

import Water2 from '../objects/Water2';

export interface WaterLayerOptions {
    source?: itowns.Source,
    zoom?: { max?: number, min?: number },
    displacementScale?: number,
    displacementBias?: number;
    heightScale?: number,
    heightBias?: number,
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

class LinkObject<O extends THREE.Object3D> extends THREE.Group {
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

    displacementScale?: number;
    displacementBias?: number;
    heightScale?: number;
    heightBias?: number;

    constructor(id: string, config: WaterLayerOptions = {}) {
        super(id, new THREE.Group(), config);
        this.displacementScale = config.displacementScale;
        this.displacementBias = config.displacementBias;
        this.heightScale = config.heightScale;
        this.heightBias = config.heightBias;
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

        const displacementScale = this.displacementScale;
        const displacementBias = this.displacementBias;
        const heightScale = this.heightScale;
        const heightBias = this.heightBias;

        return context.scheduler.execute(command)
        .then(function(context: Array<Array<THREE.Texture>>) {
            const displacementMap = context[0][0];
            const heightMap = context[0][1];

            // Fetch, parse and convert were successful, no need for further
            // updates.
            node.layerUpdateState[layer.id].noMoreUpdatePossible();

            const vector3 = new THREE.Vector3();
            const size = node.geometry.boundingBox?.getSize(vector3);
            if (size) {
                const geometry = new THREE.PlaneGeometry(size.x, size.y, 10, 10);
                const mesh = new Water2(geometry);

                // heightMap.flipY = true;
                // heightMap.needsUpdate = true;

                mesh.displacementMap = displacementMap;
                mesh.heightMap = heightMap;
                if (heightScale) { mesh.heightScale = heightScale };
                if (heightBias) { mesh.heightBias = heightBias };
                if (displacementScale) { mesh.displacementScale = displacementScale };
                if (displacementBias) { mesh.displacementBias = displacementBias };
                mesh.matrixWorld = node.matrixWorld;

                // Push to local cache
                const helper = new LinkObject(mesh, layer);
                node.link.push(helper);
                layer.object3d.add(helper);
            }
        });
    }

    override culling() {
        return false;
    }
}
