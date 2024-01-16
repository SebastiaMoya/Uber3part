import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-publicar-viaje',
  templateUrl: './publicar-viaje.page.html',
  styleUrls: ['./publicar-viaje.page.scss'],
})
export class PublicarViajePage implements OnInit {

  horasalida: string = '';
  fk_patente: string = '';
  asientos_disponibles: number = 0;
  fk_comuna: number = 0;
  fk_sede: number = 0;

  comunas: any[] = []; // Asegúrate de que el tipo coincida con tu implementación
  sedes: any[] = [];   // Asegúrate de que el tipo coincida con tu implementación

  mensajes: string[] = [];


  constructor(private alertController: AlertController, private bd: BasededatosService) { }

  ngOnInit() {
    this.cargarComunas();
    this.cargarSedes();
  }

  async cargarComunas() {
    try {
      this.comunas = await this.bd.getAllComunas();
    } catch (error) {
      console.error('Error al cargar comunas:', error);
      // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async cargarSedes() {
    try {
      this.sedes = await this.bd.getAllSedes();
    } catch (error) {
      console.error('Error al cargar sedes:', error);
      // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  registrarViaje() {
    this.mensajes = [];

    // Validación de los campos del formulario
    if (!this.horasalida || this.asientos_disponibles <= 0 || !this.fk_comuna || !this.fk_sede) {
      this.mensajes.push('Por favor, complete todos los campos del formulario.');
      return;
    }

    // Aquí puedes agregar más validaciones según tus necesidades

    // Antes de la llamada a la función de inserción
    console.log('Valores del formulario:', this.horasalida, this.asientos_disponibles, this.fk_comuna, this.fk_sede);

    // Realizar la inserción en la base de datos
    this.bd.insertarViaje(
      this.horasalida,
      this.asientos_disponibles,
      this.fk_comuna,
      this.fk_sede,
      this.fk_patente
    ).then(() => {
      // Éxito en la inserción, mostrar el mensaje de éxito
      this.MsjRegistro();
      // Puedes agregar más lógica aquí si es necesario
    }).catch(error => {
      // Error en la inserción, mostrar mensaje de error
      this.mensajes.push('Error al publicar el viaje. Inténtelo de nuevo.');
      // Puedes agregar más lógica para manejar el error si es necesario
    });
  }


  async MsjRegistro() {
    const alert = await this.alertController.create({
      header: 'Exito',
      message: 'Viaje publicado',
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          cssClass: 'primary',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
  }


}
