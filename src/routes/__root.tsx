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
      <nav className="w-full bg-gray-800 p-2">
        <div className="flex justify-center space-x-4">
          {Menus.map((menu) => (
            <Link
              key={menu.href}
              to={menu.href}
              className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 [&.active]:bg-gray-900 [&.active]:text-white"
            >
              {menu.text}
            </Link>
          ))}
        </div>
      </nav>
      <div className="w-full h-full flex justify-center">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
