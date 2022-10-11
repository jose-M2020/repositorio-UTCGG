@props(['id' => '' ,'link' => '#', 'name', 'routeName' => '', 'dropdown' => false, 'collapse' => false])

{{-- <a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a> --}}

@if($dropdown)
    <li {{ $attributes->merge(['class' => 'nav-item dropdown']) }}>
      <a class="nav-link text-decoration-none dropdown-toggle px-0 d-flex align-items-center {{ request()->routeIs($routeName) ? 'active' : ''}}" href="{{ $link }}" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ $name }}</a>
      {{ $slot }}
    </li>
@elseif($collapse)
    <li {{ $attributes->merge(['class' => 'nav-item']) }}>
      <a class="nav-link text-decoration-none px-0 d-flex align-items-center btn-collapse" data-bs-toggle="collapse" href="#{{ $id }}" role="button" aria-expanded="false" aria-controls="{{ $id }}">
        {{ $name }} <i class="fas fa-angle-down submenu-icon"></i>
      </a>

      {{-- <button class="btn accordion-button nav-link px-0 d-flex align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#{{ $id }}" aria-controls="{{ $id }}" aria-expanded="false">
          {{ $name }}
      </button> --}}

      <div class="collapse" id="{{ $id }}">
        {{ $slot }}
      </div>
    </li>
@else
    <li {{ $attributes->merge(['class' => 'nav-item']) }}>
      <a class="nav-link text-decoration-none px-0 d-flex align-items-center {{ request()->routeIs($routeName) ? 'active' : ''}}" aria-current="page" href="{{ $link }}">{{ $name }}</a>
    </li>
@endif