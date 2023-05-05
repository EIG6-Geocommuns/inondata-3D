import { ColorLayer, Source, Style } from 'itowns';

export interface Water2DLayerOptions {
    source?: Source,
}

type WaterProperties = any;

export default class Water2DLayer extends ColorLayer {
    readonly isWater2DLayer = true;


    constructor(id: string, config: Water2DLayerOptions) {
        const style = {
            fill: {
                color: (prop: any) => {
                    console.log(prop);
                    return '#555555'
                },
                opacity: 0.7,
            },
        };

        const options = {
            // transparent: true,
            source: config.source,
            style,
            zoom: { max: 20, min: 13 },
        };
        super(id, options as any);
    }
}
