<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('users')
            ->where('user_type', 'student')
            ->update(['user_type' => 'academic']);

        DB::table('users')
            ->where('user_type', 'teacher')
            ->update(['user_type' => 'workforce']);
    }

    public function down(): void
    {
        DB::table('users')
            ->where('user_type', 'academic')
            ->update(['user_type' => 'student']);

        DB::table('users')
            ->where('user_type', 'workforce')
            ->update(['user_type' => 'teacher']);
    }
};
