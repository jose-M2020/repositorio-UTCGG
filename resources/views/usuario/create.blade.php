@extends('layouts.app')

@section('title', 'Registrar alumno')

@section('dashboard-content')
	{{ Breadcrumbs::render('usuarios.create') }}
	<div class="row justify-content-center">
    	<div class="col-md-3 d-flex flex-column justify-content-center align-items-center text-white px-3 py-4" style="background-color: #389c76;">
	      	<div>
				<h3 class="mb-0 mb-md-5 text-center">Registrar usuario</h3>
			</div>
			<div class="d-none d-md-block">
				<img style="width: 100%" src="{{ asset('img/form/student.svg') }}">
			</div>
    	</div>
	    <div class="col-12 col-md-8 h-100 p-4 overflow-auto d-flex align-items-center" style="box-shadow: 4px 3px 5px #c8c6c6;">
			<form class="w-100" id="" method="POST" action="{{ route('usuarios.store') }}">
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
						<x-form.input text="Contraseña" type="password" name="password" id="password" />
					</div>
					<div class="col-md">
						<x-form.input text="Confirmar contraseña" type="password" name="password_confirmation" id="password_confirmation" />
					</div>
				</div>
				<div class="row g-2">
					<div class="col-md">
						<x-form.select text="Carrera" name="carrera" id="carrera" :options="get_careers()"/>
					</div>
					{{-- <div class="col-md">
						<x-form.input text="Cuatrimestre" type="number" name="cuatrimestre" id="Cuatrimestre" />
					</div> --}}
				</div>
				<div class="row">
					<div class="col-md">
						<x-form.select text="Rol" name="rol" id="rol" :options="$roles"/>
					</div>
				</div>

				{{-- <div class="form__field password">
					<label>
					  <input type="password" placeholder=" ">
					  <!-- <span text="Password"></span> -->
					  <p>Password</p>
					</label>
				</div> --}}
				
				<div class="form__field mt-3 text-center">
					<x-button.success type="submit">Registrar</x-button.success>
				</div>
			</form>
		</div>		
    </div>
@endsection