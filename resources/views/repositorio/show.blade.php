@extends('layouts.main')

@section('title', 'Proyecto')

@section('content')
	<div class="container mt-2 mb-4">
		{{ Breadcrumbs::render('repositorios.show', $repositorio) }}
		<div class="row">
			<div class="col-md-9">
				<div id="carouselImagesControls" class="carousel slide position-relative" data-bs-ride="carousel">
					<div class="carousel-inner">
					  @forelse (json_decode($repositorio?->imagenes) as $img)
					  	<div @class([
							'carousel-item',
							'active' => $loop->first,
						])>
							<img src="{{ Str::contains($img, 'https') ? $img : Storage::disk('s3')->url($img) }}" 
								class="d-block w-100"
								style="height: 18rem; object-fit: cover;"
								alt="Imagen del repositorio" 
								loading="lazy">
						</div>
					  @empty
					  	<div class="carousel-item active">
							<img src="{{ Storage::disk('s3')->url('assets/img/no-image.svg') }}" 
                    			 class="card-img-top"
								 style="height: 18rem; object-fit: cover;"
                    			 alt="Imagen del repositorio" 
                    			 loading="lazy">
						</div>
					  @endforelse
					  
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselImagesControls" data-bs-slide="prev">
					  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
					  <span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselImagesControls" data-bs-slide="next">
					  <span class="carousel-control-next-icon" aria-hidden="true"></span>
					  <span class="visually-hidden">Next</span>
					</button>
				</div>
				<div class="px-2 py-3 mb-4" style="background-color: #336585; color: #fff">
					<h3 class="mb-1">{{ $repositorio->nombre_rep }}</h3>
					<span>Fecha: {{ $repositorio->created_at->format("m/d/Y") }}</span>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="mb-4" style="box-shadow: 0 0 6px #b7b7b7; padding: 1rem; background: #eee;">
							<h4 class="mb-2">Descripción</h4>
							<p>{{ $repositorio->descripcion }}</p>
						</div>
						<div class="d-flex flex-column gap-2" style="box-shadow: 0 0 6px #b7b7b7; padding: 1rem; background: #eee;">
							<h4 class="mb-2">Detalles</h4>
							<div class="row">
								<div class="col-md-3">
									<b>Carrera: </b>
								</div>
								<div class="col-md-9">
									<span>{{ get_careers()[$repositorio->carrera] }}</span>
								</div>
							</div>
							<div class="row">
								<div class="col-md-3">
									<b>Tipo de proyecto: </b>
								</div>
								<div class="col-md-9">
									<span>{{ $repositorio->tipo_proyecto }}</span>
								</div>
							</div>
							<div class="row">
								<div class="col-md-3">
									<b>Nivel academico: </b>
								</div>
								<div class="col-md-9">
									<span>{{ get_academic_degrees()[$repositorio->nivel_proyecto] }}</span>
								</div>
							</div>
							<div class="row">
								<div class="col-md-3">
									<b>Autor(es): </b>
								</div>
								<div class="col-md-9">
									@foreach ($repositorio->users as $user)
										<span class="d-block">{{ $user->nombre }} {{ $user->apellido }}</span>
									@endforeach
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 mt-5">
						@foreach($files as $file)
							@if($file->file_type == 'pdf')
								<div>
									<iframe style="width: 100%; height: 600px;" allowfullscreen title="Documentación" src="{{ Storage::disk('s3')->url($file->file_path) }}"></iframe>
									<span class="text-center d-block">{{ $file->original_name }}</span>
								</div>
								<!-- <embed src="{{ url($file->file_path) }}" type="application/pdf" width="50%" height="400px" /> -->
							@endif
						@endforeach
					</div>
				</div>
			</div>
			<div class="col-md-3 d-none d-md-block">
				<h5 class="mb-3">Articulos relacionados</h5>
				@foreach ($relatedItems as $item)
					<div class="mb-2">
						<a href="">{{ $item->nombre_rep }}</a>
					</div>
				@endforeach
			</div>
		</div>
	</div>
	
	<!-- <iframe style="width: 60%; height: 300px;" allowfullscreen title="Vista previa del archivo" src="https://canvas.instructure.com//courses/2506755/files/123953748/file_preview?annotate=0" class="ef-file-preview-frame"></iframe> -->
@endsection