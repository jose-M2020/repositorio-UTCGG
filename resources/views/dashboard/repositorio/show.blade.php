@extends('layouts.app')

@section('title', 'Mis repositorios')

@section('head')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.6.0/bootstrap-tagsinput.min.css" integrity="sha512-X6069m1NoT+wlVHgkxeWv/W7YzlrJeUhobSzk4J09CWxlplhUzJbiJVvS9mX1GGVYf5LA3N9yQW5Tgnu9P4C7Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        .bootstrap-tagsinput{
            padding: 0px 10px;
        }

        .bootstrap-tagsinput .label-info {
            color: #fff;
            display: inline-block;
            background-color: #6b8186;
            padding: 0 .4em .15em;
            border-radius: .25rem;
        }

    </style>
@endsection

@section('dashboard-content')

<div class="row">
    <a href="{{ route('repositorios.user', auth()->user()->id) }}"><i class="fa-solid fa-arrow-left"></i> Regresar</a>
    
    <div>
        <div class="project-info mb-5">
            <form class="project-info__form mb-4" action="{{ route('repositorios.update', $repositorio->slug) }}" method="POST">
                @csrf
                @method('put')
                <div class="project-info__header p-3">
                  <div class="d-flex justify-content-between">
                      <h4>Datos del repositorio</h4>
                      <button type="button" id="enableEdit" class="btn btn-secondary btn-sm align-self-end mb-3"><i class="fa-solid fa-pen"></i> Editar</button>
                  </div>
                  <div class="d-flex justify-content-between">
                      <span><i class="fa-solid fa-user"></i> {{ $repositorio->created_by }}</span>
                      <div>
                          <span class="me-2""><i class="fa-solid fa-calendar"></i> {{ $repositorio->created_at->format("m/d/Y") }}</span>
                          <span><i class="fa-solid fa-clock-rotate-left"></i> {{ $repositorio->updated_at->diffForHumans() }}</span>
                      </div>
                  </div>
                </div>
                <table class="table border project-info__table">
                    <tbody>
                        <tr>
                            <td>Nombre</td>
                            <td><input type="text"
                                       class="project-info__input" 
                                       value="{{ $repositorio->nombre_rep }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Descripción</td>
                            <td><textarea name=""
                                          class="project-info__input"
                                          rows="3"
                                          disabled>{{ $repositorio->descripcion }}
                            </textarea></td>
                            
                        </tr>
                        <tr>
                            <td>Tipo de proyecto</td>
                            <td>
                                <select id="project_type" name="tipo_proyecto" class="form-select project-info__input" disabled>
                                    @foreach(get_type_projects() as $type)
                                        @if($repositorio->tipo_proyecto == $type )
                                            <option value="{{$type}}" selected>{{$type}}</option>
                                            @continue
                                        @endif
                                        <option value="{{$type}}">{{$type}}</option>
                                    @endforeach
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Nivel de proyecto</td>
                            <td>
                                <select id="project_level" name="nivel_proyecto" class="form-select project-info__input" disabled>
                                    @foreach(get_academic_degrees() as $key => $degree)
                                        @if($repositorio->nivel_proyecto == $key)
                                            <option value="{{$key}}" selected>{{$key}}</option>
                                            @continue
                                        @endif
                                        <option value="{{$key}}">{{$key}}</option>
                                    @endforeach
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Palabras clave</td>
                            <td><input type="text"
                                       name="palabras_clave"
                                       value="{{ $repositorio->palabras_clave }}" 
                                       data-role="tagsinput"
                            ></td>
                        </tr>
                        <tr>
                            <td>Carrera</td>
                            <td>
                                <select id="project_level" name="nivel_proyecto" class="form-select project-info__input" disabled>
                                    @foreach(get_careers() as $key => $carrera)
                                        @if($repositorio->carrera == $key)
                                            <option value="{{$key}}" selected>{{$carrera}}</option>
                                            @continue
                                        @endif
                                        <option value="{{$key}}">{{$carrera}}</option>
                                    @endforeach
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Asesor externo</td>
                            <td><input type="text" 
                                       class="project-info__input"
                                       value="{{ $repositorio->asesor_externo }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Empresa</td>
                            <td><input type="text"
                                       class="project-info__input"
                                       value="{{ $repositorio->empresa }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Generacion</td>
                            <td><input type="text" 
                                       class="project-info__input" 
                                       value="{{ $repositorio->generacion }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Autor(es)</td>
                            <td>
                                @foreach ($usuarios as $user)
                                    <input type="text"
                                           class="project-info__input"
                                           value="{{ $user->email }}"
                                           disabled>
                                @endforeach
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="project-info__footer justify-content-end">
                    <button type="button" id="cancel" class="btn btn-danger me-2"><i class="fa-solid fa-xmark"></i> Cancelar</button>
                    <button class="btn btn-green" type="submit">Actualizar</button>
                </div>
            </form>
        </div>
        
        <div class="project-files mb-5">
            <div class="d-flex justify-content-between">
                <h4>Archivos cargados</h4>
                <a href="{{ route('files.create', $repositorio->slug) }}" class="btn btn-secondary btn-sm me-2"><i class="fa-solid fa-upload"></i> Subir archivo</a>
            </div>
            <table class="table project-files__table">
                {{-- <thead>
                    <tr>
                        <td>Nombre</td>
    
                    </tr>
                </thead> --}}
                <tbody>
                    @forelse ($files as $file)
                        <tr>
                            <td>{{ $file->original_name }}</td>
                            <td>{{ $file->created_at->format("m/d/Y") }}</td>
                            <td>
                                <div class="btn-group dropstart">
                                    <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="{{ route('files.download', $file->id) }}"><i class="fa-solid fa-download"></i> Descargar</a></li>
                                        {{-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Eliminar</a></li> --}}
                                        <li>
                                            <a class="dropdown-item delete" 
                                                data-id="{{ $file->id }}"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#modalDelete">
                                                <i class="fa-solid fa-trash-can"></i> Eliminar
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                
                            </td>
                        </tr>
                    @empty
                        <div class="text-center my-5">
                            <p class="fs-5 fw-bolder">Aún no se ha subido ningún archivo</p>
                        </div>
                    @endforelse
                </tbody>
            </table>
        </div>

    </div>
</div>

<!-- Modal Delete -->
<x-modal id="modalDelete" title="¿Quieres eliminar este archivo?">
    <x-slot name="footer">
      <form id="delete-student" method="POST" action="{{ route('files.destroy', ':id') }}">
        @method('delete')
        @csrf
        <button type="submit" class="btn btn-success">Aceptar</button>      
       </form>
    </x-slot>
</x-modal>

@endsection

@section('footer')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.6.0/bootstrap-tagsinput.min.js" integrity="sha512-SXJkO2QQrKk2amHckjns/RYjUIBCI34edl9yh0dzgw3scKu0q4Bo/dUr+sGHMUha0j9Q1Y7fJXJMaBi4xtyfDw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        $('input[data-role="tagsinput"]').tagsinput({
			trimValue: true,
			confirmKeys: [44, 32],
			focusClass: 'my-focus-class',
			maxTags: 8
		});

        $('.bootstrap-tagsinput input').addClass('project-info__input');
        $('.bootstrap-tagsinput input').prop( "disabled", true );

		// $('.bootstrap-tagsinput input')
		// 	.on('focus', function() {
		// 		$(this).closest('.bootstrap-tagsinput').addClass('has-focus');
		// 	})
		// 	.on('blur', function() {
		// 		$(this).closest('.bootstrap-tagsinput').removeClass('has-focus');
		// 	});
        
        const editForm = document.querySelector('.project-info__form'),
              editFormInputs = document.querySelectorAll('.project-info__input');

        document.getElementById('enableEdit')
            .addEventListener('click', () => {
                toggleForm();
            })
        
        document.getElementById('cancel')
            .addEventListener('click', () => {
                toggleForm();
            })

        const toggleForm = () => {
            editForm.classList.toggle('active');

            editFormInputs.forEach(input => {
                input.disabled = !input.disabled;
                
            })
        }

        // || Delete modal
        // -----------------------------------------------------

        const deleteButtons = document.querySelectorAll('.project-files__table .delete'),
              deleteForm = document.querySelector('#modalDelete form'),
              deleteUrl = deleteForm.action;

        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const idIndex = deleteUrl.lastIndexOf('/');
                const {dataset: {id} } = this;
                
                if (idIndex != -1) {
                    deleteForm.action = `${ deleteUrl.substr(0, idIndex) }/${ id }`;
                }
            })
        })
    </script>
@endsection