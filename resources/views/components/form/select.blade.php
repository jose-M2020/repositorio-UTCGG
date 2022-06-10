@props(['text', 'id', 'options' => []])

<div class="form-floating mb-3">
  <select {{ $attributes->merge(['class' => 'form-select', 'id' => $id, 'placeholder' => $text]) }} >
    <option selected disabled>Seleccionar</option>
    @foreach($options as $key=>$val)
      <option value="{{ $key }}">{{ $val }}</option>
    @endforeach  </select>
  <label for="{{ $id }}">{{$text }}</label>
</div>