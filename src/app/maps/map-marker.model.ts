import * as mapboxgl from "mapbox-gl";


export class MapMarker extends mapboxgl.Marker{
    constructor(public id: string, options?: mapboxgl.MarkerOptions) {
       super(options); 
    }
}