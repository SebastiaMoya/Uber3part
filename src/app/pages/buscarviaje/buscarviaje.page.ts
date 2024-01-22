import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Viaje } from 'src/app/services/viaje';
import { BasededatosService } from 'src/app/services/basededatos.service';

import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-buscarviaje',
  templateUrl: './buscarviaje.page.html',
  styleUrls: ['./buscarviaje.page.scss'],
})
export class BuscarviajePage implements OnInit {

  viajes: Viaje[] = [];

  weatherData:any;
  city!:string;

  constructor(private alertController: AlertController, private bd: BasededatosService, 
    private climaService:ClimaService, private toastController: ToastController) {
    
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);
    this.presentToast("Su ubicacion ahora se esta compartiendo");
  };

  //Alerta de compartir ubicacion 
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      position: 'bottom',
    });
  }


  ngOnInit() {
    // Llama a las funciones del servicio para obtener viajes
    this.bd.obtenerViajes()
      .then(viajes => this.viajes = viajes)
      .catch(error => console.error('Error al obtener viajes:', error));
  }

  mostrarDetalles(viaje: Viaje) {
    // Puedes abrir un modal o navegar a otra página para mostrar detalles
    // En este ejemplo, estoy mostrando un mensaje de alerta, pero puedes personalizarlo según tus necesidades
    this.alertController.create({
      header: viaje.direcdestino,
      subHeader: `Patente del vehículo: ${viaje.fk_patente}`,
      message: `Dirección de partida: ${viaje.direcinicio}`,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  getclima() {
    this.climaService.getclima(this.city)
    .subscribe(data=>{
      this.weatherData=data;
      console.log(data)
    })
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
