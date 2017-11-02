@extends('layouts.master')

@section('title', 'Lokerjawabatam')

@section('content')
    <script type="text/javascript" src="{{URL::asset('js/stores/blog_store.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/header.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/instagram_menu.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/blog_desktop.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/blog_mobile.js')}}"></script>
    <script type="text/javascript">
        var blogList = {!! $blogList !!}
        var populerItems = {!! $populerItems !!}
        var latestItems = {!! $latestItems !!}
        
        dispatcher.dispatch({
            actionType: 'blog-view-initialization',
            blogList: blogList,
            populerItems: populerItems,
            latestItems: latestItems
        })
    </script>
    <script type="text/babel">
        const TABLET_MAX_SIZE = 991

    	var Blog = React.createClass({
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
            },
            desktopView: function(){
                return (
                    <BlogDesktop />
                )
            },
            mobileView: function(){
                return (
                    <BlogMobile />
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
		    <Blog />,
		    document.getElementById('content')
		  );
    </script>
@endsection