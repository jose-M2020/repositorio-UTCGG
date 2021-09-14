@props(['errors', 'message'])

@if ($errors->any())
    <div class="alert alert-danger">
        <p><i class="fas fa-exclamation-circle"></i>  {{ $message }}</p>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif