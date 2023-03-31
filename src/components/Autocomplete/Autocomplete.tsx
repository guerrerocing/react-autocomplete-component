import ListItems from "./components/ListItems";

import { AutocompleteProps } from "./AutocompleteProps";

import useHotKeys from "./hooks/useHotKeys";

import "./Autocomplete.css";

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
  const { onKeyChange, hoverItem } = useHotKeys({ items, onReset, onSelect });

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
