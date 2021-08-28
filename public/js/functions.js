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
const removeElementListener = id => {
	setTimeout(function(){
		document.getElementById(id).addEventListener('click', function(e) {
			// ascendemos al padre que contiene el div (conformado por iconos, input) y eliminanos el div
			this.parentElement.parentElement.removeChild(this.parentElement);
		})
	},50)
}

const doneTypingInterval = 1000;
let typing = false;
let typingTimer;    //timer identifier 
let query = '';

export const searchEvent = input => {
	input.addEventListener('keyup', function(e) {
		let resultsBox = this.nextElementSibling;
		query = this.value;
		if(query != ''){
	     	clearTimeout(typingTimer);
		    if(typing == false){
		      typing = true;
		      console.log("En espera de búsqueda...");
			}
		    typingTimer = setTimeout(e => {
		    	typing = false;
      			if(query !== ''){load_data(resultsBox, 1, query);}
		    }, doneTypingInterval);
		}
	})
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
  console.log(element);
  //someElement.appendChild(element);
}

function load_data(container, page, query = ''){
	$.ajax({
	    url:"/alumnos/search?page="+page+"&query="+query,
	    success:function(data){
	    	container.innerHTML = '';

	    	let ul = '';
	    	if(!data.alumnos.total){
	    		ul = createHTML([ {type: 'ul', data: 'No hay resultados.'} ])
	    	}else{
	    		// Obtenemos solo los nombres y los almacenamos en una array
	    		let names = data.alumnos.data.reduce((acc, alumno) => {
	    			return [...acc, alumno.nombre]
	    		}, []);
	    		ul = createHTML([ 
	    			{type: 'ul'}, 
	    			{type: 'li', data: names} 
	    		]);
	    	}
	    	container.appendChild(ul);
	    }
	});
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
		inputListener(input);
		searchEvent(input)
	}else {
		// Para inputs de tipo file usamos el label para hacer referencia al input
		i++;
		let label = newElement.querySelector('label');
		input.setAttribute('id','file' + i);
		label.setAttribute('for','file' + i);
		label.innerHTML = `
			<span >
				<svg style="width: 15px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" class="svg-inline--fa fa-file-upload fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg>
			</span>Cargar Archivo`;
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
	node.classList.add('fas', 'fa-minus-circle', 'remove_element');
	node.id = 'icon'+i;

	// Agregamos el icono de eliminar al nuevo elemento creado
	newElement.appendChild(node);
	parent.insertBefore(newElement, parent.lastElementChild);

	removeElementListener(node.id);
}

/*
	El elemento sera agregado como hijo del elemento anterior (al menos que se declare child como false).
	Para agregar varios elementos repetidos que tendra diferentes textos y/0 id, solo se declara el elemento
	una vez, y se pasa un array de strings en data y id (opcional).

	Para el uso de esta función, se pasa como parametro un array de objetos, donde cada elemento consta de:
		type 				-> El tipo de elemento que se va a crear.
		attributes	-> Un objeto con los atributos (id, class, etc).
					class 		-> debe ser un array con la clase o clases.
					id 				-> un string con el id, en el caso de que sea para un elemento que se repetira varias
											 veces, se puede pasar un array con el id correspondiente.
		child 			-> True o false, si el elemento a agregar es hijo o no del elemento anteror. Por default es true.
		ascend 			-> Para ascender a un elemento especifico.
		data 				-> El texto que tendra el elemento, puede ser un string o array de string.
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