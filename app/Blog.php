<?php

/* blogs schema
---------
id
category_id fk
user_id fk
title
source_link
picture_url
content
visits
created_at
updated_at

belongsTo category
belongsTo user
*/


namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    public function category(){
    	return $this->belongsTo('App\Category');
    }

    public function author(){
    	return $this->belongsTo('App\User');
    }

    protected $with = ['category', 'author'];
    protected $visible = ['id', 'title', 'content', 'picture_url', 'source_link', 'category_id', 'user_id',
    					  'category', 'author', 'visits', 'created_at'];
}
