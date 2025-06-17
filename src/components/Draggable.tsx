import type { ReactNode } from "react";

interface DraggableProps {
  children: ReactNode;
  id: string;
}

export const Draggable = ({ children, id }: DraggableProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", id);
  };

  return (
    <div draggable onDragStart={handleDragStart} className="cursor-move">
      {children}
    </div>
  );
};
