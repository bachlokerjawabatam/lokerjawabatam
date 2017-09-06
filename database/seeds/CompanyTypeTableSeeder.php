<?php

use Illuminate\Database\Seeder;

class CompanyTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('company_types')->truncate();
    	DB::table('company_types')->insert([
        	'name' => 'BUMN'
    	]);
        DB::table('company_types')->insert([
        	'name' => 'Manufacture'
        ]);
        DB::table('company_types')->insert([
            'name' => 'Makanan dan Minuman'
        ]);
        DB::table('company_types')->insert([
            'name' => 'Layanan dan Jasa'
        ]);
    }
}
