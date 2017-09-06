<?php

/* 

position
-------------
id
name
created_at
updated_at

*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $visible = [ 'id', 'name'];
}
