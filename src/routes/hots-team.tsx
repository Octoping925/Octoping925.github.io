import HotsTeamMaker from "../page/HotsTeamMaker";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hots-team")({
  component: HotsTeamMaker,
});
