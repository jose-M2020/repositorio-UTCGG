<div class="d-flex flex-column flex-shrink-0 min-vh-100">
    <div class="sidebar-header d-flex flex-column justify-content-center align-items-center my-4">
      <!-- <i class="fas fa-bars"></i> <span class="text"> -->
      <div class="user-icon mb-1">
        <span>{{ ucfirst(substr(auth()->user()->nombre, 0, 1)) }}</span>
      </div>
      <DIV class="user-info text-center">
        <span class="user-name mt-1">{{ Str::title(auth()->user()->nombre) }}</span>
        <small class="d-block">{{ auth()->user()->email }}</small>
      </DIV>
      {{-- <small>{{ auth()->user()->email }}</small> --}}
    </div>
    <ul class="nav nav-pills nav-flush flex-column mb-auto">
      <x-navbar.link collapse="true" id="collapseRep" class="mb-2">
          <x-slot name="name">
              <i class="fas fa-folder-open"></i>
              <span class="text">Repositorios</span>
          </x-slot>
          <ul class="submenu nav flex-column">
              @can('repositorios.create')
                <x-navbar.link link="{{ route('repositorios.create') }}" name="Nuevo"/>
              @endcan
              {{-- <x-navbar.link link="files" name="Favoritos"/> --}}
              @role('alumno')
                <x-navbar.link link="{{ route('repositorios.user') }}" name="Mis repositorios"/>
              @endrole
              @role('docente')
                <x-navbar.link link="{{ route('repositorios.user') }}" name="Colaboraciones"/>
              @endrole
          </ul>
      </x-navbar.link>
      {{-- @role('admin')
        <x-navbar.link class="my-2">
            <x-slot name="name" link="">
                <i class="fas fa-bell"></i>
                <span class="text">Mensajes</span>
            </x-slot>
        </x-navbar.link>
      @endrole --}}
      @can('usuarios.index')
        <x-navbar.link collapse="true" id="collapseUser" class="my-2">
            <x-slot name="name">
                <i class="fas fa-user"></i>
                <span class="text">Usuarios</span>
            </x-slot>
            <ul class="submenu nav flex-column">
                <x-navbar.link link="{{ route('usuarios.create') }}" name="Agregar"/>
                <x-navbar.link link="{{ route('usuarios.index') }}" name="Ver todos"/>
            </ul>
        </x-navbar.link>
      @endcan
      @can('roles.index')
        <x-navbar.link class="my-2" link="{{ route('roles.index') }}">
            <x-slot name="name">
              <i class="fa-solid fa-user-lock"></i>
              <span class="text">Lista de roles</span>
            </x-slot>
        </x-navbar.link>
      @endcan

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
</div>