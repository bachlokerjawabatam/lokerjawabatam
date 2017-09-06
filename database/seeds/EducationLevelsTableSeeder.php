<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EducationLevelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {	
    	// clear all record on education levels
    	DB::table('education_levels')->truncate();
    	// start insert seed on education levels
        DB::table('education_levels')->insert([
        	'name' => 'SD',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'SMP',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'SMA',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'SMK',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'D1',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'D3',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'D4',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'S1',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'S2',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('education_levels')->insert([
        	'name' => 'S3',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
