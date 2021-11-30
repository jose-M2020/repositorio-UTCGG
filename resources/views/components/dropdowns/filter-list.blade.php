              <p class="mt-2">Filtra tus resultados</p>
                <ul class="navbar-nav list-filters">
                    <li>
                        <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-1">
                          <i class="fas fa-university"></i> Carrera <i class="fa fa-fw fa-angle-down pull-right"></i>
                        </a>
                        <ul id="submenu-1" class="submenu position-relative">
                            @foreach(get_careers() as $key => $career)
                              @if(find_param_url('carrera', $key))
                                <li data-toggle="tooltip" data-bs-placement="top" title="{{ $career }}">
                                  <i class="fas fa-check"></i> <span>{{ $career }}</span>
                                </li>
                              @else
                                <li data-toggle="tooltip" data-bs-placement="top" title="{{ $career }}">
                                  <a href="{{ add_param_url(['carrera[]' => $key]) }}">{{ $career }}</a>
                                </li>
                              @endif
                            @endforeach
                        </ul>
                    </li>
                    <li>
                        <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-2">
                          <i class="fas fa-file-alt"></i>  Tipo de proyecto <i class="fa fa-fw fa-angle-down pull-right"></i>
                        </a>
                        <ul id="submenu-2" class="submenu position-relative">
                          @foreach(get_type_projects() as $type)
                            @if(find_param_url('tipo', $type))
                              <li data-toggle="tooltip" data-bs-placement="top" title="{{ $type }}">
                                <i class="fas fa-check"></i> <span>{{ $type }}</span>
                              </li>
                            @else
                              <li data-toggle="tooltip" data-bs-placement="top" title="{{ $type }}">
                                <a href="{{ add_param_url(['tipo[]' => $type]) }}">{{ $type }}</a>
                              </li>
                            @endif
                          @endforeach
                        </ul>
                    </li>
                    <li>
                        <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-2">
                          <i class="fas fa-graduation-cap"></i>  Nivel de proyecto <i class="fa fa-fw fa-angle-down pull-right"></i>
                        </a>
                        <ul id="submenu-3" class="submenu position-relative">
                            @foreach(get_academic_degrees() as $key=>$level)
                              @if(find_param_url('nivel', $key))
                                <li data-toggle="tooltip" data-bs-placement="top" title="{{ $level }}">
                                  <i class="fas fa-check"></i> <span>{{ $key }}</span>
                                </li>
                              @else
                                <li data-toggle="tooltip" data-bs-placement="top" title="{{ $level }}">
                                  <a href="{{ add_param_url(['nivel[]' => $key]) }}">{{ $key }}</a>
                                </li>
                              @endif
                            @endforeach
                        </ul>
                    </li>
                    <li>
                        <a class="menu-title" href="javascript:void(0)" data-toggle="collapse" data-target="#submenu-2">
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
