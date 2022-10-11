<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Repositorio;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // TODO: Add the 3 missing careers in home view: PA, GCH, GDT
        // $user = Auth::user();
        // $userID = Auth::id();
        $lastAddedRep = Repositorio::orderBy('created_at', 'desc')
                                   ->where('publico', true)
                                   ->paginate(15);

        $destacadosRep = Repositorio::inRandomOrder()
                                   ->where('publico', true)
                                   ->paginate(15);

        return view('home', compact('lastAddedRep','destacadosRep'));    
    }
}
