<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('street_line');
            $table->string('street_line_2')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('postal_code', 12)->nullable();
            $table->string('country', 2)->default('MX');
            $table->string('references')->nullable();
            $table->timestamps();

            $table->index(['city', 'state'], 'addresses_city_state_idx');
            $table->index('postal_code', 'addresses_postal_code_idx');
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->foreignId('address_id')
                ->nullable()
                ->after('email')
                ->constrained('addresses')
                ->nullOnDelete();
        });

        if (Schema::hasColumn('companies', 'address')) {
            $companies = DB::table('companies')
                ->select(['id', 'address'])
                ->whereNotNull('address')
                ->where('address', '!=', '')
                ->orderBy('id')
                ->get();

            foreach ($companies as $company) {
                $addressId = DB::table('addresses')->insertGetId([
                    'street_line' => trim((string) $company->address),
                    'country' => 'MX',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('companies')->where('id', $company->id)->update([
                    'address_id' => $addressId,
                ]);
            }

            Schema::table('companies', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }
    }

    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('address')->nullable()->after('email');
        });

        $companies = DB::table('companies')->select(['id', 'address_id'])->whereNotNull('address_id')->get();
        foreach ($companies as $company) {
            $street = DB::table('addresses')->where('id', $company->address_id)->value('street_line');
            DB::table('companies')->where('id', $company->id)->update([
                'address' => $street,
            ]);
        }

        Schema::table('companies', function (Blueprint $table) {
            $table->dropConstrainedForeignId('address_id');
        });

        Schema::dropIfExists('addresses');
    }
};
