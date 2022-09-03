@extends('layouts.main')

@section('content')

@section('content')

{{-- <x-app-layout> --}}
<div class="container-fluid">
    <div class="row flex-nowrap">
        <aside class="dashboard-sidebar col-auto d-none d-md-block d-flex flex-column flex-shrink-0 bg-dark text-light">
            <div class="sidebar-header d-flex align-items-center text-light my-4">
              <i class="fas fa-bars"></i> <span class="text">Panel de control</span>
            </div>
            <ul class="nav nav-pills nav-flush flex-column mb-auto">
              <x-navbar.link collapse="true" id="collapseRep" class="my-2">
                  <x-slot name="name">
                      <i class="fas fa-folder-open"></i>
                      <span class="text">Repositorios</span>
                  </x-slot>
                  <ul class="submenu nav flex-column">
                      <x-navbar.link link="{{ route('repositorios.create') }}" name="Nuevo"/>
                      <x-navbar.link link="files" name="Favoritos"/>
                      <x-navbar.link link="files" name="Mis repositorios"/>
                  </ul>
              </x-navbar.link>
              <x-navbar.link class="my-2">
                  <x-slot name="name" link="">
                      <i class="fas fa-bell"></i>
                      <span class="text">Mensajes</span>
                  </x-slot>
              </x-navbar.link>
              <x-navbar.link collapse="true" id="collapseUser" class="my-2">
                  <x-slot name="name">
                      <i class="fas fa-user"></i>
                      <span class="text">Usuarios</span>
                  </x-slot>
                  <ul class="submenu nav flex-column">
                      <x-navbar.link link="{{ route('alumnos.create') }}" name="Agregar"/>
                      <x-navbar.link link="{{ route('alumnos') }}" name="Ver todos"/>
                  </ul>
              </x-navbar.link>
              <x-navbar.link collapse="true" id="collapseConfig" class="my-2">
                  <x-slot name="name">
                      <i class="fas fa-cog"></i>
                      <span class="text">Configuración</span>
                  </x-slot>
                  <ul class="submenu nav flex-column">
                      <x-navbar.link link="" name="Mis datos"/>
                  </ul>
              </x-navbar.link>
              {{-- <li class="nav-item">
                <a href="#" class="nav-link active py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                  <svg class="bi" width="24" height="24" role="img" aria-label="Home"><use xlink:href="#home"></use></svg>
                </a>
              </li> --}}
              
              {{-- <li>
                <a href="#" class="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                  <svg class="bi" width="24" height="24" role="img" aria-label="Dashboard"><use xlink:href="#speedometer2"></use></svg>
                </a>
              </li> --}}
              
            </ul>
            {{-- <div class="dropdown border-top">
              <a href="#" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" class="rounded-circle">
              </a>
              <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3" style="">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div> --}}
        </aside>

       {{--  <div class="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
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
        </div> --}}

        <main class="col py-3">
            @yield('dashboard-content')
        </main>
    </div>
</div>

<script>
    const sidebar = document.querySelector('.dashboard-sidebar');
    const main = document.querySelector('main');
    
    ['mouseover','mouseout'].forEach(event => {
        sidebar.addEventListener(event, e => {
            main.classList.toggle('overlay')
        })
    })

</script>

@endsection