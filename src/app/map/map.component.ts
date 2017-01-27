import {Component, OnInit} from '@angular/core';
import  * as ol from 'openlayers'
import {MapService} from './map.service'

@Component({
  selector: 'map',
  styleUrls: ['./map.component.css'],
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {

  public counter: number;

  constructor(public mapService: MapService) {
    this.counter = 0;

  };

  public goToLocation (): void {

  }

  askPermissionForLocation(callback): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapService.setLocation(position.coords);
        callback();
      })
    }
    else {
      console.log("Old Browser");
    }
  }

  ngOnInit(): void {
    this.askPermissionForLocation(() => {
      var layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

      var map = new ol.Map({
        layers: [layer],
        target: 'map',
        view: new ol.View({
          center:  ol.proj.fromLonLat(this.mapService.getLocation()),
          zoom: 10
        })
      });

      var pos = ol.proj.fromLonLat(this.mapService.getLocation());

      // Vienna marker
      var marker = new ol.Overlay({
        position: pos,
        positioning: 'center-center',
        element: document.getElementById('marker'),
        stopEvent: false
      });
      map.addOverlay(marker);

      // Vienna label
      var you = new ol.Overlay({
        position: pos,
        element: document.getElementById('you')
      });
      map.addOverlay(you);

      // Popup showing the position the user clicked
      var popup = new ol.Overlay({
        element: document.getElementById('popup')
      });
      map.addOverlay(popup);

    })

  }
}
;
