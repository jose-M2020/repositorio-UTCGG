@props(['title', 'body' => null, 'footer', 'id'])

<div {{ $attributes->merge([
  'class' => 'modal fade',
  'id' => $id,
  'tabindex' => "-1",
  'aria-labelledby' => $id.'Label',
  'aria-hidden' => "true"
  ]) }}>
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="{{$id.'Label'}}">{{ $title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        @if($body)
          <div class="modal-body">
            {{ $body }}
          </div>
        @endif
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          {{ $footer }}
        </div>
      </div>
    </div>
</div>