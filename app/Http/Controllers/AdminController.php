<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests;

use Auth;
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
use App\RequireDescription;
use App\Blog;
use App\Category;
use File;

class AdminController extends Controller
{
    public function index(){
    	if(Auth::check()){
    		return redirect()->action('AdminController@adminHomepage');
    	}else{
    		return view('admin');
    	}
    }

    public function login(Request $request){

    	$username = $request->input('email');
    	$password = $request->input('password');
    	$attempts = [  
    		'email' => $username,
    		'password' => $password
    	];

    	if(Auth::attempt($attempts, (bool) $request->remember)){
            return redirect()->action('AdminController@adminHomepage');
        }else{
        	return back()->withInput();
        }
    }

    public function logout(){
    	Auth::logout();

    	return redirect()->action('AdminController@index');
    }

    public function adminHomepage(){
        if(Auth::check()){
        }else{
            return view('admin');
        }
        
        $current_user = auth()->user()->toJson();
        $education_levels = EducationLevel::all()->toJson();
        $provinces = Province::all()->toJson();
        $cities = City::all()->toJson();
        $company_types = CompanyType::all()->toJson();
        $session_alert = session('alert');
        $categories = Category::all()->toJson();
        $admin_blog_list = Blog::all()->toJson();
        $admin_loker_list = Post::all()->toJson();

    	return view('admin_post', [
            'current_user' => $current_user,
            'education_levels' => $education_levels,
            'provinces' => $provinces,
            'cities' => $cities,
            'company_types' => $company_types,
            'categories' => $categories,
            'admin_blog_list' => $admin_blog_list,
            'admin_loker_list' => $admin_loker_list,
            'alert' => $session_alert
        ]);
    }

    public function postBlog(Request $params){        
        $blog = new Blog;

        if($params->hasFile('picture')){
            $picture = $params->file('picture');
            $picture_filename = time() . '.' . $picture->getClientOriginalExtension();
            $path = public_path('images/' . $picture_filename);
            $blog->picture_url = $picture_filename; 
        }

        $blog->title = $params->blog['title'];
        $blog->category_id = $params->blog['category_id'];
        $blog->user_id = $params->blog['user_id'];
        $blog->content = $params->blog['content'];
        $blog->source_link = $params->blog['source_link'];
        
        $blog->save();

        if($blog->picture_url != null){
            $destinationPath = public_path('images/');     
            $picture->move($destinationPath, $picture_filename);
        }

        return redirect()->action('AdminController@adminHomepage')
                         ->with('alert', 'Artikel Berhasil Di Save!!');

    }

    public function updateBlog(Request $params){        
        $blog = Blog::find($params->blog['id']);

        if($params->hasFile('picture')){
            File::delete('images/' . $blog->picture_url);
            $picture = $params->file('picture');
            $picture_filename = time() . '.' . $picture->getClientOriginalExtension();
            $path = public_path('images/' . $picture_filename);
            $blog->picture_url = $picture_filename; 
        }

        $blog->title = $params->blog['title'];
        $blog->category_id = $params->blog['category_id'];
        $blog->user_id = $params->blog['user_id'];
        $blog->content = $params->blog['content'];
        $blog->source_link = $params->blog['source_link'];
        $blog->save();

        if($params->hasFile('picture')){
            $destinationPath = public_path('images/');     
            $picture->move($destinationPath, $picture_filename);
        }

        return redirect()->action('AdminController@adminHomepage')
                         ->with('alert', 'Artikel Berhasil Di Update!!');

    }

    public function postLoker(Request $params){
        $post = new Post;

        $logo = $params->file('logo');
        $logo_filename = time() . '.' . $logo->getClientOriginalExtension();
        $path = public_path('logos/' . $logo_filename);
        $destinationPath = public_path('logos/');        
        
        $company_id = $params->post['company_id'];
        if ($company_id){
            if($company = Company::find($company_id)){
                $post->company_id = $company->id;
            }else{
                Log::alert('data tidak valid, perusahaan tidak di temukan!');
            }
        }else{
            $company = new Company;
            $company->name = $params->company['name'];
            $company->email = $params->company['email'];
            $company->address = $params->company['address'];
            $company->company_type_id = $params->company['company_type_id'];
            $company->save();
            $post->company_id = $company->id;
        }

        $post->province_id = $params->post['province_id'];
        $post->city_id = $params->post['city_id'];
        $post->expired_date = $params->post['exp_date'];
        $post->source_link = $params->post['source_link'];
        $post->logo = $logo_filename;

        $post->save();
        $logo->move($destinationPath, $logo_filename);

        foreach($params->requirements as $key => $requirement){
            //handle to create new position if not position id
            $_position_id = $params->requirements[$key]['position_id'];
            $_position_name = $params->requirements[$key]['position_name'];

            $_requirement = new Requirement;
            $_requirement->post_id = $post->id;
            $_requirement->gender = $params->requirements[$key]['gender']; 
            $_requirement->experience = $params->requirements[$key]['experience']; 
            $_requirement->age_min = $params->requirements[$key]['age_min'];
            $_requirement->age_max = $params->requirements[$key]['age_max'];
            $_requirement->salary = $params->requirements[$key]['salary'];
            // $_requirement->description = $params->requirements[$key]['description'];
            $_requirement->education_level_id = $params->requirements[$key]['education_level_id'];

            if($_position_id){
                if(Position::find($_position_id)){
                    $_requirement->position_id = $_position_id;
                }else{
                    Log::alert('data tidak valid, posisi jabatan tidak di temukan!');
                }
            }else{
                $position = new Position;
                $position->name = $_position_name;
                $position->save();
                $_requirement->position_id = $position->id;
            }

            $_requirement->save();
            $_work_descriptions = $params->requirements[$key]['work_description'];
            $_require_descriptions = $params->requirements[$key]['require_description'];
            
            foreach($_require_descriptions as $key => $rd){
                $_require_description = new RequireDescription;
                $_require_description->description = $_require_descriptions[$key]['description'];
                $_require_description->requirement_id = $_requirement->id;

                $_require_description->save();
            }

            foreach($_work_descriptions as $key => $wd){
                $_work_description = new WorkDescription;
                $_work_description->description = $_work_descriptions[$key]['description'];
                $_work_description->requirement_id = $_requirement->id;

                $_work_description->save();
            }
        }

        return redirect()->action('AdminController@adminHomepage')
                         ->with('alert', 'Data Loker Berhasil Di Posting!!');
    }

    public function editBlog(Request $params){
        $blog = Blog::find($params->id);

        return response()->json(['blog' => $blog]);
    }

    public function editLoker(Request $params){
        $post = Post::find($params->id);

        return response()->json(['post' => $post]);
    }

    public function deleteBlog(Request $params){
        $blog = Blog::find($params->id);
        File::delete('images/'. $blog->picture_url);
        $blog->delete();

        return response()->json(['blog' => $blog]);
    }

    public function deleteLoker(Request $params){
        $post = Post::find($params->id);
        File::delete('logos/'. $post->picture_url);
        $post->delete();
        
        return response()->json(['loker' => $post]);
    }

    public function splitItem(){
        return view('split_item');
    }


}
