import * as dat from 'dat.gui';
import * as itowns from 'itowns';

declare module 'dat.gui' {
    interface GUI {
        hasFolder(name: string): boolean;
    }
}

dat.GUI.prototype.hasFolder = function(name: string) {
    return this.__folders[name] !== undefined;
}

export class ItownsGUI extends dat.GUI {
    colorGUI: dat.GUI;
    elevationGUI: dat.GUI;
    view: itowns.View;

    constructor(view: itowns.View, options?: dat.GUIParams) {
        super(options);
        this.colorGUI = this.addFolder('Couches raster');
        this.elevationGUI = this.addFolder('Couches terrain');
        this.colorGUI.hide();
        this.elevationGUI.hide();
        this.view = view;
    }

    addLayer(layer: any /* itowns.Layer */) {
        if (layer.isColorLayer) {
            this.addColorLayer(layer);
        } else if (layer.isElevationLayer) {
            this.addElevationLayer(layer);
        }
    }

    addColorLayer(layer: any /* itowns.ColorLayer */) {
        if (this.colorGUI.hasFolder(layer.id)) { return; }
        this.colorGUI.show();

        const folder = this.colorGUI.addFolder(layer.id);
        folder.add({ visible: layer.visible }, 'visible')
        .onChange(((value) => {
            layer.visible = value;
            this.view.notifyChange(layer);
        }));
        folder.add({ opacity: layer.opacity }, 'opacity', 0.0, 1.0, 0.01)
        .onChange((value) => {
            layer.opacity = value;
            this.view.notifyChange(layer);
        });
        folder.add({ frozen: layer.frozen }, 'frozen')
        .onChange((value) => {
            layer.frozen = value;
            this.view.notifyChange(layer);
        });
    }

    addElevationLayer(layer: any /* itowns.ElevationLayer */) {
        if (this.elevationGUI.hasFolder(layer.id)) { return; }
        this.elevationGUI.show();

        const folder = this.elevationGUI.addFolder(layer.id);
        folder.add({ frozen: layer.frozen }, 'frozen')
        .onChange((value) => {
            layer.frozen = value;
        });
        folder.add({ scale: layer.scale }, 'scale').min(1.0).max(20.0)
        .onChange((value) => {
            layer.scale = value;
            this.view.notifyChange(layer);
        });
    }
}
