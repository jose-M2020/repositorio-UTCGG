@extends('layouts.app')

@section('title', 'Mis repositorios')

@section('head')

@endsection

@section('dashboard-content')

<div class="row">
  <div class="d-flex justify-content-between align-items-center my-3">
    <div>
      <h1 class="mb-0" style="font-size: 2rem">
        {{ auth()->user()->roles[0]->name === 'alumno' ? 'Mis repositorios' : 'Colaboraciones' }}
      </h1>
    </div>
    <div>
      <a href="{{ route('repositorios.create') }}" class="btn btn-green"><i class="fa-solid fa-folder-open"></i> Nuevo</a>
    </div>
  </div>
		{{-- {{ dd($repositorios) }} --}}
        <div class="d-flex flex-column gap-3 mb-5">
          <ul class="list-group projects-list">
            @forelse ($repositorios as $repositorio)
                <li class="projects-list__item list-group-item">
                  <a href="{{ route('repositorios.user.show', $repositorio->slug) }}" class="d-flex align-items-center">
                    <div class="flex-grow-1 me-4">
                      <p class="mb-2 projects-list__title">{{ $repositorio->nombre_rep }} <span><i class="fa-solid {{ $repositorio->publico ? 'fa-globe' : 'fa-lock' }}"></i> {{ $repositorio->publico ? 'Público' : 'Privado' }}</span></p>
                      <p class="projects-list__description">{{ $repositorio->descripcion }}</p>
                      <div class="d-flex justify-content-between projects-list__info">
                        <span>
                          <i class="fa-solid fa-user"></i> {{ $repositorio->created_by }}
                        </span>
                        <span>
                          <i class="fa-solid fa-calendar"></i> {{ $repositorio->created_at->format("m/d/Y") }}
                        </span>
                      </div>
                    </div>
                    <div class="projects-list__arrow">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </li>  

            @empty
                <p>Aún no has creado ningún repositorio</p>
                <button class="btn">Crear nuevo repositorio</button>
            @endforelse
          </ul>
        </div>
</div>

@endsection

@section('footer')

@endsection