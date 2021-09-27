<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>@yield('title')</title>

	<link rel="shortcut icon" href="{{ asset('img/logo1.png') }}">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
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
	        <a href="/dashboard">Inicio</a>
	        <a href="/about">Acerca de</a>
	    	<div class="dropdown" style="margin-top: 12px;" 
	    		onMouseOver="document.querySelector('.dropdown-menu').style.display = 'block'"
			   onMouseOut="document.querySelector('.dropdown-menu').style.display = 'none'">
			  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
			   style="
			    background: transparent;
			    border: none;" >
			    {{ auth()->user()->nombre }}
			  </button>
			  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="background: rgba(71, 139, 117, .8);">
				@auth('alumno')
			    <li>
			    	<a  href="/" style="font-size: 16px;">
			    		<i class="far fa-file-archive"></i> Mis archivos
			    	</a>
				</li>
				<li>
			    	<a  href="/" style="font-size: 16px;">
			    		<i class="far fa-file-archive"></i> Mi Cuenta
			    	</a>
				</li>
			    @endauth
				<li>
					<a href="" style="font-size: 16px;">Perfil</a>
				</li>
			    <li>
			    	<form method="POST" action="{{ route('logout') }}">
		                 @csrf
		                 <button type="submit" style="background: transparent; border: none; color: #fff; cursor: pointer; font-size: 16px;">Salir <i class="fas fa-sign-out-alt"></i></button>
		             </form>
			    </li>
			  </ul>
			</div>	    
	    </nav>
	</header>

	@yield('content')


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<!-- <script src="{{ asset('js/navbar.js') }}"></script> -->
</body>
</html>