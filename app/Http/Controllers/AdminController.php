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
        
        $education_levels = EducationLevel::all()->toJson();
        $provinces = Province::all()->toJson();
        $cities = City::all()->toJson();
        $company_types = CompanyType::all()->toJson();
        
    	return view('admin_post', [
            'education_levels' => $education_levels,
            'provinces' => $provinces,
            'cities' => $cities,
            'company_types' => $company_types
        ]);
    }

    public function postLoker(Request $params){
        $post = new Post;

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

        $post->save();

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

            foreach($_require_descriptions as $key => $wd){
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

    }
}
