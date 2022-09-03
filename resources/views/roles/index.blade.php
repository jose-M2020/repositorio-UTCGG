@extends('layouts.app')

@section('title', 'Roles')

@section('dashboard-content')
  {{-- $_SERVER['REQUEST_URI'] != '/repositorios' ? $_SERVER['REQUEST_URI'].'&' : $_SERVER['REQUEST_URI'].'?'--}}
  
  <div class="roles">
    <div class="d-flex justify-content-between align-items-center py-3">
      <div class="total-records">
          <p>Roles totales: <b>{{ $roles->total() }}</b></p>
      </div>
      <div>
        <a href="{{ route('roles.create') }}" class="btn btn-success">Nuevo</a>
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
        <button type="submit" class="btn btn-success">Aceptar</button>      
       </form>
    </x-slot>
  </x-modal>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
  <script src="{{ set_url('js/table.js') }}"></script>

@endsection
