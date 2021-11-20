<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoutesController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\TemplatesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Frontend routes
Route::get('/', [RoutesController::class, 'index'])->name('index');

// Templates
Route::get('/templates/meal', [TemplatesController::class, 'meal'])->name('template.meal');
Route::get('/templates/drink', [TemplatesController::class, 'drink'])->name('template.drink');

// Bookings
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');