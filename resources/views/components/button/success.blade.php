@props(['href' => null])


@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['type' => 'button', 'class' => 'btn-custom btn-success-gradient']) }}>
        {{ $slot }}
    </a>
@else
    <button {{ $attributes->merge(['type' => 'button', 'class' => 'btn-custom btn-success-gradient']) }}>
        {{ $slot }}
    </button>
@endif

