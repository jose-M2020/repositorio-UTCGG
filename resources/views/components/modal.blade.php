@props([
  'title', 
  'id',
  'footer' => null, 
  'body' => null, 
  'hasCancelBtn' => 'true',
  'isCenter' => null 
])

<div {{ $attributes->merge([
  'class' => 'modal fade',
  'id' => $id,
  'tabindex' => "-1",
  'aria-labelledby' => $id.'Label',
  'aria-hidden' => "true"
  ]) }}>
    <div @class([
        'modal-dialog',
        'modal-dialog-centered' => $isCenter,
    ])>
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
        @if ($footer)
          <div class="modal-footer">
            @if ($hasCancelBtn === 'true')
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            @endif
            {{ $footer }}
          </div>
        @endif
      </div>
    </div>
</div>