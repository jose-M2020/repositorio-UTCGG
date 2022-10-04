<!-- <button {{ $attributes->merge(['type' => 'button', 'class' => 'form__btn-submit']) }}>
    {{ $slot }}
</button> -->
<style>
    button > * {
      pointer-events: none;
    }
</style>

<button {{ $attributes->merge(['type' => 'button', 'class' => 'form__btn-submit']) }}>
    {{ $slot }}
</button>

{{-- <button class="form__btn-submit" type="submit" name="register">Registrar</button> --}}
