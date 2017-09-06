<?php

/*
requirement schema
------------------
id
post_id fk
position_id fk
education_level_id fk
age_min
age_max
description
salary
created_at
updated_at

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

    public function post(){
    	return $this->belongsTo('App\Post');
    }

    public function education_level(){
    	return $this->belongsTo('App\EducationLevel');
    }

    public function position(){
    	return $this->belongsTo('App\Position');
    }

    protected $with = ['work_descriptions', 'position', 'education_level'];
    protected $visible = ['id', 'position', 'education_level', 'work_descriptions', 'age_min', 'age_max', 'salary', 'description', 'post_id'];
}
