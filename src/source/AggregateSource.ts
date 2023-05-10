import type { Extent, Source } from 'itowns';

class AggregateSource {
    crs: string;
    sources: Array<Source>;

    constructor(crs: string, sources: Array<Source>) {
        this.crs = crs;
        this.sources = sources;
    }

    onLayerAdded(options: object) {
        this.sources.forEach((s) => s.onLayerAdded(options));
    }

    onLayerRemoved(options: object = {}) {
        this.sources.forEach((s) => s.onLayerRemoved(options));
    }

    requestToKey(extent: Extent) {
        return [extent.zoom, extent.row, extent.col];
    }

    loadData(extent: Extent, out: any) {
        return Promise.all(this.sources.map((s) => s.loadData(extent, out)));
    }
}

export default AggregateSource;
