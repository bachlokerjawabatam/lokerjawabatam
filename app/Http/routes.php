<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use App\Post;
use Illuminate\Http\Request;

Route::get('/', 'PostController@welcome');
Route::get('/lowongan_kerja', 'PostController@index');
Route::get('/admin', 'AdminController@index');
Route::get('/admin/homepage', 'AdminController@adminHomepage');
Route::post('/admin/post_loker','AdminController@postLoker');
Route::post('/admin/post_blog','AdminController@postBlog');
Route::get('admin/logout', 'AdminController@logout');
Route::post('/admin/login','AdminController@login');
Route::get('/test/homepage_bachtiar_rio_2017', 'PostController@test');

Route::get('/tentang_kami', 'PostController@about_us');
Route::get('/tips_kerja', 'PostController@tips_kerja');
Route::get('/ide_bisnis', 'PostController@ide_bisnis');

Route::get('/homepage/set_session_content_type', 'PostController@set_session_content_type');
Route::get('/tips_kerja/update_blog_visits', 'PostController@update_blog_visits');
Route::get('/welcome', 'PostController@welcome');