  <p class="filters__title mt-2">Filtros</p>
  <ul class="navbar-nav filters__list">
      <li>
          <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-1">
            <i class="fas fa-university"></i> Materia <i class="fa fa-fw fa-angle-down pull-right"></i>
          </a>
          <ul id="submenu-1" class="submenu position-relative">
            @foreach(get_careers() as $key => $career)
              {{-- Tooltip: data-toggle="tooltip" data-bs-placement="top" title="{{ $career }}" --}}
              <li class="position-relative">
                @if(find_param_url('carrera', $key))
                  <div class="text">
                    <span>{{ $career }}</span>
                  </div>
                @else
                  <input class="form-check-input" type="checkbox" value="{{ $key }}" data-field="carrera[]">
                  <div class="text"><a href="{{ add_param_url(['carrera[]' => $key]) }}">{{ $career }}</a></div>
                  @endif
              </li>
            @endforeach
          </ul>
      </li>
      <li>
          <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-2">
            <i class="fas fa-file-alt"></i>  Tipo de proyecto <i class="fa fa-fw fa-angle-down pull-right"></i>
          </a>
          <ul id="submenu-2" class="submenu position-relative">
            @foreach(get_type_projects() as $type)
              <li class="position-relative">
                @if(find_param_url('tipo', $type))
                  <div class="text">
                    <span>{{ $type }}</span>
                  </div>
                @else
                  <input class="form-check-input" type="checkbox" value="{{ $type }}" data-field="tipo[]">
                  <div class="text"><a href="{{ add_param_url(['tipo[]' => $type]) }}">{{ $type }}</a></div>
                @endif
              </li>
            @endforeach
          </ul>
      </li>
      <li>
          <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-2">
            <i class="fas fa-graduation-cap"></i>  Nivel de proyecto <i class="fa fa-fw fa-angle-down pull-right"></i>
          </a>
          <ul id="submenu-3" class="submenu position-relative">
            @foreach(get_academic_degrees() as $key=>$level)
              <li class="position-relative">
                @if(find_param_url('nivel', $key))
                  <div class="text">
                    <span>{{ $key }}</span>
                  </div>
                @else
                  <input class="form-check-input" type="checkbox" value="{{ $key }}" data-field="nivel[]">
                  <div class="text"><a href="{{ add_param_url(['nivel[]' => $key]) }}">{{ $key }}</a></div>
                @endif
              </li>
            @endforeach
          </ul>
      </li>
      <li>
          <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-2">
            <i class="far fa-calendar-alt"></i>  Fecha <i class="fa fa-fw fa-angle-down pull-right"></i>
          </a>
          <ul id="submenu-4" class="submenu position-relative">
            <form method="GET" action="/repositorios">
              <div class="search-filters">
                @foreach(app('request')->request->all() as $key=>$value)
                  @if($key != 'page' && $key != 'query' && $key != 'search_field')
                    @foreach($value as $p)
                      <input type="hidden" name="{{$key}}[]" value="{{$p}}">
                    @endforeach
                  @endif
                @endforeach
              </div>
              <div class="input-group mb-3">
                <input name="year[]" 
                       type="date" 
                       class="form-control"
                       value="{{ app('request')->year[0] ?? '' }}"
                       required>
                <span class="input-group-text">-</span>
                <input name="year[]" 
                       type="date" 
                       class="form-control"
                       value="{{ app('request')->year[1] ?? '' }}"
                       required>
              </div>
              <div class="d-grid gap-2 col-12">
                @if(!app('request')->has('year'))
                  <button type="submit" class="btn border border-1 border-secondary">Filtrar</button>
                @endif
              </div>
            </form>
          </ul>
      </li>
  </ul>
  
