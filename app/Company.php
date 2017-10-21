<?php

/* 
company schema
---------
id
company_type_id fk
name
email
exif_thumbnail(filename)
address
created_at
updated_at

hasMany posts
belongsTo company_type

*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public function posts(){
    	return $this->hasMany('App\Post');
    }

    public function company_type(){
    	return $this->belongsTo('App\CompanyType');
    }

    protected $with = ['company_type'];
    protected $visible = ['id', 'name', 'email', 'address', 'company_type'];
}
