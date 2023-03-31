import { useEffect, useState } from "react";
import { User } from "../../types/User";
import ListItems from "./components/ListItems";

import "./Autocomplete.css";

type AutocompleteProps = {
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

enum HotKeys {
  ENTER = "Enter",
  ESC = "Escape",
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
}

const Autocomplete = ({
  id,
  items,
  name,
  onReset,
  onSearch,
  onSelect,
  placeholder,
  selected,
  value,
}: AutocompleteProps) => {
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [activePosition, setActivePosition] = useState<number | null>(null);
  const [entries, setEntries] = useState<string[]>([]);

  useEffect(() => {
    const entries = items.map((item) => item.name);
    setEntries(entries);
    setActivePosition(null);
    setHoverItem(null);
  }, [items]);

  const onEnter = () => {
    if (!items.length || !hoverItem) {
      return;
    }
    onSelect(hoverItem);
  };

  const onESC = () => {
    onReset();
    onSelect(null);
    setActivePosition(null);
    setHoverItem(null);
  };

  const onKeyDown = () => {
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
  };

  const onKeyUp = () => {
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
  };

  const onKeyChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          autoComplete="off"
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
          value={selected ?? value}
          onChange={(e) => {
            onSelect(null);
            onSearch(e);
          }}
          onKeyDown={onKeyChange}
        />
      </div>
      {value && !selected && (
        <ListItems
          items={items}
          onReset={onReset}
          onSelect={onSelect}
          value={value}
          hoverItem={hoverItem}
        />
      )}

      {value && !items.length && (
        <p>There are no contractor found with this name : “{value}”</p>
      )}
    </>
  );
};

export default Autocomplete;
