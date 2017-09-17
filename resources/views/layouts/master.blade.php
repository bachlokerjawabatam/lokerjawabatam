<!DOCTYPE html>
<html>
    <head>
        <title>Loker Jawa Batam - @yield('title')</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/admin.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/landing_page.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/homepage.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/homepage_mobile.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/blog.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/blog_mobile.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/about_us.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/about_us_mobile.css')}}" rel="stylesheet" type="text/css">


        <link href="{{URL::asset('css/navbar.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/filter.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/font-awesome.css')}}" rel="stylesheet" type="text/css">
        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }
        </style>
        <script src="{{URL::asset('js/react.js')}}"></script>
        <script src="{{URL::asset('js/react-dom.js')}}"></script>
        <script src="{{URL::asset('js/browser.js')}}"></script>

        <script src="{{URL::asset('js/assets/lodash/lodash.min.js')}}"></script>
        <script src="{{URL::asset('js/assets/flux/flux.js')}}"></script>
        <script src="{{URL::asset('js/assets/flux/fbEmitter.js')}}"></script>

        <script src="{{URL::asset('js/service/key_generator.js')}}"></script>

        <script src="{{URL::asset('js/jquery.min.js')}}"></script>
        <script src="{{URL::asset('js/bootstrap.min.js')}}"></script>
        <script>
            window.dispatcher = new Flux.Dispatcher()
        </script>
    </head>
    <body>
        <div>
            <div id="content" class="content">
                @yield('content')
            </div>
        </div>
    </body>
</html>