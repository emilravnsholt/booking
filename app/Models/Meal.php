<?php

namespace App\Models;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meal extends Model
{
    use HasFactory;

    protected $table = 'meals';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'price',
        'qty',
        'created_at',
        'updated_at',
    ];

    public function booking(){
        return $this->belongsTo(Booking::class);
    }
}
