<?php

/*
education_level_types
-------------------------
id
name
created_at
updated_at

*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class EducationLevel extends Model
{
    protected $visible = ['id', 'name'];
}
