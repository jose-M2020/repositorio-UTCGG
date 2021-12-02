import * as functions from './functions.js';

window.onload = (event) => {

const form = document.getElementById('register-repository');
const inputFile = document.querySelector('#register-repository input#archivo');
const inputStudentName = document.querySelector('#register-repository input#student_name');

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

functions.dataLoadEvent(resultsBox)

form.addEventListener('click', e => {
	if(e.target.tagName == 'LI' ){
		let input = e.target.closest('.search_results').previousElementSibling;
		let name = e.target.textContent;
		input.value = name;
	}
})



// $('.historial').scroll(e => {
//   const { scrollTop, scrollHeight, offsetHeight } = e.target;
  
//   if(scrollTop < 50 && scrollHeight > offsetHeight && !isLoading){
//     isLoading = true;
//     loadData()
//   }
// })




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


// ------- Activar / desactivar campos 



	const projectType = document.querySelector('#register-repository select#project_type'),
				removableFields = document.querySelectorAll('#register-repository .removable');

const hideElement = function() {
	if(this.value != 'Estadía'){
		removableFields.forEach(element => {
			element.style.display = 'none'
		})
	}else{
		removableFields.forEach(element => {
			element.style.display = 'block'
		})
	}
}


if(projectType.value != 'Estadía'){
	removableFields.forEach(element => {
		element.style.display = 'none'
	})
}
projectType.addEventListener('change', hideElement)



// ------------------------Codigo extra añadido ----------------------

	const steps = document.querySelectorAll('ul.steps .step');
	const progressbar = document.querySelector('.progressbar .filled');
	const imageInput = document.getElementById('imagenes');
	// const form = document.getElementById('register-repository');
	
	// Mostrar la siguiente y anterior sección mediante los botones
	form.addEventListener('click', e => {
		let { target } = e;
		if(target.tagName == 'BUTTON'){
			let section = target.closest('.section');
			let position = getPosition(section);
			
			if(target.id == 'next'){
				showForm(position);
				showProgress(position);
			}
			else if(target.id == 'previous'){
				showForm(position - 2);
				showProgress(position - 2);
			}
		}
		else if(target.classList.contains('remove')){
			let parent = target.parentElement;
			handleFile().removeFile(imageInput, parent.id)
			parent.remove();
		}
	})

	// Mostrar la siguiente y anterior sección mediante la barra de progreso
	steps.forEach(step => {
		step.addEventListener('click', function(e){
			let li = this.closest('li');
			let position = getPosition(li);
			
			showForm(position);
			showProgress(position);
		})
	})

	const getPosition = element => Array.from(element.parentNode.children).indexOf(element);

	const stepsProgress = document.querySelectorAll('ul.steps li');
	const duration = getComputedStyle(document.documentElement).getPropertyValue('--animation-duration');
	let progress = (100 / (stepsProgress.length - 1));
	let previousPosition = 0;

	const showProgres  = position => {
		let currentStep = stepsProgress[position], 
			previousStep;

		// Si se ha dado click en un elemento diferente
		if(position != previousPosition){
			// Hacia adelante
			if(previousPosition < position){
				// Si el usuario da click en el ultimo paso agregamos la clase active a los pasos saltados 
				if(!currentStep.nextElementSibling){
					stepsProgress[1].classList.add('active');
				}

				currentStep.classList.add('active');
				// progressbar.style.setProperty('--delay-circle', '.28s');

				progressbar.style.setProperty('--delay-progressbar', '0s');
			}else{
				// Entra a esta concidicion si la posicion es hacia atras

				// Si se encuentra en el ultimo paso, y retrocede al primero, agregamos la clase active a los pasos saltados 
				if(!currentStep.previousElementSibling){
					stepsProgress[1].classList.remove('active');
				}

				stepsProgress[previousPosition].classList.remove('active');

				// progressbar.style.setProperty('--delay-circle', '.25s');

				// Damos un delay, para esperar hasta que la animacion del circulo este completo
				progressbar.style.setProperty('--delay-progressbar', duration);
			}
		}

		// Calculamos la longitud de la barra, la operacion: stepsProgress.length - 1, es debido a que no se toma en cuenta el primer elemento
		let progress = (100 / (stepsProgress.length - 1)) * position;
		progressbar.style.width = progress + '%';

		// definimos la posicion anterior
		previousPosition = position;
	}


	const showProgress = position => {
		

		// Si se ha dado click en un elemento diferente
		if(position != previousPosition){
			// Verificamos si no se ha saltado pasos
			if(position - previousPosition === 1 || position - previousPosition === -1){
				animate(previousPosition, position);
			}else{
				animate(previousPosition, position, true);
			}

			// definimos la posicion anterior
			previousPosition = position;
		}
	}

	const animate = (previousPosition, position, skipped = false) => {
		let currentStep = stepsProgress[position];
		
		// Modicamos el delay y duration de los pasos que se hayan omitidos
		if(skipped){
			stepsProgress[1].style.setProperty('--delay-circle', '.10s');
			stepsProgress[1].style.setProperty('--animation-duration', '.2s');
		}else{
			stepsProgress[1].style.setProperty('--delay-circle', '.28s');
			stepsProgress[1].style.setProperty('--animation-duration', '.5s');
		}

		// Hacia adelante
		if(previousPosition < position){
			currentStep.classList.add('active');
			skipped ? stepsProgress[1].classList.add('active') : false;
			
			progressbar.style.setProperty('--delay-progressbar', '0s');
		}else{
			// Entra a esta concidicion si la posicion es hacia atras
			stepsProgress[previousPosition].classList.remove('active');
			skipped ? stepsProgress[1].classList.remove('active') : false;

			// Damos un delay, para esperar hasta que la animacion del circulo este completo
			progressbar.style.setProperty('--delay-progressbar', '.68s');
		}
		
		progressbar.style.width = (progress*position) + '%';
	}

	const sections = document.querySelectorAll('#register-repository fieldset');

	const showForm = position => {
		let currentElement = sections[position];

		// Removemos la sección anterior
		sections.forEach( element => {
			if(element.classList.contains('active'))
				element.classList.remove('active');
		})

		// Mostramos la nueva seción
		if(!currentElement.classList.contains('active'))
			currentElement.classList.add('active');
	}

	// ------ Mostrar imagenes seleccionadas ------

	const imagesInput = document.getElementById('imagenes');
	const previewImages = document.querySelector('.preview_images');
	
	if (window.File && window.FileList && window.FileReader){
		imagesInput.addEventListener('change', function(e){
			handleFile().handleFileSelect(e);
		})
	}else{
		alert('El navegador actual no es compatible con la API de archivos. Intentalo con otro navegador.');
	}

const dt = new DataTransfer();

const handleFile = function() {
  return {
	// dt: new DataTransfer(),
	
	handleFileSelect(e) {
	  let { target:{files} } = e;
	  
	  for(let i = 0; i < files.length; i++){
	  	let file = files[i];

	    // Si el archivo no es una imagen lo omitimos
			if (!file.type.match('image.*')) {
	      continue;
	    }

	    // Nos permite leer los archivos seleccionados
			let fileReader = new FileReader();

			// controlador de eventos que se ejecuta cuando se activa el evento de carga
			fileReader.onload = function(e){
		  	let {target} = e;

		  	// Creamos los elementos que seran agregados al DOM
		  	let img = functions.createHTML([
		    {
		  	  type: 'div',
		  	  attributes: { class: ['image'], id: files.item(i).name}
		    },
		    {
		  	  type: 'img',
		  	  attributes: { src: target.result, title: file.name }
		    },
		    {
		  	  type: 'i',
		  	  child: false,
		  	  attributes: { class: ['remove', 'fas', 'fa-times-circle']	}
		    }
		  ])
		  previewImages.appendChild(img);
		}
		// Leer en el archivo de imagen como una URL de datos
	    fileReader.readAsDataURL(file)
	    // Agregamos los archivos al objeto dataTransfer
	    this.addFile(file);
	  }
	  // Actualizamps los valores del input file
	  e.target.files = dt.files;
	},
	
	addFile(file){
		dt.items.add(file);
	},

	removeFile(input, name) {
		for(let i = 0; i < dt.items.length; i++){
			if(name === dt.items[i].getAsFile().name){
				dt.items.remove(i);
				break;
			}
		}
		input.files = dt.files;

	  	// dt.items.remove(index);
		// console.log(index,dt.files);
	},
  }
}

}