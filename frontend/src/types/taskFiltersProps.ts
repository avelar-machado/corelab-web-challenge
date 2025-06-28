export type TaskFiltersProps = {
    showOnlyFavorites: boolean;
    setShowOnlyFavorites: (value: boolean) => void;
    selectedColor: string | null;
    setSelectedColor: (color: string | null) => void;
};