@props(['message'])

@if ($message)
    <div class="alert alert-success">
        <p><i class="fas fa-check-circle"></i> {{ $message }}</p>
    </div>
@endif