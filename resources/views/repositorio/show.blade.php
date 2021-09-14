@extends('layouts.main')

@section('title', 'Repositorio')

@section('content')
	<h1>Rep {{ $repositorio->id }}</h1>

	@foreach($files as $file)
		@if($file->file_type == 'pdf')
			{{ $file->original_name }}
			<div style="width: 60%;">
				<iframe style="width: 100%; height: 300px;" allowfullscreen title="Documentación" src="{{ asset('storage/'.$file->file_path) }}"></iframe>
			</div>
			<!-- <embed src="{{ url($file->file_path) }}" type="application/pdf" width="50%" height="400px" /> -->
		@endif
	@endforeach
	<!-- <iframe style="width: 60%; height: 300px;" allowfullscreen title="Vista previa del archivo" src="https://canvas.instructure.com//courses/2506755/files/123953748/file_preview?annotate=0" class="ef-file-preview-frame"></iframe> -->
@endsection