@extends('layouts.master')

@section('title', 'Lokerjawabatam - admin')

@section('content')
	<script src="{{URL::asset('js/assets/immutable/immutable.js')}}"></script>
    <script src="{{URL::asset('js/assets/draft-js/Draft.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/rich_text_editor.js')}}"></script>
    <script type="text/babel" src="{{URL::asset('js/components/admin_homepage.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/stores/post_store.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/stores/blog_store.js')}}"></script>
    <input type="hidden" id="dummy-csrf-token" value={{ csrf_token() }} />
    <script type="text/javascript">
	    var educationLevels = {!! $education_levels !!}
	    var provinces = {!! $provinces !!}
	    var cities = {!! $cities !!}
	    var companyTypes = {!! $company_types !!}
	    var csrfToken = $('#dummy-csrf-token').val()
	    var flash = "{!! $alert !!}" 

	    var categories = {!! $categories !!}
	    var currentUser = {!! $current_user !!}
	    var adminBlogList = {!! $admin_blog_list !!}
	    var adminLokerList = {!! $admin_loker_list !!}
	    
	    dispatcher.dispatch({
	    	actionType: 'post-set-initialization',
	    	educationLevelTypes: educationLevels,
	    	provinces: provinces,
	    	cities: cities,
	    	companyTypes: companyTypes,
	    	adminLokerList: adminLokerList
	    })

	    dispatcher.dispatch({
	    	actionType: 'blog-set-initialization',
	    	adminBlogList: adminBlogList,
	    	categories: categories,
	    	author: currentUser
	    })
    </script>
    <script type="text/babel">
    	ReactDOM.render(
		    <AdminPage csrfToken={csrfToken} />,
		    document.getElementById('content')
		  );
    	
    	if(!_.isEmpty(flash)){
	    	AlertApp.displaySuccess(flash)
	    }
    </script>
@endsection