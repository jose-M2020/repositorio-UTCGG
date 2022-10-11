@props(['message'])

@if ($message)
    <div class="alert alert-success alert-dismissible fade show w-auto position-fixed start-50 translate-middle-x text-white rounded" 
         role="alert" 
         style="z-index: 1500; top: 20px; background-color: rgba(21, 108, 64, .9); border: none;">
        <p><i class="fas fa-exclamation-circle"></i>  {{ $message }} </p>
        <button type="button" class="btn-close text-white" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif