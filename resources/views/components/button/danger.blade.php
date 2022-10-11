@props(['href' => null])

@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['type' => 'button', 'class' => 'btn-custom btn-danger-gradient']) }}>
        {{ $slot }}
    </a>
@else
    <button {{ $attributes->merge(['type' => 'button', 'class' => 'btn-custom btn-danger-gradient']) }}>
        {{ $slot }}
    </button>
@endif