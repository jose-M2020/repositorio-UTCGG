@extends('layouts.main')

@section('content')

<main>
  <div class="hero d-flex align-items-center  mb-5">
    <div class="container">
      <div class="row rows-cols-6 g-5 align-items-center">
        <div class="col m-0">
          <h1>Repositorio digital</h1>
          <p>Acceso virtual, libre y abierto al conocimiento académico y científica, producido por los estudiantes de la Universidad Tecnológica de Guerrero</p>
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

    <!-- <div id="carousel" class="" >
      <ul class="">
        <li class="item active">
          <img src="{{ set_url('img/carreras/L1.png') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L2.png') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L3.png') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L4.png') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L5.png') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L6.png') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L7.jpg') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L8.jpg') }}" class="d-block w-100" alt="...">
        </li>
        <li class="item active">
          <img src="{{ set_url('img/carreras/L9.png') }}" class="d-block w-100" alt="...">
        </li>
      </ul>
      {{-- <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button> --}}
    </div> -->


    
  </div>
  <!-- /.row -->

  
  <section class="carreras mb-6">
    <div class="container">
      <div class="text-center">
        <h2>Áreas de estudio</h2>
      </div>
      <div class="carreras__content row row-cols-2 row-cols-md-auto g-3 justify-content-center">
        <div class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/DIE.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Desarrollo e Inovación Empresarial</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=GCH"></a> -->
          </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/ER.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Energías Renovables</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=ER"><img src="{{ set_url('img/carreras/er.jpeg') }}" class="card-img-top" alt="Energías Renovables"></a> -->
          </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/G.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Gastronomía</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=G"><img src="{{ set_url('img/carreras/g.jpeg') }}" class="card-img-top" alt="Gastronomía"></a> -->
          </div>
          </div>
        </div>
          
        <div class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/MI.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Mantenimiento Industrial</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=MI"><img src="{{ set_url('img/carreras/mi.jpeg') }}" class="card-img-top" alt="Mantenimiento Industrial"></a> -->
          </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/MM.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Metal Mecánica</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=MM"><img src="{{ set_url('img/carreras/mm.jpeg') }}" class="card-img-top" alt="Metal Mecánica"></a> -->
          </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4" style="background-image: url('img/carrerasBG/TI.jpg')">
          <div class="card-content">
            <h5 class="card-title text-center p-4">Tecnologías de la Información</h5>
            <!-- <a href="{{ route('repositorios.index') }}?carrera[]=TIC"><img src="{{ set_url('img/carreras/ti.jpeg') }}" class="card-img-top" alt="Tecnologías de la Información"></a> -->
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="data d-flex align-items-center mb-6">
    <div class="container">
      <div class="data__content row justify-content-center align-items-center g-3 text-center p-4">
          <div class="col-md-3">
            <i class="fa-solid fa-folder-open d-block fs-1 mb-3"></i>
            <span>+20,200</span>
            <p>Proyectos</p>
          </div>
          <div class="col-md-3">
            <i class="fa-solid fa-graduation-cap d-block fs-1 mb-3"></i>
            <span>+10,200</span>
            <p>Alumnos registrados</p>
          </div>
          <div class="col-md-3">
            <span>+1,200</span>
            <p>Proyectos reconocidos</p>
          </div>
      </div>
    </div>
  </div>

  <section class="destacados mb-6 container">
    <div class="text-center">
      <h2>Recursos destacados</h2>
    </div>
    <div class="destacados__content carousel-slick"> {{-- row row-cols-1 row-cols-md-4 g-4 --}}
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 1</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 3</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 4</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 5</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 6</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 7</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title 8</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="ultimos mb-6 container">
    <div class="text-center">
      <h2>Añadido recientemente</h2>
    </div>
    <div class="ultimos__content carousel-slick">
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <div class="card h-100">
          <img src="{{ set_url('img/no-image.jpg') }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  </section>

</main>
  <p>
    {{-- Auth::guard()->name() --}}
  </p>

@endsection
