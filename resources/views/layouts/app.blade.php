@extends('layouts.main')

@section('content')

@section('content')

{{-- <x-app-layout> --}}
<div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <span class="fs-5 pb-3">
                    @auth('docente')
                        Docente
                    @endauth
                    @auth('alumno')
                        Alumno
                    @endauth
                    @auth('admin')
                        Admin
                    @endauth
                </span>
                <ul class="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="{{ route('dashboard') }}" class="nav-link px-0">
                            <i class="fas fa-home fs-5"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    @auth('alumno')
                        <li class="nav-item">
                            <a href="/files" class="nav-link px-0">
                                <i class="far fa-folder-open fs-5"></i> <span class="ms-1 d-none d-sm-inline">Archivos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('repositorios.create') }}" class="nav-link px-0">
                                <i class="far fa-file fs-5"></i> <span class="ms-1 d-none d-sm-inline">Registrar repositorio</span>
                            </a>
                        </li>
                    @endauth
                    @auth('docente')
                        <li class="nav-item position-relative">
                            <a href="{{ route('alumnos') }}" class="nav-link px-0">
                                <i class="far fa-user fs-5"></i> <span class="ms-1 d-none d-sm-inline">Usuarios</span>
                            </a>
                            {{-- <ul class="bg-dark p-3 position-absolute top-0 start-100">
                                <li>Alumnos</li>
                                <li>Docentes</li>
                                <li>Administradores</li>
                            </ul> --}}
                        </li>
                    @endauth
                    @auth('admin')
                        <li class="nav-item">
                            <a href="#" class="nav-link px-0">
                                <i class="far fa-user fs-5"></i> <span class="ms-1 d-none d-sm-inline">Usuarios</span>
                            </a>
                        </li>                        
                    @endauth
                </ul>
            </div>
        </div>

        
        <div class="col py-3">
            @yield('dashboard-content')
        </div>
    </div>
</div>

@endsection
