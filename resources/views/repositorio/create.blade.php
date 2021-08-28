@extends('layouts.main')

@section('title', 'Crear repositorio')

@section('content')

	<div class="form">
		<div class="form__title">
			<h1>Registro de repositorio</h1>
		</div>

		@if ($message = Session::get('success'))
        	<div class="alert alert-success">
            	<p>{{ $message }}</p>
        	</div>
      	@endif

      	<!-- Validation Errors -->
      	@if ($errors->any())
        	<div class="alert alert-danger">
              	<ul>
                  	@foreach ($errors->all() as $error)
                      	<li>{{ $error }}</li>
                  	@endforeach
              	</ul>
          	</div>
      	@endif

		<form method="POST" id="register-repository" action="/repositorio/registrar" enctype="multipart/form-data">
			@csrf
			<div class="form__field">
				<label for="student_name" class="form__label">Nombre del alumno:</label>
				<div style="position: relative;">
					<input type="text" name="student_name[]" id="student_name" class="form__input" autocomplete="off">
					<div class="search_results"></div>
				</div>
				<span class="form__span add_element"><i class="fas fa-plus"></i> Agregar integrante</span>
			</div>
			<div class="form__field">
				<label for="repository_name" class="form__label">Nombre del repositorio</label>
				<input type="text" name="repository_name" class="form__input">
			</div>
			<div class="form__field">
				<label for="description" class="form__label">Descripción</label>
				<textarea name="description" class="form__input"></textarea>
			</div>
			<div class="form__field">
				<label for="project_type" class="form__label">Tipo de proyecto</label>
				<select id="project_type" name="project_type" class="form__input">
					<option disabled selected="" value="">Seleccionar</option>
					<option value="integradora">Integradora</option>
					<option value="estadia">Estadía</option>
					<option value="proyecto">Proyecto Especial</option>
				</select>
			</div>
			<div class="form__field">
				<label for="project_level" class="form__label" >Nivel de proyecto</label>
				<select id="project_level" name="project_level" class="form__input">
					<option disabled selected="" value="">Seleccionar</option>
					<option value="tsu">TSU</option>
					<option value="ingenieria">Ingeniería</option>
				</select>
			</div>

			<div class="form__field">
				<p>Archivos subidos:</p>
				<div class="upload-files">
					<div class="project__file">
						<input class="file__input" type="file" id="file" name="filenames[]">
						<label for="file" id="upload" class="file__label">
							<i class="fas fa-file-upload"></i>
							Cargar archivo
						</label>
					</div>
					<span class="form__span add_element"><i class="fas fa-plus"></i> Nuevo archivo</span>
				</div>
			</div>

			<input class="form__btn-submit" type="submit" name="BotonSubir" value="Subir">
			
			<!-- <div class="file__tooltip">
				<span>
					<svg style="color: #aaa; width: 35px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" class="svg-inline--fa fa-question-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
				</span>
				<p class="tooltip__text">
					Formatos permitidos: 
					<span></span>
				</p>
			</div> -->
		</form>
		<!-- <div class="msg-error">
			<p>Completa todos campos</p>
		</div> -->
	</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<script src="{{ asset('js/main.js') }}" type="module"></script>

@endsection