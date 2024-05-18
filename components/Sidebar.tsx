"use client";

import { useState } from "react";
import { Settings, X } from "lucide-react";
import { sidebarPages } from "@/utils/sidebarPages";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { updatePath, updateShowDialogBox } from "@/lib/dialogSlice";
import Logout from "./Logout";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<boolean>(true);

  if (!expanded) {
    return (
      <aside className="h-full w-36 transition-all duration-300 py-4 px-2 text-text-color-900">
        <div>
          <img src="/1.png" alt="AI BLEND" className="w-[6rem]" />
        </div>
        <button
          className="flex flex-col justify-center items-center"
          onClick={() => setExpanded(true)}
        >
          <Settings className="w-4" />
          <span className="text-[10px]">Settings</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="h-full bg-[#100f3b] w-72 transition-all duration-300 text-white">
      <nav className="h-full flex flex-col justify-between shadow-sm px-2 pt-2 pb-8">
        <div className="pb-2 flex flex-col justify-between">
          <div className="flex justify-between">
            {/* Logo */}
            <div>
              <img src="/1.png" alt="AI Blend" className="w-[8rem]" />
            </div>
            {/* Close button */}
            <button
              className="p-1.5 rounded-lg"
              onClick={() => setExpanded(false)}
            >
              <X />
            </button>
          </div>
          <h3 className="text-center uppercase text-2xl my-4 font-bold">
            Settings
          </h3>
          {/* Links */}
          <ul className="px-4 mt-4 space-y-8">
            {sidebarPages.map((page) => {
              return (
                <li
                  key={page.id}
                  className={`px-2 ${
                    pathname === page.href && "bg-[#61284480] py-2 rounded-xl"
                  }`}
                >
                  <button
                    className={`flex gap-8 items-center hover:ml-2 transition-all hover:cursor-pointer text-gray-400${
                      pathname === page.href && "text-text-color-100"
                    }
                      ${pathname === "/dashboard && text-text-color-100"}
                    }`}
                    onClick={() => {
                      if (pathname === "/dashboard") {
                        dispatch(updateShowDialogBox(true));
                        dispatch(updatePath(page.href));
                      } else {
                        router.push(page.href);
                      }
                    }}
                  >
                    <span>{page.icon}</span>
                    <span className="text-sm">{page.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Logout button */}
        <button>
          <Logout />
        </button>
      </nav>
    </aside>
  );
};
export default Sidebar;
