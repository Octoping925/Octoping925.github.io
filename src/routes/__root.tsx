import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full">
        <Link to="/hots-team" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/hots-team" className="[&.active]:font-bold">
          Hots Team
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
