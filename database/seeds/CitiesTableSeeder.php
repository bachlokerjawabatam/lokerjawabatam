<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //clear all record on cities table
        DB::table('cities')->truncate();
        // insert cities on kepri province
        DB::table('cities')->insert([
        	'name' => 'Bintan Kepulauan',
        	'province_id' => 1,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Karimun',
        	'province_id' => 1,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kepulauan Anambas',
        	'province_id' => 1,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Lingga',
        	'province_id' => 1,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Natuna',
        	'province_id' => 1,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Batam',
        	'province_id' => 1,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tanjung Pinang',
        	'province_id' => 1,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        //insert cities for Banten
    	DB::table('cities')->insert([
        	'name' => 'Lebak',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pandeglang',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Serang',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tangerang',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Cilegon',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Serang',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Tangerang',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tangerang Selatan',
        	'province_id' => 2,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        //insert cities for jakarta
    	DB::table('cities')->insert([
        	'name' => 'Kepuluan Seribu',
        	'province_id' => 3,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jakarta Barat',
        	'province_id' => 3,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jakarta Pusat',
        	'province_id' => 3,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jakarta Selatan',
        	'province_id' => 3,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jakarta Timur',
        	'province_id' => 3,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jakarta Utara',
        	'province_id' => 3,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        //insert cities for Jawa Barat
    	DB::table('cities')->insert([
        	'name' => 'Bandung',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Bandung Barat',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Bekasi',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Bogor',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Ciamis',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Cianjur',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Cirebon',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Garut',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Indramayu',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Karawang',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kuningan',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Majalengka',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pangandaran',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Purwakarta',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Subang',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Sukabumi',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Sumedang',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tasikmalaya',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Bandung',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Banjar',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Bekasi',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Bogor',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Cimahi',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Cirebon',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Depok',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Sukabumi',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kota Tasikmalaya',
        	'province_id' => 4,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        //insert cities for Jawa Tengah
		DB::table('cities')->insert([
        	'name' => 'Banyumas',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Batang',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Blora',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Boyolali',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Brebes',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Cilacap',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Demak',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Grobogan',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jepara',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Karanganyar',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kebumen',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kendal',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Klaten',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kudus',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Magelang',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);        
        DB::table('cities')->insert([
        	'name' => 'Pati',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pekalongan',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pemalang',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Purbalingga',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Purworejo',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Rembang',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Semarang',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Sragen',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Sukoharjo',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tegal',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Temanggung',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Wonogiri',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Wonosobo',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Magelang',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pekalongan',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Salatiga',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Surakarta',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tegal',
        	'province_id' => 5,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        //insert cities for jawa timur
        DB::table('cities')->insert([
        	'name' => 'Bangkalan',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Banyuwangi',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Blitar',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Bojonegoro',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Bondowoso',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Gresik',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jember',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Jombang',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kediri',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Lamongan',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Lumajang',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Madiun',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Magetan',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Malang',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Mojokerto',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Nganjuk',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Ngawi',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pacitan',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pamekasan',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Pasuruan',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Ponorogo',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Sidoarjo',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Situbondo',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Sumenep',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Trenggalek',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tuban',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Tulungagung',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Surabaya',
        	'province_id' => 6,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        //insert cities for DI Yogyakarta
		DB::table('cities')->insert([
        	'name' => 'Bantul',
        	'province_id' => 7,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Gunung Kidul',
        	'province_id' => 7,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Kulon Progo',
        	'province_id' => 7,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Sleman',
        	'province_id' => 7,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('cities')->insert([
        	'name' => 'Yogyakarta',
        	'province_id' => 7,
        	'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    		'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

    }	
}
