@props(['href' => null, 'loading' => 'false'])


@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['type' => 'button', 'class' => 'btn-custom btn-success-gradient']) }}>
        {{ $slot }}
    </a>
@else
    <button 
        {{ $attributes->merge([
            'type' => 'button',
            'class' => 'btn-custom btn-success-gradient'
        ]) }}
    >
      <div class="loading-msg">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </div>
      <div>
        {{ $slot }}
      </div>
    </button>
@endif

