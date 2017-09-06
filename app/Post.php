<?php

/* posts schema
---------
id
company_id fk
province_id fk
city_id fk
exp_date
created_at
updated_at

hasMany requirements
hasMany work_description through requirement
hasMany require_description through requirement
belongsTo company
belongsTo province
belongsTo city
*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
 	
 	public function requirements(){
 		return $this->hasMany('App\Requirement');
 	}

 	public function work_descriptions(){
 		return $this->hasManyThrough('App\WorkDescription','App\Requirement');
 	}
    
    public function require_descriptions(){
        return $this->hasManyThrough('App\RequireDescription','App\Requirement');
    }

    public function company(){
    	return $this->belongsTo('App\Company');
    }

    public function province(){
    	return $this->belongsTo('App\Province');
    }

    public function city(){
    	return $this->belongsTo('App\City');
    }

    protected $with = ['requirements', 'company', 'province', 'city'];
    protected $visible = ['id', 'post_date', 'expired_date', 'company_id', 'province_id', 'city_id', 'requirements', 
                          'province', 'city', 'company', 'created_at'];
}
