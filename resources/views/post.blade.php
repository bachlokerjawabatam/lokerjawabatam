@extends('layouts.master')

@section('title', 'Landing Page')

@section('content')
    <script type="text/babel" src="{{URL::asset('js/components/homepage_desktop.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/homepage_mobile.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/landing_page.js')}}"></script>
    <script type="text/babel">
        const TABLET_MAX_SIZE = 991

        var AutoPage = React.createClass({
            render: function(){
                let expDate = new Date(2017, 9, 1)
                let curDate = new Date
                if(expDate > curDate){
                    return(<LandingPage />)
                }else{
                    return(<Homepage />)
                }
            }
        })

    	var Homepage = React.createClass({
            getInitialState: function(){
                return{
                    desktopView: true
                }
            },
            componentDidMount: function(){
                this.onWindowResize()
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                $(window).on('resize.homepage', $.proxy(this.onWindowResize, this))
                if (desktopView == true){
                    $("#menu-modal").modal({
                        show: true,
                        keyboard: false,
                        backdrop: 'static'
                    });
                }
            },
            onWindowResize: function(){
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                this.setState({desktopView: desktopView})
            },
            componentWillUnmount: function(){
                $(window).off('resize.homepage')
            },
            onHideModal: function(){
                $("#menu-modal").modal('hide');
            },
            desktopView: function(){
                return (
                    <div>
                        <HomepageDesktopView />
                        <div className="modal fade" id="menu-modal" >
                            <div className="modal-dialog">
                                <div className="modal-content menu-modal-content">
                                    <div className="modal-body menu-modal text-center">
                                        <div className="close-modal">
                                        <i className="fa fa-times" onClick={this.onHideModal} />
                                        </div>
                                        <div className="title-modal">
                                            Apa yang ingin anda cari?
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="box-menu-modal">
                                                    <div className="box-icon">
                                                        <i className="fa fa-briefcase" />
                                                    </div>
                                                    <div className="title">
                                                        Loker Jawa
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="box-menu-modal">
                                                    <div className="box-icon">
                                                        <i className="fa fa-leaf" />
                                                    </div>
                                                    <div className="title">
                                                        Loker Batam
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="box-menu-modal">
                                                    <div className="box-icon">
                                                        <i className="fa fa-user" />
                                                    </div>
                                                    <div className="title">
                                                        Blog Loker
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },
            mobileView: function(){
                return(
                    <HomepageMobile />
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
		    <AutoPage />,
		    document.getElementById('content')
		  );
    </script>
@endsection