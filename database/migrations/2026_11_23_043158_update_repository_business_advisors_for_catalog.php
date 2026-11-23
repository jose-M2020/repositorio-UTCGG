<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('repository_business_advisors', function (Blueprint $table) {
            if (! Schema::hasColumn('repository_business_advisors', 'business_advisor_id')) {
                $table->unsignedBigInteger('business_advisor_id')->nullable()->after('repository_id');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'business_advisor_affiliation_id')) {
                $table->unsignedBigInteger('business_advisor_affiliation_id')->nullable()->after('business_advisor_id');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'snapshot')) {
                $table->json('snapshot')->nullable()->after('business_advisor_affiliation_id');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'confirmation_token_hash')) {
                $table->string('confirmation_token_hash', 64)->nullable()->after('document_path');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'confirmation_sent_at')) {
                $table->timestamp('confirmation_sent_at')->nullable()->after('confirmation_token_hash');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'confirmation_expires_at')) {
                $table->timestamp('confirmation_expires_at')->nullable()->after('confirmation_sent_at');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'confirmed_at')) {
                $table->timestamp('confirmed_at')->nullable()->after('confirmation_expires_at');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'confirmed_via')) {
                $table->string('confirmed_via', 32)->nullable()->after('confirmed_at');
            }
        });

        $this->addForeignIfMissing('repository_business_advisors', 'rba_ba_fk', function (Blueprint $table): void {
            $table->foreign('business_advisor_id', 'rba_ba_fk')
                ->references('id')
                ->on('business_advisors')
                ->restrictOnDelete();
        });

        $this->addForeignIfMissing('repository_business_advisors', 'rba_baa_fk', function (Blueprint $table): void {
            $table->foreign('business_advisor_affiliation_id', 'rba_baa_fk')
                ->references('id')
                ->on('business_advisor_affiliations')
                ->restrictOnDelete();
        });

        Schema::table('repository_business_advisors', function (Blueprint $table) {
            $sm = Schema::getConnection()->getSchemaBuilder();
            $indexes = collect($sm->getIndexes('repository_business_advisors'))
                ->pluck('name')
                ->all();

            if (! in_array('rba_business_advisor_idx', $indexes, true)) {
                $table->index('business_advisor_id', 'rba_business_advisor_idx');
            }
        });

        DB::table('repository_business_advisors')
            ->where('acceptance_status', 'confirmed')
            ->whereNull('confirmed_at')
            ->update([
                'confirmed_at' => DB::raw('assigned_at'),
                'confirmed_via' => 'academic_advisor',
            ]);
    }

    public function down(): void
    {
        Schema::table('repository_business_advisors', function (Blueprint $table) {
            $this->dropForeignIfExists($table, 'rba_ba_fk');
            $this->dropForeignIfExists($table, 'rba_baa_fk');

            $sm = Schema::getConnection()->getSchemaBuilder();
            $indexes = collect($sm->getIndexes('repository_business_advisors'))
                ->pluck('name')
                ->all();
            if (in_array('rba_business_advisor_idx', $indexes, true)) {
                $table->dropIndex('rba_business_advisor_idx');
            }

            $table->dropColumn(array_values(array_filter([
                Schema::hasColumn('repository_business_advisors', 'business_advisor_id') ? 'business_advisor_id' : null,
                Schema::hasColumn('repository_business_advisors', 'business_advisor_affiliation_id') ? 'business_advisor_affiliation_id' : null,
                Schema::hasColumn('repository_business_advisors', 'snapshot') ? 'snapshot' : null,
                Schema::hasColumn('repository_business_advisors', 'confirmation_token_hash') ? 'confirmation_token_hash' : null,
                Schema::hasColumn('repository_business_advisors', 'confirmation_sent_at') ? 'confirmation_sent_at' : null,
                Schema::hasColumn('repository_business_advisors', 'confirmation_expires_at') ? 'confirmation_expires_at' : null,
                Schema::hasColumn('repository_business_advisors', 'confirmed_at') ? 'confirmed_at' : null,
                Schema::hasColumn('repository_business_advisors', 'confirmed_via') ? 'confirmed_via' : null,
            ])));
        });
    }

    private function addForeignIfMissing(string $tableName, string $foreignName, callable $callback): void
    {
        $foreignKeys = collect(Schema::getConnection()->getSchemaBuilder()->getForeignKeys($tableName))
            ->pluck('name')
            ->all();

        if (in_array($foreignName, $foreignKeys, true)) {
            return;
        }

        Schema::table($tableName, $callback);
    }

    private function dropForeignIfExists(Blueprint $table, string $foreignName): void
    {
        $foreignKeys = collect(Schema::getConnection()->getSchemaBuilder()->getForeignKeys($table->getTable()))
            ->pluck('name')
            ->all();

        if (in_array($foreignName, $foreignKeys, true)) {
            $table->dropForeign($foreignName);
        }
    }
};
