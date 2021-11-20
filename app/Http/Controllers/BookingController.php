<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\Drink;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required',
            'hours' => 'required',
            'persons' => 'required',
            'email' => 'required',
        ]);

        if($validator->fails()) {
            return ['errors' => $validator->errors()];
        } else {
            $booking = Booking::create([
                'email' => $request->email,
                'date' => $request->date,
                'persons' => $request->persons,
                'hours' => $request->hours,
            ]);

            // Loop through meals and insert meals with QTY larger than zero into Meals table
            foreach($request->meals as $id => $meal){
                if($meal['qty'] <= 0){
                    continue;
                }

                $booking->meals()->save(
                    new Meal([
                        'name' => $meal['name'],
                        'price' => $meal['price'],
                        'qty' => $meal['qty'],
                    ])
                );
            }

            // Loop through drinks and insert drinks with QTY larger than zero into Drinks table
            foreach($request->drinks as $id => $drink){
                if($drink['qty'] <= 0){
                    continue;
                }

                $booking->drinks()->save(
                    new Drink([
                        'name' => $drink['name'],
                        'price' => $drink['price'],
                        'qty' => $drink['qty'],
                    ])
                );
            }

            return ['success' => 'We have successfully received your reservation!'];
        }
    }
}
