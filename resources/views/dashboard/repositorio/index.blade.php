@extends('layouts.app')

@section('title', 'Repositorios')

@section('head')

@endsection

@section('dashboard-content')

{{ Breadcrumbs::render('repositorios.user') }}
<div class="row">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 style="font-size: 1.8rem; letter-spacing: 3px;">
        @switch(auth()->user()->roles[0]->name)
            @case('alumno')
              Mis repositorios
              @break
            @case('docente')
              Colaboraciones
              @break
            @default
              Repositorios
        @endswitch
      </h1>
    </div>
    <div>
      <x-button.success href="{{ route('repositorios.create') }}">
        <i class="fa-solid fa-folder-open"></i> Nuevo
      </x-button.success>
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
        <div class="mb-5">
          {{ $repositorios->links() }}
        </div>
</div>

@endsection

@section('footer')

@endsection