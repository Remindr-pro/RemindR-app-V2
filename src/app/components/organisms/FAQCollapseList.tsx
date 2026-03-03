"use client";

import FAQCollapseItem from "@/app/components/molecules/FAQCollapseItem";

interface FAQCollapseItemData {
  title: string;
  content?: string;
}

interface FAQCollapseListProps {
  items: FAQCollapseItemData[];
  openIndex?: number;
  onItemToggle?: (index: number) => void;
}

export default function FAQCollapseList({
  items,
  openIndex,
  onItemToggle,
}: FAQCollapseListProps) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <FAQCollapseItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => onItemToggle?.(index)}
        >
          {item.content && <p>{item.content}</p>}
        </FAQCollapseItem>
      ))}
    </div>
  );
}
