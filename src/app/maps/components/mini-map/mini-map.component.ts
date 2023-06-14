import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MapConfig } from '../../map-config.model';
import { MapMarker } from '../../map-marker.model';
import { randomColor } from 'src/app/utils';
import { CommonModule } from '@angular/common';

/* TODO: investigar como subir a npmjs */

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss']
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat:{lng:number,lat:number};
  @Input() zoom = 15;
  @ViewChild('map') mapContainer: ElementRef;
  private map: MapConfig;
  constructor() { }
  ngAfterViewInit(){
    this.map = new MapConfig(new Date().getTime().toString(), {
      container: this.mapContainer?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.lngLat?.lng, this.lngLat?.lat], // starting position [lng, lat]
      zoom: this.zoom,
      interactive:false// starting zoom
    });
    const marker = new MapMarker(new Date().getTime().toString(), { color: randomColor()});
    marker.setLngLat([this.lngLat?.lng, this.lngLat.lat]);
    marker.addTo(this.map);
  }
}
