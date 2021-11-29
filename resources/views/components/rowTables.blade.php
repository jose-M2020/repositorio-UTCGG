
  @forelse($alumnos as $alumno)
    <tr>                
      <td>{{ $alumno->nombre }}</td>
      <td>{{ $alumno->email }}</td>
      <td>{{ $alumno->carrera }}</td>
      <td>{{ $alumno->cuatrimestre }}</td>
      <td>{{ $alumno->created_at }}</td>
      <td id="{{ $item->id }}">
        <button id="editUser" data-bs-toggle="modal" data-bs-target="#modalEdit"><i class="fas fa-user-edit"></i></button>
      </td>
    </tr>
  @empty
    <tr>
      <td>No hay registros para está búsqueda</td>
    </tr>
  @endforelse
  <tr>
    <td colspan="3" align="center">
      {{ $alumnos->links('pagination::bootstrap-4') }}
    </td>
  </tr>
  
