import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { Comunas } from 'src/app/services/comunas';
import { Sedes } from 'src/app/services/sedes';

@Component({
  selector: 'app-publicar-viaje',
  templateUrl: './publicar-viaje.page.html',
  styleUrls: ['./publicar-viaje.page.scss'],
})
export class PublicarViajePage implements OnInit {

  fk_patente: string = '';
  horasalida: string = '';
  asientos_disponibles: number = 0;
  direcinicio: string = '';
  direcdestino: string = '';
  precio: number = 0;

  comunas: Comunas[] = [];
  sedes: Sedes[] = [];
  mostrarListaComunas = false;
  mostrarListaSedes = false;


  mensajes: string[] = [];


  constructor(private alertController: AlertController, private bd: BasededatosService) { }

  ngOnInit() {
    // Llama a las funciones del servicio para obtener comunas y sedes
    this.bd.obtenerComunas()
      .then(comunas => this.comunas = comunas)
      .catch(error => console.error('Error al obtener comunas:', error));

    this.bd.obtenerSedes()
      .then(sedes => this.sedes = sedes)
      .catch(error => console.error('Error al obtener sedes:', error));
  }

  //-------funciones de validación

  mostrarComunas() {
    this.mostrarListaComunas = !this.mostrarListaComunas;
    this.mostrarListaSedes = false; // Oculta la lista de sedes al mostrar la lista de comunas
  }

  mostrarSedes() {
    this.mostrarListaSedes = !this.mostrarListaSedes;
    this.mostrarListaComunas = false; // Oculta la lista de comunas al mostrar la lista de sedes
  }


  validarDireccion() {
    // Obtén los IDs de las comunas y sedes
    const idsComunas = this.comunas.map(comuna => comuna.id_comuna);
    const idsSedes = this.sedes.map(sede => sede.id_sede);
  
    // Concatena ambos arrays
    const idsComunasYSedes = [...idsComunas, ...idsSedes];
  
    // Verifica si la dirección de salida coincide con algún ID de comuna o sede
    const direccionValida = idsComunasYSedes.some(id => this.direcinicio.includes(id.toString()));
  
    if (direccionValida) {
      console.log('La dirección es válida.');
    } else {
      console.log('La dirección no coincide con ninguna comuna o sede.');
    }
  }
  

  validateHoraSalida(): boolean {
    const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return regexHora.test(this.horasalida);
  }

  validatePatente(): boolean {
    // Expresión regular para validar el formato de patente (ejemplo: AA123BB)
    const regexPatente = /^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/;
    return regexPatente.test(this.fk_patente);
  }


  formatPrecio(precioString: string): number {
    return parseInt(precioString, 10);
  }

  limitarCaracteres(event: any, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }

  validarDireccionInicio(direccion: string): boolean {
    const comunaCoincide = this.comunas.some(comuna => direccion.toLowerCase().includes(comuna.nombre_comuna.toLowerCase()));
    const sedeCoincide = this.sedes.some(sede => direccion.toLowerCase().includes(sede.nombre_sede.toLowerCase()));

    return comunaCoincide || sedeCoincide;
  }

  //-------funcion para registrar el viaje

  registrarViaje() {
    this.mensajes = [];

    // Validación de los campos del formulario
    if (!this.horasalida || this.asientos_disponibles <= 0 || !this.direcinicio || !this.direcdestino) {
      this.mensajes.push('Por favor, complete todos los campos del formulario.');
      return;
    }

    // Validar formato de la hora de salida
    if (!this.validateHoraSalida()) {
      this.mensajes.push('Formato de hora de salida incorrecto. Utiliza el formato HH:mm.');
      return;
    }

    // Validar formato de la patente
    if (!this.validatePatente()) {
      this.mensajes.push('Formato de patente incorrecto. Utiliza el formato correcto.');
      return;
    }

    // Validar dirección de inicio
    if (!this.validarDireccionInicio(this.direcinicio)) {
      this.mensajes.push('La dirección de inicio no coincide con ninguna comuna o sede.');
      return;
    }

    // Antes de la llamada a la función de inserción
    console.log('Valores del formulario:', this.horasalida, this.asientos_disponibles, this.precio, this.direcinicio, this.direcdestino, this.fk_patente);

    // Realizar la inserción en la base de datos
    this.bd.insertarViaje(
      this.horasalida,
      this.asientos_disponibles,
      this.precio,
      this.direcinicio,
      this.direcdestino,
      this.fk_patente,

    ).then(() => {
      // Éxito en la inserción, mostrar el mensaje de éxito
      this.MsjRegistro();
      // Puedes agregar más lógica aquí si es necesario
    }).catch(error => {
      // Error en la inserción, mostrar mensaje de error
      this.mensajes.push('Error al publicar el viaje. Inténtelo de nuevo.' + JSON.stringify(error));
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
