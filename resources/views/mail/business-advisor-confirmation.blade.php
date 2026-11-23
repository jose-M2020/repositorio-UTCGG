<x-mail::message>
# Confirmacion de asesor empresarial

Se registro tu participacion como asesor empresarial del proyecto **{{ $projectTitle }}**.

@if ($companyName)
Empresa asociada: **{{ $companyName }}**.
@endif

Los datos se usan unicamente para vinculacion academica y seguimiento del proyecto.

<x-mail::button :url="$confirmUrl">
Confirmar participacion
</x-mail::button>

<x-mail::button :url="$rejectUrl" color="error">
Rechazar o solicitar correccion
</x-mail::button>

Consulta el aviso de privacidad de la institucion antes de confirmar.

Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
