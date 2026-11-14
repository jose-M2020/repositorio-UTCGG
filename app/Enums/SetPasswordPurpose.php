<?php

namespace App\Enums;

enum SetPasswordPurpose: string
{
    case Activation = 'activation';
    case Reset = 'reset';
}
