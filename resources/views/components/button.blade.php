<!-- <button {{ $attributes->merge(['type' => 'button', 'class' => 'form__btn-submit']) }}>
    {{ $slot }}
</button> -->
<style>
    button > * {
      pointer-events: none;
    }
</style>

<button {{ $attributes->merge(['type' => 'button', 'class' => 'btn btn-outline-primary']) }}>
    {{ $slot }}
</button>

