export const validate = input => {	
	if(input.value === ''){
		if(input.type == 'file'){
			input.nextElementSibling.style.border = '2px solid tomato';
		}
		input.style.border = '2px solid tomato';
		return false;
	} else{
		if(input.type == 'file'){
			input.nextElementSibling.style.border = 'none';
		}
		input.style.border = 'none';
		return true;
	}
}

export const validateExtension = (inputID, exts) => {
    let fileName = document.getElementById(inputID).value;
	
    // return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
	return (new RegExp('(' + exts.replace(/\./g, '\\.') + ')$')).test(fileName);
}

const validateFile = (inputID, label) => {
	let res = false;
	if(inputID === 'project_file'){
		res = functions.validateExtension(inputID, 'rar');
	}
	if(inputID === 'user_manual' || inputID === 'technical_manual'){
		res = functions.validateExtension(inputID, 'pdf');
	}

	if (!res) {
		label.style.border = '2px solid tomato';
	 }else{
		 label.style.border = '2px solid #ddd';
	 }
}

// Detecta si se selecciono un archivo
export const addFileListener = input => {
	input.addEventListener('change', e => {
		let label = e.target.nextElementSibling;
		let id = e.target.id;
		
		label.style.backgroundColor = '#39c2a6';
		label.style.color = 'rgb(238, 255, 239)';

		// Validar extension del archivo
		validateFile(id, label);

		label.lastChild.textContent = ' ' + e.target.files[0].name;
	})
}

// Verifica que no haya errores en los inputs (excepto de tipo file)
export const inputListener = input => {
	input.addEventListener('blur', () => {
		validate(input);
	})
}

// Agregamos un EventListener al dar click en eliminar
// const removeElementListener = id => {
// 	setTimeout(function(){
// 		document.getElementById(id).addEventListener('click', function(e) {
// 			// ascendemos al padre que contiene el div (conformado por iconos, input) y eliminanos el div
// 			this.parentElement.parentElement.removeChild(this.parentElement);
// 		})
// 	},50)
// }




let page = 1;
export const dataLoadEvent = container => {
	let isLoading = false;
	container.addEventListener('scroll', function(e) {
		

		const { scrollTop, scrollHeight, offsetHeight, previousElementSibling } = e.target;
    	// console.log(scrollTop, ' - ', scrollHeight, ' - ', offsetHeight)
    
		if(scrollTop + offsetHeight >= scrollHeight){
    	page++;
    	isLoading = true;
    	loadData(container.firstElementChild, page, previousElementSibling.value);
    	isLoading = false;
    	console.log(page);
  	}




  	
	})
}

const doneTypingInterval = 1000;
let typing = false;
let typingTimer;    //timer identifier 
let query = '';

export const searchEvent = input => {
	let resultsBox;
	input.addEventListener('keyup', function(e) {
		resultsBox = this.nextElementSibling;
		query = this.value;
		if(query !== ''){
				// Reseteamos los valores de lastPage y page para cargar nuevos resultados de la nueva búsqueda
				lastPage = 1;
				page = 1;
	     	clearTimeout(typingTimer);
		    if(typing == false){
		      typing = true;
		      console.log("En espera de búsqueda...");
			}
		    typingTimer = setTimeout(e => {
		    	typing = false;
      			if(query !== ''){loadData(resultsBox, 1, query);}
		    }, doneTypingInterval);
		}
	})
	// dataLoadEvent(resultsBox);
	// console.log(resultsBox)
}

// function createElement(type, attributes) {
//   let element = document.createElement(type);
//   for (var key in attributes) {
//     if (key == "class") {
//       element.classList.add.apply(element.classList, attributes[key]);
//     } else {
//       element[key] = attributes[key];
//     }
//   }
//   //someElement.appendChild(element);
// }

let lastPage = 1;
export let loadData = async (container, page = 1, query = '') => {
	let spinner = createHTML([ {type: 'i', attributes: { class: 'fas fa-spinner fa-spin'} } ]);
	spinner.style.cssText = `
		font-size: 20px; 
		color: #419F6D; 
		margin: 10px auto;
		display: block;
	`;

	if(page <= lastPage){
	  container.appendChild(spinner);
	  try {
	    let response = await fetch("/usuarios/api/search?page="+page+"&query="+query);
	    let students = await response.json();
	    lastPage = students.last_page;
	    
	    console.log(lastPage)
		let html = '';
		let names = students.data.reduce((acc, alumno) => {
			return [...acc, `${alumno.nombre} ${alumno.apellido}`]
		}, []);

		if(page === 1){
			// Si es la primera pagina (primero resultados) creamos la lista
			container.innerHTML = '';
			
			if(!students.total){
				html = createHTML([ {type: 'ul', data: 'No hay resultados.'} ])
			}else{
				// Obtenemos solo los nombres y los almacenamos en una array
				html = createHTML([ 
					{type: 'ul'}, 
					{type: 'li', data: names} 
				]);
			}
		}else{
			// Si no, agregamos los otros resultados a la lista
			html = createHTML([ {type: 'li', data: names} ])
			container.removeChild(container.querySelector('.fa-spinner'));
		}
		container.appendChild(html);
	  } catch(err) {
	    console.log(err);
	    let errorMsg = createHTML([ {type: 'ul', data: 'Hubo un error al obtener los datos. Intentalo de nuevo.'} ])
	    container.appendChild(errorMsg);
	  }
	}
}

let i = 1;
export const addNewElement = e => {
	let parent = e.target.parentElement;
	let newElement = e.target.previousElementSibling.cloneNode(true);
	let input = newElement.querySelector('input');
	// Evitamos clonar el valor del input
	input.value = '';

	if(input.type !== 'file') {
		input.style.border = '2px solid #ddd';
		input.removeAttribute('readonly')
		// Evento para Checar errores
		inputListener(input);
		// Evento de keyup para buscar usuario
		searchEvent(input)
		dataLoadEvent(newElement.querySelector('.search_results'));
	}else {
		// Para inputs de tipo file usamos el label para hacer referencia al input

		// i++;
		// let label = newElement.querySelector('label');
		// input.setAttribute('id','file' + i);
		// label.setAttribute('for','file' + i);
		// label.innerHTML = `
		//  	<i class="fas fa-file-upload"></i>
		// 	Cargar Archivo`;
		// label.style.cssText = `
		// 	color: #32b197;
		// 	backgroundColor: #f8fffa;
		// 	border: 1px solid #04886d;
		// `;
		// addFileListener(input);
	}
	
	i++;

	const icon = createElement({
		type: 'I',
		attributes: {class: 'fas fa-times-circle remove', id: 'icon' + i}
	})

	// Agregamos el icono de eliminar al nuevo elemento creado
	newElement.appendChild(icon);
	parent.insertBefore(newElement, parent.lastElementChild);

	// removeElementListener(node.id);
}

// !! Create elements
// ----------------------------------------------------------------

/**
	* El elemento sera agregado como hijo del elemento anterior (al menos que se declare child como false).
	* Para agregar varios elementos repetidos que tendra diferentes textos y/0 id, solo se declara el elemento
	* una vez, y se pasa un array de strings en data y id (opcional).
  *
	* Para el uso de esta función, se pasa como parametro un array de objetos.
	*
	*	@param {string} type 			- El tipo de elemento que se va a crear.
	*	@param {object} attributes		- Un objeto con los atributos (id, class, name, etc).
	*				   						class 	- string con la clase o clases.
	*				   						id 		- String con el id, en el caso de que sea para un elemento que se repetira varias
	*										 	 	  veces, se puede pasar un array con el id correspondiente.
	*	@param {boolean} isChild 		- True o false, si el elemento a agregar es hijo o no del elemento anteror. Por default es true.
	*	@param {string} ascend 			- Para ascender a un elemento especifico.
	*	@param {string or array} data 	- El texto que tendra el elemento, puede ser un string o array de string.
*/

export const createHTML = elements => {
	const createdElements = elements.reduce( (accumulator, element) => {
		const newElement = createElement(element);

	  	return [...accumulator, {
	  		element: newElement,
	  		isChild: element.hasOwnProperty('isChild') ? element.isChild : true,
			ascend: element.hasOwnProperty('ascend') ? element.ascend : null
	  	}];
	}, []);

	console.log(createdElements);
	
	organizeElements(createdElements);

	console.log(createdElements)

	return createdElements[0].element;
}

const organizeElements = (elements = []) => {
	elements.forEach( (element, i) => {
		if(element.ascend){
			let ascendedElement = elements[i-2].element.closest(element.ascend);
			ascendedElement.appendChild(element.element);
		}
		else if(i !== 0 && element.isChild) {
			elements[i-1].element.appendChild(element.element);		
		}
		else if(i >= 2 && !element.isChild){
			elements[i-1].element.parentElement.appendChild(element.element);
		}
	})

	// for(let i = 0; i < createdElements.length; i++) {
	// 	if(elements[i].hasOwnProperty('ascend')){
	// 		let ascendedElement = createdElements[i-2].element.closest(elements[i].ascend);
	// 		ascendedElement.appendChild(createdElements[i].element);
	// 	}
	// 	else if(i !== 0 && createdElements[i].child) {
	// 		// Si es child en true se agrega comp hijo del elemento anterior
	// 		createdElements[i-1].element.appendChild(createdElements[i].element);		
	// 	}
	// 	else if(i >= 2 && !createdElements[i].child){
	// 		// Si child es false se agrega como hermano del elemento anterior
	// 		createdElements[i-1].element.parentElement.appendChild(createdElements[i].element);
	// 	}
	// }
}

/**
 * 
 * @param {object} elementData 
 * @returns One or multiple elements of a single tag type
 */

const createElement = elementData => {
	// TODO: trartar de crear elementos especificos como <select></select>
	if(Array.isArray(elementData.data)){
		// Create elements for every array item of data with the id

		const documentFragment = document.createDocumentFragment();
		let attributeIndex = 0;
		
		// multiple elements of a tag type
		elementData.data.forEach( text => {
			let elmt = document.createElement(elementData.type);
			documentFragment.appendChild(elmt);

			// Agregamos el texto
			elmt.textContent = text;

			addAttributes(elmt, elementData.attributes, attributeIndex);
			attributeIndex++;
		})

		return documentFragment;
	}else{
		// Si es un string, creamos solo un elemento
		const newElement = document.createElement(elementData.type);
		
		addAttributes(newElement, elementData.attributes);

		// Agregamos el texto
		newElement.textContent = elementData.data;

		return newElement;
	}
}

const addAttributes = (element, attributes = {}, index) => {
	for(const key in attributes){
		if (key == "class") {
		  const classessArray = attributes[key].split(' ');
		  element.classList.add(...classessArray);
		} else {
			// Si el atributo es un array, es decir cada atributo de los elementos tiene un valor unico.
		  if(Array.isArray(attributes[key])){
			element[key] = attributes[key][index];	
		  	// index++;
		  }else{
			  element[key] = attributes[key];
		  }

		}
	}
}