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
		<div class="col-md-6 py-4 px-5">
			<img class="" style="object-fit: contain; width: 100%" src="{{ asset('img/about.svg') }}">
		</div>
		<div class="col-md-6 py-4 px-5" style="text-align: justify;">
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
		<p>Esta plataforma tiene como objetivo almacenar, preservar y difundir la producción científica y académica 
			de la comunidad politécnica en formato digital. El Repositorio Digital Institucional, es un sistema abierto 
			el cual forma parte del movimiento internacional conocido como Open Access Initiative. Dicha iniciativa promueve 
			el acceso libre a la literatura científica, incrementando el impacto de los trabajos desarrollados por los 
			investigadores contribuyendo a mejorar el sistema de comunicación científica y el acceso abierto al conocimiento. 
			Así como maximizar la visibilidad, el uso y el impacto de la producción científica y académica de la comunidad 
			Politécnica</p>
	</div>

@endsection