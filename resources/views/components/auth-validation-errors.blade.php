@props(['errors'])

@if ($errors->any())
    {{-- <div {{ $attributes }}>
        <div class="font-medium text-red-600">
            {{ __('Error al iniciar sesión.') }}
        </div>

        <ul class="mt-3 list-disc list-inside text-sm text-red-600">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div> --}}
    {{-- <div class="" > --}}
        <div class="alert alert-danger alert-dismissible fade show w-auto position-fixed start-50 translate-middle-x text-white rounded" role="alert" style="z-index: 1500; top: 20px; background-color: rgb(149, 70, 70, .9); border: none;">
            <p><i class="fas fa-exclamation-circle"></i>  Error al iniciar sesión.</p>
            <ul style="margin: 0; padding: 0; list-style: none;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
            <button type="button" class="btn-close text-white" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
@endif
