<?php

use Illuminate\Database\Seeder;

use Illuminate\Database\Eloquent\Model;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('users')->insert([
        	'name'=> 'bachtiar - App Developer Manager',
        	'email'=>'bachtiarekowahyudi@gmail.com',
        	'password'=>bcrypt('lestary1503'),
        ]);
        DB::table('users')->insert([
            'name'=> 'rio - Company Manager ',
            'email'=>'prihambodotrioagustian@gmail.com',
            'password'=>bcrypt('citizens88'),
        ]);
    }
}
