import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-buscarviaje',
  templateUrl: './buscarviaje.page.html',
  styleUrls: ['./buscarviaje.page.scss'],
})
export class BuscarviajePage implements OnInit {

  constructor(private alertController: AlertController) { }

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
