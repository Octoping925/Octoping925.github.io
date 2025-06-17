import type { ReactNode } from "react";

interface DroppableProps {
  children: ReactNode;
  onDrop: (id: string) => void;
  className?: string;
}

export const Droppable = ({
  children,
  onDrop,
  className = "",
}: DroppableProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    onDrop(id);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className={className}>
      {children}
    </div>
  );
};
