              <p class="mt-2">Filtra tus resultados</p>
                <ul class="navbar-nav side-nav">
                    <li>
                        <a class="menu-title" href="#" data-toggle="collapse" data-target="#submenu-1">
                          <i class="fas fa-university"></i> Carrera <i class="fa fa-fw fa-angle-down pull-right"></i>
                        </a>
                        <ul id="submenu-1" class="submenu position-relative" style="max-height: 400px;">
                            @foreach(get_careers() as $key => $career)
                              @if(find_param_url('carrera', $key))
                                <li>
                                  <i class="fas fa-check" style="position: absolute; left: 12px; color: #328E3D"></i> <span title="{{ $career }}">{{ $career }}</span>
                                </li>
                              @else
                                <li>
                                  <a href="{{ add_param_url(['carrera[]' => $key]) }}" title="{{ $career }}">{{ $career }}</a>
                                </li>
                              @endif
                            @endforeach
                        </ul>
                    </li>
                    <li>
                        <a class="menu-title" href="#" data-toggle="collapse" data-target="#submenu-2">
                          <i class="fas fa-file-alt"></i>  Tipo de proyecto <i class="fa fa-fw fa-angle-down pull-right"></i>
                        </a>
                        <ul id="submenu-2" class="submenu position-relative">
                          @foreach(get_type_projects() as $type)
                            @if(find_param_url('tipo', $type))
                              <li>
                                <i class="fas fa-check" style="position: absolute; left: 12px; color: #328E3D"></i> <span title="{{ $type }}">{{ $type }}</span>
                              </li>
                            @else
                              <li>
                                <a href="{{ add_param_url(['tipo[]' => $type]) }}" title="{{ $type }}">{{ $type }}</a>
                              </li>
                            @endif
                          @endforeach
                        </ul>
                    </li>
                    <li>
                        <a class="menu-title" href="#" data-toggle="collapse" data-target="#submenu-2">
                          <i class="fas fa-graduation-cap"></i>  Nivel de proyecto <i class="fa fa-fw fa-angle-down pull-right"></i>
                        </a>
                        <ul id="submenu-3" class="submenu position-relative">
                            @foreach(get_academic_degrees() as $key=>$level)
                              @if(find_param_url('nivel', $key))
                                <li>
                                  <i class="fas fa-check" style="position: absolute; left: 12px; color: #328E3D"></i> <span title="{{ $key }}">{{ $key }}</span>
                                </li>
                              @else
                                <li>
                                  <a href="{{ add_param_url(['nivel[]' => $key]) }}" title="{{ $key }}">{{ $key }}</a>
                                </li>
                              @endif
                            @endforeach
                        </ul>
                    </li>
                    <li>
                        <a class="menu-title" href="#" data-toggle="collapse" data-target="#submenu-2">
                          <i class="far fa-calendar-alt"></i>  Generación <i class="fa fa-fw fa-angle-down pull-right"></i>
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
                              <input name="year[]" type="date" class="form-control" placeholder="año" aria-label="Username">
                              <span class="input-group-text">-</span>
                              <input name="year[]" type="date" class="form-control" placeholder="año" aria-label="Server">
                            </div>
                            <div class="d-grid gap-2 col-12">
                              <button type="submit" class="btn btn-secondary">Filtrar</button>
                            </div>
                          </form>
                        </ul>
                    </li>
                </ul>