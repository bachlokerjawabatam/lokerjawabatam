@extends('layouts.master')

@section('title', 'Tentang Kami')

@section('content')
    <script type="text/babel" src="{{URL::asset('js/components/header.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/instagram_menu.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/about_us_desktop.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/about_us_mobile.js')}}"></script>
    <script type="text/babel">
        const TABLET_MAX_SIZE = 991

    	var AboutUs = React.createClass({
            getInitialState: function(){
                return{
                    desktopView: true
                }
            },
            componentDidMount: function(){
                this.onWindowResize()
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                $(window).on('resize.homepage', $.proxy(this.onWindowResize, this))
            },
            onWindowResize: function(){
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                this.setState({desktopView: desktopView})
            },
            componentWillUnmount: function(){
                $(window).off('resize.homepage')
                this.listener.remove()
            },
            desktopView: function(){
                return(
                    <AboutUsDesktop />
                )
            },
            mobileView: function(){
                return(
                    <AboutUsMobile />
                )
            },
            render: function(){
                let desktopView = this.state.desktopView
                
                if (desktopView == true){
                    return this.desktopView()
                }else{
                    return this.mobileView()
                }
    		}
    	});

    	ReactDOM.render(
		    <AboutUs />,
		    document.getElementById('content')
		  );
    </script>
@endsection