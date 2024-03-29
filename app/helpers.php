<?php

if(!function_exists('add_param_url')){
	function add_param_url($params = [])
	{
		// $query = array_merge_recursive(
	 //        request()->query(),
	 //        $params
	 //    );
		// dd(app('request'));
		foreach($params as $key => $param){
			// dd(url('path'));
			$r = app('request')->fullUrlWithQuery([$key => $param]);
		}

		return secure_url($r);
		// return $r;
	    // return request()->getRequestUri() . '?' . http_build_query($query); 
	}
}

if(!function_exists('remove_param_url')){
	function remove_param_url($params = [])
	{
		$url = '/'. request()->path(); // url sin los parametros
    	$query = request()->query(); // parametros de la url

		foreach($params as $key=>$val) {
		   	if(is_numeric($key)){
		 		unset($query[$val]);
		  	}else{
				unset($query[$key][$val]);
		   	}
		}
	    return $query ? $url . '?' . http_build_query($query) : $url; 
	    

	    // $params = [];
    	// foreach($query as $key => $value){
    	// 	if(is_array($value)){
    	// 		foreach($value as $p => $val){
    	// 			array_push($params, $key = [
    	// 				'value' => $val,
    	// 				'url' => 
    	// 			]);
    	// 		}
    	// 	}
    	// }
	    // dd($params);
	}
}
/*
Esta función recibe como parametro el parametro a buscar, y para 
buscar un valor  especifico dentro de un array, se pasa el parametro y el valor
*/
if(!function_exists('find_param_url')){
	function find_param_url($param, $value = null)
	{
    	$query = request()->query($param);

    	if($query && !$value){
    		// if($value && in_array($value, $query)){
    		// 	return true;	
    		// }
    		return true;
    	}
    	else if($query && $value && in_array($value, $query)){
    		return true;
    	}


   //  	foreach ($params as $key => $value) {
			// if(is_numeric($key)){
			// 	// si se desea buscar un parametro, no un valor especifico
			// 	if(request()->query($value)){
			// 		return true;			
			// 	}
			// }else{
			// 	// Buscar un valor dentro de un array
			// 	if($q = request()->query($key)){
			// 		return in_array($value, $q) ? true : false;				
			// 	}
			// }
   //  	}

    	return false;
	}
}

if(!function_exists('get_careers')){
	function get_careers()
	{
		return [
			'TIC' => 'Tecnologias de la Información y Comunicación',
			'G' => 'Gastronomía',
			'MM' => 'Metal Mecánica',
			'ER' => 'Energías Renovables',
			'PA' => 'Procesos Alimentarios',
			'LI' => 'Logística Internacional',
			'MI' => 'Mantenimiento Industrial',
			'GCH' => 'Gestión del Capital Humano',
			'GDT' => 'Gestión y Desarrollo Turístico'
		];
	}
}

if(!function_exists('get_academic_degrees')){
	function get_academic_degrees()
	{
		return [
			'TSU' => 'Técnico Superior Universitario',
			'Ingeniería' => 'Ingeniería',
		];
	}
}

if(!function_exists('get_type_projects')){
	function get_type_projects()
	{
		return ['Integradora', 'Estadía', 'Proyecto Especial'];
	}
}

if(!function_exists('set_url')){
	function set_url($path)
	{	
		if((isset($_SERVER['HTTPS']) && (($_SERVER['HTTPS'] == 'on'))) || $_SERVER['SERVER_PORT'] == 443){
			return secure_asset($path);
		}else{
			return asset($path);
		}

	}
}

