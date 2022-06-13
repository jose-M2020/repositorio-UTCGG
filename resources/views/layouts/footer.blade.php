<footer>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <h3 class="footer__header mb-2"><a href="#" class="logo">
                    <img src="{{ set_url('img/logo.png') }}" alt="logo">
                </a></h3>
                <ul class="footer__menu nav justify-content-center mb-2">
                    <li class="nav-item">
                        <a class="nav-link px-2" href="/">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-2" href="{{ route('about') }}">Acerca</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-2" href="#">Terminos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-2" href="#">Privacidad</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-2" href="#">Contacto</a>
                    </li>
                </ul>
                <ul class="footer__social nav justify-content-center p-0">
                    <li class="me-2">
                        <a href="https://facebook.com" target="blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i class="fa-brands fa-facebook-square"></i></a>
                    </li>
                    <li class="me-2">
                        <a href="https://twitter.com" target="blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i class="fa-brands fa-twitter"></i></a>
                    </li>
                    <li>
                        <a href="https://instagram.com" target="blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-12 text-center">
                <p class="copyright mb-0">
                    Copyright ©<script>document.write(new Date().getFullYear());</script> All rights reserved</a>
                </p>
            </div>
        </div>
    </div>
</footer>