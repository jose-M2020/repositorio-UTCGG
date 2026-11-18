import { useId, useState } from 'react';
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
} from '@/shared/components/ui';

type RepositoryKeywordsPickerProps = {
    error?: string;
    required?: boolean;
};

const normalizeKeyword = (value: string) => value.trim().replace(/,+/g, '');

export const RepositoryKeywordsPicker = ({
    error,
    required = false,
}: RepositoryKeywordsPickerProps) => {
    const inputId = useId();
    const anchor = useComboboxAnchor();
    const [selected, setSelected] = useState<string[]>([]);
    const [query, setQuery] = useState('');

    const normalizedQuery = normalizeKeyword(query);
    const queryAlreadySelected = selected.some(
        (keyword) => keyword.toLowerCase() === normalizedQuery.toLowerCase(),
    );
    const creatableItems =
        normalizedQuery && !queryAlreadySelected ? [normalizedQuery] : [];

    const handleValueChange = (next: string[]) => {
        setSelected(next);
        setQuery('');
    };

    const keywordsPayload = selected.join(', ');

    return (
        <div className="space-y-1">
            <label htmlFor={inputId} className="text-sm font-medium">
                Palabras clave de búsqueda
            </label>
            <p className="text-xs text-muted-foreground">
                Escribe y selecciona para agregar. Usa Enter o elige la
                sugerencia.
            </p>

            <input
                type="hidden"
                name="keywords"
                value={keywordsPayload}
                required={required && selected.length === 0}
            />

            <Combobox
                multiple
                items={creatableItems}
                value={selected}
                onValueChange={handleValueChange}
                inputValue={query}
                onInputValueChange={setQuery}
            >
                <ComboboxChips
                    ref={anchor}
                    className="w-full"
                    aria-invalid={Boolean(error) || undefined}
                    aria-label={
                        selected.length > 0
                            ? 'Palabras clave seleccionadas'
                            : undefined
                    }
                >
                    <ComboboxValue>
                        {(value: string[]) => (
                            <>
                                {value.map((keyword) => (
                                    <ComboboxChip
                                        key={keyword}
                                        aria-label={keyword}
                                    >
                                        {keyword}
                                    </ComboboxChip>
                                ))}
                                <ComboboxChipsInput
                                    id={inputId}
                                    placeholder={
                                        value.length > 0
                                            ? ''
                                            : 'Ej. laravel, educación...'
                                    }
                                    aria-invalid={Boolean(error) || undefined}
                                />
                            </>
                        )}
                    </ComboboxValue>
                </ComboboxChips>

                <ComboboxContent anchor={anchor} className="w-(--anchor-width)">
                    <ComboboxEmpty>
                        {normalizedQuery
                            ? queryAlreadySelected
                                ? 'Esa palabra clave ya está agregada.'
                                : 'No hay sugerencias.'
                            : 'Escribe una palabra clave para agregarla.'}
                    </ComboboxEmpty>
                    <ComboboxList>
                        {(keyword: string) => (
                            <ComboboxItem key={keyword} value={keyword}>
                                Agregar “{keyword}”
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            {error ? (
                <p className="text-sm text-destructive">{error}</p>
            ) : null}
        </div>
    );
};
