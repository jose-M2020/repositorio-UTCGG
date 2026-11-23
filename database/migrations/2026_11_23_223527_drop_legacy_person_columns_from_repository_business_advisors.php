<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Phase C: assignments keep snapshot + catalog FKs only for person/contact fields.
     */
    public function up(): void
    {
        $legacyRows = DB::table('repository_business_advisors')
            ->whereNull('business_advisor_id')
            ->count();

        if ($legacyRows > 0) {
            throw new RuntimeException(
                "Cannot drop legacy columns: {$legacyRows} repository_business_advisors rows still lack business_advisor_id. Run `php artisan business-advisors:migrate-legacy` first."
            );
        }

        $rows = DB::table('repository_business_advisors')->select([
            'id',
            'company_id',
            'first_name',
            'last_name',
            'second_last_name',
            'email',
            'phone',
            'job_title',
            'department',
            'snapshot',
            'assigned_at',
        ])->get();

        foreach ($rows as $row) {
            $snapshot = is_string($row->snapshot)
                ? json_decode($row->snapshot, true)
                : $row->snapshot;

            if (is_array($snapshot) && $snapshot !== []) {
                continue;
            }

            $company = $row->company_id
                ? DB::table('companies')->where('id', $row->company_id)->first(['id', 'name', 'rfc'])
                : null;

            $payload = [
                'first_name' => $row->first_name,
                'last_name' => $row->last_name,
                'second_last_name' => $row->second_last_name,
                'company' => $company ? [
                    'id' => $company->id,
                    'name' => $company->name,
                    'rfc' => $company->rfc,
                ] : null,
                'job_title' => $row->job_title,
                'department' => $row->department,
                'email' => $row->email,
                'phone' => $row->phone,
                'captured_at' => $row->assigned_at,
            ];

            DB::table('repository_business_advisors')
                ->where('id', $row->id)
                ->update(['snapshot' => json_encode($payload)]);
        }

        Schema::table('repository_business_advisors', function (Blueprint $table) {
            $drop = array_values(array_filter([
                Schema::hasColumn('repository_business_advisors', 'first_name') ? 'first_name' : null,
                Schema::hasColumn('repository_business_advisors', 'last_name') ? 'last_name' : null,
                Schema::hasColumn('repository_business_advisors', 'second_last_name') ? 'second_last_name' : null,
                Schema::hasColumn('repository_business_advisors', 'email') ? 'email' : null,
                Schema::hasColumn('repository_business_advisors', 'phone') ? 'phone' : null,
                Schema::hasColumn('repository_business_advisors', 'job_title') ? 'job_title' : null,
                Schema::hasColumn('repository_business_advisors', 'department') ? 'department' : null,
            ]));

            if ($drop !== []) {
                $table->dropColumn($drop);
            }
        });
    }

    public function down(): void
    {
        Schema::table('repository_business_advisors', function (Blueprint $table) {
            if (! Schema::hasColumn('repository_business_advisors', 'first_name')) {
                $table->string('first_name')->nullable()->after('company_id');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'last_name')) {
                $table->string('last_name')->nullable()->after('first_name');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'second_last_name')) {
                $table->string('second_last_name')->nullable()->after('last_name');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'email')) {
                $table->string('email')->nullable()->after('second_last_name');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'phone')) {
                $table->string('phone', 20)->nullable()->after('email');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'job_title')) {
                $table->string('job_title')->nullable()->after('phone');
            }
            if (! Schema::hasColumn('repository_business_advisors', 'department')) {
                $table->string('department')->nullable()->after('job_title');
            }
        });
    }
};
