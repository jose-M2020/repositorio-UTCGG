@extends('layouts.main')

@section('title', 'Explorar')

@section('content')
  {{-- $_SERVER['REQUEST_URI'] != '/repositorios' ? $_SERVER['REQUEST_URI'].'&' : $_SERVER['REQUEST_URI'].'?'--}}
  
  <div class="repository container-fluid position-relative">
    {{-- Sección de buscar --}}
    <div class="row position-relative">
      <div class="p-0 m-0">
        <div class="search p-4 col-md-6">
          <form method="GET" action="{{ route('repositorios.index') }}">
            
            {{-- Filtros realizados previamente --}}
            <div class="search-filters">
              @foreach(app('request')->request->all() as $key=>$value)
                @if($key != 'page' && $key != 'query' && $key != 'search_field')
                  @foreach($value as $p)
                    <input type="hidden" name="{{$key}}[]" value="{{$p}}">
                  @endforeach
                @endif
              @endforeach
            </div>

            <div class="input-group position-absolute top-50 start-0 translate-middle-y ms-2 me-4" style="z-index: 10;">
              {{-- Buscar - Input --}}
              <input type="text" name="query" value="{{ $search }}" class="form-control" placeholder="Buscar..." style="height: 50px;" id="query">
              <span class="input-group-text" style="background-color: #fff; border: none;">
                <select name="search_field" id="search_field" class="form-select form-select-sm" aria-label=".form-select-sm" style="border: none;">
                  {{-- <option value="all" {{ $search_field == 'all' ? 'selected="selected"' : '' }}>Todos</option> --}}
                  <option value="title" {{ $search_field == 'title' ? 'selected="selected"' : '' }}>Titulo</option>
                  <option value="description" {{ $search_field == 'description' ? 'selected="selected"' : '' }}>Descripción</option>
                  <option value="author" {{ $search_field == 'author' ? 'selected="selected"' : '' }}>Autor</option>
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

      {{-- Menú de filtro --}}
      <nav id="filters_sidebar" class="col-md-3 col-lg-2 d-block sidebar collapse relative">
        <button class="close d-block d-md-none mt-2 fs-5 ms-auto"><i class="fas fa-times"></i></button>
        <div class="position-sticky pt-3" style="height: 100vh; overflow: auto; top: 70px;">
          <div class="collapse navbar-collapse navbar-ex1-collapse d-block">
            <x-dropdowns.filter-list/>
          </div>
        </div>
      </nav>

      {{-- Sección principal --}}
      <main class="col-md-9 ms-sm-auto col-lg-10">
        <div class="container">
          @if($filters)
            <p class="p-3 mt-2 fs-5">Filtros realizados</p>
            
            {{-- Filtros realizados --}}
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
          @endif

          {{-- Repositorios --}}
          <div class="px-3 py-4 mt-4 rounded shadow-sm" style="position: relative;">
            <span style="position: absolute; right: 0; top: 0; font-size: 20px; cursor: pointer;"><i class="fas fa-cog"></i></span>
            <h6 class="border-bottom pb-2 mb-0 mt-3">{{ $repositorios->total() }} resultados</h6>
            @forelse ($repositorios as $repositorio)
              <div class="row d-flex text-muted pt-3 border-bottom border-secondary project position-relative" data-aos="fade-in">
                <div class="position-absolute w-auto top-0 end-0">
                  {{-- Marcar como favorito --}}
                  {{-- <button class="repository__star"><i class="far fa-star"></i></button> --}}
                  {{-- Acciones --}}
                  @auth('admin')
                    <div class="repository__actions btn-group dropstart">
                      <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                      </button>
                      <ul class="dropdown-menu">
                        {{-- <li>
                          <button class="dropdown-item" id="editRepository" data-user="{{ json_encode($repositorio) }}" data-bs-toggle="modal" data-bs-target="#modalEdit"><i class="far fa-edit"></i> Editar</button>
                        </li> --}}
                        <li>
                          <button class="dropdown-item" id="deleteRepository" data-slug="{{ $repositorio->slug }}"  data-bs-toggle="modal" data-bs-target="#modalDelete"><i class="far fa-trash-alt"></i> Eliminar</button>
                        </li>
                      </ul>
                    </div>
                  @endauth
                </div>
                <div class="col-12 col-md-4 col-lg-3 align-self-center" style="color: #2E6A99;">
                  <!-- <i class="fas fa-file-pdf" style="font-size: 100px"></i> -->
                  <img src="{{ json_decode($repositorio->imagenes)[0] }}" style="object-fit: cover; width: 100%;" alt="Imagen del repositorio">
                </div>
                <div class="col align-self-center d-flex flex-column w-100 pb-3 mb-0 small lh-sm">
                  <small class="mb-2">
                    {{$repositorio->tipo_proyecto}}
                  </small>
                  <a class="mb-2 title" href="{{ route('repositorios.show', $repositorio) }}">{{ $repositorio->nombre_rep }}</a>
                  <div class="repository__datails">
                    <p class="description">{{ $repositorio->descripcion }}</p>
                    <div class="d-flex justify-content-between">
                      <p class="author">
                        @foreach(json_decode($repositorio->alumno) as $author)
                          @if ($loop->last)
                              {{ $author }}.
                              @break
                          @endif
                          {{ $author }},
                        @endforeach
                      </p>
                      <p>{{$repositorio->created_at}}</p>
                    </div>
                  </div>
                  <div>
                    <a href="{{ route('repositorios.download', $repositorio->id) }}"><i class="fas fa-download"></i></a>
                  </div>
                </div>
              </div>
            @empty
              <div class="d-flex justify-content-center align-items-center flex-column">
                <object id="folder_notFound" data="{{ asset('img/folder_notFound_animated.svg') }}"></object>
                <p class="text-center fs-3 text-Dark my-5">Repositorio no encontrado</p>
              </div>
            @endforelse
            <!-- {{ $repositorios->appends($filters)->links() }} -->
          </div>
        </div> 

        {{-- Paginación --}}
        <div>
          {{ $repositorios->appends(['query' => $search, 'search_field' => $search_field])->links() }}
        </div>
      </main>
    </div>
  </div>

  <!-- Modal Delete -->
  <x-modal id="modalDelete" title="¿Desea eliminar el repositorio?">
    <x-slot name="footer">
      <form id="delete-repository" method="POST" action="">
        @method('delete')
        @csrf
        <button type="submit" class="btn btn-success">Aceptar</button>      
       </form>
    </x-slot>
  </x-modal>

<script type="text/javascript">

  let sidebar = document.getElementById('filters_sidebar'),
        closeFilter = document.querySelector('#filters_sidebar .close');
  let openFilter = document.getElementById('open_filter');

  // ------------------------ Ventana modal de eliminar repositorio -----------------------
    const deleteButtons = document.querySelectorAll('button#deleteRepository');
    const deleteForm = document.querySelector('#modalDelete form');

    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        let {dataset: {slug} } = this;
        let url = '{{ route('repositorios.destroy', ':repositorio') }}';
        url = url.replace(':repositorio', slug);
        deleteForm.action = url;
      })
    })

  // Expandir y cerrar el menu de filtros (acordion)
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

  // Mostrar y cerrar el menu de filtros
  openFilter.addEventListener('click', e => {
    sidebar.style.right = 0;
  })

  closeFilter.addEventListener('click', e => {
    sidebar.style.right = '';
  })


  const $search = document.getElementById('query').value;
  const $search_field = document.getElementById('search_field').value;
  
  search($search, $search_field);

  // Buscar palabras en un texto
  function search (searchText, container){
    // searchText.trim();
    if (searchText !== "") {
      const regex = new RegExp(searchText, 'gi');
      let elements = document.querySelectorAll('.'+container);
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
