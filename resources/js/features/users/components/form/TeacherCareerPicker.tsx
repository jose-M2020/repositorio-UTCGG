import { useId, useState } from 'react';
import { FormField } from '@/shared/components/form';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/shared/components/ui/combobox';
import type { CareerOption } from '../../types';

type TeacherCareerPickerProps = {
  careers: CareerOption[];
  defaultSelectedIds?: number[];
  error?: string;
};

const careerLabel = (career: CareerOption) => `${career.code} — ${career.name}`;

export const TeacherCareerPicker = ({
  careers,
  defaultSelectedIds = [],
  error,
}: TeacherCareerPickerProps) => {
  const inputId = useId();
  const anchor = useComboboxAnchor();
  const [selected, setSelected] = useState<CareerOption[]>(() =>
    careers.filter((career) => defaultSelectedIds.includes(career.id)),
  );

  const handleValueChange = (next: CareerOption[]) => {
    setSelected(next);
  };

  const primaryCode = selected[0]?.code ?? '';

  return (
    <FormField
      id={inputId}
      label="Carreras"
      error={error}
      hint="Selecciona una o más carreras donde imparte."
      className="sm:col-span-2"
    >
      {selected.map((career, index) => (
        <span key={`career-payload-${career.id}`}>
          <input
            type="hidden"
            name={`careers[${index}][career_id]`}
            value={career.id}
          />
          <input
            type="hidden"
            name={`careers[${index}][position]`}
            value="teacher"
          />
        </span>
      ))}

      {primaryCode ? (
        <input type="hidden" name="career" value={primaryCode} />
      ) : null}

      <Combobox
        multiple
        items={careers}
        value={selected}
        onValueChange={handleValueChange}
        itemToStringLabel={careerLabel}
        isItemEqualToValue={(a, b) => a.id === b.id}
      >
        <ComboboxChips
          ref={anchor}
          className="w-full"
          aria-invalid={Boolean(error) || undefined}
          aria-label={
            selected.length > 0 ? 'Carreras seleccionadas' : undefined
          }
        >
          <ComboboxValue>
            {(value: CareerOption[]) => (
              <>
                {value.map((career) => (
                  <ComboboxChip
                    key={career.id}
                    aria-label={careerLabel(career)}
                  >
                    {career.code}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id={inputId}
                  placeholder={value.length > 0 ? '' : 'Buscar carrera...'}
                  aria-invalid={Boolean(error) || undefined}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor} className="w-(--anchor-width)">
          <ComboboxEmpty>No se encontraron carreras.</ComboboxEmpty>
          <ComboboxList>
            {(career: CareerOption) => (
              <ComboboxItem key={career.id} value={career}>
                {careerLabel(career)}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {!error && selected.length === 0 ? (
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Elige al menos una carrera.
        </p>
      ) : null}
    </FormField>
  );
};
