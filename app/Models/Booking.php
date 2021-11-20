<?php

namespace App\Models;

use App\Models\Meal;
use App\Models\Drink;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';

    public $timestamps = true;

    protected $fillable = [
        'email',
        'date',
        'hours',
        'persons',
        'created_at',
        'updated_at',
    ];

    public function meals(){
        return $this->hasMany(Meal::class);
    }

    public function drinks(){
        return $this->hasMany(Drink::class);
    }
}
