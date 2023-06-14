import { AfterViewInit, Component, ElementRef,Input, OnDestroy, ViewChild } from '@angular/core';
import { MapConfig } from '../../map-config.model';
import { Subscription, fromEvent, tap } from 'rxjs';
import { MapMarker } from '../../map-marker.model';
import { MapSimpleMarker } from '../../map-simple-marker.model';
import { CommonModule } from '@angular/common';
import { randomColor } from 'src/app/utils';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.scss']
})
export class FullScreenPageComponent implements  AfterViewInit, OnDestroy {
  @ViewChild('map') mapContainer: ElementRef;
  @Input() defaultZoom = 10;
  /**
   * min=-2 - max=22 
   */
  @Input() defaultRange = { min: -2, max: 18 };
  @Input() defaultPosition = { lng: -3.69, lat: 40.43 };
  private map: MapConfig;
  private subscriptions: Subscription[] = [];
  markers: MapMarker[] = [];
  get currentZoom(): number {
    return +this.map?.getZoom().toFixed(2) || this.defaultZoom;
  }
  set currentZoom(zoomValue: number) {
    this.map.setZoom(zoomValue);
  }
  get center() {
    return this.map?.getCenter() || this.defaultPosition;
  }
  constructor() { }
  ngAfterViewInit(): void {
    this.map = new MapConfig(new Date().getTime().toString(), {
      container: this.mapContainer?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.defaultPosition.lng, this.defaultPosition.lat], // starting position [lng, lat]
      zoom: this.defaultZoom,
      maxZoom: this.defaultRange.max,
      minZoom: this.defaultRange.min// starting zoom
    });
    this.listenningClick();
    this.getSetMarkersFromLocalStorage();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private listenningClick() {
    const sub = fromEvent(this.map, 'dblclick').pipe(tap((ev) => {
      const { lng, lat } = ev.lngLat;
      this.createMarker(lng, lat);
      ev.preventDefault();
    })).subscribe();
    this.subscriptions.push(sub);
  }

  private createMarker(lng: number, lat: number, color?: string) {
    const marker = new MapMarker(new Date().getTime().toString(), { color: color || randomColor(), draggable: true });
    marker.setLngLat([lng, lat]);
    marker.addTo(this.map);
    this.markers.push(marker);
    this.saveMarkersToLocalStorage();
    marker.on('dragend', () => {
      this.saveMarkersToLocalStorage();
    });
    return marker;
  }

  removeMarker(marker: MapMarker) {
    marker.remove();
    this.markers = this.markers.filter(m => m.id != marker.id);
  }

  navigateToMarker(marker: MapMarker) {
    const { lng, lat } = marker.getLngLat();
    this.map.flyTo({ center: { lng, lat } });
  }

  private saveMarkersToLocalStorage() {
    const simpleMarkers: MapSimpleMarker[] = this.markers.map(marker => {
      const { lng, lat } = marker.getLngLat();
      return { center: { lng, lat }, id: marker.id, color: marker['_color'] };
    });
    localStorage.setItem('markers', JSON.stringify(simpleMarkers));
  }

  private getSetMarkersFromLocalStorage() {
    const markers = localStorage.getItem('markers');
    if (!!markers) {
      (JSON.parse(markers) as MapSimpleMarker[]).forEach(marker => {
        this.createMarker(marker.center.lng, marker.center.lat, marker.color);
      });
    }
  }
  toggleZoom(zoomChangeValue: number) {
    this.map.setZoom(this.map.getZoom() + zoomChangeValue);
  }

}
