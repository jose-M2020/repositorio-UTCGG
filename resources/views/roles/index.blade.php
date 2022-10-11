@extends('layouts.app')

@section('title', 'Roles')

@section('dashboard-content')
  {{-- $_SERVER['REQUEST_URI'] != '/repositorios' ? $_SERVER['REQUEST_URI'].'&' : $_SERVER['REQUEST_URI'].'?'--}}
  {{ Breadcrumbs::render('roles.index',) }}
  <div class="roles">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="total-records">
          <p>Roles totales: <b>{{ $roles->total() }}</b></p>
      </div>
      <div>
        <x-button.success href="{{ route('roles.create') }}">Nuevo</x-button.success>
      </div>
    </div>
    <x-table :data="$roles" linkEdit="roles.edit"/>
  </div>

  <!-- Modal Delete -->
  <x-modal id="modalDelete" title="¿Desea eliminar el rol?">
    <x-slot name="footer">
      <form id="delete-repository" method="POST" action="{{ route('roles.destroy', ':id') }}">
        @method('delete')
        @csrf
        <x-button.danger type="submit">Aceptar</x-button.danger>
       </form>
    </x-slot>
  </x-modal>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
  <script src="{{ set_url('js/table.js') }}"></script>

@endsection
