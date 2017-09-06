@extends('layouts.master')

@section('title', 'Halaman Utama')

@section('content')
    <script type="text/babel">
    	var LoginAdmin = React.createClass({
    		render: function(){
    			return (
                    <div className="container text-center admin-page">
                        <form action="/admin/login" method="POST">
                            <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"/>
                            <div className="title">Lokerjawabatam.com</div>
                            <div className="panel panel-default text-center login-admin">
                                <div className="panel-heading">
                                    <div className="title-login">
                                        <strong>Login Admin</strong>
                                    </div>
                                </div>         
                                <div className="panel-body text-center">
                                    <input type="email" name="email" className="form-control" placeholder="email" />
                                    <input type="password" name="password" className="form-control" placeholder="password" />
                                    <button type="submit" className="btn btn-primary">Login</button> 
                                </div>
                            </div>
                        </form>               
                    </div>
    			);
    		}
    	});

    	ReactDOM.render(
		    <LoginAdmin />,
		    document.getElementById('content')
		  );
    </script>
@endsection