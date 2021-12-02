    <header>
        <nav class="navbar navbar-expand-md fixed-top">
          <div class="container-fluid">
            <a class="navbar-logo" href="/">
                <img src="{{ set_url('img/logo1.png') }}">
                Repositorio UTCGG
            </a>
            
            <div class="d-flex align-items-center justify-content-center">
                @if(request()->routeIs('repositorios.index'))
                    <button id="open_filter" class="d-block d-md-none fs-5"><i class="fas fa-filter"></i></button>
                @endif
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-bars"></i></button>
              {{-- <span class="navbar-toggler-icon"></span> --}}
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item text-center p-2 p-md-0">
                  <a class="nav-link {{ request()->routeIs('home') ? 'active' : ''}}" aria-current="page" href="{{ route('home') }}">Inicio</a>
                </li>
                <li class="nav-item text-center p-2 p-md-0">
                  <a class="nav-link {{ request()->routeIs('repositorios.*') ? 'active' : ''}}" aria-current="page" href="{{ route('repositorios.index') }}">Repositorios</a>
                </li>
                <li class="nav-item text-center p-2 p-md-0">
                  <a class="nav-link {{ request()->routeIs('about') ? 'active' : ''}}" href="{{ route('about') }}">Acerca</a>
                </li>
                <li class="nav-item text-center p-2 p-md-0 dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ auth()->user()->nombre }}
                  </a>
                  <ul class="dropdown-menu">
                    {{-- <li><a class="dropdown-item" href="/dashboard">Panel de control</a><li> --}}

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
                        <li class="nav-item">
                            <a href="{{ route('repositorios.create') }}" class="nav-link px-0">
                                <i class="far fa-file fs-5"></i> <span class="ms-1 d-none d-sm-inline">Registrar repositorio</span>
                            </a>
                        </li>
                    @endauth
                    @auth('admin')
                        <li class="nav-item">
                            <a href="{{ route('alumnos') }}" class="nav-link px-0">
                                <i class="far fa-user fs-5"></i> <span class="ms-1 d-none d-sm-inline">Usuarios</span>
                            </a>
                        </li> 
                        <li class="nav-item">
                            <a href="{{ route('repositorios.create') }}" class="nav-link px-0">
                                <i class="far fa-user fs-5"></i> <span class="ms-1 d-none d-sm-inline">Registrar repositorio</span>
                            </a>
                        </li>                        
                    @endauth

                    <li>
                        {{-- <a class="dropdown-item" href="#">Another action</a> --}}
                        <form id="logout" method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit">Cerrar sesión <i class="fas fa-sign-out-alt"></i></button>
                        </form>
                    <li>
                        
                  </ul>
                </li>
                {{-- @auth('admin')
                  <li class="nav-item text-center p-2 p-md-0 dropdown">
                    <a
                      class="nav-link dropdown-toggle hidden-arrow"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div class="position-relative d-inline">
                          <i class="d-none d-md-inline fas fa-bell"></i>
                          <p class="d-inline d-md-none">Notificaciones</p>
                          <span class="badge rounded-pill badge-notification bg-danger position-absolute top-0 start-100 translate-middle">1</span>
                      </div>
                    </a>
                    <ul class="notifications list-group dropdown-menu dropdown-menu-end">
                      <li class=" dropdown-item list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">Daniel Vargas H.</div>
                          Modificación de repositorio.
                        </div>
                        <span class="bg-ligth rounded-rounded">Hoy</span>
                      </li>
                      <li class=" dropdown-item list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">Ana Lopéz M.</div>
                          Modificación de repositorio.
                        </div>
                        <span class="bg-ligth rounded-rounded">Ayer</span>
                      </li>
                      <li class=" dropdown-item list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">Gerardo Luis Marcos F.</div>
                          Eliminación de repositorio.
                        </div>
                        <span class="bg-ligth rounded-rounded">Ayer</span>
                      </li>
                    </ul>
                  </li>
                @endauth --}}
              </ul>
            </div>
          </div>
        </nav>
    </header>