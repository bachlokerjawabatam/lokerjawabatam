<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnPost extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('company', 'companies');
        Schema::rename('description_work', 'description_works');
        Schema::rename('education_level', 'education_levels');
        Schema::rename('logo', 'logos');
        Schema::rename('position', 'positions');
        Schema::rename('post', 'posts');
        Schema::rename('post_type', 'post_types');
        Schema::rename('requirement', 'requirements');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('companies', 'company');
        Schema::rename('description_works', 'description_work');
        Schema::rename('education_levels', 'education_level');
        Schema::rename('logos', 'logo');
        Schema::rename('positions', 'position');
        Schema::rename('posts', 'post');
        Schema::rename('post_types', 'post_type');
        Schema::rename('requirements', 'requirement');
    }
}
