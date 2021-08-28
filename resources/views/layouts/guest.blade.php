<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    
</head>
<body>
    @yield('content')
<script src="{{ asset('js/all.js') }}"></script>
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
</script>
</body>
</html>