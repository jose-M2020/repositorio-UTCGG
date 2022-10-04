@extends('layouts.app')

@section('title', 'Alumnos')

@section('dashboard-content')

<div class="row">
	<h3 class="mt-4 mb-5">Editar Perfil</h1>
</div>
<form id="edit-student" method="POST" action="{{ route('usuarios.update', $usuario->id) }}">
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex justify-content-center align-items-center mx-auto mb-3" style="font-size: 3rem; background-color: #456365; border-radius: 50%; color: #fff; width: 8rem; aspect-ratio: 1/1;">
				@switch($usuario->roles[0]->name)
					@case('admin')
					<i class="fa-solid fa-user-shield"></i>
					@break
					@case('docente')
					<i class="fa-solid fa-user-tie"></i>
					@break
					@case('alumno')
					<i class="fa-solid fa-user-graduate"></i>
					@break
					@default
					<i class="fa-solid fa-user"></i> 
				@endswitch
			</div>
			<select class="form-select form__input" name="rol" aria-label="Default select example">
				@foreach ($roles as $rol)
					<option value="{{ $rol }}" {{ $usuario->roles[0]->name === $rol ? 'selected' : '' }}>
						{{ ucfirst($rol) }}
					</option>
				@endforeach
			</select>
		</div>
		<div class="col-lg-9">
			<div class="form">
				@csrf
				@method('put')
				<div class="mb-4">
					<h4 class="border-bottom border-secondary mb-3">Información Personal</h4>
					<div class="ms-0 ms-md-5">
						<div class="row align-items-center">
							<label class="col-sm-2 col-form-label text-start text-sm-end">Nombre</label>
							<div class="col-sm-10">
								<input type="text" name="nombre" class="form__input" id="nombre" value="{{ $usuario->nombre }}">
							</div>
						</div>
						<div class="row align-items-center">
							<label class="col-sm-2 col-form-label text-start text-sm-end">Apellido</label>
							<div class="col-sm-10">
								<input type="text" name="apellido" class="form__input" id="apellido" value="{{ $usuario->apellido }}">
							</div>
						</div>
						<div class="row align-items-center">
							<label class="col-sm-2 col-form-label text-start text-sm-end">Email</label>
							<div class="col-sm-10">
								<input type="text" name="email" id="email" class="form__input" value="{{ $usuario->email }}">
							</div>
						</div>
						<div class="row align-items-center">
							<label class="col-sm-2 col-form-label text-start text-sm-end">Carrera</label>
							<div class="col-sm-10">
								<select class="form__input" name="carrera" id="carrera">
									@foreach(get_careers() as $key=>$career)
										@if($usuario->carrera == $key)
											<option value="{{$key}}" selected="selected">{{ $career }}</option>
										@else
											<option value="{{$key}}">{{ $career }}</option>
										@endif
									@endforeach
								</select>
							</div>
						</div>
						<div class="row align-items-center">
							<label class="col-sm-2 col-form-label text-start text-sm-end">Cuatrimestre</label>
							<div class="col-sm-10">
								<input type="number" name="cuatrimestre" id="Cuatrimestre" class="form__input" value="{{ $usuario->cuatrimestre }}">
							</div>
						</div>
					</div>
				</div>
				{{-- <div class="mb-4">
					<h4 class="border-bottom border-secondary mb-3">Permisos Especiales</h4>
					<div class="ms-0 ms-md-5">
						
					</div>
				</div> --}}
				<div class="form__field mt-4 text-center">
					<button type="submit" class="form__btn-submit">Actualizar</button>
				</div>
			</div>
		</div>
	</div>
</form>

@endsection
