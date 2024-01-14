import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-buscarviaje',
  templateUrl: './buscarviaje.page.html',
  styleUrls: ['./buscarviaje.page.scss'],
})
export class BuscarviajePage implements OnInit {

  constructor(private alertController: AlertController) { }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
  
    console.log('Current position:', coordinates);
  };

  ngOnInit() {
  }
  public alertButtons = [
    {
      text: 'Cancelar',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Aceptar',
      cssClass: 'alert-button-confirm',
    },];
    
  public alertInputs = [
    {
      placeholder: 'Dirección de partida',
    },

    {
      placeholder: 'Dirección de destino',
    },
    {
      type: 'number',
      placeholder: 'Cantidad de asientos',
      min: 1,
      max: 10,
    },
    {
      type: 'textarea',
      placeholder: 'Comentarios',
    },
  ];
}
