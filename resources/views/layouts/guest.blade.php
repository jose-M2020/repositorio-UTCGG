<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Iniciar sesión</title>
    <link rel="shortcut icon" href="{{ set_url('img/logo1.png') }}">
    <link rel="stylesheet" href="{{ set_url('css/login.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>
<body>
    @yield('content')

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
<script src="{{ set_url('js/all.js') }}"></script>
<script>
    function mostrarContrasena(){
        const tipo = document.getElementById("clave");
        const eyeIcon = document.getElementById("eyeIcon");
        if(tipo.type == "password"){
            tipo.type = "text";
            eyeIcon.style.color = '#218C2B';
        }else{
            eyeIcon.style.color = '#605D5D';
            tipo.type = "password";
        }
    }

    const alert  = document.querySelector('.alert');

    if(alert){
        setTimeout(() => {
            alert.style.display = 'none';
        }, 8000)
    }
</script>
</body>
</html>