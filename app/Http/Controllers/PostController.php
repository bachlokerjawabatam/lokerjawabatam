<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Http\Requests;

use App\Http\Controllers\Controller;
use App\EducationLevel;
use App\Province;
use App\City;
use App\CompanyType;
use App\Company;
use App\Post;
use App\Requirement;
use App\Position;
use App\WorkDescription;
use App\Blog;

class PostController extends Controller
{
    public function index(){   
        $content_type = session('content_type');
        
        if ($content_type == 'loker_batam'){
            $loker_infos = Post::where('province_id', 1)->orderBy('created_at', 'desc')->get();
        }else if($content_type == 'loker_jawa'){
            $loker_infos = Post::where('province_id', '<>', 1)->orderBy('created_at', 'desc')->get();
        }

        return view('post', [
            'content_type' => $content_type,
            'loker_infos' => $loker_infos->toJson()
        ]);     
    }

    public function set_session_content_type(Request $params){
        $session_content_type = $params->content_type;
        session(['content_type' => $session_content_type]);

        $content_type = session('content_type');
        
        if ($content_type == 'loker_batam'){
            $loker_infos = Post::where('province_id', 1)->orderBy('created_at', 'desc')->get();
        }else if($content_type == 'loker_jawa'){
            $loker_infos = Post::where('province_id', '<>', 1)->orderBy('created_at', 'desc')->get();
        }else if ($content_type == 'blog'){
            //get blog lists content
        }
        
        return response()->json(['lokerInfos' => $loker_infos, 'contentType' => $session_content_type]);
    }

    public function set_session_loker_content(Request $params){
        $session_content_type = $params->content_type;
        session(['content_type' => $session_content_type]);

        $content_type = session('content_type');
        
        return response()->json(['content_type' => $content_type]); 
    }

    public function tips_kerja(){
        $blog_list = Blog::where('category_id', 1)->orderBy('created_at', 'desc')->get();
        $populer_items = Blog::where('category_id', 1)->orderBy('visits', 'desc')->take(5)->get();
        $latest_items = Blog::where('category_id', 1)->orderBy('created_at', 'desc')->take(5)->get();

        return view('blog',[
            'blogList' => $blog_list,
            'populerItems' => $populer_items,
            'latestItems' => $latest_items
        ]);
    }

    public function update_blog_visits(Request $params){
        $blog = Blog::where('id', $params->blog_id);
        $visits = $blog->first()->visits;
        $blog->update(['visits' => $visits + 1]);

        return response()->json(['visits' => $visits + 1]);
    }

    public function ide_bisnis(){
        $blog_list = Blog::where('category_id', 2)->get();
        $populer_items = Blog::where('category_id', 2)->orderBy('visits', 'desc')->take(5)->get();
        $latest_items = Blog::where('category_id', 2)->orderBy('created_at', 'desc')->take(5)->get();

        return view('blog',[
            'blogList' => $blog_list ,
            'populerItems' => $populer_items,
            'latestItems' => $latest_items
        ]);
    }

    public function test(){
    	$content_type = session('content_type');
    	
        if ($content_type == 'loker_batam'){
            $loker_infos = Post::where('province_id', 1)->get();
        }else if($content_type == 'loker_jawa'){
            $loker_infos = Post::where('province_id', '<>', 1)->get();
        }else if ($content_type == 'blog'){
            $loker_infos = Post::where('province_id', 1)->get();
        }else{
            $loker_infos = Post::where('province_id', 1)->get();
        }

        return view('test', [
            'content_type' => $content_type,
            'loker_infos' => $loker_infos->toJson()
        ]);
    }

    public function welcome(){
        return view('welcome');
    }

    public function about_us(){
        return view('about_us');
    }
}
