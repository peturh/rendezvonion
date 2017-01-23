import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService{

  public currentLocation : any;

  constructor(private http: Http) {
    this.currentLocation = "";
  }

  getLocation() {
    return this.currentLocation;
  }

  setLocation(coord: any){
    console.log(coord);
    this.currentLocation = [coord.longitude,coord.latitude];
  }

  private makeRequest(path: string) {
    let params = new URLSearchParams();
    params.set('per_page', '100');

    let url = `https://api.github.com/${ path }`;
    return this.http.get(url, {search: params})
      .map((res) => res.json());
  }
}
