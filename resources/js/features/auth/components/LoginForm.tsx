import { Link } from '@inertiajs/react';
import { create as forgotPassword } from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { InputField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import type { AuthFormErrors } from '../types';

type LoginFormProps = {
  errors: AuthFormErrors;
  processing: boolean;
};

export const LoginForm = ({ errors, processing }: LoginFormProps) => {
  return (
    <div className="space-y-4">
      <InputField
        id="email"
        name="email"
        label="Correo"
        type="email"
        required
        autoComplete="email"
        error={errors.email}
      />

      <InputField
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        required
        autoComplete="current-password"
        error={errors.password}
      />

      <div className="flex items-center justify-between gap-3 pt-2">
        <Link
          href={forgotPassword.url()}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <Button type="submit" disabled={processing}>
          {processing ? 'Ingresando...' : 'Entrar'}
        </Button>
      </div>
    </div>
  );
};
