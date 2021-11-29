@extends('layouts.main')

@section('title', 'Registrar docente')

@section('content')
		<div class="row justify-content-center align-items-center pt-3" style="height: 80vh;">
	    	<div class="col-xs-12 col-sm-5 col-md-3 h-100 d-flex flex-column justify-content-center h-100 bg-dark bg-gradient text-white px-3 py-4">
		      	<div class="pb-5">
					<h1>Registro de docente</h1>
				</div>
				<div class="d-none d-sm-block">
					<img style="width: 100%" src="{{ asset('img/form/teacher.svg') }}">
				</div>
	    	</div>
		    <div class="col-12 col-md-6 col-sm-7 h-100 py-4 px-5 bg-light overflow-auto">
				<form id="" method="POST" action="{{ route('docentes.store') }}">
					@csrf
					<div class="form__field">
						<label for="nombre" class="form__label">Nombre Completo</label>
						<input type="text" class="form__input" name="nombre" id="nombre">
					</div>
					<div class="form__field">
						<label for="email" class="form__label">Email</label>
						<input type="text" class="form__input" name="email" id="email">
					</div>
					<div class="form__field">
						<label for="contraseña" class="form__label">Contraseña</label>
						<input type="password" class="form__input" name="contraseña" id="password">
					</div>
					<div class="form__field">
						<label for="contraseña_confirmation" class="form__label">Confirmar contraseña</label>
						<input type="password" class="form__input" name="contraseña_confirmation" id="password_confirmation">
					</div>
					<div class="form__field">
						<input class="form__btn-submit" type="submit" name="register" value="Registrar">
					</div>
				</form>
			</div>		
	    </div>

@endsection