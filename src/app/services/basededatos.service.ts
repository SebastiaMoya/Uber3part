import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Usuarios } from './usuarios';
import { Comunas } from './comunas';
import { Sedes } from './sedes';
import { Viaje } from './viaje';

@Injectable({
  providedIn: 'root'
})
export class BasededatosService {

  //variable para guardar la conexion a la base de datos
  public conexionBD!: SQLiteObject;

  //variables para las tablas de nuestra base de datos
  //primero las que no tienen FK
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(20) NOT NULL);";

  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT, pregunta VARCHAR(30) NOT NULL);";

  tablaSede: string = "CREATE TABLE IF NOT EXISTS sede (id_sede INTEGER PRIMARY KEY AUTOINCREMENT, nombre_sede VARCHAR(40));";

  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna (id_comuna INTEGER PRIMARY KEY AUTOINCREMENT, nombre_comuna VARCHAR(40));";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreuser VARCHAR(20) NOT NULL, correo VARCHAR(100) NOT NULL, clave VARCHAR(16) NOT NULL, respuesta VARCHAR(20), fk_idrol INTEGER, fk_idpregunta INTEGER, FOREIGN KEY (fk_idrol) REFERENCES rol(id_rol), FOREIGN KEY (fk_idpregunta) REFERENCES preguntas(id_pregunta));";

  tablaVehiculo: string = "CREATE TABLE IF NOT EXISTS vehiculo (patente VARCHAR(20) PRIMARY KEY, marca VARCHAR(50), modelo VARCHAR(20), cant_asientos INTEGER, color VARCHAR(10), fk_user INTEGER, FOREIGN KEY (fk_user) REFERENCES usuario(id_usuario));";

  tablaViaje: string = "CREATE TABLE IF NOT EXISTS viaje (id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, horasalida VARCHAR(5) NOT NULL, asientos_disponibles INTEGER, fk_comuna INTEGER, fk_sede INTEGER, fk_patente VARCHAR(20), FOREIGN KEY (fk_comuna) REFERENCES comuna(id_comuna), FOREIGN KEY (fk_sede) REFERENCES sede(id_sede), FOREIGN KEY (fk_patente) REFERENCES vehiculo(patente));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalleviaje (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, fk_viaje INTEGER, fk_user INTEGER, FOREIGN KEY (fk_viaje) REFERENCES viaje(id_viaje), FOREIGN KEY (fk_user) REFERENCES usuario(id_usuario));";

  //variables para insert por defecto
  insertRol1: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'Pasajero');";
  insertRol2: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (2,'Conductor');";

  insertpregunta1: string = "INSERT or IGNORE INTO pregunta(id_pregunta,pregunta) VALUES (1,'¿Bebida favorita?');";
  insertpregunta2: string = "INSERT or IGNORE INTO pregunta(id_pregunta,pregunta) VALUES (2,'¿Nombre de tu mascota?');";
  insertpregunta3: string = "INSERT or IGNORE INTO pregunta(id_pregunta,pregunta) VALUES (3,'¿Marca de celular?');";

  insertsede1: string = "INSERT or IGNORE INTO sede(id_sede,nombre_sede) VALUES (1,'Plaza norte');";
  insertsede2: string = "INSERT or IGNORE INTO sede(id_sede,nombre_sede) VALUES (2,'Alameda');";

  insertcomuna1: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (1,'La florida');";
  insertcomuna2: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (2,'Quilicura');";

  insertUsuario1: string = "INSERT or IGNORE INTO usuario(id_usuario,nombreuser,correo,clave,respuesta,fk_idrol,fk_idpregunta) VALUES (1,'Tulio Tribiño','31@gmail.com','31_Minutos', 'plata', 1, 2);";
  insertUsuario2: string = "INSERT or IGNORE INTO usuario(id_usuario,nombreuser,correo,clave,respuesta,fk_idrol,fk_idpregunta) VALUES (2,'Bodoque','Bodoque@gmail.com','31_Minutos', 'Vino', 2, 1);";


  //variables para los observables de las consultas a las tablas
  listaUser = new BehaviorSubject([]);

  //Observable para el estatus de la base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private alertController: AlertController, private plataform: Platform, private sqlite: SQLite) {
    this.crearBD();
  }

  //funciones que retornen los observables creados
  dbState() {
    return this.isDBReady.asObservable();
  }


  //metodo para crear la base de datos
  crearBD() {
    //verificamos que la plataforma este lista
    this.plataform.ready().then(() => {
      //crear la base de datos
      this.sqlite.create({
        name: 'StudyCaravan.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardar mi conexion a base de datos
        this.conexionBD = db;
        //crear las tablas en mi base de datos
        this.crearTablas();
      }).catch(e => {
        //mostrar el error del create
        this.presentAlert("Error en crearDB: " + JSON.stringify(e));
      })




    }).catch(e => {
      //mostrar el error del ready
      this.presentAlert("Error en platform: " + JSON.stringify(e));
    })

  }


  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje Importante',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }



  async crearTablas() {
    //this.presentAlert("0");
    try {
      //ejecutar creacion de tablas
      await this.conexionBD.executeSql(this.tablaRol, []);
      //this.presentAlert("1");
      await this.conexionBD.executeSql(this.tablaPregunta, []);
      //this.presentAlert("1");
      await this.conexionBD.executeSql(this.tablaComuna, []);
      //this.presentAlert("2");
      await this.conexionBD.executeSql(this.tablaSede, []);
      //this.presentAlert("3");
      await this.conexionBD.executeSql(this.tablaUsuario, []);
      //this.presentAlert("5");
      await this.conexionBD.executeSql(this.tablaVehiculo, []);
      //this.presentAlert("6");
      await this.conexionBD.executeSql(this.tablaViaje, []);
      //this.presentAlert("7");
      await this.conexionBD.executeSql(this.tablaDetalle, []);
      //this.presentAlert("8");
      //ejecuto los insert en las tablas
      await this.conexionBD.executeSql(this.insertRol1, []);
      //this.presentAlert("9");
      await this.conexionBD.executeSql(this.insertRol2, []);
      //this.presentAlert("10");
      await this.conexionBD.executeSql(this.insertpregunta1, []);
      //this.presentAlert("11");
      await this.conexionBD.executeSql(this.insertpregunta2, []);
      //this.presentAlert("12");
      await this.conexionBD.executeSql(this.insertcomuna1, []);
      //this.presentAlert("13");
      await this.conexionBD.executeSql(this.insertcomuna2, []);
      //this.presentAlert("14");
      await this.conexionBD.executeSql(this.insertsede1, []);
      //this.presentAlert("15");
      await this.conexionBD.executeSql(this.insertsede2, []);
      //this.presentAlert("16");
      //this.presentAlert("10");
      //this.buscarUsuarios();
      await this.conexionBD.executeSql(this.insertUsuario1, []);
      //this.presentAlert("11");
      await this.conexionBD.executeSql(this.insertUsuario2, []);
      //this.presentAlert("12");
      //actualizo el observable de la base de datos
      this.isDBReady.next(true);
      //this.presentAlert("Proceso completado");
    }
    catch (e) {
      this.presentAlert("Error en tablas: " + JSON.stringify(e));
    }

  }

  verificarCorreoExistente(correo: string): Promise<boolean> {
    return this.conexionBD.executeSql('SELECT COUNT(*) AS cantidad FROM usuario WHERE correo = ?', [correo])
      .then(res => {
        // Si la cantidad es mayor que 0, significa que el correo ya existe
        return res.rows.item(0).cantidad > 0;
      })
      .catch(error => {
        console.error('Error al verificar correo existente:', error);
        throw error; // Propaga el error para que pueda ser manejado en el componente
      });
  }



  insertarUsuario(nombre: string, correo: string, clave: string, respuesta: string, fk_idrol: number, fk_idpregunta: number): Promise<number> {
    return this.conexionBD.executeSql('INSERT INTO usuario(nombreuser, correo, clave, respuesta, fk_idrol, fk_idpregunta) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, correo, clave, respuesta, fk_idrol, fk_idpregunta]).then(res => {
        // Obtener el ID del último rol insertado
        return res.insertId;
      }).catch(e => {
        this.presentAlert("Error en insert usuario: " + JSON.stringify(e));
        throw e; // Re-lanzar el error para que pueda ser manejado en la llamada.
      });
  }


  buscarUsuarioPorCorreo(correo: string): Promise<{ id_usuario: number, fk_idrol: number }> {
    return this.conexionBD.executeSql('SELECT id_usuario, fk_idrol FROM usuario WHERE correo = ?', [correo])
      .then(res => {
        if (res.rows.length > 0) {
          const usuario = res.rows.item(0);
          return { id_usuario: usuario.id_usuario, fk_idrol: usuario.fk_idrol };
        } else {
          throw new Error("Usuario no encontrado");
        }
      })
      .catch(e => {
        console.error("Error al buscar usuario:", e);
        throw new Error("Error al buscar usuario: " + JSON.stringify(e));
      });
  }



  buscarUsuarios(correo: string, clave: string): Promise<Usuarios[]> {
    return this.conexionBD.executeSql('SELECT * FROM usuario INNER JOIN rol ON usuario.fk_idrol = rol.id_rol WHERE correo = ? AND clave = ?', [correo, clave])
      .then(res => {
        let items: Usuarios[] = [];

        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id_usuario: res.rows.item(i).id_usuario,
              nombreuser: res.rows.item(i).nombreuser,
              correo: res.rows.item(i).correo,
              clave: res.rows.item(i).clave,
              respuesta: res.rows.item(i).respuesta,
              fk_idrol: res.rows.item(i).fk_idrol,
              id_rol: res.rows.item(i).id_rol,
              fk_idpregunta: res.rows.item(i).fk_idpregunta
            });
          }
        }

        return items;
      })
      .catch(e => {
        console.error("Error en select join:", e);
        throw new Error("Error en select join: " + JSON.stringify(e));
      });
  }


  limpiarTablaUsuarios() {
    return this.conexionBD.executeSql('DELETE FROM usuario', [])
      .then(() => {
        console.log('Registros de la tabla de usuarios eliminados exitosamente');
      })
      .catch(error => {
        console.error('Error al limpiar la tabla de usuarios:', error);
        throw error; // Propaga el error para que pueda ser manejado en la página de inicio
      });
  }

  // En basededatos.service.ts

  getAllUsuarios(): Promise<Usuarios[]> {
    const query = `
    SELECT usuario.*, rol.nombre_rol, pregunta.pregunta
    FROM usuario
    INNER JOIN rol ON usuario.fk_idrol = rol.id_rol
    INNER JOIN pregunta ON usuario.fk_idpregunta = pregunta.id_pregunta
  `;

    return this.conexionBD.executeSql(query, []).then(res => {
      let usuarios: Usuarios[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          usuarios.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombreuser: res.rows.item(i).nombreuser,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            respuesta: res.rows.item(i).respuesta,
            fk_idrol: res.rows.item(i).fk_idrol,
            id_rol: res.rows.item(i).id_rol,
            fk_idpregunta: res.rows.item(i).fk_idpregunta,
          });
        }
      }

      return usuarios;
    }).catch(e => {
      console.error("Error al obtener usuarios:", e);
      throw new Error("Error al obtener usuarios: " + JSON.stringify(e));
    });
  }

  //----------------------------------------------------------------------

  async obtenerSedes(): Promise<any[]> {
    return this.sqlite.create({
      name: 'tu_base_de_datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM sede', []).then(data => {
        let sedes = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            sedes.push(data.rows.item(i));
          }
        }
        return sedes;
      });
    });
  }

  async obtenerComunas(): Promise<any[]> {
    return this.sqlite.create({
      name: 'tu_base_de_datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM comuna', []).then(data => {
        let comunas = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            comunas.push(data.rows.item(i));
          }
        }
        return comunas;
      });
    });
  }

  insertarViaje(horasalida: string, asientos_disponibles: number, fk_comuna: number, fk_sede: number, fk_patente: string): Promise<number> {
    return this.conexionBD.executeSql('INSERT INTO viaje(horasalida, asientos_disponibles, fk_comuna, fk_sede, fk_patente) VALUES (?, ?, ?, ?, ?)',
      [horasalida, asientos_disponibles, fk_comuna, fk_sede, fk_patente]).then(res => {
        // Obtener el ID del último viaje insertado
        return res.insertId;
      }).catch(e => {
        this.presentAlert("Error en insert viaje: " + JSON.stringify(e));
        throw e; // Re-lanzar el error para que pueda ser manejado en la llamada.
      });
  }

  getNombreComuna(fkComuna: number): Promise<string> {
    const query = 'SELECT nombre_comuna FROM comuna WHERE id_comuna = ?';
    return this.conexionBD.executeSql(query, [fkComuna]).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).nombre_comuna;
      }
      return ''; // O cualquier valor por defecto que desees
    }).catch(error => {
      console.error('Error al obtener nombre de comuna:', error);
      throw new Error('Error al obtener nombre de comuna: ' + JSON.stringify(error));
    });
  }


  getAllComunas(): Promise<Comunas[]> {
    const query = `
    SELECT *
    FROM comuna
  `;

    return this.conexionBD.executeSql(query, []).then(res => {
      let comunas: Comunas[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          comunas.push({
            id_comuna: res.rows.item(i).id_comuna,
            nombre_comuna: res.rows.item(i).nombre_comuna,
            // Otros campos de la tabla comuna si los tienes
          });
        }
      }

      return comunas;
    }).catch(e => {
      console.error("Error al obtener comunas:", e);
      throw new Error("Error al obtener comunas: " + JSON.stringify(e));
    });
  }

  getNombreSede(fkSede: number): Promise<string> {
    const query = 'SELECT nombre_sede FROM sede WHERE id_sede = ?';
    return this.conexionBD.executeSql(query, [fkSede]).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).nombre_sede;
      }
      return ''; // O cualquier valor por defecto que desees
    }).catch(error => {
      console.error('Error al obtener nombre de sede:', error);
      throw new Error('Error al obtener nombre de sede: ' + JSON.stringify(error));
    });
  }

  getAllSedes(): Promise<Sedes[]> {
    const query = `
    SELECT *
    FROM sede
  `;

    return this.conexionBD.executeSql(query, []).then(res => {
      let sedes: Sedes[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          sedes.push({
            id_sede: res.rows.item(i).id_sede,
            nombre_sede: res.rows.item(i).nombre_sede,
            // Otros campos de la tabla sede si los tienes
          });
        }
      }

      return sedes;
    }).catch(e => {
      console.error("Error al obtener sedes:", e);
      throw new Error("Error al obtener sedes: " + JSON.stringify(e));
    });
  }

  getAllViajes(): Promise<Viaje[]> {
    const query = `
      SELECT viaje.*, comuna.nombre_comuna, sede.nombre_sede
      FROM viaje
      INNER JOIN comuna ON viaje.fk_comuna = comuna.id_comuna
      INNER JOIN sede ON viaje.fk_sede = sede.id_sede
    `;

    return this.conexionBD.executeSql(query, []).then(res => {
      let viajes: Viaje[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          viajes.push({
            id_viaje: res.rows.item(i).id_viaje,
            horasalida: res.rows.item(i).horasalida,
            asientos_disponibles: res.rows.item(i).asientos_disponibles,
            fk_comuna: res.rows.item(i).fk_comuna,
            fk_sede: res.rows.item(i).fk_sede,
            fk_patente: res.rows.item(i).fk_patente,
            nombre_comuna: res.rows.item(i).nombre_comuna,
            nombre_sede: res.rows.item(i).nombre_sede,
          });
        }
      }

      return viajes;
    }).catch(e => {
      console.error('Error al obtener viajes:', e);
      throw new Error('Error al obtener viajes: ' + JSON.stringify(e));
    });
  }

}
