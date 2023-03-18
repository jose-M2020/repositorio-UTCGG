<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="description" content="Repositorio académico digital de la universidad de Guerrero">
  	<meta name="keywords" content="repositorio, repositorio institucional, repositorio digital, articulos, documentos, tesis, guerrero, educación, Open Access Initiative.">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Iniciar sesión | Repositorio UTCGG</title>
    <link rel="shortcut icon" href="{{ set_url('img/logo.png') }}">
    {{-- Font Family --}}
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@600;700;800&display=swap" rel="stylesheet">
    {{-- Font Awesome --}}
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    {{-- CDN Bootstrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    {{-- Estilos CSS personalizado --}}
	<link rel="stylesheet" href="{{ set_url('css/main.css') }}">
    <link rel="stylesheet" href="{{ set_url('css/login.css') }}">
</head>
<body>
    <div class="position-absolute w-100">
        @include('layouts.navigation')
    </div>
    @yield('content')

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
<!-- <script src="{{ set_url('js/all.js') }}"></script> -->
<script>
    const eyeButton = document.querySelector("button.eyeBtn");
    
    const showPassword = () => {
        const inputType = document.querySelector("input#password");

        if(inputType.type == "password"){
            inputType.type = "text";
        }else{
            inputType.type = "password";
        }

        eyeButton.classList.toggle('active');
    }

    const alert  = document.querySelector('.alert');

    if(alert){
        setTimeout(() => {
            alert.style.display = 'none';
        }, 8000)
    }

    window.onload = () => {
        document
          .getElementById('loginForm')
          .addEventListener('submit', () => {
            console.log('submit');
            document
              .querySelector('button[type=submit]')
              .setAttribute('loading', 'true');
          })

    }
</script>
</body>
</html>