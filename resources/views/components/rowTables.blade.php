
  @forelse($alumnos as $alumno)
    <tr>                
      <td>{{ $alumno->nombre }}</td>
      <td>{{ $alumno->email }}</td>
      <td>{{ $alumno->carrera }}</td>
      <td>{{ $alumno->cuatrimestre }}</td>
      <td>{{ $alumno->created_at }}</td>
      <td id="{{ $alumno->id }}"><i id="editUser" class="fas fa-user-edit"></i></td>
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
  
