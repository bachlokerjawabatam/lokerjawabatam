<?php

/* 

city
------------------
id
province_id
name
created_at
updated_at

*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
	public function province()
	{
		return $this->belongsTo('App\Province', 'foreign_key', 'province_id');
	}

	protected $visible = ['id', 'name', 'province_id'];
}
