import { cn } from 'cn';
import type { UserAccountStatus } from '../../types';

type UserStatusBadgeProps = {
  status: UserAccountStatus;
};

const STATUS_STYLES: Record<UserAccountStatus, string> = {
  active: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  inactive: 'bg-muted text-muted-foreground',
  pending_activation: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
};

const STATUS_LABELS: Record<UserAccountStatus, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  pending_activation: 'Pendiente',
};

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};
