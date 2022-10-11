@props(['errors', 'message'])

@if ($errors->any())
    <div class="alert alert-danger alert-dismissible fade show w-auto position-fixed start-50 translate-middle-x text-white rounded" 
         role="alert" 
         style="z-index: 1500; top: 20px; background-color: rgb(149, 70, 70, .9); border: none;">
        <p><i class="fas fa-exclamation-circle"></i>  {{ $message }} </p>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
        <button type="button" class="btn-close text-white" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif