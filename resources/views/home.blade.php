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
      <form method="GET" action="{{ route('repositorios.index') }}">
        <div class="home__search input-group mx-3 start-0" style="position: absolute; top: 40%; z-index: 10;">
          <h2 style="color: #fff;">Proyectos académicos digitales de los alumnos de la Universidad Tecnológica de la Costa Grande de Guerrero</h2>
          <input type="text" name="query" class="form-control" placeholder="Buscar..." style="height: 50px;">
          <span class="input-group-text" style="background-color: #fff; border: none;">
            
            <select name="search_field" id="search_field" class="form-select form-select-sm" aria-label=".form-select-sm" style="border: none;">
              {{-- <option value="all">Todos</option> --}}
              <option value="title">Titulo</option>
              <option value="description">Descripción</option>
              <option value="author">Autor</option>
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

    <div class="row p-4 mt-4 carreras">
      {{-- <h4 class="mb-4">Recursos destacados</h4> --}}
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Desarrollo e Inovación Empresarial</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=GCH"><img src="{{ set_url('img/carreras/die.jpeg') }}" class="card-img-top" alt="Desarrollo e Inovación Empresarial"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Energías Renovables</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=ER"><img src="{{ set_url('img/carreras/er.jpeg') }}" class="card-img-top" alt="Energías Renovables"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Gastronomía</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=G"><img src="{{ set_url('img/carreras/g.jpeg') }}" class="card-img-top" alt="Gastronomía"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Gestión y Desarrollo Turistico</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=GDT"><img src="{{ set_url('img/carreras/gdt.jpeg') }}" class="card-img-top" alt="Gestión y Desarrollo Turistico"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Logística Internacional</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=LI"><img src="{{ set_url('img/carreras/li.jpeg') }}" class="card-img-top" alt="Logística Internacional"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Mantenimiento Industrial</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=MI"><img src="{{ set_url('img/carreras/mi.jpeg') }}" class="card-img-top" alt="Mantenimiento Industrial"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Metal Mecánica</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=MM"><img src="{{ set_url('img/carreras/mm.jpeg') }}" class="card-img-top" alt="Metal Mecánica"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Procesos Alimentarios</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=PA"><img src="{{ set_url('img/carreras/pa.jpeg') }}" class="card-img-top" alt="Procesos Alimentarios"></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5 class="card-title text-center p-4">Tecnologías de la Información</h5>
        <div class="card mb-4">
          <a href="{{ route('repositorios.index') }}?carrera[]=TIC"><img src="{{ set_url('img/carreras/ti.jpeg') }}" class="card-img-top" alt="Tecnologías de la Información"></a>
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
