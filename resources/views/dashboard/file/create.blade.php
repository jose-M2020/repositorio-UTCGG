@extends('layouts.app')

@section('title', 'Mis repositorios')

@section('head')
<style>
    form{
        max-width: 700px;
        margin: 0 auto;
    }
</style>
@endsection

@section('dashboard-content')

    <h4 class="text-center my-5">{{ $repositorio->nombre_rep }}</h4>
    <form id="files" action="{{ route('files.store', $repositorio->slug) }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="form__field files files-images images mb-5">
            <h5>Galería</h5>
            <div class="files__drop-zone mb-3">
                <div class="files__info" for="imagenes">
                    <i class="files__icon fa-solid fa-cloud-arrow-up"></i>
                    <span class="files__title">
                        Arrastra las imágenes aquí
                    </span>
                    <span class="mb-2">o</span>
                    <span class="border border border-secondary d-inline p-1">Seleccionar archivos</span>
                </div>
                <input class="files__input" type="file" id="imagenes" name="imagenes[]" accept="image/*" multiple="">
            </div>
            <div class="files__selected preview_images"></div>
        </div>
        <div class="form__field files files projects mb-5">
            <h5>Documentos del proyecto</h5>
            <div class="files__drop-zone mb-3">
                <div class="files__info" for="archivos">
                    <i class="files__icon fa-solid fa-cloud-arrow-up"></i>
                    <span class="files__title">
                        Arrastra los documentos aquí
                    </span>
                    <span class="mb-2">o</span>
                    <span class="border border border-secondary d-inline p-1">Seleccionar archivos</span>
                </div>
                <input class="files__input" type="file" id="archivos" name="archivos[]" accept=".doc,.docx,.zip,.rar,.pdf,.txt" multiple="">
            </div>
            <div class="files__selected preview_images"></div>
        </div>
        <div class="text-center mb-5">
            <button type="submit" class="form__btn-submit">Guardar</button>
        </div>
    </form>

@endsection

@section('footer')
    <script type="text/javascript" src="{{ set_url('js/class/Emmet.js') }}"></script>
    <script src="{{ set_url('js/main.js') }}" type="module"></script>
@endsection