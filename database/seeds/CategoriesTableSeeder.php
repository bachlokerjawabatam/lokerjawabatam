
<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // clear all record on categories
    	DB::table('categories')->truncate();
    	// start insert seed on education levels
        DB::table('categories')->insert([
        	'name' => 'Tips Kerja',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('categories')->insert([
        	'name' => 'Ide Bisnis',
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
