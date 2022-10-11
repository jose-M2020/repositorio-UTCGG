@props(['data', 'linkEdit' => null])

<div class="table-content"
     data-editModal="{{ $linkEdit ? false : true }}">
  @if($data?->total())
    <div class="table-responsive custom-table">
      <div class="container-table">
        <table class="table table-hover">
          <thead>
            <tr class="p-4">
              <th scope="col position-fixed">
                <input type="checkbox" class="form-check-input checkbox" id="checkAll" name="all">
              </th>

              @foreach($data as $item)
                @foreach($item->toArray() as $key => $val)
                  @if($key === 'id')
                    @continue
                  @endif
                  <th scope="col">{{ ucfirst($key) }}</th>
                @endforeach
                @break
              @endforeach

              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody class="p-4">
            @foreach($data as $item)
              <tr>
                <td scope="row">
                  <input type="checkbox" class="form-check-input checkbox" name="check" value="{{ $item->id }}"/>
                </td>

                @foreach($item->toArray() as $key => $val)
                {{-- TODO: tratar de mostrar el rol --}}

                  {{-- @if(is_array($val)) --}}
                      {{-- <td>{{ implode(', ',array_values($val)) }}</td> --}}
                    {{-- @continue --}}
                  {{-- @else --}}
                    @if($key === 'id')
                      @continue
                    @elseif ($key === 'created_at')
                        <td>{{ date('Y-m-d', strtotime($val)) }}</td>
                        @continue
                    @endif
                    
                    <td>{{ $val }}</td>
                  {{-- @endif --}}
                @endforeach

                <td class="actions" id="{{ $item->id }}">
                  @can('usuarios.edit')
                    @if($linkEdit)
                      <a class="actions__item edit" 
                        href="{{ route($linkEdit, $item->id) }}">
                        <i class="fas fa-user-edit"></i>
                      </a>
                    @else
                      <a class="actions__item edit" 
                        data-user="{{ json_encode($item) }}" 
                        data-bs-toggle="modal" 
                        data-bs-target="#modalEdit">
                        <i class="fas fa-user-edit"></i>
                      </a>
                    @endif
                  @endcan
                  @can('usuarios.destroy')
                    <a class="actions__item delete" 
                      data-id="{{ $item->id }}"  
                      data-bs-toggle="modal" 
                      data-bs-target="#modalDelete">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                  @endcan
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>

    {{-- Paginación --}}
    {{ $data->links() }}
  @else
    <div class="text-center my-5 fs-3 fw-bold">
      <img id="user-notFound" src="{{ asset('img/user-notFound.svg') }}">
      <p class="mt-3">Usuario no encontrado</p>
    </div>
  @endif
</div>



