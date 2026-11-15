<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('user_type', 32)->nullable()->after('email');
            $table->string('phone', 20)->nullable()->after('user_type');
            $table->string('avatar_path')->nullable()->after('phone');
            $table->timestamp('last_login_at')->nullable()->after('avatar_path');
            $table->boolean('must_change_password')->default(false)->after('last_login_at');
            $table->json('preferences')->nullable()->after('must_change_password');
            $table->softDeletes();

            $table->index('user_type');
            $table->index('status');
            $table->index(['user_type', 'status']);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['user_type', 'status']);
            $table->dropIndex(['status']);
            $table->dropIndex(['user_type']);
            $table->dropSoftDeletes();
            $table->dropColumn([
                'user_type',
                'phone',
                'avatar_path',
                'last_login_at',
                'must_change_password',
                'preferences',
            ]);
        });
    }
};
