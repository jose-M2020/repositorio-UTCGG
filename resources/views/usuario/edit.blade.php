<div class="form">  
	<div class="form__title">
		<h1>Editar alumno</h1>
	</div>
	<form id="edit-student" method="POST" action="alumnos/editar/{{ $alumno->id }}">
		@csrf
		<div class="form__field">
			<label>Nombre Completo</label>
			<input type="text" name="name" class="form__input" id="name" value="{{ $alumno->nombre }}">
		</div>
		<div class="form__field">
			<label>Email</label>
			<input type="text" name="email" id="email" class="form__input" value="{{ $alumno->email }}">
		</div>
		<div class="form__field">
			<label>Carrera</label>
			<select class="form__input" name="carrera" id="carrera">
				@foreach(get_careers() as $key=>$career)
					@if($alumno->carrera == $key)
						<option value="{{$key}}" selected="selected">{{ $career }}</option>
					@else
						<option value="{{$key}}">{{ $career }}</option>
					@endif
				@endforeach
			</select>
		</div>
		<div class="form__field">
			<label>Cuatrimestre</label>
			<input type="number" name="cuatrimestre" id="Cuatrimestre" class="form__input" value="{{ $alumno->cuatrimestre }}">
		</div>
		<div class="form__field">
			<input type="submit" name="register" class="form__btn-submit" value="Actualizar">
		</div>
	</form>
</div>