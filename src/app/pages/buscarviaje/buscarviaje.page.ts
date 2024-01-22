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
    this.cargarViajes();
  }

  getclima() {
    this.climaService.getclima(this.city)
    .subscribe(data=>{
      this.weatherData=data;
      console.log(data)
    })
  }

  // Ejemplo de función para obtener el nombre de la comuna
  getNombreComuna(fkComuna: number): Promise<string> {
    return this.bd.getNombreComuna(fkComuna).then(nombreComuna => {
      return nombreComuna || 'Comuna Desconocida';
    });
  }

  // Ejemplo de función para obtener el nombre de la sede
  getNombreSede(fkSede: number): Promise<string> {
    return this.bd.getNombreSede(fkSede).then(nombreSede => {
      return nombreSede || 'Sede Desconocida';
    });
  }

  cargarViajes() {
    this.bd.getAllViajes().then(viajes => {
      this.viajes = viajes;
    }).catch(error => {
      console.error('Error al cargar los viajes:', error);
    });
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
