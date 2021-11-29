@extends('layouts.main')

@section('title', 'Administradores')

@section('content')

	<div class="users container-fluid mt-4 px-sm-0 px-md-5">
    <div class="row justify-content-end py-4">
      <div class="col-1"><a href="{{ route('admin.create') }}" class="btn btn-success">Nuevo</a></div>
    </div>

    <div class="users__navigation row d-flex py-3 justify-content-md-between align-items-center">
      <div class="col-md-6 col-xs-12 btn-group d-flex justify-content-center justify-content-md-start " role="group" aria-label="Basic example">
        <a href="/alumnos" class="text-light">
          <button type="button" class="btn btn-transparent text-light">Alumnos</button>
        </a>
        @auth('admin')
          <a href="/docentes">
            <button type="button" class="btn btn-transparent text-light">Docentes</button>
          </a>
          <a href="/admin">
            <button type="button" class="btn btn-transparent border-bottom border-3 text-white fw-bold">Adminsitradores</button>
          </a>
        @endauth
      </div>
      <div class="col-md-5 col-lg-4 col-xl-3 mt-3 mt-md-0">
        <div class="form-group position-relative search_content">
          <i class="fas fa-spinner fa-spin" id="search_spinner"></i>
          <input type="text" name="search_box" id="search_box" class="form-control ms-auto" placeholder="Buscar usuario..." />
          <i class="fas fa-search" id="search_icon"></i>
          <!-- <div class="searching">Buscando resultados para la búsqueda...</div> -->
        </div>
      </div>
    </div>

    <x-table :data="$admins" />

    <div class="total-records">
      <p>Alumnos totales: <b>{{ $admins->total() }}</b></p>
    </div>
  </div>

   <!-- Modal edit-->
  <x-modal id="modalEdit" title="Editar adminsitrador">
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

  <!-- Modal delete -->
  <x-modal id="modalDelete" title="¿Desea eliminar el adminsitrador?">
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
        
        let url = '{{ route('admin.update', ':admin') }}';
        url = url.replace(':admin', user.id);
        editForm.action = url;
      })
    })

    // Los id de los inputs debe coincidir con el nombre de las columnas de la BD
    const setModalData  = data => {
      modalEditInput.forEach(input => {
        input.value = data[input.id];
      })
    }

    // ------------------------ Ventana modal de eliminar alumno -----------------------
    const deleteButtons = document.querySelectorAll('button#deleteUser');
    const deleteForm = document.querySelector('#modalDelete form');

    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        let {dataset: {id} } = this;
        console.log(id)
        deleteForm.action = 'admin/' + id;
      })
    })
  </script>

@endsection