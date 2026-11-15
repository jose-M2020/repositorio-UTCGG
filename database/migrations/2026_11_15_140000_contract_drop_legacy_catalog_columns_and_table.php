<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        try {
            if (Schema::getConnection()->getDriverName() === 'sqlite') {
                $this->rebuildRepositoriesWithoutLegacyColumns();
                $this->rebuildUsersWithoutLegacyColumns();
            } else {
                $this->dropForeignIfExists('repositories', 'career_catalog_id');
                $this->dropForeignIfExists('repositories', 'project_type_catalog_id');
                $this->dropForeignIfExists('repositories', 'academic_degree_catalog_id');

                $repositoryColumns = array_values(array_filter([
                    Schema::hasColumn('repositories', 'career_catalog_id') ? 'career_catalog_id' : null,
                    Schema::hasColumn('repositories', 'project_type_catalog_id') ? 'project_type_catalog_id' : null,
                    Schema::hasColumn('repositories', 'academic_degree_catalog_id') ? 'academic_degree_catalog_id' : null,
                ]));

                if ($repositoryColumns !== []) {
                    Schema::table('repositories', function (Blueprint $table) use ($repositoryColumns): void {
                        $table->dropColumn($repositoryColumns);
                    });
                }

                $this->dropForeignIfExists('users', 'career_catalog_id');

                if (Schema::hasColumn('users', 'career_catalog_id')) {
                    Schema::table('users', function (Blueprint $table): void {
                        $table->dropColumn('career_catalog_id');
                    });
                }
            }

            Schema::dropIfExists('catalogs');
        } finally {
            Schema::enableForeignKeyConstraints();
        }
    }

    public function down(): void
    {
        Schema::create('catalogs', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('code');
            $table->string('name');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->unique(['type', 'code']);
            $table->index(['type', 'is_active', 'sort_order']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('career_catalog_id')->nullable()->constrained('catalogs')->restrictOnDelete();
        });

        Schema::table('repositories', function (Blueprint $table) {
            $table->foreignId('career_catalog_id')->nullable()->constrained('catalogs')->restrictOnDelete();
            $table->foreignId('project_type_catalog_id')->nullable()->constrained('catalogs')->restrictOnDelete();
            $table->foreignId('academic_degree_catalog_id')->nullable()->constrained('catalogs')->restrictOnDelete();
        });
    }

    private function rebuildRepositoriesWithoutLegacyColumns(): void
    {
        if (! Schema::hasTable('repositories')) {
            return;
        }

        if (
            ! Schema::hasColumn('repositories', 'career_catalog_id')
            && ! Schema::hasColumn('repositories', 'project_type_catalog_id')
            && ! Schema::hasColumn('repositories', 'academic_degree_catalog_id')
        ) {
            return;
        }

        Schema::create('repositories_contract_tmp', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('keywords');
            $table->boolean('is_public')->default(true);
            $table->foreignId('career_id')->constrained('careers')->restrictOnDelete();
            $table->foreignId('project_type_id')->constrained('project_types')->restrictOnDelete();
            $table->foreignId('education_level_id')->constrained('education_levels')->restrictOnDelete();
            $table->string('external_advisor')->nullable();
            $table->string('company');
            $table->string('generation');
            $table->text('images')->nullable();
            $table->string('created_by');
            $table->timestamps();
        });

        $rows = DB::table('repositories')->get();
        foreach ($rows as $row) {
            DB::table('repositories_contract_tmp')->insert([
                'id' => $row->id,
                'title' => $row->title,
                'slug' => $row->slug,
                'description' => $row->description,
                'keywords' => $row->keywords,
                'is_public' => $row->is_public,
                'career_id' => $row->career_id,
                'project_type_id' => $row->project_type_id,
                'education_level_id' => $row->education_level_id,
                'external_advisor' => $row->external_advisor,
                'company' => $row->company,
                'generation' => $row->generation,
                'images' => $row->images,
                'created_by' => $row->created_by,
                'created_at' => $row->created_at,
                'updated_at' => $row->updated_at,
            ]);
        }

        Schema::drop('repositories');
        Schema::rename('repositories_contract_tmp', 'repositories');
    }

    private function rebuildUsersWithoutLegacyColumns(): void
    {
        if (! Schema::hasTable('users') || ! Schema::hasColumn('users', 'career_catalog_id')) {
            return;
        }

        Schema::create('users_contract_tmp', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('second_last_name')->nullable();
            $table->string('email')->unique();
            $table->string('user_type', 32)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('avatar_path')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->boolean('must_change_password')->default(false);
            $table->json('preferences')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('status', 32)->default('active');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
            $table->index('user_type');
            $table->index('status');
            $table->index(['user_type', 'status']);
        });

        $rows = DB::table('users')->get();
        foreach ($rows as $row) {
            DB::table('users_contract_tmp')->insert([
                'id' => $row->id,
                'first_name' => $row->first_name,
                'last_name' => $row->last_name,
                'second_last_name' => $row->second_last_name,
                'email' => $row->email,
                'user_type' => $row->user_type ?? null,
                'phone' => $row->phone ?? null,
                'avatar_path' => $row->avatar_path ?? null,
                'last_login_at' => $row->last_login_at ?? null,
                'must_change_password' => $row->must_change_password ?? false,
                'preferences' => $row->preferences ?? null,
                'email_verified_at' => $row->email_verified_at,
                'password' => $row->password,
                'status' => $row->status ?? 'active',
                'remember_token' => $row->remember_token,
                'created_at' => $row->created_at,
                'updated_at' => $row->updated_at,
                'deleted_at' => $row->deleted_at ?? null,
            ]);
        }

        Schema::drop('users');
        Schema::rename('users_contract_tmp', 'users');
    }

    private function dropForeignIfExists(string $table, string $column): void
    {
        if (! Schema::hasTable($table) || ! Schema::hasColumn($table, $column)) {
            return;
        }

        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return;
        }

        $foreignKeys = Schema::getForeignKeys($table);

        foreach ($foreignKeys as $foreignKey) {
            $columns = $foreignKey['columns'] ?? [];
            if (! in_array($column, $columns, true)) {
                continue;
            }

            $name = $foreignKey['name'] ?? null;
            if (! is_string($name) || $name === '') {
                continue;
            }

            Schema::table($table, function (Blueprint $blueprint) use ($name): void {
                $blueprint->dropForeign($name);
            });
        }
    }
};
