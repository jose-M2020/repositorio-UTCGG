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
    <div class="mt-2 mb-4">
        <a href="{{ route('repositorios.user', auth()->user()->id) }}"><i class="fa-solid fa-arrow-left"></i> Regresar</a>
    </div>
    
    <div>
        <ul class="nav nav-tabs mb-4 justify-content-center" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="file-tab" data-bs-toggle="tab" data-bs-target="#file" type="button" role="tab" aria-controls="file" aria-selected="true"><i class="fa-solid fa-folder-tree"></i> Archivos</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="false"><i class="fa-solid fa-file-invoice"></i> Información</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="miembros-tab" data-bs-toggle="tab" data-bs-target="#miembros" type="button" role="tab" aria-controls="miembros" aria-selected="false"><i class="fa-solid fa-users"></i> Miembros</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="file" role="tabpanel" aria-labelledby="file-tab">
                <div class="project-files mb-5">
                    <div class="d-flex justify-content-between">
                        <h4>Documentos</h4>
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
                                            <button type="button" class="btn py-0 px-3" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                            
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="{{ route('files.download', $file->id) }}"><i class="fa-solid fa-download"></i> Descargar</a></li>
                                                {{-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Eliminar</a></li> --}}
                                                <li>
                                                    <a class="dropdown-item delete"
                                                        id="doc-file"
                                                        data-id="{{ $file->id }}"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDeleteFile">
                                                        <i class="fa-solid fa-trash-can"></i> Eliminar
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </td>
                                </tr>
                            @empty
                                <div class="text-center my-5">
                                    <i class="fa-regular fa-folder-open fs-1"></i>
                                    <p class="fs-5 fw-bolder">No se encontro ningún archivo</p>
                                </div>
                            @endforelse
                        </tbody>
                    </table>
                    @if ($repositorio->imagenes)
                        <h4>Galeria</h4>
                        <div class="project-files__img-container">
                            @foreach (json_decode($repositorio->imagenes) as $index => $img)
                                <div class="project-files__img-item position-relative">
                                    <img src="{{ Storage::disk('s3')->url($img) }}" alt="Imagen del repositorio" loading="lazy">
                                    <div class="btn-group dropstart position-absolute top-0 end-0">
                                        <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="{{ Storage::disk('s3')->url($img) }}"><i class="fa-solid fa-eye"></i> Ver</a></li>
                                            {{-- <li><a class="dropdown-item" href="{{ route('files.download', $file->id) }}"><i class="fa-solid fa-download"></i> Descargar</a></li> --}}
                                            {{-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Eliminar</a></li> --}}
                                            <li>
                                                <a class="dropdown-item delete" 
                                                    id="image-file"
                                                    data-id="{{ $index }}"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalDeleteFile">
                                                    <i class="fa-solid fa-trash-can"></i> Eliminar
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
            <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                <h4>Repositorio</h4>
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
                                  @if ($repositorio->created_at < $repositorio->updated_at)
                                    <span><i class="fa-solid fa-clock-rotate-left"></i> {{ $repositorio->updated_at->diffForHumans() }}</span>
                                  @endif
                              </div>
                          </div>
                        </div>
                        <table class="table border project-info__table">
                            <tbody>
                                <tr>
                                    <td colspan="2" class="p-2">
                                        {{-- <div class="form-check d-flex align-items-center justify-content-end gap-2">
                                            <input class="form-check-input" 
                                                   type="checkbox" 
                                                   id="publico" 
                                                   name="publico" 
                                                   style="width: 20px; height: 20px" 
                                                   {{ $repositorio->publico ? 'checked' : '' }}>
                                            <label class="form-check-label" for="publico" style="line-height: 17px">
                                                <i class="fa-solid fa-lock-open"></i> Público
                                            </label>
                                        </div> --}}

                                        <div class="d-flex align-items-center justify-content-end">
                                            @if ($repositorio->publico)
                                                <div class="form-check">
                                                    <input class="form-check-input project-info__input" 
                                                        type="radio" 
                                                        name="visibilidad" 
                                                        value="publico" 
                                                        id="publico"
                                                        checked>
                                                    <label class="form-check-label" for="publico">
                                                        <i class="fa-solid fa-globe"></i> Público
                                                        <small class="d-block">El repositorio será visible para todo el público</small>
                                                    </label>
                                                </div>
                                            @else
                                                <div class="form-check mb-1">
                                                    <input class="form-check-input project-info__input" 
                                                        type="radio" 
                                                        name="visibilidad" 
                                                        value="privado" 
                                                        id="privado"
                                                        checked>
                                                    <label class="form-check-label" for="privado">
                                                        <i class="fa-solid fa-lock"></i> Privado
                                                        <small class="d-block">El acceso al repositorio será restringido</small>
                                                    </label>
                                                </div>
                                            @endif

                                            <div class="visibility-content">
                                                @if ($repositorio->publico)
                                                    <div class="form-check mb-1">
                                                        <input class="form-check-input" 
                                                            type="radio" 
                                                            name="visibilidad" 
                                                            value="privado" 
                                                            id="privado" >
                                                        <label class="form-check-label" for="privado">
                                                            <i class="fa-solid fa-lock"></i> Privado
                                                            <small class="d-block">El acceso al repositorio será restringido</small>
                                                        </label>
                                                    </div>
                                                @else
                                                    <div class="form-check">
                                                        <input class="form-check-input" 
                                                            type="radio" 
                                                            name="visibilidad" 
                                                            value="publico" 
                                                            id="publico">
                                                        <label class="form-check-label" for="publico">
                                                            <i class="fa-solid fa-globe"></i> Público
                                                            <small class="d-block">El repositorio será visible para todo el público</small>
                                                        </label>
                                                    </div>
                                                @endif
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nombre</td>
                                    <td><input type="text"
                                               name="nombre_repositorio"
                                               class="project-info__input" 
                                               value="{{ $repositorio->nombre_rep }}"
                                               disabled
                                    ></td>
                                </tr>
                                <tr>
                                    <td>Descripción</td>
                                    <td><textarea name="descripcion"
                                                  class="project-info__input"
                                                  rows="3"
                                                  disabled>{{ $repositorio->descripcion }}
                                    </textarea></td>
                                    
                                </tr>
                                <tr>
                                    <td>Palabras clave</td>
                                    <td><input type="text"
                                               name="palabras_clave"
                                               class="project-info__input"
                                               value="{{ $repositorio->palabras_clave }}" 
                                               data-role="tagsinput"
                                               disabled
                                    ></td>
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
                                    <td>Carrera</td>
                                    <td>
                                        <select id="project_level" name="carrera" class="form-select project-info__input" disabled>
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
                                    <td>Generacion</td>
                                    <td><input type="text" 
                                               name="generacion"
                                               class="project-info__input" 
                                               value="{{ $repositorio->generacion }}"
                                               disabled
                                    ></td>
                                </tr>
                                <tr>
                                    <td>Asesor externo</td>
                                    <td><input type="text" 
                                               name="asesor_externo"
                                               class="project-info__input"
                                               value="{{ $repositorio->asesor_externo }}"
                                               disabled
                                    ></td>
                                </tr>
                                <tr>
                                    <td>Empresa</td>
                                    <td><input type="text"
                                               name="empresa"
                                               class="project-info__input"
                                               value="{{ $repositorio->empresa }}"
                                               disabled
                                    ></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="project-info__footer justify-content-end">
                            <button type="button" id="cancel" class="btn btn-danger me-2"><i class="fa-solid fa-xmark"></i> Cancelar</button>
                            <button class="btn btn-green" type="submit">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="tab-pane fade" id="miembros" role="tabpanel" aria-labelledby="miembros-tab">
                <div class="row">
                    <div class="col-md-2 text-center">
                        <span class="d-block fs-1"><i class="fa-solid fa-users-line"></i></span>
                        <span>3 integrantes</span>
                    </div>
                    <div class="col-md-10">
                        <div class="d-flex justify-content-between mb-3">
                            <h4 class="fs-3">Miembros</h4>
                            <a  class="btn btn-green"
                                data-bs-toggle="modal" 
                                data-bs-target="#modalSearch">
                                Agregar miembro
                            </a>
                        </div>
                        <table class="table">
                            <tbody>
                                @foreach ($usuarios as $index => $user)
                                    <tr>
                                        <td class="user-preview">
                                            <div class="user-preview__profile">
                                                @if ($user->roles[0]->name === 'docente')
                                                    <i class="fa-solid fa-user-tie"></i>
                                                @else
                                                    <i class="fa-solid fa-user-graduate"></i>
                                                @endif
                                            </div>
                                            <div class="user-preview__info">
                                                <strong class="user-preview__name">{{ ucfirst($user->nombre) }} {{ ucfirst($user->apellido) }}</strong>
                                                <span class="user-preview__email">{{ $user->email }} - {{ ucfirst($user->roles[0]->name) }}</span>
                                            </div>
                                            <div class="user-preview__actions">
                                                <button class="delete"
                                                        id="delete-member"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDeleteMember-{{$index}}">
                                                        <i class="fa-solid fa-trash-can"></i> Eliminar
                                                </button>
                                                
                                                <!-- Modal - Delete member -->
                                                <x-modal id="modalDeleteMember-{{$index}}" title="¿Quieres eliminar el usuario de este repositorio?" isCenter="true">
                                                    <x-slot name="footer">
                                                    <form id="delete-student" method="POST" action="{{ route('repositorios.member.destroy', ['repositorio' => $repositorio->slug, 'usuario' => $user->id ]) }}">
                                                        @method('delete')
                                                        @csrf
                                                        <button type="submit" class="btn btn-success">Aceptar</button>      
                                                    </form>
                                                    </x-slot>
                                                </x-modal>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </td>
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>

        {{-- <div class="project-info mb-5">
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
                          @if ($repositorio->created_at < $repositorio->updated_at)
                            <span><i class="fa-solid fa-clock-rotate-left"></i> {{ $repositorio->updated_at->diffForHumans() }}</span>
                          @endif
                      </div>
                  </div>
                </div>
                <table class="table border project-info__table">
                    <tbody>
                        <tr>
                            <td colspan="2" class="p-2">
                                <div class="form-check d-flex align-items-center justify-content-end gap-2">
                                    <input class="form-check-input" type="checkbox" id="publico" name="publico" style="width: 20px; height: 20px">
                                    <label class="form-check-label" for="publico" style="line-height: 17px">
                                        <i class="fa-solid fa-lock-open"></i> Público
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td><input type="text"
                                       name="nombre_repositorio"
                                       class="project-info__input" 
                                       value="{{ $repositorio->nombre_rep }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Descripción</td>
                            <td><textarea name="descripcion"
                                          class="project-info__input"
                                          rows="3"
                                          disabled>{{ $repositorio->descripcion }}
                            </textarea></td>
                            
                        </tr>
                        <tr>
                            <td>Palabras clave</td>
                            <td><input type="text"
                                       name="palabras_clave"
                                       class="project-info__input"
                                       value="{{ $repositorio->palabras_clave }}" 
                                       data-role="tagsinput"
                                       disabled
                            ></td>
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
                            <td>Carrera</td>
                            <td>
                                <select id="project_level" name="carrera" class="form-select project-info__input" disabled>
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
                            <td>Generacion</td>
                            <td><input type="text" 
                                       name="generacion"
                                       class="project-info__input" 
                                       value="{{ $repositorio->generacion }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Asesor externo</td>
                            <td><input type="text" 
                                       name="asesor_externo"
                                       class="project-info__input"
                                       value="{{ $repositorio->asesor_externo }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Empresa</td>
                            <td><input type="text"
                                       name="empresa"
                                       class="project-info__input"
                                       value="{{ $repositorio->empresa }}"
                                       disabled
                            ></td>
                        </tr>
                        <tr>
                            <td>Miembros</td>
                            <td>
                                @foreach ($usuarios as $user)
                                    <div class="d-flex align-items-center">
                                        @if ($user->roles[0]->name === 'docente')
                                            <i class="fa-solid fa-user-tie"></i>
                                        @else
                                            <i class="fa-solid fa-user-graduate"></i>
                                        @endif
                                        <input type="text"
                                            name="usuario[]"
                                            class="project-info__input"
                                            value="{{ $user->email }}"
                                            disabled>                                        
                                    </div>
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
        </div> --}}
        
        {{-- <div class="project-files mb-5">
            <div class="d-flex justify-content-between">
                <h4>Archivos guardados</h4>
                <a href="{{ route('files.create', $repositorio->slug) }}" class="btn btn-secondary btn-sm me-2"><i class="fa-solid fa-upload"></i> Subir archivo</a>
            </div>
            <table class="table project-files__table">
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
                                        <li>
                                            <a class="dropdown-item delete"
                                                id="doc-file"
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
                            <i class="fa-regular fa-folder-open fs-1"></i>
                            <p class="fs-5 fw-bolder">No se encontro ningún archivo</p>
                        </div>
                    @endforelse
                </tbody>
            </table>
            @if ($repositorio->imagenes)
                <div class="project-files__img-container">
                    @foreach (json_decode($repositorio->imagenes) as $index => $img)
                        <div class="project-files__img-item position-relative">
                            <img src="{{ Storage::disk('s3')->url($img) }}" alt="Imagen del repositorio" loading="lazy">
                            <div class="btn-group dropstart position-absolute top-0 end-0">
                                <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="{{ Storage::disk('s3')->url($img) }}"><i class="fa-solid fa-eye"></i> Ver</a></li>
                                    <li>
                                        <a class="dropdown-item delete" 
                                            id="image-file"
                                            data-id="{{ $index }}"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalDelete">
                                            <i class="fa-solid fa-trash-can"></i> Eliminar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div> --}}

    </div>
</div>

<!-- Modal - Delete file -->
<x-modal id="modalDeleteFile" title="¿Quieres eliminar este archivo?" isCenter="true">
    <x-slot name="footer">
      <form id="delete-student" method="POST" action="{{ route('files.destroy', ['repositorio' => $repositorio->slug,'type' => 'doc', 'file' => ':id']) }}">
        @method('delete')
        @csrf
        <button type="submit" class="btn btn-success">Aceptar</button>      
       </form>
    </x-slot>
</x-modal>

<!-- Modal Search -->
<x-modal id="modalSearch" title="Agregar usuario" hasCancelBtn="false">
    <x-slot name="body">
        <div class="search-box__item position-relative">
            <input type="text" class="form-control" data-rol="search" placeholder="Buscar por correo electrónico">
            <div class="search-box__results transparent">
                <ul></ul>
                <div class="spinner hide"></div>
            </div>
            <form action="{{ route('repositorios.member.store', $repositorio->slug) }}" method="POST">
                @csrf
                <ul class="search-box__selected p-0"></ul>
                <button type="submit" class="form__btn-submit w-100 mt-3">Agregar</button>
            </form>
        </div>
    </x-slot>
    {{-- <x-slot name="footer">
        <button type="submit" class="btn btn-green w-100">Agregar</button>      
    </x-slot> --}}
</x-modal>

@endsection

@section('footer')
    <script type="text/javascript" src="{{ set_url('js/class/Emmet.js') }}"></script>
    <script src="{{ set_url('js/main.js') }}" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.6.0/bootstrap-tagsinput.min.js" integrity="sha512-SXJkO2QQrKk2amHckjns/RYjUIBCI34edl9yh0dzgw3scKu0q4Bo/dUr+sGHMUha0j9Q1Y7fJXJMaBi4xtyfDw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        $('input[data-role="tagsinput"]').tagsinput({
			trimValue: true,
			confirmKeys: [44, 32],
			focusClass: 'my-focus-class',
			maxTags: 8
		});

        $('.bootstrap-tagsinput').addClass('project-info__input-container');
        $('.bootstrap-tagsinput input').prop( "disabled", true );
        
        const editForm = document.querySelector('.project-info__form'),
              editFormInputs = document.querySelectorAll('.project-info__input:not([type=radio])');

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

        const deleteButtons = document.querySelectorAll('.delete'),
              deleteForm = document.querySelector('#modalDeleteFile form'),
              deleteUrl = deleteForm.action;

        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const idIndex = deleteUrl.lastIndexOf('/'),
                      {dataset: {id} } = this,
                      type = (this.id === 'image-file') ? 'image' : 'doc';

                if (idIndex != -1) {
                    deleteForm.action = `${ deleteUrl.replace(/^(.+)(\/[^\/]+\/.+)$/g, '$1') }/${ type }/${ id }`;
                }
            })
        })
    </script>
@endsection