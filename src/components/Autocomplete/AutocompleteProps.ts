import { User } from "../../types/User";

export type AutocompleteProps = {
    id: string;
    items: User[];
    name: string;
    onReset: () => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (item: string | null) => void;
    placeholder: string;
    selected: string | null;
    value: string;
};

export enum HotKeys {
    ENTER = "Enter",
    ESC = "Escape",
    ARROW_DOWN = "ArrowDown",
    ARROW_UP = "ArrowUp",
}
