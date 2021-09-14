@extends('layouts.guest')

@section('content')
	
<div class="login-box">
		<div class="avatar">
			<img src="{{ asset('img/logo1.png') }}" alt="Avatar Image">
		</div>
		
		<h1>Iniciar sesión </h1>

		<!-- Session Status -->
     <x-auth-session-status class="mb-4" :status="session('status')" />

    <!-- Validation Errors -->
    <x-auth-validation-errors class="mb-4" :errors="$errors" />

		<form action="{{ route('login') }}" method="POST">
			@csrf
			<div>
				<label for="username">Correo</label>
				<input type="email" name="email" placeholder=" Ejemplo@gmail.com " required="">
			</div>
			<br>
			<div style="position: relative;">
				<label for="clave">Password</label>
				<input type="password" name="password" id="clave" placeholder="********" required="">
				<button class="eyeBtn" type="button" onclick="mostrarContrasena()">
					<i id="eyeIcon" class="icono11 fas fa-eye"></i>
				</button>
			</div>
			<br>
			 <div class="mt-4">
          <label for="rol">Modo de acceso</label>
          <select id="rol" class="block mt-1 w-full" name="rol">
            <option selected disabled>Seleccionar</option>
            <option value="alumno">Alumno</option>
            <option value="docente">Docente</option>
            <option value="admin">Administrador</option>
          </select>                
        </div>	
        <br>		
			<input type="submit" value="INICIAR" name="loginButton"> <span class="boton3"></span>
			
		</form>
	</div>

@endsection