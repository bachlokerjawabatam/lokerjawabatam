@extends('layouts.master')

@section('title', 'Test Homepage')

@section('content')
    <script type="text/babel" src="{{URL::asset('js/components/homepage_desktop.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/landing_page.js')}}"></script>
    <script type="text/babel">
        const TABLET_MAX_SIZE = 941

        var Homepage = React.createClass({
            componentDidMount: function(){
                $("#menu-modal").modal('show');
            },
            onHideModal: function(){
                $("#menu-modal").modal('hide');
            },
            render: function(){
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
            }
        });

        ReactDOM.render(
            <Homepage />,
            document.getElementById('content')
          );
    </script>
@endsection