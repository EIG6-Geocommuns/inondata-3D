import * as itowns from 'itowns';
import * as THREE from 'three';

import { TestMesh } from '../inondata';

export interface WaterLayerOptions {
    source?: itowns.Source,
    zoom?: { max?: number, min?: number }
}

type TileNode = {
    parent: TileNode,
    visible: boolean,
    layerUpdateState: { [id: string]: itowns.LayerUpdateState },
    getExtentsByProjection(crs: string): itowns.Extent[];
} & THREE.Mesh<THREE.BufferGeometry, THREE.RawShaderMaterial>

type WaterData = {
    height: THREE.Texture
}

export default class WaterLayer extends itowns.GeometryLayer {
    // Extended from `Layer`
    // id: readonly string
    // options: object (= config.options)
    // frozen: boolean
    // zoom: { max: number, min: number } (= config.zoom)
    // source: Source
    // cache: Cache
    // convert(data: any): any
    //private material: THREE.RawShaderMaterial

    readonly isWaterLayer = true;

    constructor(id: string, config: WaterLayerOptions = {}) {
        super(id, new THREE.Group(), config);
        // GeometryLayer
        // config.source: Source
        // config.visible: boolean
    }

    // From Layer (placeholder)
    override convert(data: WaterData) {
        //console.log('convert');
        //console.log(data);
        return data;
    }

    // From Layer
    override getData(from: any, to: any) {
        const data = super.getData(from, to);
        return data;
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


    /* ctx: {
     *   camera: itownsCamera,
     *   engine: c3DEngine,
     *   scheduler: Scheduler,
     *   view
     * }
     */
    preUpdate(ctx: any, srcs: Set<any> /* GLayer | Camera */) {
        //console.log('preUpdate');
        //console.log(ctx);
        //console.log(srcs);
    }

    // layer = GeometryLayer (TODO: Ask someone: Why parameter then ?)
    // node = TileMesh
    update(context: any, layer: any, node: TileNode) {
        if (!node.visible) {
            return;
        }

        if(node.layerUpdateState[layer.id] === undefined) {
            node.layerUpdateState[layer.id] = new itowns.LayerUpdateState();
        } else if (!node.layerUpdateState[layer.id].canTryUpdate()) {
            // TODO: node.link ???
            return;
        }

        // TODO: Ensures it does return at least one element ?
        const nodeExtents = node.getExtentsByProjection(layer.source.crs);
        const nodeZoom = nodeExtents[0].zoom;

        // Checks to prevent unecessary load of data
        // check if its tile level is equal to display level layer
        if (nodeZoom != layer.zoom.min) {
            // TODO: other checks to not load data
            // !this.source.extentsInsideLimit(node.extent, nodeDest);
            node.layerUpdateState[layer.id].noMoreUpdatePossible();
            return;
        }

        node.layerUpdateState[layer.id].newTry();

        const command = {
            layer,
            extentsSource: nodeExtents,
            view: context.view,
            requester: node
        };

        return context.scheduler.execute(command)
        .then(function(meshes: Array<THREE.Mesh>) {
            node.layerUpdateState[layer.id].noMoreUpdatePossible();
            console.log('After command');

            //const textureLoader = new THREE.TextureLoader();
            //Promise.all([
            //    textureLoader.load('water/flow.jpg'),
            //    textureLoader.load('water/normal0.jpg'),
            //    textureLoader.load('water/normal1.jpg'),
            //]).then(([flowMap, normalMap0, normalMap1]) => {
            //    const mesh = new Water(node.geometry, {
            //        flowMap, normalMap0, normalMap1
            //    });
            //    mesh.matrixWorld = node.matrixWorld;
            //    layer.object3d.add(mesh);
            //});

            const geometry = node.geometry;
            //const geometry = new THREE.PlaneGeometry(100, 100);
            //const mesh = new THREE.Mesh(geometry, material);
            const mesh = new TestMesh(geometry);
            mesh.matrixWorld = node.matrixWorld;
            layer.object3d.add(mesh);
            //console.log(node.geometry);
            //console.log(node.material);
            //console.log(node.material.defines);
            //console.log(mesh);

            //meshes.forEach((mesh) => {
            //    if (!node.parent) {
            //        console.error('Missing parent WTF ?');
            //    } else {
            //        // TODO: node.link.push ????
            //        console.log(node);
            //        mesh.matrixWorld = node.matrixWorld;
            //        mesh.position.x = node.position.x;
            //        mesh.position.y = node.position.y;
            //        mesh.position.z = node.position.z + 10;
            //        layer.object3d.add(mesh);
            //    }
            //    // mesh.layer = layer
            //});
            //console.log(nodeExtents[0]);
        });


        //console.log('update')
        //console.log(ctx);
        //console.log(this === geometryLayer);
        //console.log(geometryLayer);
        //console.log(node);

        // TODO: Here the layer shall execute a command
        //         const command = {
        //    layer,
        //    extentsSource: extentsDestination,
        //    view: context.view,
        //    requester: node,
        //};
    }

    override postUpdate(/* ctx: any, geometryLayer: any, updateSources: any */) {
        console.log('postUpdate');
    }

    override culling() {
        console.log('culling');
        return false;
    }
}
