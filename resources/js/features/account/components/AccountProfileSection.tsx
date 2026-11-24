import { Form } from '@inertiajs/react';
import { updateProfile } from '@/actions/App/Http/Controllers/AccountSettingsController';
import { InputField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import type { AccountSettings } from '../types';

type AccountProfileSectionProps = {
  account: AccountSettings;
};

const DetailItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="space-y-1">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
};

export const AccountProfileSection = ({
  account,
}: AccountProfileSectionProps) => {
  return (
    <section className="space-y-6 rounded-xl border border-border bg-background p-5">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">Cuenta</h2>
        <p className="text-sm text-muted-foreground">
          Actualiza tu nombre. El correo, rol y carrera los gestiona un
          administrador.
        </p>
      </header>

      <dl className="grid gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:grid-cols-3">
        <DetailItem label="Correo" value={account.email} />
        <DetailItem label="Rol" value={account.role ?? '—'} />
        <DetailItem label="Carrera" value={account.career ?? '—'} />
      </dl>

      <Form
        {...updateProfile.form()}
        className="space-y-4"
        options={{ preserveScroll: true }}
      >
        {({ errors, processing }) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="first_name"
                name="first_name"
                label="Nombre(s)"
                required
                defaultValue={account.first_name}
                error={errors.first_name}
              />
              <InputField
                id="last_name"
                name="last_name"
                label="Apellido paterno"
                required
                defaultValue={account.last_name}
                error={errors.last_name}
              />
            </div>

            <InputField
              id="second_last_name"
              name="second_last_name"
              label="Apellido materno"
              defaultValue={account.second_last_name ?? ''}
              error={errors.second_last_name}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={processing}>
                {processing ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </>
        )}
      </Form>
    </section>
  );
};
