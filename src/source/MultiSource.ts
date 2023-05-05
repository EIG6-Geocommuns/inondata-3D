import { Source } from 'itowns';

type Input<T> = { [K in keyof T]: Source }

class AggregateSource<T> {
    constructor(sources: Input<T>) {
    }
}

export default AggregateSource;
