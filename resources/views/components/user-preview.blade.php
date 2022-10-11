@forelse ($users as $user)
    <li class="user-preview search-box__result-item item-content">
        {{-- @if ($member = $members->where('id', $user->id)->first())
            {{ $member }}
        @endif --}}
        <input type="hidden" name="user[]" value="{{ $user->id }}">
        <div class="user-preview__profile">
            @if ($user->roles[0]->name === 'docente')
                <i class="fa-solid fa-user-tie"></i>
            @else
                <i class="fa-solid fa-user-graduate"></i>
            @endif
        </div>
        <div class="user-preview__info">
            <strong class="user-preview__name">{{ ucfirst($user->nombre) }} {{ ucfirst($user->apellido) }}</strong>
            <div>
                <span class="user-preview__email">{{ $user->email }}</span>
                <span class="user-preview__rol"> • {{ ucfirst($user->roles[0]->name) }}</span>
            </div>
        </div>
        <span class="remove"><i class="fa-solid fa-x"></i></span>
    </li>
@empty
    <li class="p-3">No se encontraron resultados.</li>
@endforelse