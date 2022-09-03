@extends('layouts.app')

@section('title', 'Mis repositorios')

@section('head')

@endsection

@section('dashboard-content')

<div class="row">
    <h1>Mis repositorios</h1>
		{{-- {{ dd($repositorios) }} --}}
        <div class="d-flex flex-column gap-3">
          <ul class="list-group projects-list">
            @forelse ($repositorios as $repositorio)
                <li class="projects-list__item list-group-item">
                  <a href="{{ route('repositorios.user.show', $repositorio->slug) }}" class="d-flex align-items-center">
                    <div class="flex-grow-1 me-4">
                      <p class="mb-2 projects-list__title">{{ $repositorio->nombre_rep }} <span>{{ $repositorio->publico ? 'Público' : 'Privado' }}</span></p>
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