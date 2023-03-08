import * as itowns from 'itowns';
const itowns_widgets = require('itowns/widgets'); // FIXME: temporary hack
import * as THREE from 'three';

import ItownsGUI from './gui/DatTools';
import JSONLayers from './layers/JSONLayers';

// Initial location
const center = new itowns.Coordinates('EPSG:4326', 5.395317, 43.460333);
const placement = {
    coord: new itowns.Coordinates('EPSG:4326', 5.395317, 43.460333),
    range: 20000,
    tilt: 20,
    heading: 0
};

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

function setupWidgets(view: itowns.GlobeView) {
    const widgets = new itowns_widgets.Navigation(view);
    const geocodingOptions = {
        url: new URL(
            'https://wxs.ign.fr/ayxvok72rcocdyn8xyvy32og/ols/apis/completion?text=&type=StreetAddress,' +
            'PositionOfInterest',
        ),
        parser: (res: any) => {
            const map = new Map();
            res.results.forEach((location: any) => {
                const coordinates = new itowns.Coordinates(
                    'EPSG:4326',
                    location.x, location.y
                );
                map.set(location.fulltext, coordinates);
            });
            return map;
        },
        onSelected: (coord: itowns.Coordinates) => {
            view.controls?.lookAtCoordinate({
                ...placement,
                coord
            });
        },
    };
    const searchbar = new itowns_widgets.Searchbar(view, geocodingOptions, {
        placeHolder: 'Rechercher'
    });
}

function main() {
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
    setupWidgets(view);
}

main();
