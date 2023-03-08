import * as itowns from 'itowns';
import * as THREE from 'three';

import ItownsGUI from './gui/DatTools';
import JSONLayers from './layers/JSONLayers';

// Sources
const buildingSource = new itowns.WFSSource({
    url: 'https://wxs.ign.fr/essentiels/geoportail/wfs?', //
    protocol: 'wfs',
    version: '2.0.0',
    typeName: 'BDTOPO_V3:batiment',
    crs: 'EPSG:4326', //
    zoom: { min: 14, max: 14 },
});

function colorLayer(config: any) {
    return new itowns.ColorLayer(config.id, {
        ...config,
        source: new itowns.WMTSSource(config.source),
    });
}

function terrainLayer(config: any) {
    return new itowns.ElevationLayer(config.id, {
        ...config,
        source: new itowns.WMTSSource(config.source)
    });
}

function setupRasterLayers(view: itowns.GlobeView, gui: ItownsGUI) {
    function colorLayer(config: any) {
        return new itowns.ColorLayer(config.id, {
            ...config,
            source: new itowns.WMTSSource(config.source),
        });
    }

    function terrainLayer(config: any) {
        return new itowns.ElevationLayer(config.id, {
            ...config,
            source: new itowns.WMTSSource(config.source)
        });
    }

    const orthoLayer = colorLayer(JSONLayers.wmts.orthoIGN);
    view.addLayer(orthoLayer).then((layer) => gui.addLayer(layer));

    const mapLayer = colorLayer(JSONLayers.wmts.mapPlanIGN);
    view.addLayer(mapLayer).then((layer) => gui.addLayer(layer));

    const worldTerrainLayer = terrainLayer(JSONLayers.wmts.dtmSRTM3);
    view.addLayer(worldTerrainLayer).then((layer) => gui.addLayer(layer));

    const franceTerrainLayer = terrainLayer(JSONLayers.wmts.dtmIGNHighres);
    view.addLayer(franceTerrainLayer).then((layer) => gui.addLayer(layer));
}

function setupFeatureLayers(view: itowns.GlobeView, gui: ItownsGUI) {
    const color = new THREE.Color();
    const style = new itowns.Style({
        fill: {
            color: (p: any) => {
                return color.set(0x555555);
            },
            base_altitude: (p: any) => p.altitude_minimale_sol,
            extrusion_height: (p: any) => p.hauteur,
        }
    });
    const config: any = {
        crs: 'EPSG:4326',
        source: buildingSource,
        style: style,
        // buildings 'pop' at zoom level 16 (TODO: change level if needed)
        zoom: { min: 16 },
    };
    const buildingLayer = new itowns.FeatureGeometryLayer('building', config);
    view.addLayer(buildingLayer);
}

function main() {
    // Center of flood extent
    const center = new itowns.Coordinates('EPSG:4326', 5.395317, 43.460333);
    const placement = {
        coord: new itowns.Coordinates('EPSG:4326', 5.395317, 43.460333),
        range: 20000,
        tilt: 20,
        heading: 0
    };

    const viewerDiv = document.getElementById('viewerDiv') as HTMLDivElement;
    const view = new itowns.GlobeView(viewerDiv, placement);

    const gui = new ItownsGUI(view, { autoPlace: false, width: 245 });
    let element = document.createElement('div');
    element.id = 'menuDiv';
    element.appendChild(gui.domElement);
    document.body.appendChild(element);

    // TODO: setup loading screen
    setupRasterLayers(view, gui);
    setupFeatureLayers(view, gui);
}

main();
