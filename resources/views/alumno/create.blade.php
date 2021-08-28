@extends('layouts.main')

@section('title', 'Registrar alumno')

@section('content')

	<div class="form">
		<div class="form__title">
			<h1>Registro de alumno</h1>
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
					<option value="TIC">Tecnologias de la información</option>
					<option value="G">Gastronomía</option>
					<option value="MM">Metal mecánica</option>
					<option value="ER">Energías renovables</option>     
					<option value="PA">Procesos alimentarios</option>
					<option value="LI">Logística internacional</option>
					<option value="MI">Mantenimiento industrial</option>
					<option value="GCH">Gestión del capital humano</option>
					<option value="GDT">Gestión y desarrollo turístico</option>
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