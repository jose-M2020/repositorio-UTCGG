<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_advisor_privacy_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('business_advisor_id');
            $table->string('type', 16);
            $table->text('message')->nullable();
            $table->string('status', 16)->default('open');
            $table->unsignedBigInteger('handled_by')->nullable();
            $table->timestamp('handled_at')->nullable();
            $table->timestamps();

            $table->foreign('business_advisor_id', 'bapr_ba_fk')
                ->references('id')
                ->on('business_advisors')
                ->restrictOnDelete();
            $table->foreign('handled_by', 'bapr_handled_fk')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
            $table->index(['business_advisor_id', 'status'], 'bapr_advisor_status_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_advisor_privacy_requests');
    }
};
