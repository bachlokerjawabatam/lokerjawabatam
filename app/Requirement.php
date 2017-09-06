<?php

/*
requirement schema
------------------
id
post_id fk
position_id fk
education_level_id fk
gender
age_min
age_max
experience
description
salary
created_at
updated_at

has_many require_description
hasMany work description
belongsTo Post
belongsTo educational_level_type
*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    public function work_descriptions(){
    	return $this->hasMany('App\WorkDescription');
    }

    public function require_descriptions(){
        return $this->hasMany('App\RequireDescription');
    }

    public function post(){
    	return $this->belongsTo('App\Post');
    }

    public function education_level(){
    	return $this->belongsTo('App\EducationLevel');
    }

    public function position(){
    	return $this->belongsTo('App\Position');
    }

    protected $with = ['work_descriptions', 'require_descriptions', 'position', 'education_level'];
    protected $visible = ['id', 'position', 'education_level', 'work_descriptions', 'require_descriptions', 'gender', 
                            'age_min', 'age_max', 'experience', 'salary', 'description', 'post_id'];
}
