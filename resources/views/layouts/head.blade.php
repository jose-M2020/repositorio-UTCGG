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
