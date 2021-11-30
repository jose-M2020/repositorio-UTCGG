@extends('layouts.main')

@section('content')

<style>
  .portal{
    background-image: url('img/utcgg.png');
    background-position: center top;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    width: 100%; 
    height: 100vh; 
    position: relative;
  }

  .portal::after{
    content: '';
    position: absolute;
    background: #003a3a;
    opacity: .8; 
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

  <main>
  <div class="home container-fluid w-100 p-0 m-0">
    <div class="p-4 portal">
      <form method="GET" action="/repositorios">
        <div class="input-group" style="position: absolute; top: 40%; width: 60%; z-index: 10;">
          <h2 style="color: #fff;">Explora las investigaciones y proyectos realizados en la UTCGG</h2>
          <input type="text" name="query" class="form-control" placeholder="Buscar..." style="height: 50px;">
          <span class="input-group-text" style="background-color: #fff; border: none;">
            
            <select name="search_field" id="search_field" class="form-select form-select-sm" aria-label=".form-select-sm" style="border: none;">
              <option value="all">Todos</option>
              <option value="nombre_alumno">Autor</option>
              <option value="nombre_rep">Titulo</option>
              <option value="descripcion">Descripción</option>
            </select>
          </span>
          <span class="input-group-text" style="background-color: #fff; border: none;">
            <button type="submit" style="background: transparent; border: none;"><i class="fas fa-search"></i></button>
          </span>
        </div>
      </form>
    </div>
    {{-- <div class="p-4 mb-5" style="width: 100%; height: 20vh; background-color: #1D3B4A; position: relative; color: #fff;">
      <div class="row">
          <div class="col-md-4">
            <h5>+20,200 proyectos realizados</h5>
          </div>
          <div class="col-md-4">
            <h5>+10,200 alumnos registrados</h5>
          </div>
          <div class="col-md-4">
            <h5>+1,200 proyectos reconocidos</h5>
          </div>
      </div>
    </div> --}}


    <div class="row p-4 mt-4">
      <h4 class="mb-4">Recursos destacados</h4>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4 text-white" style="background: #003a3a;">Sistema Control de ventas</h5>
        <div class="card mb-3">
          <!-- <img src="{{ set_url('img/add-file.png') }}" class="card-img-top" alt="..."> -->
          <div class="card-body">
            <p class="card-text">Los estudiantes de la Universidad Técnologica de la Costa Grande de Guerrero subirán los archivos correspondientes al trabajo realizado.</p>
            {{-- <a href="/repositorios/registrar">Registrar repositorio</a> --}}
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4 text-white" style="background: #003a3a;">Sistema Control de ventas</h5>
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text">Los estudiantes de la Universidad Técnologica de la Costa Grande de Guerrero subirán los archivos correspondientes al trabajo realizado.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4 text-white" style="background: #003a3a;">Sistema Control de ventas</h5>
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text">Los estudiantes de la Universidad Técnologica de la Costa Grande de Guerrero subirán los archivos correspondientes al trabajo realizado.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4 text-white" style="background: #003a3a;">Sistema Control de ventas</h5>
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text">Los estudiantes de la Universidad Técnologica de la Costa Grande de Guerrero subirán los archivos correspondientes al trabajo realizado.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4 text-white" style="background: #003a3a;">Sistema Control de ventas</h5>
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text">Los estudiantes de la Universidad Técnologica de la Costa Grande de Guerrero subirán los archivos correspondientes al trabajo realizado.</p>
          </div>
        </div>
      </div>
    </div>
  </div><!-- /.row -->
  </div>

</main>
  <p>
    {{-- Auth::guard()->name() --}}
  </p>
          




@endsection