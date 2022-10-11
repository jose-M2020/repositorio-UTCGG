<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	@include('layouts.head')
	@yield('head')
</head>
<body>

	{{-- Mensaje de éxito --}}
  	<x-alert.success-message :message="session('status')" />
	
	{{-- Mensaje de advertencia --}}
  	<x-alert.warning-message :message="session('warning')" />

  	{{-- Errores de validación         --}}
  	<x-alert.error-message message="Ha ocurrido un error!" :errors="$errors"/>

	@include('layouts.navigation')
	<div class="container-fluid dashboard">
    	<div class="row flex-nowrap">
            <aside class="col-auto dashboard__sidebar d-none d-md-block">
                @include('layouts.sidebar')
            </aside>
			<main class="col dashboard__main pe-0">
				<div class="container">
					@yield('dashboard-content')
				</div>
            </main>
		</div>
	</div>
	
	@include('layouts.footer-scripts')
	@yield('footer')
</body>
</html>