"use client";

import CollapseItem from "../molecules/CollapseItem";

interface CollapseItemData {
  title: string;
  content?: string;
}

interface CollapseListProps {
  items: CollapseItemData[];
  openIndex?: number;
  onItemToggle?: (index: number) => void;
}

export default function CollapseList({
  items,
  openIndex,
  onItemToggle,
}: CollapseListProps) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <CollapseItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => onItemToggle?.(index)}
        >
          {item.content && <p>{item.content}</p>}
        </CollapseItem>
      ))}
    </div>
  );
}
