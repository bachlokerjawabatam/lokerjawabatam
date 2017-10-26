<!DOCTYPE html>
<html>
    <head>
        <title>@yield('title')</title>

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
        <link href="{{URL::asset('css/welcome.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/welcome_mobile.css')}}" rel="stylesheet" type="text/css">
        <link href="{{URL::asset('css/alert.css')}}" rel="stylesheet" type="text/css">

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
        <script src="{{URL::asset('js/assets/react-bootstrap/react-bootstrap.min.js')}}"></script>
        
        <script src="{{URL::asset('js/service/key_generator.js')}}"></script>

        <script src="{{URL::asset('js/jquery.min.js')}}"></script>
        <script src="{{URL::asset('js/bootstrap.min.js')}}"></script>
        <script>
            window.dispatcher = new Flux.Dispatcher()
        </script>
        <script type="text/babel" src="{{URL::asset('js/components/alert.js')}}"></script>
        <script type="text/javascript" src="{{URL::asset('js/stores/alert_store.js')}}"></script>
        <meta charset="utf-8" />
    </head>
    <body>
        <div>
            <div id='alert-notification'>
                <script type="text/babel">
                    ReactDOM.render(
                        <AlertApp />,
                        document.getElementById('alert-notification')
                      );
                </script>
            </div>
            <div id="content" class="content">
                @yield('content')
            </div>
        </div>
    </body>
</html>