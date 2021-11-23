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
                        <a href="#" class="nav-link px-0">
                            <i class="fas fa-home fs-5"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-0">
                            <i class="far fa-folder-open fs-5"></i> <span class="ms-1 d-none d-sm-inline">Archivos</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-0">
                            <i class="far fa-user fs-5"></i> <span class="ms-1 d-none d-sm-inline">Usuarios</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col py-3">
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6 bg-white border-b border-gray-200">
                            @auth('docente')
                                Docente
                            @endauth
                            @auth('alumno')
                                Alumno
                            @endauth
                            @auth('admin')
                                Admin
                            @endauth
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
