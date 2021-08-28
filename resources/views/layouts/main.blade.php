<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>@yield('title')</title>

	<link rel="shortcut icon" href="{{ asset('img/logo1.png') }}">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
	<!-- Icons -->
	<script type="text/javascript" src="{{ asset('js/all.js') }}"></script>
	<!--  -->
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap" rel="stylesheet"> 
	<!-- Estilos CSS personalizado -->
	<link rel="stylesheet" href="{{ asset('css/main.css') }}">
</head>
<body>
	<header>
	    <a href="/alumnos"><div class="logo_real"><img src="{{ asset('img/logo1.png') }}"></div></a>
	    <input type="checkbox" name=""  id="btn-menu">
	    <label for="btn-menu" class="icon" ><img src="{{ asset('img/menu.png') }}"> </label>
	    <nav>
	        <a href="/alumnos">Inicio</a>
	        <a href="/repositorio/registrar">Registrar repositorio</a>
	        <a href="/alumnos/registrar">Registrar alumnos</a>
	        <a href="logout">
	            <i class="fas fa-sign-out-alt"></i>
	        </a>
	        <!-- <a href="logout">Cerrar sesión</a> -->
	    </nav>
	</header>

	@yield('content')

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<script src="{{ asset('js/navbar.js') }}"></script>
</body>
</html>