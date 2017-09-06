<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProvincesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	// clear all record on table provinces
        DB::table('provinces')->truncate();
        DB::table('provinces')->insert([
        	'name' => 'Kepulauan Riau',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        	'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    	]);
    	DB::table('provinces')->insert([
        	'name' => 'Banten',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        	'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    	]);
    	DB::table('provinces')->insert([
        	'name' => 'DKI Jakarta',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        	'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    	]);
    	DB::table('provinces')->insert([
        	'name' => 'Jawa Barat',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        	'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    	]);
    	DB::table('provinces')->insert([
        	'name' => 'Jawa Tengah',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        	'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    	]);
    	DB::table('provinces')->insert([
        	'name' => 'Jawa Timur',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        	'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    	]);
    	DB::table('provinces')->insert([
        	'name' => 'DI Yogyakarta',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        	'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    	]);
    }
}
