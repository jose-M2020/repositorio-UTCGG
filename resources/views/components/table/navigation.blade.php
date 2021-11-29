@props(['user'])

<div class="header row d-flex py-3 justify-content-md-between align-items-center">
  <div class="col-md-6 col-xs-12 btn-group d-flex justify-content-center justify-content-md-start " role="group" aria-label="Basic example">
    <a href="/alumnos" class="border-bottom border-3">
      <button type="button" class="btn btn-transparent text-white fw-bold">Alumnos</button>
    </a>
    @auth('admin')
      <a href="/docentes">
        <button type="button" class="btn btn-transparent text-light">Docentes</button>
      </a>
      <a href="/admin">
        <button type="button" class="btn btn-transparent text-light">Adminsitradores</button>
      </a>
    @endauth
  </div>
  <div class="col-md-5 col-lg-4 col-xl-3 mt-3 mt-md-0">
    <div class="form-group position-relative search_content">
      <i class="fas fa-spinner fa-spin" id="search_spinner"></i>
      <input type="text" name="search_box" id="search_box" class="form-control ms-auto" placeholder="Buscar nombre..." />
      <i class="fas fa-search" id="search_icon"></i>
      <!-- <div class="searching">Buscando resultados para la búsqueda...</div> -->
    </div>
  </div>
</div>