import "./Item.css";

type _Item = {
  id: number;
  name: string;
};

type ItemsProps = {
  item: _Item;
  onSelect: (item: string | null) => void;
  value: string;
  hoverItem: string | null;
};

type HTML = { __html: string };

const Item = ({ item, onSelect, value, hoverItem }: ItemsProps) => {
  const highlightText = (search: string, str: string): HTML => {
    const matchText = str.replace(
      new RegExp(search, "gi"),
      (match) => `<mark>${match}</mark>`
    );

    return { __html: matchText };
  };

  return (
    <div
      className={hoverItem === item.name ? "active item" : "item"}
      onClick={(e) => onSelect(item.name)}
      dangerouslySetInnerHTML={highlightText(value, item.name)}
    />
  );
};

export default Item;
