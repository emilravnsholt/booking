@extends('layouts.main')

@section('content')

    <section id="topsection" style="background-image:url('{{ asset('/storage/texture.png') }}');">
        <div class="content">
            <img src="{{ asset('/storage/restaurant.png') }}" class="logo">
            <div class="btn">Book table</div>
        </div>

        <div class="scroll-container">
            <div class="scroller"></div>
        </div>
    </section>

    <section id="booking">
        <form action="" id="booking_form">
            <div class="column">
                <h2 class="title"><span>1.</span>Book a table</h2>

                <div class="form-group">
                    <p class="subtitle">Which day are you visiting?</p>
                    <div class="datepicker">
                        <input type="date" name="date">
                    </div>
                </div>

                <div class="form-group">
                    <p class="subtitle">When do you want to eat?</p>
                    <select name="hours">
                        <option value="">Pick a time</option>
                        <option value="16:00 - 18:00">16:00 - 18:00</option>
                        <option value="18:00 - 20:00">18:00 - 20:00</option>
                        <option value="20:00 - 22:00">20:00 - 22:00</option>
                    </select>
                </div>

                <div class="form-group">
                    <p class="subtitle">How many people?</p>
                    <input type="number" name="persons" step="1" value="2" min="2" max="10">
                </div>

                <div class="form-group">
                    <p class="subtitle">What's your email?</p>
                    <input type="text" name="email" placeholder="example@example.com">
                </div>
            </div>
            <div class="column">
                <h2 class="title"><span>2.</span>Pick a meal</h2>
                <table id="meals">
                    <tbody>
                        <?php // Generated by: resources\js\app.js ?>
                    </tbody>
                </table>
            </div>
            <div class="column">
                <h2 class="title"><span>3.</span>Choose your poison</h2>
                <table id="drinks">
                    <tbody>
                        <?php // Generated by: resources\js\app.js ?>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <button type="submit" class="btn">Book now</button>
            </div>
        </form>
    </section>
@endsection