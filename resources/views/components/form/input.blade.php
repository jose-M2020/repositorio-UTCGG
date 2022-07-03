@props(['text', 'id', 'name', 'value' => null])

<div class="form-floating mb-3">
  <input {{ $attributes->merge(['type' => 'text', 'class' => 'form-control', 'id' => $id, 'placeholder' => $text, 'name' => $name, 'value' => $value ? $value : old($name) ]) }}
  >
  <label for="{{ $id }}">{{ $text }}</label>
</div>