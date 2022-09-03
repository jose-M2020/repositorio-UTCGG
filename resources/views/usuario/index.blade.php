@extends('layouts.app')

@section('title', 'Alumnos')

@section('dashboard-content')
  <div class="users container-fluid mt-4 px-sm-0 px-md-5">
    <div class="d-flex justify-content-between align-items-center py-3">
      <div class="total-records">
          <p>Alumnos totales: <b>{{ $users->total() }}</b></p>
      </div>
      <div>
        <a href="{{ route('usuarios.create') }}" class="btn btn-success">Nuevo</a>
      </div>
    </div>

    {{-- Navegación y accíones de la tabla --}}
    <div class="users__navigation row d-flex py-3 justify-content-md-between align-items-center">
      {{-- Navegción entre usuarios --}}
      <div class="col-md-6 col-xs-12 btn-group d-flex justify-content-center justify-content-md-start " role="group" aria-label="Basic example">
        <a href="/alumnos" class="border-bottom border-3">
          <button type="button" class="btn btn-transparent text-white fw-bold">Alumnos</button>
        </a>
        {{-- @auth('admin') --}}
          <a href="/docentes">
            <button type="button" class="btn btn-transparent text-light">Docentes</button>
          </a>
          <a href="/admin">
            <button type="button" class="btn btn-transparent text-light">Administradores</button>
          </a>
        {{-- @endauth --}}
      </div>

      {{-- Sección Búsqueda --}}
      <div class="col-md-5 col-lg-4 col-xl-3 mt-3 mt-md-0">
        <form action="{{ route('usuarios.index') }}">
          
          {{-- Filtros realizados previamente --}}
          <div class="search-filters">
            @foreach($filters as $key=>$value)
              @if(is_array($value))
                @foreach($value as $val)
                  <input type="hidden" name="{{ $key }}[]" value="{{ $val }}">
                @endforeach
              @else
                <input type="hidden" name="{{ $key }}" value="{{ $value }}">
              @endif
            @endforeach
          </div>

          {{-- Buscar - input --}}
          <div class="form-group position-relative search_content">
            {{-- <i class="fas fa-spinner fa-spin" id="search_spinner"></i> --}}
            <input type="text" 
                   name="query" 
                   id="search_box" 
                   class="form-control ms-auto" 
                   data-search="auto" 
                   data-link="{{ route('usuarios.get') }}" 
                   placeholder="Buscar usuario..." 
                  @if(array_key_exists('query', $filters))
                    value=" {{ $filters['query'] }} "
                  @endif
            />
            <button id="search_icon"><i class="fas fa-search"></i></button>
            <!-- <div class="searching">Buscando resultados para la búsqueda...</div> -->
          </div>
        </form>
      </div>

      {{-- Menú de filtros --}}
      <div class="users__filters alumnos mt-5 mb-1">
        <form action="{{ route('usuarios.index') }}" class="row justify-content-md-between
        justify-content-center align-items-center">
          @if(array_key_exists('query', $filters))
            <input type="hidden" name="query" value="{{ $filters['query'] }}"
            />
          @endif
          <div class="alumnos__filters-group col-auto mb-4 mb-sm-0">            
            <div class="btn-group alumnos__filters-carrera">
              <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Por carrera
              </button>
              <ul class="dropdown-menu p-3">
                @foreach(get_careers() as $key => $value)
                  <li data-toggle="tooltip" data-bs-placement="right" title="{{ $value }}">
                    <input name="carrera[]" class="form-check-input" type="checkbox" value="{{ $key }}" id="flexCheckDefault" 
                      @if(array_key_exists('carrera', $filters))
                        {{ in_array($key, $filters['carrera']) ? 'checked' : '' }} 
                      @endif
                    >
                    <label class="form-check-label" for="flexCheckDefault">
                      {{ $key }}
                    </label>
                  </li>
                @endforeach
              </ul>
            </div>
            <div class="btn-group alumnos__filters-cuatrimestre">
              <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Por cuatrimestre
              </button>
              <ul class="dropdown-menu p-3">
                @foreach([3, 5, 6, 7, 10, 11] as $cuatri)
                  <li>
                    <input name="cuatrimestre[]" class="form-check-input" type="checkbox" value="{{ $cuatri }}" id="flexCheckDefault" 
                      @if(array_key_exists('cuatrimestre', $filters))
                        {{ in_array($cuatri, $filters['cuatrimestre']) ? 'checked' : '' }} 
                      @endif
                    >
                    <label class="form-check-label" for="flexCheckDefault">
                      {{ $cuatri }}°
                    </label>
                  </li>
                @endforeach
              </ul>
            </div>
            <div class="btn-group alumnos__filters-date">
              <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Por fecha
              </button>
              <ul class="dropdown-menu p-3">
                @foreach(['hoy' => 'Hoy', 'semana' => 'Esta Semana', 'mes' => 'Este mes', 'año' => 'Este año'] as $key => $value)
                  <li>
                    <div class="form-check">
                      <input value="{{ $key }}" class="form-check-input" type="radio" name="fecha" id="date2"
                        @if(array_key_exists('fecha', $filters))
                          {{ $filters['fecha'] == $key ? 'checked' : '' }} 
                        @endif
                      >
                      <label class="form-check-label" for="date2">
                        {{ $value }}
                      </label>
                    </div>
                  </li>
                @endforeach

                <li class="text-center mt-3">
                  <p>Establecer rango</p>
                  <div class="input-group mb-3">
                    <input name="rango_fecha[]" type="date" class="form-control date-range" placeholder="año" aria-label="Username"
                      @if(array_key_exists('rango_fecha', $filters))
                        value="{{ $filters['rango_fecha'][0] }}"
                      @endif
                    >
                    <span class="input-group-text">-</span>
                    <input name="rango_fecha[]" type="date" class="form-control date-range" placeholder="año" aria-label="Server"
                      @if(array_key_exists('rango_fecha', $filters))
                        value="{{ $filters['rango_fecha'][1] }}"
                      @endif
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="btn-group col-auto">
            <button type="submit" class="btn btn-success me-2"><i class="fas fa-filter"></i> Filtrar</button>
            <a class="btn btn-outline-info" href="{{ route('usuarios.index') }}">Resetear</a>
          </div>
        </form>
      </div>
    </div>

    <x-table :data="$users" />
  </div>

  <!-- Modal Edit -->
  <x-modal id="modalEdit" title="Editar alumno">
    <x-slot name="body">
       <form id="edit-student" method="POST" action="{{ route('usuarios.update', ':id') }}">
         {{-- <input type="hidden" name="id" value=""> --}}
         @csrf
         @method('put')
         <div class="form__field">
           <label>Nombre</label>
           <input type="text" name="nombre" class="form__input" id="nombre" value="">
         </div>
         <div class="form__field">
           <label>Apellido</label>
           <input type="text" name="apellido" class="form__input" id="apellido" value="">
         </div>
         <div class="form__field">
           <label>Email</label>
           <input type="text" name="email" id="email" class="form__input" value="">
         </div>
         <div class="form__field">
           <label>Carrera</label>
           <select class="form__input" name="carrera" id="carrera">
            @foreach(get_careers() as $key=>$career)
                <option value="{{$key}}">{{ $career }}</option>
            @endforeach
           </select>
         </div>
         <div class="form__field">
           <label>Cuatrimestre</label>
           <input type="number" name="cuatrimestre" id="cuatrimestre" class="form__input" value="">
         </div>
       </form>
    </x-slot>
    <x-slot name="footer">
      <button type="submit" class="btn btn-success" form="edit-student">Editar</button>      
    </x-slot>
  </x-modal>

  <!-- Modal Delete -->
  <x-modal id="modalDelete" title="¿Desea eliminar el alumno?">
    <x-slot name="footer">
      <form id="delete-student" method="POST" action="{{ route('usuarios.destroy', ':id') }}">
        @method('delete')
        @csrf
        <button type="submit" class="btn btn-success">Aceptar</button>      
       </form>
    </x-slot>
  </x-modal>

  {{-- <div id="tvesModal" class="modal">
      <div class="modal__content">
        <span class="modal__icon-close">×</span> 
        <div>
          <div class="form">  
            <div class="form__title">
              <h1>Editar alumno</h1>
            </div>
            
            <form id="edit-student" method="POST" action="editUser">
              <input type="hidden" name="id" value="">
              <div class="form__field">
                <label>Nombre Completo</label>
                <input type="text" name="name" class="form__input" id="name" value="">
              </div>
              <div class="form__field">
                <label>Usuario</label>
                <input type="text" name="username" id="username" class="form__input" value="">
              </div>
              <div class="form__field">
                <label>Carrera</label>
                <select class="form__input" name="carrera" id="carrera">
                </select>
              </div>
              <div class="form__field">
                <label>Cuatrimestre</label>
                <input type="number" name="cuatrimestre" id="Cuatrimestre" class="form__input" value="">
              </div>
              <div class="form__field">
                <input type="submit" name="register" class="form__btn-submit" value="Actualizar">
              </div>
            </form>
          </div>  
        </div>
      </div>
  </div>  --}}

@endsection

@section('footer')
<script src="{{ set_url('js/table.js') }}"></script>
@endsection