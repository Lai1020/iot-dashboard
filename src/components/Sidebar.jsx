import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MENU_STRUCTURE } from "../data/menu";

export default function Sidebar({ activeMenu, setActiveMenu, expandedMenus, toggleMenu }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
          主导航
        </p>

        <div className="space-y-1.5">
          {MENU_STRUCTURE.map((menu) => (
            <div key={menu.id}>
              <button
                onClick={() => toggleMenu(menu.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  expandedMenus.includes(menu.id)
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{menu.title}</span>
                {expandedMenus.includes(menu.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {expandedMenus.includes(menu.id) && (
                <div className="mt-1 ml-2 pl-3 border-l border-slate-200 space-y-1">
                  {menu.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActiveMenu(child.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeMenu === child.id
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {child.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
