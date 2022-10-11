@extends('layouts.guest')

@section('title', 'Iniciar sesión')

@section('content')
	
<div class="container d-flex h-100 align-items-center justify-content-center position-relative">
	{{-- Session Status --}}
	<x-auth-session-status class="mb-4" :status="session('status')" />

	{{-- Validation Errors --}}
	<x-auth-validation-errors class="mb-4" :errors="$errors" />
	
	<div class="row justify-content-center w-100">
		{{-- <div class="logo d-flex justify-content-center mb-5">
			<img src="{{ set_url('img/logo1.png') }}" class="" alt="logo" style="max-width: 280px; width: 100%">
		</div> --}}
		<div class="login col-md-5 text-center">
			<h3 class="login__title">INICIAR SESIÓN</h3>
			<form action="{{ route('login') }}" method="POST">
				@csrf

				<div class="form-floating mb-3">
					<input type="email" name="email" class="form-control" id="email" placeholder="name@example.com" required>
					<label for="email">Correo electrónico</label>
				</div>
				<div class="form-floating position-relative">
					<input type="password" name="password" class="form-control" id="password" placeholder="Password" required>
					<label for="password">Contraseña</label>
					<button class="eyeBtn" type="button" onclick="showPassword()">
						<i id="eyeIcon" class="fa-solid fa-eye"></i>
					</button>
				</div>
				<x-button.success type="submit" class="mt-4 w-100">Acceder</x-button.success>
			</form>
		</div>
	</div>
</div>

@endsection