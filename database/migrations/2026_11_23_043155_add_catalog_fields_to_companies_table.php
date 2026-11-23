<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('name_normalized')->nullable()->after('name');
            $table->string('status', 32)->default('pending_review')->after('notes');
            $table->string('source', 16)->default('user')->after('status');
            $table->foreignId('merged_into_id')
                ->nullable()
                ->after('source')
                ->constrained('companies')
                ->nullOnDelete();
            $table->foreignId('created_by')
                ->nullable()
                ->after('merged_into_id')
                ->constrained('users')
                ->nullOnDelete();
            $table->foreignId('verified_by')
                ->nullable()
                ->after('created_by')
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('verified_at')->nullable()->after('verified_by');

            $table->index('name_normalized', 'companies_name_normalized_idx');
            $table->index('status', 'companies_status_idx');
        });
    }

    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropConstrainedForeignId('merged_into_id');
            $table->dropConstrainedForeignId('created_by');
            $table->dropConstrainedForeignId('verified_by');
            $table->dropIndex('companies_name_normalized_idx');
            $table->dropIndex('companies_status_idx');
            $table->dropColumn([
                'name_normalized',
                'status',
                'source',
                'verified_at',
            ]);
        });
    }
};
