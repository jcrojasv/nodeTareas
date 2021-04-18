require('colors');

const Tarea = require("./tarea");


class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach( key => listado.push(this._listado[key]));
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  listarTareas() {
    let listado = '';
    this.listadoArr.forEach((tarea, index) => {
      const numeroTarea = `${index + 1}.-`;
      const status = tarea.completado ? 'Completada'.green : 'Pendiente'.red;
      listado += `\n${numeroTarea.green} ${tarea.desc} :: ${status} \n`;
    })
    console.log(listado);
  }

  listarPendientesCompletadas(completada = true) {
    let listado = '';
    let cont = 0;
    this.listadoArr.forEach((tarea) => {
      const status = tarea.completado ? tarea.completado.green : 'Pendiente'.red;
      if (completada) {
        if (tarea.completado) {
          cont += 1;
          listado += `\n${(cont + '.').green} ${tarea.desc} :: ${status} \n`;
        }
      } else {
        if (!tarea.completado) {
          cont += 1;
          listado += `\n${(cont + '.').green} ${tarea.desc} :: ${status} \n`;
        }
      }
    })
    console.log(listado);
  }

  toggleCompletadas(ids = []) {
    ids.forEach(id => {

      const tarea = this._listado[id];
      if(!tarea.completado) {
        tarea.completado = new Date().toISOString();
      }

    });

    this.listadoArr.forEach(tarea => {

      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completado = null;
      }
    })
  }
}

module.exports = Tareas;