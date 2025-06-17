import { createFileRoute } from "@tanstack/react-router";
import { ExpCoreExpCalculator } from "../page/exp-core-calc";

export const Route = createFileRoute("/exp-core-calc")({
  component: ExpCoreExpCalculator,
});
