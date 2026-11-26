<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_period_participants', function (Blueprint $table): void {
            $table->unsignedTinyInteger('term_number')->nullable()->after('status');
            $table->foreignId('curriculum_requirement_id')
                ->nullable()
                ->after('term_number')
                ->constrained('curriculum_requirements')
                ->restrictOnDelete();
            $table->string('override_reason', 500)->nullable()->after('curriculum_requirement_id');
        });
    }

    public function down(): void
    {
        Schema::table('project_period_participants', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('curriculum_requirement_id');
            $table->dropColumn(['term_number', 'override_reason']);
        });
    }
};