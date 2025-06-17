import { createFileRoute } from "@tanstack/react-router";
import { CoreExpCalculator } from "@/page/core-calc";

export const Route = createFileRoute("/core-calc")({
  component: CoreExpCalculator,
});
