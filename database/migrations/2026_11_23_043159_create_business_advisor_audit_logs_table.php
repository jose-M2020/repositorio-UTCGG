<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_advisor_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('business_advisor_id')->nullable();
            $table->unsignedBigInteger('repository_id')->nullable();
            $table->string('action', 32);
            $table->json('metadata')->nullable();
            $table->string('ip', 45)->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('user_id', 'baal_user_fk')->references('id')->on('users')->nullOnDelete();
            $table->foreign('business_advisor_id', 'baal_ba_fk')->references('id')->on('business_advisors')->nullOnDelete();
            $table->foreign('repository_id', 'baal_repo_fk')->references('id')->on('repositories')->nullOnDelete();
            $table->index(['business_advisor_id', 'created_at'], 'baal_advisor_created_idx');
            $table->index(['repository_id', 'created_at'], 'baal_repo_created_idx');
            $table->index('action', 'baal_action_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_advisor_audit_logs');
    }
};
