import {Map, MapboxOptions} from "mapbox-gl";

export class MapConfig extends Map {
    constructor(public id: string, options?: MapboxOptions) {
        super(options);
    }
}