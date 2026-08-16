import Link from "next/link";
import { Users, Bank, Buildings, GearSix } from "@phosphor-icons/react";

const NAV_ITEMS = [
  { id: "users", label: "Users & Roles", icon: Users, href: "/admin/users" },
  { id: "university", label: "University Profile", icon: Bank, href: "/admin/university" },
  { id: "campuses", label: "Campuses & Buildings", icon: Buildings, href: "/admin/campuses" },
  { id: "settings", label: "System Settings", icon: GearSix, href: "/admin/settings" },
];

export default function AdminNav({ active }: { active: string }) {
  return (
    <div className="flex flex-col gap-[4px] min-w-[220px]">
      <h3 className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider mb-[8px] px-[12px]">Admin Settings</h3>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-[10px] rounded-[8px] px-[12px] py-[8px] text-[13px] font-medium transition-colors ${
              isActive 
                ? "bg-black/[0.04] text-black" 
                : "text-[#71717a] hover:bg-black/[0.02] hover:text-black"
            }`}
          >
            <Icon size={16} weight={isActive ? "fill" : "regular"} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
