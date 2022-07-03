<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="Repositorio académico digital de la universidad de Guerrero">
  	<meta name="keywords" content="repositorio, repositorio institucional, repositorio digital, articulos, documentos, tesis, guerrero, educación, Open Access Initiative.">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		@hasSection('title')
			@yield('title') | Repositorio digital
		@else
			Repositorio digital
		@endif
	</title>
	<link rel="shortcut icon" href="{{ set_url('img/logo.png') }}">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
	{{-- Font Family --}}
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@600;700;800&display=swap" rel="stylesheet">
	{{-- Font Awesome --}}
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	{{-- Estilos CSS personalizado --}}
	<link rel="stylesheet" href="{{ set_url('css/main.css') }}">
	{{-- Librarie AOS --}}
	<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
	{{-- Librarie slick --}}
	<link rel="stylesheet" type="text/css" href="{{ set_url('library/slick/slick.css') }}"/>
	<link rel="stylesheet" type="text/css" href="{{ set_url('library/slick/slick-theme.css') }}"/>
</head>
<body>
	@include('layouts.navigation')

	{{-- Mensaje de éxito --}}
  	<x-alert.success-message :message="session('status')" />

  	{{-- Errores de validación         --}}
  	<x-alert.error-message message="Ha ocurrido un error!" :errors="$errors"/>

	<div>
		@yield('content')
	</div>

	@include('layouts.footer')

	{{-- JQUERY --}}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
	{{-- AOS --}}
	<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
	{{-- Bootstrap JS --}}
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
	{{-- Librarie slick --}}
	<script type="text/javascript" src="{{ set_url('library/slick/slick.min.js') }}"></script>

	<script>
		window.onload = function(){
			AOS.init();

			$('.carousel-slick').slick({
				dots: true,
				arrows: false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4,
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						}
					}
				]
			});

			// Tooltip - Bootstrap
			//------------------------------------------------- 

			// $("[data-toggle=tooltip]").tooltip();
			let tooltips = document.querySelectorAll('[data-toggle=tooltip]');
			tooltips.forEach(item => {
				// console.log(item.textContent)
				new bootstrap.Tooltip(item)
			})

			// Collapse icon
			//------------------------------------------------- 

			let myCollapsible = document.querySelectorAll('.btn-collapse')
			myCollapsible.forEach(item => {
				item.addEventListener('click', function () {
				this.classList.toggle('btn-collapse-open');
				})
			})

			/*
			// const careersLogo = document.querySelectorAll('#carousel .item'),
			const carousel = document.querySelector('#carousel ul'),
				carouselWidth = carousel.scrollWidth;
			let windowWidth = window.innerWidth;

			window.onresize = () => {
				windowWidth = window.innerWidth;
				animate()
			}

			function animate(){
				if(carouselWidth > windowWidth){
					carousel.style.setProperty('--translateX', -(carouselWidth - windowWidth + 40) + 'px');
					carousel.style.animation = 'translate 5s ease-in-out infinite alternate';
				}
			}
			animate()
			*/
		}
	</script>
	<script src="{{ set_url('js/navbar.js') }}"></script>
</body>
</html>