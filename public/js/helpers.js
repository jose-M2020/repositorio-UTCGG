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



export const addListeners = (element, events, callback) =>{
	events.forEach( evt => {
		switch (evt) {
			case 'typing':
				onTyping(element, callback);
				break;

			case 'scrolling':
				onScroll(element, callback);
				break;
		
			default:
				element.addEventListener(evt, callback(), false);
				break;
		}
	});
  }



// !! Typing && Onscroll
// ----------------------------------------------------------------

export const onScroll = (element, callback) => {
	const container = typeof element === 'string' ? document.querySelector(element) : element;
	
	container?.addEventListener('scroll', function(e) {
		const { scrollTop, scrollHeight, offsetHeight, previousElementSibling } = this;
		
    	// console.table({
		// 	scrollTop: scrollTop, 
		// 	scrollHeight: scrollHeight, 
		// 	offsetHeight:  offsetHeight
		// })
    
		if((scrollTop + offsetHeight) + 10 >= scrollHeight){
			// console.log('%cscroll', 'color:blue');
			callback(e);
		}
	})
}

const doneTypingInterval = 1000;
let typing = false;
let typingTimer;

export const onTyping = (element, callback) => {
	const input = typeof element === 'string' ? document.querySelector(element) : element;

	input?.addEventListener('keyup', function(e) {
		if(this.value !== ''){
	     	clearTimeout(typingTimer);

		    if(typing == false){
		      typing = true;
		      console.log("Typing...");
			}
			
		    typingTimer = setTimeout( () => {
		    	typing = false;
				callback(e);
		    }, doneTypingInterval);
		}
	})
}


// ----------------------------------------------------------------

export const cloneElement = name => {
	const node = document.querySelector(name),
		  {parentElement} = node,
		  clone = node.cloneNode(true),
		  inputs = clone.querySelectorAll("input");
	
	inputs.forEach(input => {
		if( input.type=='checkbox'){
    	    input.checked = false;  
    	}else{
			input.value='';               
			clone.removeAttribute('readonly')
    	}
	})

		// clone.style.border = '2px solid #ddd';
		
		// inputListener(clone); 

		// FIXME Parametro callback en las funciones
		
		// onTyping(clone)
		// onScroll(newElement.querySelector('.search_results'));
	
	const icon = Emmet(`i.fas.fa-times-circle.remove`);
	clone.appendChild(icon);
	icon.addEventListener('click', () => clone.remove());

	parentElement.appendChild(clone);

	return clone;
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

	// console.log(createdElements);
	
	organizeElements(createdElements);

	// console.log(createdElements)

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

		if(elementData.type === 'select'){
			const option = document.createElement('option');
			option.text = elementData.data;
			option.disabled = true;
			option.selected = true;
			newElement.appendChild(option);

			for(const key in elementData.options){
				const option = document.createElement('option');
				option.value = key;
				option.text = elementData.options[key];
				newElement.appendChild(option);
			}
		}else{
			if(elementData.data){
				const textNode = document.createTextNode(elementData.data);
				newElement.appendChild(textNode);
				if(elementData.icon){
					const icon = document.createElement('I');
					addAttributes(icon, elementData.icon);
					newElement.insertBefore(icon, textNode)
				}
			}
		}
		
		
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