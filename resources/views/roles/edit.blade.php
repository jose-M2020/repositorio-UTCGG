@extends('layouts.app')

@section('title', 'Editar rol')

@section('dashboard-content')
  
<div class="roles container-fluid mt-4 px-sm-0 px-md-5">
    <form action="{{ route('roles.update', $role->id) }}" method="POST">
        @csrf
        @method('put')
        <div class="mb-3">
            <label for="name" class="form-label fs-5">Nombre</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $role->name }}">
        </div>
    
        <h5 class="mt-4 fs-5">Permisos</h5>
    
	    <div class="row row-cols-auto g-3">
	        @foreach($permisos as $key=>$value)
	            <div class="col">
	                <p>{{ ucfirst($key) }}</p>
	                @foreach($value as $permiso)
	                    <div class="form-check">
	                        <input class="form-check-input" 
	                               type="checkbox" 
	                               name="permissions[]"
	                               value="{{ $permiso->id }}" 
	                               @if($role->permissions->contains($permiso)) checked @endif>
	                        <label class="form-check-label" for="flexCheckDefault">
	                            {{ $permiso->description }}
	                        </label>
	                    </div>
	                @endforeach
	            </div>
	        @endforeach
	    </div>
	    <button class="btn btn-green mt-4">Actualizar</button>
	</form>
  </div>

@endsection
