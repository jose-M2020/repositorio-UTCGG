<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // $user = Auth::user();
        // $userID = Auth::id();

        return view('home');    
    }
}
