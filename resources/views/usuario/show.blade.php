@extends('layouts.app')

@section('title', 'Alumnos')

@section('dashboard-content')

<div class="row">
	<h3 class="mt-4 mb-5">Perfil</h3>
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
			<div class="text-center">
				<b>{{ ucfirst($usuario->roles[0]->name) }}</b>
			</div>
		</div>
		<div class="col-lg-9">
			<div class="form">
				@csrf
				@method('put')
				<div class="mb-4">
					<h4 class="border-bottom border-secondary mb-3">Datos Personales</h4>
					<div class="ms-0 ms-md-5">
						<div class="row align-items-center">
							<b class="col-sm-2 col-form-label">Nombre: </b>
							<div class="col-sm-10">
								<span>{{ Str::title($usuario->nombre) }}</span>
							</div>
						</div>
						<div class="row align-items-center">
							<b class="col-sm-2 col-form-label">Apellido: </b>
							<div class="col-sm-10">
								<span>{{ Str::title($usuario->apellido) }}</span>
							</div>
						</div>
						<div class="row align-items-center">
							<b class="col-sm-2 col-form-label">Email: </b>
							<div class="col-sm-10">
								<span>{{ $usuario->email }}</span>
							</div>
						</div>
						<div class="row align-items-center">
							<b class="col-sm-2 col-form-label">Carrera: </b>
							<div class="col-sm-10">
								<span>{{ $usuario->carrera }}</span>
							</div>
						</div>
						<div class="row align-items-center">
							<b class="col-sm-2 col-form-label">Cuatrimestre: </b>
							<div class="col-sm-10">
								<span>{{ $usuario->cuatrimestre }}</span>
							</div>
						</div>
					</div>
				</div>
				@unlessrole('admin')
					<div class="mb-4">
						<h4 class="border-bottom border-secondary mb-3">Repositorios</h4>
						<div class="accordion" id="accordionPanelsStayOpen">
							@if ($countPublico = $repPublico->count())
								<div class="accordion-item ms-0 ms-md-5 mb-4 bg-transparent">
								  <h3 class="accordion-header" id="panelsStayOpen-headingOne">
									<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-repPublico" aria-expanded="true" aria-controls="panelsStayOpen-repPublico">
										<i class="fa-solid fa-globe me-3"></i>{{ $countPublico }} {{ Str::of('Público')->plural($countPublico); }}
									</button>
								  </h2>
								  <div id="panelsStayOpen-repPublico" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
									<div class="accordion-body">
									  @foreach ($repPublico as $item)
									  	<div class="mb-1">
										  <a href="{{ route('repositorios.show', $item->slug) }}">{{ $item->nombre_rep }}</a>
										</div>
									  @endforeach
									</div>
								  </div>
								</div>
							@endif
							@if ($countPrivado = $repPrivado->count())
								<div class="accordion-item ms-0 ms-md-5 bg-transparent">
								  <h3 class="accordion-header" id="panelsStayOpen-headingTwo">
								  	<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-repPrivado" aria-expanded="true" aria-controls="panelsStayOpen-repPrivado">
										<i class="fa-solid fa-lock me-3"></i>{{ $countPrivado }} {{ Str::of('Privado')->plural($countPrivado); }}
								  	</button>
								  </h3>
								  <div id="panelsStayOpen-repPrivado" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
								  	<div class="accordion-body">
									  @foreach ($repPrivado as $item)
										<div class="mb-1">
											<a href="{{ route('repositorios.show', $item->slug) }}">{{ $item->nombre_rep }}</a>
										</div>
									  @endforeach
								  	</div>
								  </div>
								</div>
							@endif
						  </div>
					</div>
				@endunlessrole

				{{-- <div class="form__field mt-4 text-center">
					<x-button.success type="submit">Actualizar</x-button.success>
				</div> --}}
			</div>
		</div>
	</div>
</form>

@endsection
