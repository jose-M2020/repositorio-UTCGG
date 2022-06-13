@extends('layouts.guest')

@section('title', 'Iniciar sesión')

@section('content')
	
<div class="row h-100 position-relative">
	<!-- Session Status -->
	<x-auth-session-status class="mb-4" :status="session('status')" />

	<!-- Validation Errors -->
	<x-auth-validation-errors class="mb-4" :errors="$errors" />
	
	<div class="left-section col-md-7 m-0 p-0 d-flex justify-content-center align-items-center flex-column">
		<div class="left-section__title">
			<h1>Repositorio UTCGG</h1>
			<svg
			   viewBox="0 0 67.356136 80.910551"
			   version="1.1"
			   id="svg5"
			   inkscape:version="1.1 (c68e22c387, 2021-05-23)"
			   sodipodi:docname="sombrero.svg"
			   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
			   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
			   xmlns="http://www.w3.org/2000/svg"
			   xmlns:svg="http://www.w3.org/2000/svg">
			  <g
			     inkscape:label="Capa 1"
			     inkscape:groupmode="layer"
			     id="layer1"
			     transform="translate(-67.989559,-14.671321)">
			    <g
			       id="g17106"
			       transform="matrix(2.5884324,0,0,2.5884324,-107.99678,-23.304397)">
			      <g
			         id="g12000"
			         transform="rotate(45.797673,82.020833,26.755734)">
			        <g
			           id="g11992">
			          <g
			             id="g11985">
			            <g
			               id="g11899">
			              <g
			                 id="g11856">
			                <path
			                   style="fill:#008066;fill-opacity:1;stroke:#008066;stroke-width:1.24945;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.911647"
			                   d="m 72.572439,28.905406 0.15308,7.511537 h 18.592463 v -7.511537 l -9.297149,5.490427 z"
			                   id="path4304"
			                   sodipodi:nodetypes="cccccc" />
			              </g>
			              <path
			                 style="color:#000000;fill:#008066;fill-rule:evenodd;stroke:#008066;stroke-width:1.32292;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"
			                 d="M 95.316662,24.042796 82.020833,32.106265 68.725005,24.042796 82.020833,17.131251 Z"
			                 id="path1918"
			                 sodipodi:nodetypes="ccccc" />
			            </g>
			          </g>
			        </g>
			      </g>
			      <g
			         id="path13850">
			        <path
			           style="color:#000000;fill:#008066;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;-inkscape-stroke:none"
			           d="m 92.967836,34.018305 c 1.463672,3.828732 -0.98855,7.819554 0.388336,11.261767"
			           id="path16294" />
			        <path
			           style="color:#000000;fill:#008066;stroke-linecap:round;stroke-linejoin:round;-inkscape-stroke:none"
			           d="m 92.873047,33.771484 c -0.136463,0.05231 -0.204674,0.205343 -0.152344,0.341797 0.703288,1.839689 0.468711,3.739525 0.210938,5.644531 -0.257774,1.905007 -0.541966,3.816963 0.179687,5.621094 0.05463,0.135222 0.228201,0.192981 0.34375,0.146485 0.115549,-0.0465 0.200739,-0.208378 0.146484,-0.34375 -0.655231,-1.638079 -0.402728,-3.443426 -0.144531,-5.351563 0.258198,-1.908137 0.518195,-3.91721 -0.242187,-5.90625 -0.05231,-0.136463 -0.205343,-0.204674 -0.341797,-0.152344 z"
			           id="path16296" />
			      </g>
			      <circle
			         style="fill:#008066;fill-opacity:1;fill-rule:evenodd;stroke:#008066;stroke-width:0.375129;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"
			         id="path16914"
			         cx="93.376236"
			         cy="45.294544"
			         r="0.44772306" />
			    </g>
			  </g>
			</svg>
		</div>
		<div class="left-section__image">
			<svg
			   id="e613b765-a21b-4502-9325-e6e5b4d66d88"
			   data-name="Layer 1"
			   viewBox="0 0 565.77532 726.24685"
			   version="1.1"
			   sodipodi:docname="undraw_folder_39kl.svg"
			   inkscape:version="1.1 (c68e22c387, 2021-05-23)"
			   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
			   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
			   xmlns="http://www.w3.org/2000/svg"
			   xmlns:svg="http://www.w3.org/2000/svg"
			   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
			   xmlns:cc="http://creativecommons.org/ns#"
			   xmlns:dc="http://purl.org/dc/elements/1.1/">
			  <defs
			     id="defs153" />
			  <sodipodi:namedview
			     id="namedview151"
			     pagecolor="#505050"
			     bordercolor="#eeeeee"
			     borderopacity="1"
			     inkscape:pageshadow="0"
			     inkscape:pageopacity="0"
			     inkscape:pagecheckerboard="0"
			     showgrid="false"
			     fit-margin-top="0"
			     fit-margin-left="0"
			     fit-margin-right="0"
			     fit-margin-bottom="0"
			     inkscape:zoom="0.42618809"
			     inkscape:cx="245.19691"
			     inkscape:cy="322.62751"
			     inkscape:window-width="1366"
			     inkscape:window-height="705"
			     inkscape:window-x="-8"
			     inkscape:window-y="-8"
			     inkscape:window-maximized="1"
			     inkscape:current-layer="e613b765-a21b-4502-9325-e6e5b4d66d88" />
			  <title
			     id="title2">folder</title>
			  <path
			     d="m 549.18877,505.23954 0.3698,-0.375 c -13.23587,-1.578 -24.84776,3.67709 -33.89726,14.04428 l 50.114,31.70734 c -8.54052,-27.09281 -16.47205,-45.11823 -16.58654,-45.37662 z"
			     fill="#57b894"
			     id="path54" />
			  <path
			     d="M 514.39759,460.96107 256.29,428.42577 c -11.6984,-97.31007 5.97553,-192.311 36.15031,-286.78621 l 258.10759,32.53527 c -38.94778,92.68457 -50.38017,188.34681 -36.15031,286.78624 z"
			     fill="#f2f2f2"
			     id="path60" />
			  <rect
			     x="347.93182"
			     y="133.5164"
			     width="158.98061"
			     height="17.080561"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     id="rect62" />
			  <rect
			     x="316.39853"
			     y="174.90392"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect64" />
			  <rect
			     x="316.3985"
			     y="202.49557"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect66" />
			  <rect
			     x="316.39853"
			     y="230.08727"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect68" />
			  <rect
			     x="316.3985"
			     y="257.67892"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect70" />
			  <rect
			     x="316.3985"
			     y="285.2706"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect72" />
			  <rect
			     x="316.3985"
			     y="312.8623"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect74" />
			  <rect
			     x="316.3985"
			     y="340.45395"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(7.18442)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect76" />
			  <path
			     d="M 392.17006,365.09307 150.69478,268.30587 C 164.00011,171.20247 205.13761,83.76537 258.23611,0 l 241.47528,96.7872 c -61.13285,79.81307 -96.39927,169.46932 -107.54133,268.30587 z"
			     fill="#e6e6e6"
			     id="path78" />
			  <rect
			     x="279.77234"
			     y="-66.512642"
			     width="158.98061"
			     height="17.080561"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     id="rect80" />
			  <rect
			     x="248.23903"
			     y="-25.125118"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect82" />
			  <rect
			     x="248.23903"
			     y="2.4665592"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect84" />
			  <rect
			     x="248.23901"
			     y="30.058226"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect86" />
			  <rect
			     x="248.239"
			     y="57.649906"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect88" />
			  <rect
			     x="248.23903"
			     y="85.24157"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect90" />
			  <rect
			     x="248.23901"
			     y="112.83326"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect92" />
			  <rect
			     x="248.239"
			     y="140.42494"
			     width="215.47786"
			     height="8.5402803"
			     transform="rotate(21.84171)"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect94" />
			  <path
			     d="M 332.45247,388.40326 H 72.30238 c -23.7765,-95.083 -18.12247,-191.54842 0,-289.05566 h 260.15009 c -27.05053,96.82781 -26.42931,193.16876 0,289.05566 z"
			     fill="#f2f2f2"
			     id="path96" />
			  <rect
			     x="112.37599"
			     y="128.9101"
			     width="158.98061"
			     height="17.080561"
			     fill="#6c63ff"
			     id="rect98" />
			  <rect
			     x="80.842651"
			     y="170.29761"
			     width="215.47786"
			     height="8.5402803"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect100" />
			  <rect
			     x="80.842651"
			     y="197.8893"
			     width="215.47786"
			     height="8.5402803"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect102" />
			  <rect
			     x="80.842651"
			     y="225.48097"
			     width="215.47786"
			     height="8.5402803"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect104" />
			  <rect
			     x="80.842651"
			     y="253.07265"
			     width="215.47786"
			     height="8.5402803"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect106" />
			  <rect
			     x="80.842651"
			     y="280.66434"
			     width="215.47786"
			     height="8.5402803"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect108" />
			  <rect
			     x="80.842651"
			     y="308.25601"
			     width="215.47786"
			     height="8.5402803"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect110" />
			  <rect
			     x="80.842651"
			     y="335.84769"
			     width="215.47786"
			     height="8.5402803"
			     fill="#6c63ff"
			     opacity="0.3"
			     id="rect112" />
			  <path
			     d="M 157.09742,330.69794 67.47254,261.02075 a 10.23093,10.23093 0 0 0 -8.86925,-5.1311 H 10.23092 A 10.23092,10.23092 0 0 0 0,266.12057 v 426.94109 a 33.18514,33.18514 0 0 0 33.18514,33.18514 h 496.56214 a 33.18513,33.18513 0 0 0 33.18513,-33.18514 V 360.86056 A 30.16262,30.16262 0 0 0 532.7698,330.69794 Z"
			     fill="#3f3d56"
			     id="path114" />
			  <rect
			     x="455.97525"
			     y="429.70859"
			     width="90.069191"
			     height="31.52422"
			     fill="#6c63ff"
			     id="rect116" />
			  <metadata
			     id="metadata1195">
			    <rdf:RDF>
			      <cc:Work
			         rdf:about="">
			        <dc:title>folder</dc:title>
			      </cc:Work>
			    </rdf:RDF>
			  </metadata>
			</svg>
		</div>
		<div class="divider">
			<svg
			   data-name="Layer 1"
			   viewBox="0 0 180 1200"
			   preserveAspectRatio="none"
			   version="1.1"
			   id="svg4"
			   sodipodi:docname="waves.svg"
			   width="180"
			   inkscape:version="1.1 (c68e22c387, 2021-05-23)"
			   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
			   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
			   xmlns="http://www.w3.org/2000/svg"
			   xmlns:svg="http://www.w3.org/2000/svg">
			  <path
			     d="M 124.15913,316.70995 C 135,380 159.39854,429.06015 165.77776,491.05873 174.6253,577.04649 154.79428,660.42024 124.40845,759.17823 96.910767,848.54934 56.029367,931.97414 32.568753,1021.6468 17.287427,1080.0561 1,1200 1,1200 H 180 V 0 h -11 c -48.76544,98.13656 -62.8462,211.59308 -44.84087,316.70995 z"
			     class="shape-fill"
			     fill="#157759"
			     fill-opacity="1"
			     id="path2"
			     sodipodi:nodetypes="sssaccccs" />
			</svg>
		</div>
	</div>
	<div class="right-section col-sm-12 col-md-5 p-0 m-0 d-flex justify-content-center align-items-center">		
		<div class="login-box">
			<div class="avatar">
				<img src="{{ asset('img/logo1.png') }}" alt="Avatar Image">
			</div>
			
			<h3>Iniciar sesión </h3>

			<form action="{{ route('login') }}" method="POST">
				@csrf
				<div>
					<label for="username">Correo</label>
					<input type="email" name="email" placeholder=" Ejemplo@gmail.com " required="">
				</div>
				<br>
				<div style="position: relative;">
					<label for="password">Password</label>
					<input type="password" name="password" id="clave" placeholder="********" required="">
					<button class="eyeBtn" type="button" onclick="mostrarContrasena()">
						<i id="eyeIcon" class="icono11 fas fa-eye"></i>
					</button>
				</div>
				<br>
				{{-- <div class="mt-4">
		          	<label for="rol">Modo de acceso</label>
		          	<select id="rol" class="block mt-1 w-full" name="rol">
			            <option selected disabled>Seleccionar</option>
			            <option value="alumno">Alumno</option>
			            <option value="docente">Docente</option>
			            <option value="admin">Administrador</option>
		          	</select>                
		        </div>	 --}}
	        <br>		
				<input type="submit" value="INICIAR" name="loginButton"> <span class="boton3"></span>				
			</form>
		</div>
	</div>
</div>

@endsection