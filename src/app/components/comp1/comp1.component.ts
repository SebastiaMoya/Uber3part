import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss'],
})
export class Comp1Component implements OnInit {

  climaData: any;

  constructor(private api: ClimaService, private activedroute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerclima(); 
  }


  obtenerclima() {
    this.api.getclima().subscribe((data) => {
      this.climaData = data;
      console.log('Datos del clima:', this.climaData);
    });
  }

  ionViewWillEnter() {
    this.obtenerclima();
  }

}
