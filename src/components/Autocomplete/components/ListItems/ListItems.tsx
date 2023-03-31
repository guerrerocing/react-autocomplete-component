import Item from "../Item";

import "./ListItems.css";

type Items = {
  id: number;
  name: string;
};

type ListItemsProps = {
  items: Items[];
  onReset: () => void;
  onSelect: (item: string | null) => void;
  value: string;
  hoverItem: string | null;
};

const ListItems = ({ items, onSelect, value, hoverItem }: ListItemsProps) => {
  return (
    <div className="list">
      {items.map((item, id) => {
        return (
          <Item
            key={id}
            item={item}
            onSelect={onSelect}
            value={value}
            hoverItem={hoverItem}
          />
        );
      })}
    </div>
  );
};

export default ListItems;
