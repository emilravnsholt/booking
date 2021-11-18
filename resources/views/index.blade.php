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
        
    </section>
@endsection