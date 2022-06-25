<header class="sticky-top">
        <nav class="navbar navbar-expand-md">
          <div class="container">
            <a class="navbar-logo" href="/">
                <img src="{{ set_url('img/logo1.png') }}" alt="logo repositorio" />
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
                <x-navbar.link link="{{ route('home') }}" name="Inicio" routeName="home" class="px-2" />
                <x-navbar.link link="{{ route('repositorios.index') }}" name="Repositorios" routeName="repositorios.*" class="px-2" />
                @guest
                    <x-navbar.link link="{{ route('login') }}" name="Acceder" routeName="login" class="px-2" />
                @endguest

                {{--
                @auth('alumno')
                    <x-navbar.link dropdown="true">
                        <x-slot name="name"><i class="far fa-star me-1"></i>Favoritos</x-slot>
                    </x-navbar.link>
                @endauth
                --}}
                
                @auth('admin')
                  <li class="nav-item text-center p-2 p-md-0 dropdown">
                    <a
                      class="nav-link dropdown-toggle hidden-arrow"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div class="position-relative d-inline">
                          <i class="d-none d-md-inline fas fa-bell me-2"></i>
                          <p class="d-inline d-md-none">Notificaciones</p>
                          <span class="badge rounded-pill badge-notification bg-danger position-absolute top-0 start-100 translate-middle">1</span>
                      </div>
                    </a>
                    <ul class="notifications dropdown-menu dropdown-menu-end">
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
                @endauth
               
                @auth
                    <x-navbar.link dropdown="true" routeName="" class="px-2 auth">
                        <x-slot name="name"><i class="auth__icon far fa-user-circle me-1"></i> Mi cuenta</x-slot>
                        <ul class="dropdown-menu dropdown-menu-end p-2">
                            <li>
                                <div class="nav-user-header d-flex align-items-center">
                                  <i class="fas fa-user-circle"></i>
                                  <div class="text-start ms-2">
                                      <span>Bienvenido {{ explode(" ", auth()->user()->nombre)[0] }}!</span>
                                      @auth('alumno')
                                        <p class="mb-0">Alumno</p>
                                      @endauth
                                      @auth('docente')
                                        <p class="mb-0">Docente</p>
                                      @endauth
                                      @auth('admin')
                                        <p class="mb-0">Administrador</p>
                                      @endauth
                                  </div>
                                </div>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <x-navbar.link link="/files">
                                <x-slot name="name"><i class="fas fa-user-lock me-2"></i> Mis datos</x-slot>
                            </x-navbar.link>
                            @auth('alumno')
                                <x-navbar.link link="/files">
                                    <x-slot name="name"><i class="fas fa-folder-open fs-5 me-2"></i> Mis archivos</x-slot>
                                </x-navbar.link>
                                <x-navbar.link link="{{ route('repositorios.create') }}">
                                    <x-slot name="name"><i class="fas fa-folder-plus fs-5 me-2"></i> Subir archivos</x-slot>
                                </x-navbar.link>
                            @endauth
                            @auth('docente')
                                <x-navbar.link link="{{ route('alumnos') }}">
                                    <x-slot name="name"><i class="fas fa-users fs-5 me-2"></i> Usuarios</x-slot>
                                </x-navbar.link>
                                <x-navbar.link link="{{ route('alumnos') }}">
                                    <x-slot name="name"><i class="fas fa-user-plus fs-5 me-2"></i> Agregar usuario</x-slot>
                                </x-navbar.link>
                                <li><hr class="dropdown-divider"></li>
                                <x-navbar.link link="{{ route('repositorios.create') }}">
                                    <x-slot name="name"><i class="fas fa-folder-plus fs-5 me-2"></i> Subir Archivos</x-slot>
                                </x-navbar.link>
                            @endauth
                            @auth('admin')
                                <x-navbar.link link="{{ route('alumnos') }}">
                                    <x-slot name="name"><i class="fas fa-users me-2"></i> Usuarios</x-slot>
                                </x-navbar.link>
                                <x-navbar.link link="{{ route('alumnos') }}">
                                    <x-slot name="name"><i class="fas fa-user-plus fs-5 me-2"></i> Agregar usuario</x-slot>
                                </x-navbar.link>
                                <li><hr class="dropdown-divider"></li>
                                <x-navbar.link link="{{ route('repositorios.create') }}">
                                    <x-slot name="name"><i class="fas fa-folder-plus fs-5 me-2"></i> Subir Archivos</x-slot>
                                </x-navbar.link>      
                            @endauth
                            <li><hr class="dropdown-divider"></li>

                            <!-- <x-navbar.link link="{{ route('repositorios.create') }}">
                                <x-slot name="name">
                                    <form id="logout" method="POST" action="{{ route('logout') }}">
                                        @csrf
                                        <button type="submit"><i class="fas fa-sign-out-alt me-2"></i> Salir</button>
                                    </form>
                                </x-slot>
                            </x-navbar.link> -->

                            <li class="nav-item">
                                <form id="logout" method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="w-100 text-start"><i class="fas fa-sign-out-alt me-1"></i> Salir</button>
                                </form>
                            <li>
                        </ul>
                    </x-navbar.link>
                @endauth
              </ul>
            </div>
          </div>
        </nav>
    </header>