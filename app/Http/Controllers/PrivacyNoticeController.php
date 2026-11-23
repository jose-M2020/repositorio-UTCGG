<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PrivacyNoticeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('public/privacy-notice', [
            'updated_at' => '2026-11-23',
        ]);
    }
}
