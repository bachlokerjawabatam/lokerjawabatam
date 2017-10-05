@extends('layouts.master')

@section('title', 'Lokerjawabatam')

@section('content')
    <script type="text/babel" src="{{URL::asset('js/components/welcome.js')}}"></script>
    <script type="text/babel">
        const TABLET_MAX_SIZE = 941

        var Welcome = React.createClass({
            getInitialState: function(){
                return{
                    desktopView: true
                }
            },
            componentDidMount: function(){
                this.onWindowResize()
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                $("#menu-modal").modal('show');
            },
            onWindowResize: function(){
                let desktopView = ($(window).width() >= TABLET_MAX_SIZE)
                this.setState({desktopView: desktopView})
            },
            componentWillUnmount: function(){
                $(window).off('resize.homepage')
            },
            onSelectContent: function(menuUrl){
                if(_.includes(['loker_jawa', 'loker_batam'], menuUrl)){
                    $.ajax({
                        url: '/homepage/set_session_content_type',
                        method: 'get',
                        data: {content_type: menuUrl},
                        formatType: 'json',
                        success: function(data){
                            window.location.href = '/lowongan_kerja'
                        }
                    })
                }else{
                    window.location.href = menuUrl
                }
            },
            render: function(){
                let desktopView = this.state.desktopView
                    
                if (desktopView == true){
                    return(
                        <div>
                            <WelcomeDesktop />
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
                                                        <div className="box-icon" onClick={this.onSelectContent.bind(this, '/tips_kerja')}>
                                                            <i className="fa fa-briefcase" />
                                                        </div>
                                                        <div className="title" onClick={this.onSelectContent.bind(this, '/tips_kerja')}>
                                                            Tips Kerja
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="box-menu-modal">
                                                        <div className="box-icon" onClick={this.onSelectContent.bind(this, '/ide_bisnis')} >
                                                            <i className="fa fa-lightbulb-o" />
                                                        </div>
                                                        <div className="title" onClick={this.onSelectContent.bind(this, '/ide_bisnis')}>
                                                            Ide Bisnis
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <WelcomeMobile />
                    )
                }
            }
        });

        ReactDOM.render(
            <Welcome />,
            document.getElementById('content')
          );
    </script>
@endsection