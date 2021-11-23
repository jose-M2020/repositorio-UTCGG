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

function createElement(type, attributes) {
  let element = document.createElement(type);
  for (var key in attributes) {
    if (key == "class") {
      element.classList.add.apply(element.classList, attributes[key]);
    } else {
      element[key] = attributes[key];
    }
  }
  //someElement.appendChild(element);
}

let lastPage = 1;
export let loadData = async (container, page = 1, query = '') => {
	let spinner = createHTML([ {type: 'i', attributes: { class: ['fas', 'fa-spinner', 'fa-spin']} } ]);
	spinner.style.cssText = `
		font-size: 20px; 
		color: #419F6D; 
		margin: 10px auto;
		display: block;
	`;

	if(page <= lastPage){
		container.appendChild(spinner);
		try {
	    let response = await fetch("/alumnos/search?page="+page+"&query="+query);
	    let students = await response.json();
	    lastPage = students.last_page;
	    
	    console.log(lastPage)
			let html = '';
			let names = students.data.reduce((acc, alumno) => {
										return [...acc, alumno.nombre]
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
		// Evento para Checar errores
		inputListener(input);
		// Evento de keyup para buscar usuario
		searchEvent(input)
		dataLoadEvent(newElement.querySelector('.search_results'));
	}else {
		// Para inputs de tipo file usamos el label para hacer referencia al input
		i++;
		let label = newElement.querySelector('label');
		input.setAttribute('id','file' + i);
		label.setAttribute('for','file' + i);
		label.innerHTML = `
		 	<i class="fas fa-file-upload"></i>
			Cargar Archivo`;
		label.style.cssText = `
			color: #32b197;
			backgroundColor: #f8fffa;
			border: 1px solid #04886d;
		`;
		addFileListener(input);
	}
	
	i++;
	// Creamos el icono de eliminar
	let node = document.createElement("I");
	node.classList.add('fas', 'fa-times-circle', 'remove');
	node.id = 'icon'+i;

	// Agregamos el icono de eliminar al nuevo elemento creado
	newElement.appendChild(node);
	parent.insertBefore(newElement, parent.lastElementChild);

	// removeElementListener(node.id);
}

/**
	* El elemento sera agregado como hijo del elemento anterior (al menos que se declare child como false).
	* Para agregar varios elementos repetidos que tendra diferentes textos y/0 id, solo se declara el elemento
	* una vez, y se pasa un array de strings en data y id (opcional).
  *
	* Para el uso de esta función, se pasa como parametro un array de objetos.
	*
	*	@param type 			- El tipo de elemento que se va a crear.
	*	@param attributes	- Un objeto con los atributos (id, class, name, etc).
	*				   class 		  - debe ser un array con la clase o clases.
	*				   id 				- un string con el id, en el caso de que sea para un elemento que se repetira varias
	*										    veces, se puede pasar un array con el id correspondiente.
	*	@param child 			- True o false, si el elemento a agregar es hijo o no del elemento anteror. Por default es true.
	*	@param ascend 			- Para ascender a un elemento especifico.
	*	@param data 				- El texto que tendra el elemento, puede ser un string o array de string.
*/

export const createHTML = elements => {
	// Creamos los elementos y lo guardamos en un array
	let createdElements = elements.reduce( (accumulator, element) => {
		let newElement;
		if(Array.isArray(element.data)){
			// Si el data es un array, creamos cada elemento que tendra los textos en cada elemento del array
			newElement = document.createDocumentFragment();
			let attributeIndex = 0;
			// Creamos los elementos del mismo tipo
			element.data.forEach( text => {
				let elmt = document.createElement(element.type);
				newElement.appendChild(elmt);

				// Agregamos el texto
				elmt.textContent = text;

				// Agregamos los atributos
				for(let attribute in element.attributes){
					if (attribute == "class") {
				      elmt.classList.add.apply(elmt.classList, element.attributes[attribute]);
				  } else {
				  	// Si el atributo es un array, es decir cada atributo de los elementos tiene un valor unico.
				  	if(Array.isArray(element.attributes[attribute])){
				  		elmt[attribute] = element.attributes[attribute][attributeIndex];	
				  		attributeIndex++;
				  	}else{
				  		elmt[attribute] = element.attributes[attribute];
				  	}
				    
				  }
				}
			})
		}else{
			// Si es un string, creamos solo un elemento
			newElement = document.createElement(element.type);
			// Agregamos los atributos
			for(let attribute in element.attributes){
				if (attribute == "class") {
			      newElement.classList.add.apply(newElement.classList, element.attributes[attribute]);
			    } else {
			      newElement[attribute] = element.attributes[attribute];
			    }
			}
			// Agregamos el texto
			newElement.textContent = element.data;
		}

		// El append representa si sera agregado como hijo del elemento anterior, por default es verdadero
	  	return [...accumulator, {
	  		element: newElement,
	  		child: element.hasOwnProperty('child') ? element.child : true
	  	}];
	}, []);

	for(let i = 0; i < createdElements.length; i++) {
		if(elements[i].hasOwnProperty('ascend')){
			let ascendedElement = createdElements[i-2].element.closest(elements[i].ascend);
			ascendedElement.appendChild(createdElements[i].element);
		}
		else if(i !== 0 && createdElements[i].child) {
			// Si es child en true se agrega comp hijo del elemento anterior
			createdElements[i-1].element.appendChild(createdElements[i].element);		
		}
		else if(i >= 2 && !createdElements[i].child){
			// Si child es false se agrega como hermano del elemento anterior
			createdElements[i-1].element.parentElement.appendChild(createdElements[i].element);
		}
	}

	return createdElements[0].element;
}
