@extends('layouts.main')

@section('title', 'Registrar alumno')

@section('content')

	<div class="form">
		<div class="form__title">
			<h1>Registro de alumno</h1>
		</div>
		
		<!-- Mensaje de éxito -->
      	<x-alert.success-message :message="session('status')" />

      	<!-- Errores de validación -->      	
      	<x-alert.error-message message="Error al registrar el repositorio" :errors="$errors"/>
      	
		<form id="" method="POST" action="/alumnos/registrar">
			@csrf
			<div class="form__field">
				<label for="name" class="form__label">Nombre Completo</label>
				<input type="text" class="form__input" name="name" id="name">
			</div>
			<div class="form__field">
				<label for="email" class="form__label">Email</label>
				<input type="text" class="form__input" name="email" id="email">
			</div>
			<div class="form__field">
				<label for="password" class="form__label">Contraseña</label>
				<input type="password" class="form__input" name="password" id="password">
			</div>
			<div class="form__field">
				<label for="password_confirmation" class="form__label">Confirmar contraseña</label>
				<input type="password" class="form__input" name="password_confirmation" id="password_confirmation">
			</div>
			<div class="form__field">
				<label for="carrera" class="form__label">Carrera</label>
				<select class="form__input" name="carrera" id="carrera">
					<option disabled selected>Seleccionar carrera</option>
					@foreach(get_careers() as $key=>$career)
						<option value="{{ $key }}">{{ $career }}</option>
					@endforeach
				</select>
			</div>
			<div class="form__field">
				<label for="cuatrimestre" class="form__label">Cuatrimestre</label>
				<input type="number" class="form__input" name="cuatrimestre" id="Cuatrimestre">
			</div>
			<div class="form__field password">
				<label>
				  <input type="password" placeholder=" ">
				  <!-- <span text="Password"></span> -->
				  <p>Password</p>
				</label>
			</div>
			<div class="form__field">
				<input class="form__btn-submit" type="submit" name="register" value="Registrar">
			</div>
		</form>
	</div>

@endsection