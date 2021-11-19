<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TemplatesController extends Controller
{
    public function meal(){
        return view('templates.meal');
    }

    public function drink(){
        return view('templates.drink');
    }
}
