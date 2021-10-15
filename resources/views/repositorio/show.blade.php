@extends('layouts.main')

@section('title', 'Repositorio')

@section('content')
	<div class="container-fluid py-5">
		<div class="row">
			<div class="col-md-2">
				<!-- <x-dropdowns.filter-list/> -->
			</div>
			<div class="col-md-10">
				<div class="row">
					<div class="col-md-4">
						<img src="{{ set_url('storage/images/doc.png') }}" style="width: 100%;">
					</div>
					<div class="col-md-8">
						<h4 class="text-center mb-3">Rep {{ $repositorio->nombre_rep }}</h4>
						<p>{{ $repositorio->descripcion }}</p>
						<p>Autor: {{ $repositorio->nombre_alumno }}</p>
						<p>Fecha de publicación: {{ $repositorio->created_at }}</p>
						<p>Tipo de proyecto: {{ $repositorio->tipo_proyecto }}</p>
						<p>Nivel: {{ $repositorio->nivel_proyecto }}</p>
					</div>
					<div class="col-12 mt-5">
						@foreach($files as $file)
							@if($file->file_type == 'pdf')
								<div>
									<iframe style="width: 100%; height: 600px;" allowfullscreen title="Documentación" src="{{ set_url('storage/'.$file->file_path) }}"></iframe>
									<span class="text-center d-block">{{ $file->original_name }}</span>
								</div>
								<!-- <embed src="{{ url($file->file_path) }}" type="application/pdf" width="50%" height="400px" /> -->
							@endif
						@endforeach
					</div>
				</div>
			</div>
			<div class="col-12">
				
			</div>
		</div>
	</div>
	
	<!-- <iframe style="width: 60%; height: 300px;" allowfullscreen title="Vista previa del archivo" src="https://canvas.instructure.com//courses/2506755/files/123953748/file_preview?annotate=0" class="ef-file-preview-frame"></iframe> -->
@endsection