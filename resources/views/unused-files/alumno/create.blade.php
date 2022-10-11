@extends('layouts.app')

@section('title', 'Registrar alumno')

@section('dashboard-content')
	<div class="row justify-content-center align-items-center pt-3" style="height: 80vh;">
    	<div class="col-xs-12 col-sm-5 col-md-3 h-100 d-flex flex-column justify-content-center h-100 bg-dark bg-gradient text-white px-3 py-4">
	      	<div class="pb-5">
				<h1>Registro de alumno</h1>
			</div>
			<div class="d-none d-sm-block">
				<img style="width: 100%" src="{{ asset('img/form/student.svg') }}">
			</div>
    	</div>
	    <div class="col-12 col-md-6 col-sm-7 h-100 py-4 px-5 bg-light overflow-auto d-flex align-items-center">
			<form id="" method="POST" action="{{ route('alumnos.store') }}">
				@csrf
				<div class="row g-2">
					<div class="col-md">
						<x-form.input text="Nombre" name="nombre" id="name" />
					</div>
					<div class="col-md">
						<x-form.input text="Apellidos" name="apellido" id="apellido" />
					</div>
				</div>
				<x-form.input text="Email" type="email" name="email" id="email" />
				<div class="row g-2">
					<div class="col-md">
						<x-form.input text="Contraseña" type="password" name="contraseña" id="password" />
					</div>
					<div class="col-md">
						<x-form.input text="Confirmar contraseña" type="password" name="contraseña_confirmation" id="password_confirmation" />
					</div>
				</div>
				<div class="row g-2">
					<div class="col-md">
						<x-form.select text="Carrera" name="carrera" id="carrera" :options="get_careers()"/>
					</div>
					<div class="col-md">
						<x-form.input text="Cuatrimestre" type="number" name="cuatrimestre" id="Cuatrimestre" />
					</div>
				</div>

				{{-- <div class="form__field password">
					<label>
					  <input type="password" placeholder=" ">
					  <!-- <span text="Password"></span> -->
					  <p>Password</p>
					</label>
				</div> --}}
				
				<div class="form__field mt-3">
					<input class="form__btn-submit" type="submit" name="register" value="Registrar">
				</div>
			</form>
		</div>		
    </div>
	

@endsection