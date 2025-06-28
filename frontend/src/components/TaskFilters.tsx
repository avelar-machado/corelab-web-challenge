import '../styles/TaskFilters.scss';
import { ColorPicker } from './ColorPicker';
import type { TaskFiltersProps } from '../types/taskFiltersProps.ts';


export const TaskFilters = ({
    showOnlyFavorites,
    setShowOnlyFavorites,
    selectedColor,
    setSelectedColor,
}: TaskFiltersProps) => {
    const handleColorSelect = (color: string) => {
        setSelectedColor(color === selectedColor ? null : color);
    };

    return (
        <div className="filters">
            <label className="favorite-checkbox">
                <input
                    type="checkbox"
                    checked={showOnlyFavorites}
                    onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                />
                Mostrar apenas favoritos
            </label>

            <div className="color-filter">
                <span className="color-label">Filtrar por cor:</span>
                <div className="color-picker-wrapper">
                    <ColorPicker onSelect={handleColorSelect} />
                    {selectedColor && (
                        <button className="clear-button" onClick={() => setSelectedColor(null)} title="Limpar filtro">
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
