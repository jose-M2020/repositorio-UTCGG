<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_advisors', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('second_last_name')->nullable();
            $table->string('name_normalized');
            $table->string('status', 32)->default('pending_review');
            $table->string('source', 16)->default('user');
            $table->foreignId('merged_into_id')
                ->nullable()
                ->constrained('business_advisors')
                ->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->index('name_normalized', 'ba_name_normalized_idx');
            $table->index('status', 'ba_status_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_advisors');
    }
};
