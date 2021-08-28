import * as functions from './functions.js';

const form = document.getElementById('register-repository');
const inputFile = document.querySelector('.upload-files input[type=file]');
const inputStudentName = document.querySelector('input#student_name');

const labelFile = document.querySelectorAll('.upload-files label#upload');
const inputs = document.querySelectorAll('input:not([type=submit]), select, textarea');

const addIcon = document.querySelectorAll('.add_element');
const removeIcon = document.querySelectorAll('.remove_element')
// const progressbar = document.getElementById('upload-bar');
// const progressPercentage = document.querySelector('.details__percentage');

// const fileFormats = ['jpg', 'gif', 'png', 'zip', 'rar', 'txt', 'docx', 'pdf'];
// document.querySelector('.tooltip__text span').textContent = [...fileFormats].join(', ');

// Detecta si el campo tiene errores
inputs.forEach(input => {
	functions.inputListener(input);
})

// Agregamos nuevo elemento al dar click
addIcon.forEach(icon => {
	icon.addEventListener('click', e => {
		functions.addNewElement(e);
	})
})



functions.searchEvent(document.getElementById('student_name'));

const resultsBox = document.querySelector('.search_results');


form.addEventListener('click', e => {
	if(e.target.tagName == 'LI' ){
		let input = e.target.closest('.search_results').previousElementSibling;
		let name = e.target.textContent;
		input.value = name;
	}
})

let html = functions.createHTML([
	{
		type: 'div',
		attributes:{
			class: ['main']
		}
	},
	{
		type: 'button',
		data: 'Enviar'
	},
	{
		type: 'i',
		attributes: {
			class: ['fas', 'fas-upload']
		}
	},
])

form.appendChild(html);

// function load_data(page, query = ''){
// 	$.ajax({
// 	    url:"/alumnos/search?page="+page+"&query="+query,
// 	    success:function(data){
// 	    	resultsBox.innerHTML = '';
// 	    	let ul = document.createElement('ul');
// 	    	if(!data.alumnos.total){
// 	    		ul.innerHTML = 'No hay resultados.';
// 	    	}

// 	    	let fragment = document.createDocumentFragment();
// 	    	data.alumnos.data.forEach(res => {
// 	    		let li = document.createElement('li');
//     			li.textContent = res.nombre;
//     			fragment.appendChild(li);
// 	    	})
// 	    	ul.appendChild(fragment)
// 	    	resultsBox.appendChild(ul);

// 	      // console.log(data.alumnos.data);
// 	    }
// 	});
// }

// Buscar usuario
// const doneTypingInterval = 1000;
// let typing = false;
// let typingTimer;    //timer identifier 
// let query = '';

// form.addEventListener('keyup', e => {
// 	let node = e.target;
// 	if(node.tagName == 'INPUT' && node.id == 'student_name'){
// 		let resultsBox = node.nextElementSibling;
// 		query = node.value;
// 		if(query != ''){
//      	clearTimeout(typingTimer);
// 	    if(typing == false){
// 	      typing = true;
// 	      console.log("En espera de búsqueda...");
// 	    }
// 	    typingTimer = setTimeout(doneTyping, doneTypingInterval);
// 	  }
// 	}
// })


    // Cargar datos para la busqueda cuando el usuario ha finalizado de escribir
    // function doneTyping() { 
    //   typing = false;
    //   if(query !== ''){load_data(1, query);}
    // }





// Validamos y mostramos el nombre del archivo seleccionado de cada uno de los inputs de archivos
functions.addFileListener(inputFile);

const errors = [];
form.addEventListener('submit', e => {
	// let errors = true;

	// inputs.forEach(input => {
	// 	errors = functions.validate(input);
	// })
	
	// if(!errors){
	// 	e.preventDefault();
	// }
	// const file = inputFile.files[0];	

	// let formdata = new FormData();
	// formdata.append('file', file);
	// let ajax = new XMLHttpRequest();
	// ajax.upload.addEventListener('progress', function(e) {
	// 	let porcentaje = Math.round((e.loaded / e.total) * 100);
	// 	progressbar.value = porcentaje;
	// 	progressPercentage.textContent = porcentaje + '%';
	// })

	// ajax.open('POST', 'upload.php');
	// ajax.send(formdata);
})

