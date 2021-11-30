@extends('layouts.main')

@section('title', 'Registrar alumno')

@section('content')
	<div class="row justify-content-center align-items-center pt-3" style="height: 80vh;">
    	<div class="col-xs-12 col-sm-5 col-md-3 h-100 d-flex flex-column justify-content-center h-100 bg-dark bg-gradient text-white px-3 py-4">
	      	<div class="pb-5">
				<h1>Registro de alumno</h1>
			</div>
			<div class="d-none d-sm-block">
				<img style="width: 100%" src="{{ asset('img/form/student.svg') }}">
			</div>
    	</div>
	    <div class="col-12 col-md-6 col-sm-7 h-100 py-4 px-5 bg-light overflow-auto">
			<form id="" method="POST" action="{{ route('alumnos.store') }}">
				@csrf
				{{-- <div class="form-floating mb-3">
				  <input type="text" name="nombre" id="name" class="form-control" placeholder="Nombre">
				  <label for="name">Nombre Completo</label>
				</div> --}}

				<div class="form__field">
					<label for="nombre" class="form__label">Nombre Completo</label>
					<input type="text" class="form__input" name="nombre" id="name">
				</div>

				{{-- <div class="form-floating mb-3">
				  <input type="email" name="email" id="email" class="form-control" placeholder="ejemplo@gmail.com">
				  <label for="email">Email</label>
				</div> --}}

				<div class="form__field">
					<label for="email" class="form__label">Email</label>
					<input type="email" class="form__input" name="email" id="email">
				</div>

				{{-- <div class="form-floating mb-3">
				  <input type="password" name="contraseña" id="password" class="form-control" placeholder="Contraseña">
				  <label for="contraseña">Contraseña</label>
				</div> --}}

				<div class="form__field">
					<label for="contraseña" class="form__label">Contraseña</label>
					<input type="password" class="form__input" name="contraseña" id="password">
				</div>

				{{-- <div class="form-floating mb-3">
				  <input type="password" name="contraseña_confirmation" id="password_confirmation" class="form-control" placeholder="Confirmar contraseña">
				  <label for="contraseña_confirmation">Confirmar contraseña</label>
				</div> --}}

				<div class="form__field">
					<label for="contraseña_confirmation" class="form__label">Confirmar contraseña</label>
					<input type="password" class="form__input" name="contraseña_confirmation" id="password_confirmation">
				</div>

				{{-- <div class="form-floating mb-3">
				  <select class="form-select" name="carrera" id="carrera" aria-label="Carrera">
				    <option disabled selected>Seleccionar carrera</option>
					@foreach(get_careers() as $key=>$career)
						<option value="{{ $key }}">{{ $career }}</option>
					@endforeach
				  </select>
				  <label for="carrera">Carrera</label>
				</div> --}}

				<div class="form__field">
					<label for="carrera" class="form__label">Carrera</label>
					<select class="form__input" name="carrera" id="carrera">
						<option disabled selected>Seleccionar carrera</option>
						@foreach(get_careers() as $key=>$career)
							<option value="{{ $key }}">{{ $career }}</option>
						@endforeach
					</select>
				</div>

				{{-- <div class="form-floating mb-3">
				  <input type="number" name="cuatrimestre" id="cuatrimestre" class="form-control" placeholder="Carrera">
				  <label for="cuatrimestre">Cuatrimestre</label>
				</div> --}}

				<div class="form__field">
					<label for="cuatrimestre" class="form__label">Cuatrimestre</label>
					<input type="number" class="form__input" name="cuatrimestre" id="Cuatrimestre">
				</div>

				{{-- <div class="form__field password">
					<label>
					  <input type="password" placeholder=" ">
					  <!-- <span text="Password"></span> -->
					  <p>Password</p>
					</label>
				</div> --}}
				
				<div class="form__field">
					<input class="form__btn-submit" type="submit" name="register" value="Registrar">
				</div>
			</form>
		</div>		
    </div>
	

@endsection