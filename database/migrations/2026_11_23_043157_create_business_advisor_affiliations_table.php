<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_advisor_affiliations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_advisor_id')->constrained('business_advisors')->restrictOnDelete();
            $table->foreignId('company_id')->constrained('companies')->restrictOnDelete();
            $table->string('job_title')->nullable();
            $table->string('department')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();
            $table->date('starts_at')->nullable();
            $table->date('ends_at')->nullable();
            $table->string('status', 32)->default('pending_review');
            $table->string('source', 16)->default('user');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->index('email', 'baa_email_idx');
            $table->index('status', 'baa_status_idx');
            $table->index(['business_advisor_id', 'ends_at'], 'baa_advisor_ends_idx');
            $table->index(['company_id', 'ends_at'], 'baa_company_ends_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_advisor_affiliations');
    }
};
