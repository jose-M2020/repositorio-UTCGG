<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default entry period number within a calendar year
    |--------------------------------------------------------------------------
    |
    | Used when backfilling students that only have an admission year.
    | Convention: 1 = Jan–Apr, 2 = May–Aug, 3 = Sep–Dec.
    |
    */

    'default_entry_period_n' => (int) env('ACADEMIC_DEFAULT_ENTRY_PERIOD_N', 3),

];
