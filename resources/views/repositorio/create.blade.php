@extends('layouts.app')

@section('title', 'Crear repositorio')

@section('head')

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.6.0/bootstrap-tagsinput.min.css" integrity="sha512-X6069m1NoT+wlVHgkxeWv/W7YzlrJeUhobSzk4J09CWxlplhUzJbiJVvS9mX1GGVYf5LA3N9yQW5Tgnu9P4C7Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
	.bootstrap-tagsinput.has-focus {
		/* background-color: #fff; */
		/* border-color: #5cb3fd; */
		background-color: #cbf5c6 !important;
	}

	.bootstrap-tagsinput .label-info {
		color: #fff;
		display: inline-block;
		background-color: #6b8186;
		padding: 0 .4em .15em;
		border-radius: .25rem;
	}

</style>
@endsection

@section('dashboard-content')

<div class="row justify-content-center align-items-center pt-3">
	
	<div class="col-md-7 mb-5">
		<h3 class="text-center mt-4">Crear nuevo repositorio</h3>
		<ul class="progressbar my-4 px-2">
			<li id="step1" class="active">
				<div class="circle">
					<span class="label"><i class="fa-solid fa-diagram-project"></i></span>
				</div>
			</li>
			<li id="step2">
				<div class="circle">
					<span class="label"><i class="fa-solid fa-sheet-plastic"></i></span>
				</div>
				<div class="bar"><span></span></div>
			</li>
			<li id="step3">
				<div class="circle">
					<span class="label"><i class="fas fa-user"></i></span>
				</div>
				<div class="bar"><span></span></div>
			</li>
		</ul>
		
		<form method="POST" id="register-repository" action="{{ route('repositorios.store') }}" enctype="multipart/form-data">
			@csrf
			<div>
				<fieldset id="repository" class="section active px-2">
					<h5 class="section__title">Información del repositorio</h5>
					<div class="form__field">
						<label for="nombre_repositorio" class="form__label">Nombre del repositorio</label>
						<input type="text" name="nombre_repositorio" class="form__input" value="{{old('nombre_repositorio')}}">
					</div>
					<div class="form__field">
						<label for="description" class="form__label">Descripción</label>
						<textarea name="descripcion" class="form__input" rows="4">{{old('descripcion')}}</textarea>
					</div>
					<div class="form__field">
						<label for="" class="form__label">Palabras clave de búsqueda</label>
						<input type="text" name="palabras_clave" class="form__input"  value="{{old('palabras_clave')}}" data-role="tagsinput">
					</div>
					<div class="mt-3">
						<div class="form-check mb-1">
							<input class="form-check-input" 
								   type="radio" 
								   name="visibilidad" 
								   value="privado" 
								   id="privado" 
								   checked>
							<label class="form-check-label" for="privado">
								<i class="fa-solid fa-lock"></i> Privado
								<small class="d-block">El acceso al repositorio será restringido</small>
							</label>
						</div>
						<div class="form-check">
							<input class="form-check-input" 
								   type="radio" 
								   name="visibilidad" 
								   value="publico" 
								   id="publico">
							<label class="form-check-label" for="publico">
								<i class="fa-solid fa-globe"></i> Público
								<small class="d-block">El repositorio será visible para todo el público</small>
							</label>
						</div>
					</div>
					<div class="text-end mt-5">
						<x-button id="next">Siguiente <i class="fas fa-chevron-right"></i></x-button>
					</div>
				</fieldset>
				<fieldset id="project" class="section px-2">
					<h5 class="section__title">Información del proyecto</h5>
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
					<div class="form__field">
						<label for="carrera" class="form__label">Carrera</label>
						<select class="form__input" name="carrera" id="carrera">
							@role('alumno')
								<option value="{{ auth()->user()->carrera }}" selected="">{{ get_careers()[auth()->user()->carrera] }}</option>
							@else
								<option disabled selected>Seleccionar carrera</option>
								@foreach(get_careers() as $key=>$career)
									@if(old('carrera') == $key)
										<option value="{{ $key }}" selected="">{{ $career }}</option>
										@continue
									@endif
									<option value="{{ $key }}">{{ $career }}</option>
								@endforeach
							@endrole
						</select>
					</div>
					<div class="form__field">
						<label for="" class="form__label">Generación</label>
						<input type="text" name="generacion" class="form__input" value="{{old('generacion')}}">
					</div>
					<div class="text-end d-block mt-5">
						<x-button id="previous"><i class="fas fa-chevron-left"></i> Anterior</x-button>
						<x-button id="next">Siguiente <i class="fas fa-chevron-right"></i></x-button>
					</div>
				</fieldset>
				<fieldset id="personal_data" class="section px-2">
					<h5 class="section__title">Usuarios / organizaciones</h5>
					<div class="form__field">
						<div class="d-flex justify-content-between">
							<label for="alumno" class="form__label">Miembro(s):</label>
							<span class="form__span add_element ms-auto"><i class="fas fa-plus"></i> Agregar</span>
						</div>
						<div class="search-box">
							<div class="search-box__item position-relative">
								@role('alumno')
									<input type="text" name="usuario[]" id="student_name" class="form__input" autocomplete="off" value="{{ auth()->user()->email }}" data-rol="search" readonly>	
								@else
									<input type="text" name="usuario[]" id="student_name" class="form__input" autocomplete="off" value="{{old('usuario.0')}}" data-rol="search">
								@endrole
								<div class="search-box__results">
									<ul></ul>
									<div class="spinner hide"></div>
								</div>
							</div>
		
		
							@if(old('usuario'))
								@foreach(old('usuario') as $old_value)
									   @if($loop->first)
										   @continue
									@endif
									<div class="search-box__item" style="position: relative;">
										<input type="text" name="usuario[]" id="student_name" class="form__input" autocomplete="off" value="{{$old_value}}" data-rol="search">
										<div class="search-box__results">
											<ul></ul>
											<div class="spinner hide"></div>
										</div>
										<i class="fas fa-times-circle remove"></i>
									</div>                           
								@endforeach
							@endif
						</div>	
					</div>
					{{-- <div class="form__field removable">
						<label for="asesor_academico" class="form__label">Nombre del asesor académico</label>
						<input type="text" name="asesor_academico" class="form__input" value="{{old('asesor_academico')}}">
					</div>  --}}
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
						<x-button name="BotonSubir" type="submit">Crear <i class="far fa-paper-plane"></i></x-button>
					</div>
				</fieldset>
			</div>
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

@endsection

@section('footer')
	<script type="text/javascript" src="{{ set_url('js/class/Emmet.js') }}"></script>
	<script src="{{ set_url('js/main.js') }}" type="module"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.6.0/bootstrap-tagsinput.min.js" integrity="sha512-SXJkO2QQrKk2amHckjns/RYjUIBCI34edl9yh0dzgw3scKu0q4Bo/dUr+sGHMUha0j9Q1Y7fJXJMaBi4xtyfDw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script>
		$('input[data-role="tagsinput"]').tagsinput({
			trimValue: true,
			confirmKeys: [44, 32],
			focusClass: 'my-focus-class',
			maxTags: 8
		});

		$('.bootstrap-tagsinput').addClass('form__input-container');
	</script>

@endsection