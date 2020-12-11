//Variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#tareas-lista');
const tareaObj = {
	nombre: '',
	fecha: '',
};

//Listeners
eventListeners();
function eventListeners() {
	document.addEventListener('DOMContentLoaded', cargarLocal);
	formulario.addEventListener('submit', agregarTarea);
}

class AdminDates {
	//Retorna el nombre del día que recibe
	obtenerNombreDia(dia) {
		switch (dia) {
			case 1:
				dia = 'lunes';
				break;
			case 2:
				dia = 'martes';
				break;
			case 3:
				dia = 'miércoles';
				break;
			case 4:
				dia = 'jueves';
				break;
			case 5:
				dia = 'viernes';
				break;
			case 6:
				dia = 'sábado';
				break;
			case 7:
				dia = 'domingo';
				break;
			default:
				break;
		}
		return dia;
	}
	//Retorna el nombre del mes que recibe
	obtenerNombreMes(mes) {
		switch (mes) {
			case 0:
				mes = 'Enero';
				break;
			case 1:
				mes = 'Febrero';
				break;
			case 2:
				mes = 'Marzo';
				break;
			case 3:
				mes = 'Abril';
				break;
			case 4:
				mes = 'Mayo';
				break;
			case 5:
				mes = 'Junio';
				break;
			case 6:
				mes = 'Julio';
				break;
			case 7:
				mes = 'Agosto';
				break;
			case 8:
				mes = 'Septiembre';
				break;
			case 9:
				mes = 'Octubre';
				break;
			case 10:
				mes = 'Noviembre';
				break;
			case 11:
				mes = 'Diciembre';
				break;

			default:
				break;
		}
		return mes;
	}
}

class UI {
	agregarTarea({ tareas }) {
		this.limpiarHTML();

		tareas.forEach((tarea) => {
			const { nombre, fecha, id } = tarea;

			const divTarea = document.createElement('div');
			divTarea.classList.add('tarea');
			divTarea.id = 'tarea';

			const inputRadio = document.createElement('input');
			inputRadio.classList.add('tarea_radio');
			inputRadio.id = id;
			inputRadio.setAttribute('type', 'checkbox');

			const divInfo = document.createElement('div');
			divInfo.classList.add('tarea-info');

			const tituloLabel = document.createElement('label');
			tituloLabel.classList.add('tarea-info_titulo');
			tituloLabel.setAttribute('for', id);
			tituloLabel.textContent = nombre;

			const fechaLabel = document.createElement('label');
			fechaLabel.classList.add('tarea-info_fecha');
			fechaLabel.textContent = fecha;

			const divBorrar = document.createElement('div');
			divBorrar.classList.add('tarea_borrar');
			divBorrar.innerHTML = `
            <i class="fas fa-trash"></i>
            `;

			divBorrar.onclick = () => eliminarTareas(id);

			const divCheck = document.createElement('div');
			divCheck.classList.add('check');

			divInfo.appendChild(tituloLabel);
			divInfo.appendChild(fechaLabel);

			divTarea.appendChild(inputRadio);
			divTarea.appendChild(divInfo);
			divTarea.appendChild(divBorrar);
			divTarea.appendChild(divCheck);

			listaTareas.appendChild(divTarea);

			formulario.reset();
		});
	}

	limpiarHTML() {
		while (listaTareas.firstChild) {
			listaTareas.removeChild(listaTareas.firstChild);
		}
	}
}

class AdminTareas {
	constructor() {
		this.tareas = [];
	}

	agregarTarea(tarea) {
		this.tareas = [...this.tareas, tarea];
		this.almacenarLocalStorage(this.tareas);
	}

	eliminarTarea(id) {
		this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
		this.almacenarLocalStorage(this.tareas);
	}

	almacenarLocalStorage(tareas) {
		localStorage.setItem('Tareas', JSON.stringify(tareas));
	}
}

const dates = new AdminDates();
const ui = new UI();
const adminTareas = new AdminTareas();

function agregarTarea(e) {
	e.preventDefault();
	const valorInput = document.querySelector('#input-tarea').value;

	if (valorInput === '') {
		alert('Todos los campos son obligatorios');
		return;
	}

	//Obtener fecha
	const nombreDia = new Date().getDay();
	const dia = new Date().getDate();
	const mes = new Date().getMonth();
	const anio = new Date().getFullYear();

	const obNombreDia = dates.obtenerNombreDia(nombreDia);
	const obNombreMes = dates.obtenerNombreMes(mes);

	//Crear id
	const id = Date.now();

	//Agrega datos al objeto
	tareaObj.nombre = valorInput;
	tareaObj.fecha = `${obNombreDia}, ${dia} de ${obNombreMes} ${anio}`;
	tareaObj.id = id;

	adminTareas.agregarTarea({ ...tareaObj });
	ui.agregarTarea({ ...adminTareas });

	//Reiniciar el Objeto
	reiniciarObj();
}

function reiniciarObj() {
	tareaObj.nombre = '';
	tareaObj.fecha = '';
}

function eliminarTareas(id) {
	adminTareas.eliminarTarea(id);

	ui.agregarTarea({ ...adminTareas });
}

function cargarLocal() {
	const tareas = JSON.parse(localStorage.getItem('Tareas'));

	if (tareas !== null) {
		tareas.forEach((tarea) => {
			const { nombre, fecha, id } = tarea;

			tareaObj.nombre = nombre;
			tareaObj.fecha = fecha;
			tareaObj.id = id;

			adminTareas.agregarTarea({ ...tareaObj });
			ui.agregarTarea({ ...adminTareas });

			reiniciarObj();
		});
	}
}
