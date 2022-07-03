$(document).ready(function(){
  
    // load_data(1);

    function load_data(link, query = '', page = 1){
      $.ajax({
        url:`${ link }?page=${ page }&query=${ query }`,
        success:function(data)
        {
          $('#student-table tbody').html(data);
        }
      });
    }

    // || Pagination
    // -----------------------------------------------------

    // $(document).on('click', '.pagination a', function(){
    //   event.preventDefault(); 
    //   let page = $(this).attr('href').split('page=')[1];
    //   // let page = $(this).data('page_number');
    //   let query = $('#search_box').val();
    //   load_data(link, query);
    // });

    // || Automatic search (Typing)
    // -----------------------------------------------------
    
    const input = $('input[data-search="auto"]');
    const link = input.data('link');
    const doneTypingInterval = 1000;
    let isTyping = false;
    let typingTimer;
    let query = '';

    input.keyup(function(){
      query = $(this).val();
      clearTimeout(typingTimer);

      if(!isTyping){
        isTyping = true;
        console.log("Typing...");
      }

      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    doneTyping = () => {
      console.log("Searching...");
      isTyping = false;
      load_data(link, query);
    }

    // || Delete modal
    // -----------------------------------------------------

    const deleteButtons = document.querySelectorAll('.actions .delete'),
          deleteForm = document.querySelector('#modalDelete form'),
          deleteUrl = deleteForm.action;

    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const idIndex = deleteUrl.lastIndexOf('/');
        const {dataset: {id} } = this;
        
        if (idIndex != -1) {
            deleteForm.action = `${ deleteUrl.substr(0, idIndex) }/${ id }`;
        }
      })
    })

    // || Edit modal
    // -----------------------------------------------------
    
    const container = document.querySelector('.table-content');
    
    if(!!container.dataset.editmodal){
        const editButtons = document.querySelectorAll('.actions .edit'),
              editForm = document.querySelector('#modalEdit form'),
              modalEditInput = document.querySelectorAll('#modalEdit form input:not([type=hidden]), select'),
              editUrl = editForm.action;

        editButtons.forEach(button => {
          button.addEventListener('click', function(e) {
            const idIndex = editUrl.lastIndexOf('/');
            let {dataset: {user} } = this;
            user = JSON.parse(user);

            setModalData(user)

            if (idIndex != -1) {
                editForm.action = `${ editUrl.substr(0, idIndex) }/${ user.id }`;
            }
          })
        })
    
        // Los id de los inputs debe coincidir con el nombre de las columnas de la BD
        const setModalData = data => {
          modalEditInput.forEach(input => {
            input.value = data[input.id];
          })
        }
    
        const modal = $(".modal");
            // const span = $(".modal__icon-close")[0];
            // const body = $("body");
        let scrollTop;  //almacena la posicion del scroll, utilizado al momento de mostrar u ocultar el modal
    
        // Activamos ventana modal
        $(document).on('click', '.actions .edit', function(event){
              let id = this.closest('td').id;
    
              // $('#edit-student input:not([type="submit"]), select').val('');
              modal.addClass('modal--loading');
    
              // if ($(document).height() > $(window).height()) {
              //      scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();
              //      $('html').addClass('no-scroll').css('top',-scrollTop);
              // }
    
              // Cargar datos del usuario seleccionado
    
              // $.get(
              //   '/alumnos/editar/' + id, 
              //   function(data) {
              //     modal.removeClass('modal--loading');
              //     $('.modal__content div').html(data);
              //   }
              // );
        });
    
        // -- Cerrar modal con el icono
        // span.onclick = function() {
        //     modal.removeClass('modal--open');
        //     $('html').removeClass('no-scroll');
        //     $('html,body').scrollTop(scrollTop);
        // }
    
        // -- Cerrar modal al dar click fuera del modal
        // window.onclick = function(event) {
        //     if (event.target == modal[0]) {
        //         $('html').removeClass('no-scroll');
        //         $('html,body').scrollTop(scrollTop);
           
        //         modal.removeClass('modal--open');
        //     }
          
        // }
    }    
 
    // || Multiple select checkboxes
    // -----------------------------------------------------

    const checkboxAll = document.getElementById('checkAll'),
          checkboxs = document.querySelectorAll('.table-content .checkbox'),
          tableRows = document.querySelectorAll('.table-content tbody tr')

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
        if(!e.target.classList.contains('actions__item')){
          let checkbox = this.children[0].children[0];
          checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
          showCheckboxes(true);
        }
      })
    })

    const showCheckboxes = isVisible => {
      if(isVisible){
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

});