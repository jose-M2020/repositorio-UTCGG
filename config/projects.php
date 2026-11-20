<?php

return [
    // Capacidad por asesor cuando ni el docente ni el periodo definen un tope.
    'default_advisor_capacity' => (int) env('PROJECTS_DEFAULT_ADVISOR_CAPACITY', 5),
];
