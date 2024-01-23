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
  asientos_disponibles: number = 1;
  direcinicio: string = '';
  direcdestino: string = '';
  precio: number = 1000; // Valor por defecto de 1.000

  comunas: Comunas[] = [];
  sedes: Sedes[] = [];
  mostrarComunas = false;
  mostrarSedes = false;


  mensajes: any[] = [];


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

  mostrarListaComunas() {
    this.mostrarComunas = !this.mostrarComunas;
  }

  mostrarListaSedes() {
    this.mostrarSedes = !this.mostrarSedes;
  }


  validarDireccion() {
    // Obtén los nombres de las comunas y sedes
    const nombresComunas = this.comunas.map(comuna => comuna.nombre_comuna.toLowerCase());
    const nombresSedes = this.sedes.map(sede => sede.nombre_sede.toLowerCase());

    // Concatena ambos arrays
    const nombresComunasYSedes = [...nombresComunas, ...nombresSedes];

    // Verifica si la dirección de salida coincide con algún nombre de comuna o sede
    const direccionValida = nombresComunasYSedes.some(nombre => this.direcinicio.toLowerCase().includes(nombre));
    // Verifica si la dirección de destino coincide con algún nombre de comuna o sede
    const direccionValida2 = nombresComunasYSedes.some(nombre => this.direcdestino.toLowerCase().includes(nombre));

    if (direccionValida) {
      console.log('La dirección de salida es válida.');
    } else {
      console.log('La dirección de salida no coincide con ninguna comuna o sede.');
    }

    if (direccionValida2) {
      console.log('La dirección de destino es válida.');
    } else {
      console.log('La dirección de destino no coincide con ninguna comuna o sede.');
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

  validatePrecio(precioString: string): boolean {
    const regexPrecio = /^[1-9]\d*(\.\d{1,3})?$/;
    return regexPrecio.test(precioString);
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

  validarDireccionDestino(direccionDestino: string): boolean {
    const comunaCoincide = this.comunas.some(comuna => direccionDestino.toLowerCase().includes(comuna.nombre_comuna.toLowerCase()));
    const sedeCoincide = this.sedes.some(sede => direccionDestino.toLowerCase().includes(sede.nombre_sede.toLowerCase()));

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

    // Validar dirección de inicio
    if (!this.validarDireccionDestino(this.direcdestino)) {
      this.mensajes.push('La dirección de inicio no coincide con ninguna comuna o sede.');
      return;
    }

    // Validar formato del precio
    if (!this.validatePrecio(this.precio.toString())) {
      this.mensajes.push('Formato de precio incorrecto. Utiliza el formato correcto.');
      return;
    }

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
      console.error('Error al insertar el viaje:', error);
      // Puedes agregar más lógica para manejar el error si es necesario
    });

  }


  async MsjRegistro() {
    const mensaje = `
      -Viaje publicado:
      -Hora de salida: ${this.horasalida}
      -Asientos disponibles: ${this.asientos_disponibles}
      -Precio: ${this.precio}
      -Dirección de inicio: ${this.direcinicio}
      -Dirección de destino: ${this.direcdestino}
      -Patente del vehículo: ${this.fk_patente}
    `;
  
    const alert = await this.alertController.create({
      header: 'Exito',
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          cssClass: 'primary',
          handler: (blah) => {
            // Puedes agregar lógica adicional si es necesario
          }
        }
      ]
    });
  
    await alert.present();
  }
  


}
