@extends('layouts.app')

@section('title', 'Crear repositorio')

@section('dashboard-content')

<div class="row justify-content-center align-items-center pt-3" style="height: 80vh;">
	<div class="col-xs-12 col-sm-5 col-md-3 h-100 d-flex flex-column justify-content-center h-100 bg-dark bg-gradient text-white px-3 py-4">
	   	<div class="pb-5">
			<h1>Registro de repositorio</h1>
		</div>
		<div class="d-none d-sm-block">
			<img class="w-100" src="{{ asset('img/form/repository.svg') }}">
		</div>
	</div>
	<div class="col-12 col-md-6 col-sm-7 h-100 py-4 px-5 bg-light overflow-auto">
		<div id="progress">
			<div class="progressbar">
				<div class="bar"></div>
				<div class="bar filled"></div>
			</div>
			<ul class="steps">
				<li class="active" id="step2">
					<div title="Sección 2">
						<div class="step"><span><i class="fas fa-book"></i></span></div>
						<div class="title">Proyecto</div>
					</div>
				</li>
				<li id="step1">
					<div title="Sección 1">
						<div class="step"><span><i class="fas fa-user"></i></span></div>
						<div class="title">Datos personales</div>
					</div>
				</li>
				<li id="step3">
					<div title="Sección 3">
						<div class="step"><span><i class="fas fa-upload"></i></span></div>
						<div class="title">Archivos</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="">
			{{--@auth('alumno')--}}
			<form method="POST" id="register-repository" action="{{ route('repositorios.store') }}" enctype="multipart/form-data">
				@csrf
				<fieldset id="project" class="section active">
					<div class="form__field">
						<label for="nombre_repositorio" class="form__label">Nombre del repositorio</label>
						<input type="text" name="nombre_repositorio" class="form__input" value="{{old('nombre_repositorio')}}">
					</div>
					<div class="form__field">
						<label for="description" class="form__label">Descripción</label>
						<textarea name="descripcion" class="form__input">{{old('descripcion')}}</textarea>
					</div>
					<div class="form__field">
						<label for="project_type" class="form__label">Tipo de proyecto</label>
						<select id="project_type" name="tipo_proyecto" class="form__input">
							<option disabled selected="" value="">Seleccionar</option>
							@foreach(get_type_projects() as $type)
								@if(old('tipo_proyecto') == $type )
									<option value="{{$type}}" selected>{{$type}}</option>
									@continue
								@endif
								<option value="{{$type}}">{{$type}}</option>
							@endforeach
						</select>
					</div>
					<div class="form__field">
						<label for="project_level" class="form__label" >Nivel de proyecto</label>
						<select id="project_level" name="nivel_proyecto" class="form__input">
							<option disabled selected="" value="">Seleccionar</option>
							@foreach(get_academic_degrees() as $key => $degree)
								@if(old('nivel_proyecto') == $key)
									<option value="{{$key}}" selected>{{$key}}</option>
									@continue
								@endif
								<option value="{{$key}}">{{$key}}</option>
							@endforeach
						</select>
					</div>

					<!-- Campos nuevos añadidos -->
					<div class="form__field">
						<label for="" class="form__label">Palabras clave de búsqueda</label>
						<input type="text" name="palabras_clave" class="form__input"  value="{{old('palabras_clave')}}">
					</div>
					<div class="form__field">
						<label for="" class="form__label">Generación</label>
						<input type="text" name="generacion" class="form__input" value="{{old('generacion')}}">
					</div>
					<div class="text-end mt-5">
						<x-button id="next">Siguiente <i class="fas fa-chevron-right"></i></x-button>
					</div>
				</fieldset>
				<fieldset id="personal_data" class="section">
					<div class="form__field">
						<label for="alumno" class="form__label">Nombre del alumno:</label>
						<div style="position: relative;">
							@auth('alumno')
								<input type="text" name="alumno[]" id="student_name" class="form__input" autocomplete="off" value="{{ auth('alumno')->user()->nombre }}" readonly>	
							@endauth
							@guest('alumno')
							    <input type="text" name="alumno[]" id="student_name" class="form__input" autocomplete="off" value="{{old('alumno.0')}}">
							@endguest
							<div class="search_results"></div>
						</div>
						@if(old('alumno'))
			                @foreach(old('alumno') as $old_value)
			                   	@if($loop->first)
			                   		@continue
			                    @endif
				                <div style="position: relative;">
									<input type="text" name="alumno[]" id="student_name" class="form__input" autocomplete="off" value="{{$old_value}}">
									<div class="search_results"></div>
									<i class="fas fa-times-circle remove"></i>
								</div>                           
			                @endforeach
			            @endif
						<span class="form__span add_element"><i class="fas fa-plus"></i> Agregar integrante</span>
					</div>
					
					<!-- Campos nuevos añadidos -->
					<div class="form__field">
						<label for="carrera" class="form__label">Carrera</label>
						<select class="form__input" name="carrera" id="carrera">
							@auth('alumno')
								<option value="{{ auth('alumno')->user()->carrera }}" selected="">{{ get_careers()[auth('alumno')->user()->carrera] }}</option>
							@endauth
							@guest('alumno')
								<option disabled selected>Seleccionar carrera</option>
								@foreach(get_careers() as $key=>$career)
									@if(old('carrera') == $key)
										<option value="{{ $key }}" selected="">{{ $career }}</option>
										@continue
									@endif
									<option value="{{ $key }}">{{ $career }}</option>
								@endforeach
							@endguest
						</select>
					</div>
					<div class="form__field removable">
						<label for="asesor_academico" class="form__label">Nombre del asesor académico</label>
						<input type="text" name="asesor_academico" class="form__input" value="{{old('asesor_academico')}}">
					</div> 
					<div class="form__field removable">
						<label for="asesor_externo" class="form__label">Nombre del asesor empresarial/externo</label>
						<input type="text" name="asesor_externo" class="form__input" value="{{old('asesor_externo')}}">
					</div>
					<div class="form__field">
						<label for="empresa" class="form__label">Nombre de la Empresa/Negocio/Establecimiento</label>
						<input type="text" name="empresa" class="form__input" value="{{old('empresa')}}">
					</div>
					<div class="text-end d-block mt-5">
					 	<x-button id="previous"><i class="fas fa-chevron-left"></i> Anterior</x-button>
						<x-button id="next">Siguiente <i class="fas fa-chevron-right"></i></x-button>
					</div>
				</fieldset>
				<fieldset id="files" class="section">
					<div class="form__field">
						<div class="preview_images"></div>
						<div class="upload-files">
							<div class="project__file">
								<input class="file__input" type="file" id="imagenes" name="imagenes[]" multiple="">
								<label for="imagenes" class="file__label">
									<i class="fas fa-file-upload"></i>
									Seleccionar imagenes
								</label>
							</div>
						</div>
					</div>
					<div class="form__field">
						<p>Archivos subidos:</p>
						<div class="upload-files files">
							<div class="project__file">
								<input class="file__input" type="file" id="archivo" name="archivos[]">
								<label for="archivo" id="upload" class="file__label">
									<i class="fas fa-file-upload"></i>
									Cargar archivo
								</label>
							</div>
							<span class="form__span add_element"><i class="fas fa-plus"></i> Nuevo archivo</span>
						</div>
					</div>
					<div class="text-end d-block mt-5">
					 	<x-button id="previous"><i class="fas fa-chevron-left"></i> Anterior</x-button>
						<x-button name="BotonSubir" type="submit">Registrar <i class="far fa-paper-plane"></i></x-button>
					</div>
				</fieldset>
			</form>
			      	{{--@endauth--}}
			      	
			      	{{--
			      	@guest('alumno')
						<form method="POST" id="register-repository" action="/repositorios/registrar" enctype="multipart/form-data">
							@csrf
							<div class="form__field">
								<label for="student_name" class="form__label">Nombre del alumno:</label>
								<div style="position: relative;">
									@auth('alumno')
									    <input type="text" name="nombre_alumno[]" id="student_name" class="form__input" autocomplete="off" value="{{ auth('alumno')->user()->nombre }}">	
									@endauth
									@guest('alumno')
									    <input type="text" name="nombre_alumno[]" id="student_name" class="form__input" autocomplete="off">
									@endguest
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
									<svg style="color: #aaa; width: 35px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" class="svg-inline--fa fa-question-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentElementColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
								</span>
								<p class="tooltip__text">
									Formatos permitidos: 
									<span></span>
								</p>
							</div> -->
						</form>
			      	@endguest
			      	--}}
					<!-- <div class="msg-error">
						<p>Completa todos campos</p>
					</div> -->
		</div>		
	</div>		
</div>
	


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<script src="{{ set_url('js/main.js') }}" type="module"></script>

@endsection