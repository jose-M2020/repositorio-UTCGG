<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	@include('layouts.head')
	@yield('head')
</head>
<body>
	@include('layouts.navigation')
	{{-- Mensaje de éxito --}}
  	<x-alert.success-message :message="session('status')" />
  	{{-- Errores de validación         --}}
  	<x-alert.error-message message="Ha ocurrido un error!" :errors="$errors"/>

	@yield('content')

	@include('layouts.footer')
	@include('layouts.footer-scripts')
	@yield('footer')
</body>
</html>