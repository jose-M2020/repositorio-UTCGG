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
              @switch(auth()->user()->roles[0]->name)
                @case('alumno')
                  <x-navbar.link link="{{ route('repositorios.user') }}" name="Mis repositorios"/>
                  @break
                @case('docente')
                  <x-navbar.link link="{{ route('repositorios.user') }}" name="Colaboraciones"/>
                  @break
                @default
                  <x-navbar.link link="{{ route('repositorios.user') }}" name="Repositorios"/>
              @endswitch
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

      {{-- <x-navbar.link collapse="true" id="collapseConfig" class="my-2">
          <x-slot name="name">
              <i class="fas fa-cog"></i>
              <span class="text">Configuración</span>
          </x-slot>
          <ul class="submenu nav flex-column">
              <x-navbar.link link="" name="Mis datos"/>
          </ul>
      </x-navbar.link> --}}

      <x-navbar.link class="my-2" link="{{ route('usuarios.show', auth()->user()->id) }}">
        <x-slot name="name">
          <i class="fa-solid fa-cog"></i>
          <span class="text">Perfil</span>
        </x-slot>
      </x-navbar.link>
      
    </ul>
</div>