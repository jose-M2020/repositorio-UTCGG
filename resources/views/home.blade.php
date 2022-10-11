@extends('layouts.main')

@section('content')

<main>
  <div class="hero d-flex align-items-center  mb-5">
    <div class="container">
      <div class="row rows-cols-6 g-5 align-items-center">
        <div class="col m-0">
          <h1>Repositorio digital</h1>
          <p>Acceso virtual, libre y abierto al conocimiento académico y científica de la Universidad Tecnológica de Guerrero</p>
          <form method="GET" action="{{ route('repositorios.index') }}">
            <div class="hero__search input-group start-0">
              <input type="text" name="query" class="form-control" placeholder="Buscar..." style="height: 50px;">
              <select name="search_field" id="search_field" class="form-select form-select-sm" aria-label=".form-select-sm" style="border: none; max-width: 140px;">
                {{-- <option value="all">Todos</option> --}}
                <option value="title">Titulo</option>
                <option value="description">Descripción</option>
                <option value="author">Autor</option>
              </select>
              <span class="input-group-text" style="background-color: #fff; border: none;">
                <button type="submit" style="background: transparent; border: none;"><i class="fas fa-search"></i></button>
              </span>
            </div>
          </form>
        </div>
        <div class="col m-0 d-none d-md-block">
          <img src="{{ set_url('img/library.png') }}" class="hero__img" alt="Library">
        </div>
      </div>
    </div>
  </div>
  <!-- /.row -->
  
  <section class="carreras mb-6">
    <div class="container">
      <div class="text-center">
        <h2>Áreas de estudio</h2>
      </div>
      <div class="carreras__content row row-cols-2 row-cols-md-auto g-3 justify-content-center">
        <a href="{{ route('repositorios.index') }}?carrera[]=LI" class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/DIE.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Logìsta Internacional</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=GCH"></a> -->
          </div>
          </div>
        </a>
        <a href="{{ route('repositorios.index') }}?carrera[]=ER" class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/ER.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Energías Renovables</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=ER"><img src="{{ set_url('img/carreras/er.jpeg') }}" class="card-img-top" alt="Energías Renovables"></a> -->
          </div>
          </div>
        </a>
        <a href="{{ route('repositorios.index') }}?carrera[]=G" class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/G.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Gastronomía</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=G"><img src="{{ set_url('img/carreras/g.jpeg') }}" class="card-img-top" alt="Gastronomía"></a> -->
          </div>
          </div>
        </a>
          
        <a href="{{ route('repositorios.index') }}?carrera[]=MI" class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/MI.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Mantenimiento Industrial</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=MI"><img src="{{ set_url('img/carreras/mi.jpeg') }}" class="card-img-top" alt="Mantenimiento Industrial"></a> -->
          </div>
          </div>
        </a>
        <a href="{{ route('repositorios.index') }}?carrera[]=MM" class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/MM.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Metal Mecánica</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=MM"><img src="{{ set_url('img/carreras/mm.jpeg') }}" class="card-img-top" alt="Metal Mecánica"></a> -->
          </div>
          </div>
        </a>
        <a class="col" href="{{ route('repositorios.index') }}?carrera[]=TIC">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/TI.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Tecnologías de la Información</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=TIC"><img src="{{ set_url('img/carreras/ti.jpeg') }}" class="card-img-top" alt="Tecnologías de la Información"></a> -->
          </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <div class="data d-flex align-items-center mb-6">
    <div class="container">
      <div class="data__content row row-cols-sm-5 justify-content-center align-items-center g-3 text-center p-4">
          <div class="cols">
            <i class="fa-regular fa-newspaper d-block fs-1 mb-3"></i>
            <span>+10,200</span>
            <p>Publicaciones</p>
          </div>
          <div class="cols">
            <i class="fa-solid fa-users d-block fs-1 mb-3"></i>
            <span>+10,200</span>
            <p>Alumnos</p>
          </div>
          <div class="cols">
            <i class="fa-solid fa-graduation-cap d-block fs-1 mb-3"></i>
            <span>+8,200</span>
            <p>Tesis</p>
          </div>
      </div>
    </div>
  </div>

  <section class="destacados mb-6 container">
    <div class="text-center">
      <h2>Recursos destacados</h2>
    </div>
    <div class="destacados__content carousel-slick"> {{-- row row-cols-1 row-cols-md-4 g-4 --}}
      @foreach ($destacadosRep as $item)
        <div class="col px-2">
          <div class="card aos-init aos-animate" data-aos="fade-in">
            <div class="card-image">
              @if ($imagenes = json_decode($item?->imagenes))
                <img src="{{ Str::contains($imagenes[0], 'https') ? $imagenes[0] : Storage::disk('s3')->url($imagenes[0]) }}" 
                     class="card-img-top"
                     alt="Imagen del repositorio" 
                     loading="lazy">
              @else
                <img src="https://repositoriout.s3.us-east-2.amazonaws.com/assets/img/no-image.svg" 
                    class="card-img-top"
                    alt="Imagen del repositorio" 
                    loading="lazy">
              @endif
            </div>
            <div class="card-body">
              <a href="{{ route('repositorios.show', $item->slug) }}" class="card-title">
                {{ $item->nombre_rep }}
              </a>
              <p class="card-text">{{ $item->descripcion }}</p>
            </div>
            <div class="card-footer text-end">
              <small class="text-muted">{{ $item->created_at->format("m/d/Y") }}</small>
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </section>

  <section class="ultimos mb-6 container">
    <div class="text-center">
      <h2>Añadido recientemente</h2>
    </div>
    <div class="ultimos__content carousel-slick">
      @foreach ($lastAddedRep as $item)
        <div class="col px-2">
          <div class="card aos-init aos-animate" data-aos="fade-in">
            <div class="card-image">
              @if ($imagenes = json_decode($item?->imagenes))
                <img src="{{ Str::contains($imagenes[0], 'https') ? $imagenes[0] : Storage::disk('s3')->url($imagenes[0]) }}" 
                     class="card-img-top"
                     alt="Imagen del repositorio" 
                     loading="lazy">
              @else
                <img src="https://repositoriout.s3.us-east-2.amazonaws.com/assets/img/no-image.svg" 
                    class="card-img-top"
                    alt="Imagen del repositorio" 
                    loading="lazy">
              @endif
            </div>
            <div class="card-body">
              <a href="{{ route('repositorios.show', $item->slug) }}" class="card-title">
                {{ $item->nombre_rep }}
              </a>
              <p class="card-text">{{ $item->descripcion }}</p>
            </div>
            <div class="card-footer text-end">
              <small class="text-muted">{{ $item->created_at->format("m/d/Y") }}</small>
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </section>

</main>

@endsection
