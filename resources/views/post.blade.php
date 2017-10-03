@extends('layouts.master')

@section('title', 'Beranda')

@section('content')
    <script type="text/babel" src="{{URL::asset('js/components/homepage_desktop.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/header.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/instagram_menu.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/stores/homepage_store.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/homepage_mobile.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/landing_page.js')}}"></script>
    <script type="text/javascript">
        var sessionContentType = "{!! $content_type !!}"
        let lokerInfoItems = _.isEmpty(sessionContentType) ? [] : {!! $loker_infos !!}
        
        dispatcher.dispatch({
            actionType: 'homepage-initialization',
            contentType: sessionContentType,
            lokerInfos: lokerInfoItems
        })
    </script>
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
                    desktopView: true,
                    contentType: HomepageStore.getContentType()
                }
            },
            componentDidMount: function(){
                let contentType = this.state.contentType
                this.onWindowResize()
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                $(window).on('resize.homepage', $.proxy(this.onWindowResize, this))
                if (_.isEmpty(contentType)){
                    if(desktopView == true){    
                        $("#menu-modal").modal({
                            show: true,
                            keyboard: false,
                            backdrop: 'static'
                        });
                    }else{
                        setTimeout(function(){ $('#menu-modal-mobile').modal({
                            show: true, keyboard: false, backdrop: 'static'
                        }), 300})
                    }
                }
                this.listener = HomepageStore.addChangeListener(this._onChange)
            },
            onWindowResize: function(){
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                this.setState({desktopView: desktopView})
            },
            componentWillUnmount: function(){
                $(window).off('resize.homepage')
                this.listener.remove()
            },
            _onChange: function(){
                this.setState({
                    contentType: HomepageStore.getContentType()
                })
            },
            onHideModal: function(){
                let desktopView = this.state.desktopView
                if(desktopView){
                    $("#menu-modal").modal('hide');
                }else{
                    $("#menu-modal-mobile").modal('hide');
                }
            },
            onSelectContent: function(contentType){
                if(_.includes(['loker_jawa', 'loker_batam'], contentType)){
                    dispatcher.dispatch({
                        actionType: 'homepage-change-content-type',
                        contentType: contentType
                    })

                    this.onHideModal()
                    $.ajax({
                        url: '/homepage/set_session_content_type',
                        method: 'get',
                        data: {content_type: contentType},
                        formatType: 'json',
                        beforeSend: function(){
                            dispatcher.dispatch({
                                actionType: 'homepage-change-is-loading-data',
                                bool: true
                            })
                        },
                        success: function(data){
                            let contentType = data.contentType
                            let lokerInfos = data.lokerInfos

                            dispatcher.dispatch({
                                actionType: 'homepage-initialization',
                                contentType: contentType,
                                lokerInfos: lokerInfos
                            })
                        }
                    }).always(function(){
                        dispatcher.dispatch({
                            actionType: 'homepage-change-is-loading-data',
                            bool: false
                        })
                    })
                }else{
                    window.location.href = '/' + contentType
                }  
            },
            desktopView: function(){
                let contentType = this.state.contentType
                
                let modalHomepage = 
                    <div className="modal fade" id="menu-modal" >
                        <div className="modal-dialog">
                            <div className="modal-content menu-modal-content">
                                <div className="modal-body menu-modal text-center">
                                    <div className="close-modal">
                                    </div>
                                    <div className="title-modal">
                                        Apa yang ingin anda cari?
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="box-menu-modal" onClick={this.onSelectContent.bind(this, 'loker_jawa')}>
                                                <div className="box-icon">
                                                    <i className="fa fa-address-card" />
                                                </div>
                                                <div className="title"  onClick={this.onSelectContent.bind(this, 'loker_jawa')}>
                                                    Loker Jawa
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="box-menu-modal">
                                                <div className="box-icon" onClick={this.onSelectContent.bind(this, 'loker_batam')}>
                                                    <i className="fa fa-address-card-o" />
                                                </div>
                                                <div className="title" onClick={this.onSelectContent.bind(this, 'loker_batam')}>
                                                    Loker Batam
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="box-menu-modal">
                                                <div className="box-icon" onClick={this.onSelectContent.bind(this, 'tips_kerja')}>
                                                    <i className="fa fa-briefcase" />
                                                </div>
                                                <div className="title" onClick={this.onSelectContent.bind(this, 'tips_kerja')}>
                                                    Tips Kerja
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="box-menu-modal">
                                                <div className="box-icon" onClick={this.onSelectContent.bind(this, 'tips_kerja')} >
                                                    <i className="fa fa-lightbulb-o" />
                                                </div>
                                                <div className="title" onClick={this.onSelectContent.bind(this, 'tips_kerja')}>
                                                    Ide Bisnis
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                return (
                    <div>
                        <HomepageDesktopView />
                        {_.isEmpty(contentType)? modalHomepage : null}
                    </div>
                );
            },
            mobileView: function(){
                let contentType = this.state.contentType
                let afterDidMount = this.state.afterDidMount
                let menuStyle = {fontSize: "72px", marginTop: "10px"}

                let modalHomepageMobile = 
                    <div className="modal fade" id="menu-modal-mobile" >
                        <div className="modal-dialog">
                            <div className="modal-content menu-modal-content">
                                <div className="modal-body menu-modal text-center">
                                    <div className="modal-mobile">
                                        <div className="menu-modal-title">
                                            Apa yang ingin anda cari ?
                                        </div>
                                        <div className="menu-item" onClick={this.onSelectContent.bind(this, 'loker_jawa')}>
                                            <i style={menuStyle} className="fa fa-address-card pull-left" />
                                            <span className="pull-right">Loker Jawa</span>
                                        </div>
                                        <div className="menu-item" onClick={this.onSelectContent.bind(this, 'loker_batam')}>
                                            <i style={menuStyle}  className="fa fa-address-card-o pull-left" />
                                            <span className="pull-right">Loker Batam</span>
                                        </div>
                                        <div className="menu-item" onClick={this.onSelectContent.bind(this, 'tips_kerja')}>
                                            <i style={menuStyle} className="fa fa-briefcase pull-left" />
                                            <span className="pull-right">Tips Kerja</span>
                                        </div>
                                        <div className="menu-item" onClick={this.onSelectContent.bind(this, 'tips_kerja')}>
                                            <i style={menuStyle} className="fa fa-lightbulb-o pull-left" />
                                            <span className="pull-right">Ide Bisnis</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                return(
                    <div>
                        <HomepageMobile />
                        {_.isEmpty(contentType)? modalHomepageMobile : null}
                    </div>
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