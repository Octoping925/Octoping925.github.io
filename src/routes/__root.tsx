import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const Menus = [
  { text: "홈", href: "/" },
  { text: "코어 목표치까지 얼마 먹을까 계산기", href: "/core-calc" },
  { text: "경코젬 먹이면 몇 렙될까 계산기", href: "/exp-core-calc" },
  { text: "팀 만들기", href: "/hots-team" },
];

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full flex gap-2 justify-center">
        {Menus.map((menu) => (
          <Link to={menu.href} className="[&.active]:font-bold">
            <div className="px-2 py-1">{menu.text}</div>
          </Link>
        ))}
      </div>
      <hr />
      <div className="w-full h-full flex justify-center">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
