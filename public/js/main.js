import { inputListener, cloneElement, onTyping, onScroll } from './helpers.js';
import File from './class/File.js';
import ApiClient from "./class/api-client.js";

window.onload = (event) => {

	const form = document.getElementById('register-repository'),
		  inputs = document.querySelectorAll('input:not([type=submit]), select, textarea'),
		  addIcon = document.querySelector('.add_element');
	// const progressbar = document.getElementById('upload-bar');
	// const progressPercentage = document.querySelector('.details__percentage');

	// Detecta si el campo tiene errores
	// inputs.forEach(input => {
	// 	inputListener(input);
	// })

	

	const SearchEvent = function(container, spinner){
		this.container = (container instanceof HTMLElement) ? container : document.querySelector(container);
		this.spinner = (spinner instanceof HTMLElement) ? spinner : document.querySelector(spinner);
		this.currentPage = 1;
		this.lastPage = 1;
		this.query = null;
		this.data = null;

		this.makeRequest = async () => {
			if(this.currentPage <= this.lastPage) {
				this.spinner.classList.remove('hide');
				this.data = await client.users.get(this.query, this.currentPage);
				this.lastPage = this.data.result.last_page;
				this.addElements();
				this.spinner.classList.add('hide');
			}
		}

		this.addElements = () => {
			if(this.currentPage === 1) this.container.innerHTML = '';

			this.container.insertAdjacentHTML('beforeend', this.data.view);
		}

		this.setElement = element => {
			return (element instanceof HTMLElement) ? element : document.querySelector(element) ;
		}
	}

	// || Add new input element
	// ----------------------------------------------------------------
	
	addIcon?.addEventListener('click', e => {
		const clone = cloneElement('#register-repository .search-box__item'),
			  input = clone.querySelector('input'),
			  resultsBox = clone.querySelector('.search-box__results'),
			  spinner = clone.querySelector('.spinner');
		
		const event = new SearchEvent(resultsBox.firstElementChild, spinner);

		onTyping(input, e => {
			event.query = e.target.value;
			event.currentPage = 1;
			event.makeRequest();
		})

		onScroll(resultsBox, e => {
			event.currentPage++;
			event.makeRequest();
		})

		listenFocus(input);
	})

	
	// || Event typing & scrolling
	// ----------------------------------------------------------------

	const client = new ApiClient('/api');
	const searchEvent = new SearchEvent('.search-box__results ul', '.search-box__results .spinner');

	onTyping('input[data-rol=search]:not([readonly])', e => {
		searchEvent.query = e.target.value;
		searchEvent.currentPage = 1;
		searchEvent.makeRequest();
	});

	onScroll('.search-box__results', (e) => {
		searchEvent.currentPage++;
		searchEvent.makeRequest();
	})



	const resultsSelected = document.querySelector('.search-box__selected');
	let searchBoxResults = document.querySelector('.search-box__item :not(input[readonly])');

	document.addEventListener('click', (e) => {
		const { target } = e;

		if(!searchBoxResults?.contains(target)){
			searchBoxResults.classList.remove('active');
		}

		if(target.classList.contains('search-box__result-item')){
			
			target.closest('.search-box__item').classList.remove('active');

			if(resultsSelected){
				resultsSelected.appendChild(target);
			}else{
				const input = target.closest('.search-box__results').previousElementSibling;
				const email = target.querySelector('.user-preview__email').textContent;
				input.value = email;
			}
		}

		if (target.classList.contains('remove')) {
			target.closest('.item-content').remove();
		}
	});


	const listenFocus = element => {
		const target = (element instanceof HTMLElement) ? element : document.querySelector(element);
		
		target?.addEventListener('focus', (e) => {
			searchBoxResults.classList.remove('active');
			searchBoxResults = target.closest('.search-box__item');
			searchBoxResults.classList.add('active');
		});
	}
	listenFocus('input[data-rol=search]:not([readonly])');


	// Validamos y mostramos el nombre del archivo seleccionado de cada uno de los inputs de archivos
	
	// functions.addFileListener(inputFile);

	const errors = [];
	form?.addEventListener('submit', e => {
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


	// || Enable or disabled fields
	// ----------------------------------------------------------------

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


	if(projectType?.value != 'Estadía'){
		removableFields.forEach(element => {
			element.style.display = 'none'
		})
	}
	projectType?.addEventListener('change', hideElement)


	// || Form step by step
	// ----------------------------------------------------------------

	const stepsProgress = document.querySelectorAll('.progressbar li .circle'),
		  formSections = document.querySelectorAll('#register-repository fieldset');
		  
	let previousPosition = 0;


	form?.addEventListener('click', e => {
		const { target } = e;

		if(target.tagName == 'BUTTON'){
			const section = target.closest('.section'),
				  position = getPosition(section);

			if(target.id == 'next'){
				showForm(position+1);
				showProgress(position+1);
			}
			else if(target.id == 'previous'){
				showForm(position - 1);
				showProgress(position - 1);
			}
		}
	})

	stepsProgress.forEach(step => {
		step.addEventListener('click', function(e) {
			const position = getPosition(this.parentNode);
			
			if(position != previousPosition){
				showForm(position);
				showProgress(position);
			}
		})
	})

	const getPosition = element => [...element.parentNode.children].indexOf(element);
	
	const showProgress = (position) => {
		const currentElement = stepsProgress[position].parentNode,
			  nextElement = currentElement.nextElementSibling,
			  isSkipped = (position - previousPosition > 1) || (position - previousPosition < -1),
			  animationTime = isSkipped ? Math.abs(500 / (position - previousPosition)) : 500;
		
		document.documentElement.style.setProperty('--progress-duration-animation', (animationTime/2)+'ms');
		
		if(!isSkipped){
			currentElement.classList.add("active");
			
			if(nextElement) nextElement.classList.remove("active");
		}else{
			let pos = 1;
			if(previousPosition < position){
				for(let i = (previousPosition + 1); i <= position; i++){
					setTimeout(() => {
						stepsProgress[i].parentNode.classList.add("active");							
					}, pos++ * animationTime)
				}
			}else{
				for(let i = previousPosition; i > position; i--){
					setTimeout(() => {
						stepsProgress[i].parentNode.classList.remove("active");
					}, pos++ * animationTime)
				}
			}
		}

		previousPosition = position;
	}

	const showForm = position => {
		formSections[position].classList.add('active');
		formSections[previousPosition].classList.remove("active");
	}


	// || Handle files
	// ----------------------------------------------------------------
	
	if (window.File && window.FileList && window.FileReader){
		const images = new File(
			'.files.images .files__drop-zone',
			'.files.images .preview_images',
			{
				validExtensions: ['png', 'jpg', 'jpeg', 'webp', 'svg']
			}
		)
		
		const files = new File(
			'.files.projects .files__drop-zone',
			'.files.projects .preview_images',
			{
				validExtensions: ['pdf', 'txt', `doc`, 'docx', 'rar', 'zip']
			}
		)
	}else{
		alert('El navegador actual no es compatible con la API de archivos. Intentalo con otro navegador.');
	}
}
