@extends('layouts.main')

@section('title', 'Acerca')

@section('content')
	
	<div class="row p-4">
		<div class="col-12 text-center my-5 font-bold">
			<h1 class="fs-2">
				Universidad Tecnológica de la Costa Grande de Guerrero<br>
				Repositorio Digital
			</h1>
		</div>
		<div class="col-6 py-4 px-5">
			<img class="" style="object-fit: contain; width: 100%" src="{{ asset('img/about.svg') }}">
		</div>
		<div class="col-6 py-4 px-5">
			<p>
			Los Repositorios academicos de la UTCGG son una plataforma digital que proporciona acceso abierto 
			en texto completo a diversos recursos de información académica, como son los proyectos de estadía, 
			de Integradora y los proyecto Especial. <br>
			<br>La repositorios son un documento que se va construyendo durante el desarrollo de período de dichos
			proyectos y los avances en la misma son considerados para efecto de evaluación del asesor académico 
			en los cortes parciales; la calificación final de Estadía se registrará posterior a que el asesor académico 
			haya liberado la memoria de Estadía.
			</p>	
		</div>
	</div>

@endsection