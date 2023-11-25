<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveRepositoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $isCreating = $this->isMethod('post');
        $isEstadia = $this->tipo_proyecto == 'Estadía';

        return [
            'nombre_rep' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'tipo_proyecto' => 'required|string|max:80',
            'nivel_proyecto' => 'required|string|max:80',
            'palabras_clave' => 'required|string|max:255',

            'usuario' => $isCreating ? 'required|array|max:8' : 'nullable',
            'usuario.*' => $isCreating ? 'required|string|max:255|distinct|exists:usuarios,email' : 'nullable',
            'carrera' => 'required|string|max:80',            
            'empresa' => 'required|string|max:255',
            // 'asesor_academico' => $isEstadia ? 'required|string|max:255|exists:usuarios,email' : '',
            'asesor_externo' => $isEstadia ? 'required|string|max:255' : '',
            'generacion' => 'required|string|max:255',
        ];
    }
}
