@extends('layouts.app')

@section('title', 'Crear role')

@section('dashboard-content')
  
  <div class="roles container-fluid mt-4 px-sm-0 px-md-5">
	{{ Breadcrumbs::render('roles.create',) }}
    <form action="{{ route('roles.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label fs-5">Nombre</label>
            <input type="text" class="form__input" id="name" name="name">
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
	                               value="{{ $permiso->id }}">
	                        <label class="form-check-label" for="flexCheckDefault">
	                            {{ $permiso->description }}
	                        </label>
	                    </div>
	                @endforeach
	            </div>
	        @endforeach
	    </div>
		<x-button.success type="submit" class="mt-4">Crear</x-button.success>
	    {{-- <button class="btn btn-green mt-4">Crear</button> --}}
	</form>
  </div>

@endsection
