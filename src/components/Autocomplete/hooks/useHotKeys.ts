import { useCallback, useEffect, useState } from "react";
import { HotKeys } from "../AutocompleteProps";
import { User } from "../../../types/User";

type Props = {
    onReset: () => void;
    items: User[];
    onSelect: (item: string | null) => void;
};

const useHotKeys = ({ items, onSelect, onReset }: Props) => {
    const [hoverItem, setHoverItem] = useState<string | null>(null);
    const [activePosition, setActivePosition] = useState<number | null>(null);
    const [entries, setEntries] = useState<string[]>([]);

    const onEnter = useCallback(() => {
        if (!items.length || !hoverItem) {
            return;
        }
        onSelect(hoverItem);
    }, [items, hoverItem]);

    const onESC = useCallback(() => {
        onReset();
        onSelect(null);
        setActivePosition(null);
        setHoverItem(null);
    }, []);

    const onKeyDown = useCallback(() => {
        if (!items.length) {
            return;
        } else if (
            activePosition === null ||
            activePosition === entries.length - 1
        ) {
            setActivePosition(0);
            setHoverItem(entries[0]);
        } else if (activePosition !== entries.length - 1) {
            if (activePosition !== null) {
                const position = activePosition + 1;
                setActivePosition(position);
                setHoverItem(entries[position]);
            }
        }
    }, [items, activePosition, entries]);

    const onKeyUp = useCallback(() => {
        if (!items.length) {
            return;
        } else if (activePosition === null || activePosition === 0) {
            const position = entries.length - 1;
            setActivePosition(position);
            setHoverItem(entries[position]);
        } else if (activePosition !== 0) {
            const idx = activePosition - 1;
            setActivePosition(idx);
            setHoverItem(entries[idx]);
        }
    }, [items, activePosition, entries]);

    const onKeyChange = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            const key = event.key;

            switch (key) {
                case HotKeys.ENTER:
                    onEnter();
                    break;

                case HotKeys.ESC:
                    onESC();
                    break;

                case HotKeys.ARROW_DOWN:
                    onKeyDown();
                    break;

                case HotKeys.ARROW_UP:
                    onKeyUp();
                    break;
            }
        },
        [onEnter, onESC, onKeyDown, onKeyUp]
    );

    useEffect(() => {
        const entries = items.map((item: any) => item.name);
        setEntries(entries);
        setActivePosition(null);
        setHoverItem(null);
    }, [items]);

    return { onKeyChange, hoverItem };
};

export default useHotKeys;
