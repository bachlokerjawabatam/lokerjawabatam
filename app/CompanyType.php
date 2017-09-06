<?php

/* 

company type schema
----------------
id
name
*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompanyType extends Model
{
    protected $visible = ['id', 'name'];
}
