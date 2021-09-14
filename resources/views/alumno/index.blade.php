@extends('layouts.main')

@section('title', 'Alumnos')

@section('content')

    <div class="container">
      <h3 align="center">Alumnos registrados</h3>
      <br />

      <!-- Mensaje de éxito -->
      <x-alert.success-message :message="session('status')" />

      <!-- Errores de validación -->        
      <x-alert.error-message message="Error al actualizar los datos" :errors="$errors"/>

      <div class="card">
        <div class="card-body">
          <div class="form-group search_content">
            <i class="fas fa-spinner fa-spin" id="search_spinner"></i>
            <input type="text" name="search_box" id="search_box" class="form-control" placeholder="Buscar nombre..." />
            <i class="fas fa-search" id="search_icon"></i>
            <!-- <div class="searching">Buscando resultados para la búsqueda...</div> -->
          </div>
          <div class="table-responsive" id="student-table">
    		  	<div class="container-table">
      				<table class="table alumnos">
      					<thead>
      						<tr>
      							<th>ID</th>
      							<th>Nombre</th>
      							<th>Usuario</th>
      							<th>Carrera</th>
      							<th>Cuatrimestre</th>
      							<th>Acciones</th>
      						</tr>
      					</thead>
      					<tbody>                  
      						@foreach ($alumnos as $alumno)
                    <tr>                
                      <td>{{ $alumno->id }}</td>
                      <td>{{ $alumno->nombre }}</td>
                      <td>{{ $alumno->email }}</td>
                      <td>{{ get_careers()[$alumno->carrera] }}</td>
                      <td>{{ $alumno->cuatrimestre }}</td>
                      <td id="{{ $alumno->id }}"><i id="editUser" class="fas fa-user-edit"></i></td>
                    </tr>
                  @endforeach
                  <tr>
                    <td colspan="3" align="center">
                      {{ $alumnos->links('pagination::bootstrap-4') }}
                    </td>
                  </tr>
      					</tbody>
      				</table>
    			  </div>
          </div>
          <div class="total-records">
            <p>Alumnos totales: <b>{{ $alumnos->total() }}</b></p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal -->
    <div id="tvesModal" class="modal">
      <div class="modal__content">
        <span class="modal__icon-close">×</span> 
        <div>
          <div class="form">  
            <div class="form__title">
              <h1>Editar alumno</h1>
            </div>
            
            <form id="edit-student" method="POST" action="editUser">
              <input type="hidden" name="id" value="">
              <div class="form__field">
                <label>Nombre Completo</label>
                <input type="text" name="name" class="form__input" id="name" value="">
              </div>
              <div class="form__field">
                <label>Usuario</label>
                <input type="text" name="username" id="username" class="form__input" value="">
              </div>
              <div class="form__field">
                <label>Carrera</label>
                <select class="form__input" name="carrera" id="carrera">
                </select>
              </div>
              <div class="form__field">
                <label>Cuatrimestre</label>
                <input type="number" name="cuatrimestre" id="Cuatrimestre" class="form__input" value="">
              </div>
              <div class="form__field">
                <input type="submit" name="register" class="form__btn-submit" value="Actualizar">
              </div>
            </form>
          </div>  
        </div>
      </div>
    </div> 

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<script>
  $(document).ready(function(){
    // ------------------ Cargamos datos en la tabla (paginación y buscar) --------------

    const userTable = $('.container-table tbody');
    const pagination = $('.pagination');
    const totalRecords = $('.total-records b');
  
    // load_data(1);

    function load_data(page, query = ''){
      $.ajax({
        url:"/alumnos/fetch_data?page="+page+"&query="+query,
        success:function(data)
        {
          $('#student-table tbody').html(data);
        }
      });
    }

    // Paginación
    $(document).on('click', '.pagination a', function(){
      event.preventDefault(); 
      let page = $(this).attr('href').split('page=')[1];
      // let page = $(this).data('page_number');
      let query = $('#search_box').val();
      load_data(page, query);
    });

    // Buscar usuario
    
    const doneTypingInterval = 1000;
    let typing = false;
    let typingTimer;    //timer identifier 
    let query = '';

    $('#search_box').keyup(function(){
      query = $(this).val();
      clearTimeout(typingTimer);
      if(typing == false){
        typing = true;
        console.log("En espera de búsqueda...");
      }
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    // Cargar datos para la busqueda cuando el usuario ha finalizado de escribir
    function doneTyping() { 
      typing = false;
      load_data(1, query);
    }

    // ------------------------ Ventana modal de editar alumno -----------------------

    const modal = $(".modal");
		const span = $(".modal__icon-close")[0];
		const body = $("body");
    let scrollTop;  //almacena la posicion del scroll, utilizado al momento de mostrar u ocultar el modal

    // Activamos ventana modal
    $(document).on('click', '#editUser', function(event){
          let id = this.closest('td').id;
          $('#edit-student input:not([type="submit"]), select').val('');
          modal.addClass('modal--open modal--loading');

          if ($(document).height() > $(window).height()) {
               scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();
               $('html').addClass('no-scroll').css('top',-scrollTop);
          }

          // Cargar datos del usuario seleccionado
          $.get(
            '/alumnos/editar/' + id, 
            function(data) {
              modal.removeClass('modal--loading');
              $('.modal__content div').html(data);
            }
          );
    });

    // Cerrar modal con el icono
    span.onclick = function() {
     modal.removeClass('modal--open');
     $('html').removeClass('no-scroll');
     $('html,body').scrollTop(scrollTop);
		}

    // Cerrar modal al dar click fuera del modal
		window.onclick = function(event) {
			if (event.target == modal[0]) {
        $('html').removeClass('no-scroll');
        $('html,body').scrollTop(scrollTop);
       
        modal.removeClass('modal--open');
			}
      
		}



  });
</script>

@endsection