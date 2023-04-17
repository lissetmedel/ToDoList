let arregloTareas = new Array();
let elementosGuardados = 0;
let done = new Audio('done.mp3');
let undone = new Audio('undone.mp3');

function init(){
	console.log('init')
	if('serviceWorker' in navigator){
		navigator.serviceWorker.register('sw.js').then(function(registration) {
	       // Si es exitoso
	       console.log('SW registrado correctamente');
	    }, function(err) {
	       // Si falla
	       console.log('SW fallo', err);
	    });
	 }else{
	 	console.log("ERROR")
	 }

	//Si ya existen tareas guardadas, obtenerlas en la interfaz
	if(localStorage.getItem('tareas')){
		tareas = JSON.parse(localStorage.getItem('tareas'));
		for(i=0; i<tareas.length;i++){
			arregloTareas.push(tareas[i]);
		}
		loadTareas();
	}else{
		//Si no hay tareas, crear el espacio en LocalStorage
		jsonTarea = {};
		localStorage.setItem('tareas',JSON.stringify(jsonTarea));
	}

	let fecha = new Date();
	let mesNumero = fecha.getMonth();
	let mes = "";

	switch(mesNumero){
		case 0:
			mes = "Enero";
			break;
		case 1:
			mes = "Febrero";
			break;
		case 2:
			mes = "Marzo";
			break;
		case 3:
			mes = "Abril";
			break;
		case 4:
			mes = "Mayo";
			break;
		case 5:
			mes = "Junio";
			break;
		case 6:
			mes = "Julio";
			break;
		case 7:
			mes = "Agosto";
			break;
		case 8:
			mes = "Septiembre";
			break;
		case 9:
			mes = "Octubre";
			break;
		case 10:
			mes = "Noviembre";
			break;
		case 11:
			mes = "Diciembre";
			break;
	}

	document.getElementById('fecha').innerHTML = fecha.getDate() + " de " + mes; 
	
}

function loadTareas() {
	document.querySelector('.porhacer').innerHTML = "";
	document.querySelector('.terminado').innerHTML = "";
	//Cargar las tareas de LocalStorage
	for(i=0; i<tareas.length; i++){
		elemento = "<div class='tarea' id='"+i+"' onclick='cambiarEstado(this.id)'>"+
				"<div class='check'></div>"+
				"<p>"+tareas[i].valor+"</p>"+
				"</div>";
		if(tareas[i].estatus == "pendiente"){
			document.querySelector('.porhacer').innerHTML += elemento;
		}else if(tareas[i].estatus == "terminado"){
			document.querySelector('.terminado').innerHTML += elemento;
		}
	}
	elementosGuardados = tareas.length;
}

function agregar(){
	//Capturar elemento de entrada de texto
	tareaTexto = document.getElementById('nuevaTarea');

	//Nuevo objeto de JS
	jsonTarea = {
		'valor':tareaTexto.value,
		'estatus':'pendiente'
	};

	//Crear nuevo elemento en la interfaz de usuario
	elemento = "<div class='tarea' id='"+elementosGuardados+"' onclick='cambiarEstado(this.id)'>"+
				"<div class='check'></div>"+
				"<p>"+jsonTarea.valor+"</p>"+
				"</div>";

	document.querySelector('.porhacer').innerHTML += elemento;
	
	//Agregar al arreglo de JSON la nueva tarea
	arregloTareas.push(jsonTarea);

	//Agregar al LS el arreglo de JSON en formato de texto
	localStorage.setItem('tareas', JSON.stringify(arregloTareas));

	//Limpiar cuardo de texto
	tareaTexto.value = "";

	elementosGuardados++;
}

function cambiarEstado(id){
	tareas = JSON.parse(localStorage.getItem('tareas'));
	if(tareas[id].estatus == 'terminado'){
		tareas[id].estatus = 'pendiente';
		undone.play();
	}else{
		done.play();
		tareas[id].estatus = 'terminado';
	}
	
	localStorage.setItem('tareas', JSON.stringify(tareas));
	loadTareas();
}


