@extends('layouts.main')

@section('title', 'Docentes')

@section('content')

<div class="users container-fluid mt-4 px-sm-0 px-md-5">
    <div class="row justify-content-end py-4">
      <div class="col-1"><a href="{{ route('docentes.create') }}" class="btn btn-success">Nuevo</a></div>
    </div>

    {{-- Navegación y accíones de la tabla --}}
    <div class="users__navigation row d-flex py-3 justify-content-md-between align-items-center">
      {{-- Navegción entre usuarios --}}
      <div class="col-md-6 col-xs-12 btn-group d-flex justify-content-center justify-content-md-start " role="group" aria-label="Basic example">
        <a href="/alumnos" class="text-light">
          <button type="button" class="btn btn-transparent text-light">Alumnos</button>
        </a>
        @auth('admin')
          <a href="/docentes">
            <button type="button" class="btn btn-transparent border-bottom border-3 text-white fw-bold">Docentes</button>
          </a>
          <a href="/admin">
            <button type="button" class="btn btn-transparent text-light">Adminsitradores</button>
          </a>
        @endauth
      </div>

      {{-- Sección Búsqueda --}}
      <div class="col-md-5 col-lg-4 col-xl-3 mt-3 mt-md-0">
        <div class="form-group position-relative search_content">
          <i class="fas fa-spinner fa-spin" id="search_spinner"></i>
          <input type="text" name="search_box" id="search_box" class="form-control ms-auto" placeholder="Buscar usuario..." />
          <i class="fas fa-search" id="search_icon"></i>
          <!-- <div class="searching">Buscando resultados para la búsqueda...</div> -->
        </div>
      </div>

      {{-- Menú de filtros --}}
      <div class="users__filters alumnos mt-5 mb-1">
        <form action="{{ route('docentes.index') }}" class="row justify-content-md-between
        justify-content-center align-items-center">
          <div class="alumnos__filters-group col-auto mb-4 mb-sm-0">
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
            <a class="btn btn-outline-info" href="{{ route('docentes.index') }}">Resetear</a>
          </div>
        </form>
      </div>
    </div>

    <x-table :data="$docentes" />

    <div class="total-records">
      <p>Docentes totales: <b>{{ $docentes->total() }}</b></p>
    </div>
</div>

   <!-- Modal edit -->
  <x-modal id="modalEdit" title="Editar docente">
    <x-slot name="body">
       <form id="edit-student" method="POST" action="">
         {{-- <input type="hidden" name="id" value=""> --}}
         @csrf
         @method('PUT')
         <div class="form__field">
           <label>Nombre Completo</label>
           <input type="text" name="nombre" class="form__input" id="nombre" value="">
         </div>
         <div class="form__field">
           <label>Email</label>
           <input type="text" name="email" id="email" class="form__input" value="">
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
      <form id="delete-student" method="POST" action="">
        @method('delete')
        @csrf
        <button type="submit" class="btn btn-success">Aceptar</button>      
       </form>
    </x-slot>
  </x-modal>

  <script>
    const editButtons = document.querySelectorAll('#editUser');
    const editForm = document.querySelector('#modalEdit form');
    const modalEditInput = document.querySelectorAll('#modalEdit form input:not([type=hidden]), select');

    editButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        let {dataset: {user} } = this;
        user = JSON.parse(user);
        setModalData(user)
        
        let url = '{{ route('docentes.update', ':docente') }}';
        url = url.replace(':docente', user.id);
        editForm.action = url;
      })
    })

    // Los id de los inputs debe coincidir con el nombre de las columnas de la BD
    const setModalData  = data => {
      modalEditInput.forEach(input => {
        input.value = data[input.id];
      })
    }

    // ------------------------ Ventana modal de eliminar docente -----------------------
    const deleteButtons = document.querySelectorAll('button#deleteUser');
    const deleteForm = document.querySelector('#modalDelete form');

    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        let {dataset: {id} } = this;

        let url = '{{ route('docentes.destroy', ':docente') }}';
        url = url.replace(':docente', id);
        deleteForm.action = url;
      })
    })
  </script>

@endsection