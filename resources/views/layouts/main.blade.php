<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		@hasSection('title')
			@yield('title') | Repositorio UTCGG
		@else
			Repositorio UTCGG
		@endif
	</title>

	<link rel="shortcut icon" href="{{ set_url('img/logo1.png') }}">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
	<!-- Icons -->
	<script type="text/javascript" src="{{ set_url('js/all.js') }}"></script>
	<!--  -->
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap" rel="stylesheet"> 
	<!-- Estilos CSS personalizado -->
	<link rel="stylesheet" href="{{ set_url('css/main.css') }}">
</head>
<body>
	<header>
		<nav class="navbar fixed navbar-expand-sm">
		  	<div class="container-fluid">
		    	<a class="navbar-logo" href="/">
		    		<img src="{{ set_url('img/logo1.png') }}">
		    		Repositorio UTCGG
		    	</a>
		  	</div>
		    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <div class="collapse navbar-collapse" id="navbarNav">
		      <ul class="navbar-nav">
		        <li class="nav-item">
		          <a class="nav-link active" aria-current="page" href="/">Inicio</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link active" aria-current="page" href="/repositorios">Repositorios</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="/about">Acerca</a>
		        </li>
		        <li class="nav-item dropdown">
		          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		            {{ auth()->user()->nombre }}
		          </a>
		          <ul class="dropdown-menu">
		            <li><a class="dropdown-item" href="/dashboard">Panel de control</a></li>
		            <li>
		            	{{-- <a class="dropdown-item" href="#">Another action</a> --}}
		            	<form id="logout" method="POST" action="{{ route('logout') }}">
		                 	@csrf
		                 	<button type="submit">Cerrar sesión <i class="fas fa-sign-out-alt"></i></button>
		             	</form>
		            <li>
		          </ul>
		        </li>
		      </ul>
		    </div>
		  </div>
		</nav>

	</header>

	@yield('content')


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<!-- <script src="{{ set_url('js/navbar.js') }}"></script> -->
</body>
</html>