@extends('layouts.main')

@section('title', 'Repositorios')

@section('content')
<style>
  main{
    overflow: auto;
  }

  nav{
    /*min-width: 200px;*/
  }
  #filters_sidebar li{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*width: 90%;*/
  }
  .submenu{
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }
  
  .filters ul{
    display: flex; 
    list-style: none; 
    padding: 0;
  }
  .filters ul li{
    background-color: rgba(112, 140, 230, 0.6); 
    padding: 6px; 
    border-radius: 12px; 
    margin-right: 9px;
  }

  .highlight{
    background-color: #C695E5;
  }
</style>
  {{-- $_SERVER['REQUEST_URI'] != '/repositorios' ? $_SERVER['REQUEST_URI'].'&' : $_SERVER['REQUEST_URI'].'?'--}}

  <div class="container-fluid position-relative">
    <div class="row">
      <div class="container-fluid w-100 p-0 m-0">
        <div class="p-4" 
          style="
            background-image: url('img/utcgg.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            width: 100%; 
            height: 25vh; 
            position: relative;
          ">
          <div style="
            position: absolute;
            background: #003a3a;
            opacity: .8; 
            z-index: 1;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          ">
        </div>
          <form method="GET" action="{{ Request::fullUrl() }}">
            <div class="input-group" style="position: absolute; top: 40%; width: 60%; z-index: 10;">
              <div class="search-filters">
                @foreach(app('request')->request->all() as $key=>$value)
                  @if($key != 'page' && $key != 'query' && $key != 'search_field')
                    @foreach($value as $p)
                      <input type="hidden" name="{{$key}}[]" value="{{$p}}">
                    @endforeach
                  @endif
                @endforeach
              </div>
              <input type="text" name="query" value="{{ $query }}" class="form-control" placeholder="Buscar..." style="height: 50px;" id="query">
              <span class="input-group-text" style="background-color: #fff; border: none;">
                <select name="search_field" id="search_field" class="form-select form-select-sm" aria-label=".form-select-sm" style="border: none;">
                  <option value="all" {{ $search_field == 'all' ? 'selected="selected"' : '' }}>Todos</option>
                  <option value="alumno" {{ $search_field == 'alumno' ? 'selected="selected"' : '' }}>Autor</option>
                  <option value="nombre_rep" {{ $search_field == 'nombre_rep' ? 'selected="selected"' : '' }}>Titulo</option>
                  <option value="descripcion" {{ $search_field == 'descripcion' ? 'selected="selected"' : '' }}>Descripción</option>
                </select>
              </span>
              <span class="input-group-text" style="background-color: #fff; border: none;">
                <button type="submit" style="background: transparent; border: none;"><i class="fas fa-search"></i></button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <nav id="filters_sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3" style="height: 100vh; overflow: auto; top: 70px;">
            <div class="collapse navbar-collapse navbar-ex1-collapse d-block">
              <x-dropdowns.filter-list/>
            </div>
          </div>
      </nav>
      <main class="col-md-9 ms-sm-auto col-lg-10">
        <div class="container">
          <h5 class="p-3 mt-2">Filtros</h5>
          <div class="filters px-3">
            <ul>
              @forelse(app('request')->request->all() as $key=>$value)
                @if($key != 'page' && $key != 'query' && $key != 'search_field')
                  @if($key == 'year')
                    <li>{{ ucfirst($key) }} > {{ $value[0] }} - {{ $value[1] }} <a href="{{ remove_param_url([$key]) }}"><i class="fas fa-times-circle"></i></a>
                    </li>
                  @else
                    <li>{{ ucfirst($key) }} > 
                      @foreach($value as $position=>$p)
                        {{ $p }} <a href="{{ remove_param_url([$key=>$position]) }}"><i class="fas fa-times-circle"></i></a>
                      @endforeach
                    </li>
                  @endif
                @endif
              @empty
                <p>No se ha realizado ningun filtro</p>
              @endforelse
            </ul>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end my-4">
              <a href="{{ request()->path() }}"><button type="button" class="btn btn-outline-warning btn-sm">Resetear filtros</button></a>
            </div>
          </div>
          <div class="px-3 py-4 rounded shadow-sm" style="position: relative;">
            <span style="position: absolute; right: 0; top: 0; font-size: 20px; cursor: pointer;"><i class="fas fa-cog"></i></span>
            <h6 class="border-bottom pb-2 mb-0 mt-3">{{ $repositorios->total() }} resultados</h6>
            @forelse ($repositorios as $repositorio)
              <div class="d-flex text-muted pt-3 border-bottom border-secondary project position-relative">
                <i class="far fa-star position-absolute end-0"></i>
                <div class="me-2" style="max-width: 200px; color: #2E6A99;">
                  <!-- <i class="fas fa-file-pdf" style="font-size: 100px"></i> -->
                  <img src="{{ asset(json_decode($repositorio->imagenes)[0]) }}" style="object-fit: cover; width: 100%;">
                </div>
                <div class="d-flex flex-column w-100 pb-3 mb-0 small lh-sm">
                  <small class="mb-2">
                    {{$repositorio->tipo_proyecto}}
                  </small>
                  <a class="mb-2" href="/repositorios/{{ $repositorio->id }}"><strong class="text-gray-dark d-block nombre_rep">{{ $repositorio->nombre_rep }}</strong></a>
                  <p class="descripcion">{{ $repositorio->descripcion }}</p>
                  <p class="nombre_alumno">{{$repositorio->alumno}} | {{$repositorio->created_at}}</p>
                  <div>
                    <a href="/repositorios/descargar/{{$repositorio->id}}"><i class="fas fa-download"></i></a>
                  </div>
                </div>

              </div>
            @empty
              <p class="text-center fs-3 text-danger my-5">Repositorio no encontrado</p>
            @endforelse
            <!-- {{ $repositorios->appends($linkData)->links() }} -->
          </div>
        </div> 
      </main>
    </div>
  </div>

<script type="text/javascript">
  const sidebar = document.getElementById('filters_sidebar');

  // Abrir y cerrar el menu de los filtros
  sidebar.addEventListener('click', e => {
    let { target } = e;
    if(target.classList.contains('menu-title')){
      let submenu = target.nextElementSibling;
      
      if (submenu.style.maxHeight){
        submenu.style.maxHeight = null;
      } else {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    }
  })


  const $inputValue = document.getElementById('query').value;
  const $field = document.getElementById('search_field').value;
    search($inputValue, $field);

  // Buscar palabras en un texto
  function search (searchText, container){
    // searchText.trim();
    if (searchText !== "") {
      const regex = new RegExp(searchText, 'gi');
      let elements = document.querySelectorAll('.'+container);
      console.log(elements);
      elements.forEach(element => {
        let text = element.innerHTML;
        text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
        const newText = text.replace(regex, `<mark class="highlight">$&</mark>`);
        element.innerHTML = newText;
      })
    }
  }

  // Modificar los href del menú de filtros
  // let links = document.querySelectorAll('.submenu li a');
  // let parameters = window.location.search;
  // let pathname = window.location.pathname;
  // links.forEach(link => {
  //   if(parameters){
  //     link.href = pathname + parameters + '&' + link.dataset.link;
  //   }else{
  //     link.href = pathname + '?' + link.dataset.link;
  //   }
  // })

</script>

@endsection
