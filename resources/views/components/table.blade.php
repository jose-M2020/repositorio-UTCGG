@props(['data'])

@if($data->total())
  <div class="table-responsive users_table">
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
                @if($key === 'id')
                  @continue
                @endif
                @if($key === 'created_at')
                  <td>{{ date('Y-m-d', strtotime($val)) }}</td>
                  @continue
                @endif
                <td>{{ $val }}</td>
              @endforeach
              {{-- <td id="{{ $item->id }}"><i id="editUser" class="fas fa-user-edit"></i></td> --}}

              <td id="{{ $item->id }}">
                <button id="editUser" data-user="{{ json_encode($item) }}" data-bs-toggle="modal" data-bs-target="#modalEdit"><i class="fas fa-user-edit"></i></button>
                <button id="deleteUser" data-id="{{ $item->id }}"  data-bs-toggle="modal" data-bs-target="#modalDelete"><i class="fas fa-trash-alt"></i></button>
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
<script>
  (function(){
    const checkboxAll = document.getElementById('checkAll'),
          checkboxs = document.querySelectorAll('.checkbox'),
          tableRows = document.querySelectorAll('.users_table tbody tr')

    // let checkboxsVisible = false;

    // Seleccionar o deseleccionar los ckeckboxs
    checkboxAll.addEventListener('click', function() {
      checkboxs.forEach(checkbox => {
        checkbox.checked = this.checked;
        // checkboxsVisible = this.checked;
      })
    })

    tableRows.forEach(row => {
      row.addEventListener('click', function(e){
        if(e.target.tagName !== 'BUTTON'){
          let checkbox = this.children[0].children[0];
          checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
          showCheckboxs(true);
        }
      })
    })

    const showCheckboxs = status => {
      if(status){
        checkboxs.forEach(item => {
          item.style.display = 'block'
        })
        // console.log('showed')
      }
      // else{
      //   checkboxs.forEach(item => {
      //     item.style.display = 'none'
      //   })
      // }
    }

  })();

</script>

