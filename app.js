require('colors');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrarTareas,
  confirmar,
  mostrarListadoChecklist
} = require('./helpers/inquirer');
const {
  guardarData,
  leerData
} = require('./helpers/guardarArchivo');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async() => {

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerData();

  if(tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch(opt) {
      case '1':
        // crear tarea
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listarTareas();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(null);
        break;
      case '5':
          const ids = await mostrarListadoChecklist(tareas.listadoArr);
          tareas.toggleCompletadas(ids);
          break;
      case '6':
        const id = await listadoBorrarTareas(tareas.listadoArr);
        const ok = await confirmar('Quieres eliminar la tarea?');
        if (ok) {
          tareas.borrarTarea(id);
          console.log('Tarea borrada correctamente');
        }
        break;
    }

    guardarData(tareas.listadoArr);

    if (opt !== '0') await pausa();

  } while(opt !== '0');

}

main();
