{{-- JQUERY --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
{{-- AOS --}}
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
{{-- Bootstrap JS --}}
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
{{-- Librarie slick --}}
<script type="text/javascript" src="{{ set_url('library/slick/slick.min.js') }}"></script>

<script>
    window.onload = function(){
        AOS.init();

        $('.carousel-slick').slick({
            dots: true,
            arrows: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                }
            ]
        });

        // Tooltip - Bootstrap
        //------------------------------------------------- 

        // $("[data-toggle=tooltip]").tooltip();
        let tooltips = document.querySelectorAll('[data-toggle=tooltip]');
        tooltips.forEach(item => {
            // console.log(item.textContent)
            new bootstrap.Tooltip(item)
        })

        // Collapse icon
        //------------------------------------------------- 

        let myCollapsible = document.querySelectorAll('.btn-collapse')
        myCollapsible.forEach(item => {
            item.addEventListener('click', function () {
            this.classList.toggle('btn-collapse-open');
            })
        })

        /*
        // const careersLogo = document.querySelectorAll('#carousel .item'),
        const carousel = document.querySelector('#carousel ul'),
            carouselWidth = carousel.scrollWidth;
        let windowWidth = window.innerWidth;

        window.onresize = () => {
            windowWidth = window.innerWidth;
            animate()
        }

        function animate(){
            if(carouselWidth > windowWidth){
                carousel.style.setProperty('--translateX', -(carouselWidth - windowWidth + 40) + 'px');
                carousel.style.animation = 'translate 5s ease-in-out infinite alternate';
            }
        }
        animate()
        */
    }
</script>
<script src="{{ set_url('js/navbar.js') }}"></script>