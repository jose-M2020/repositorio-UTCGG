@props(['message'])

@if ($message)
    <div class="alert alert-warning alert-dismissible fade show w-auto position-fixed start-50 translate-middle-x text-white rounded" 
         role="alert" 
         style="z-index: 1500; top: 20px; background-color: rgba(208, 115, 48, .9); border: none;">
        <p><i class="fas fa-exclamation-circle"></i>  {{ $message }} </p>
        <button type="button" class="btn-close text-white" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif