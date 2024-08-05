import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquareUserIcon,
  LayoutGridIcon,
  PresentationIcon,
  Building2Icon,
  SquareArrowOutUpRightIcon,
  SquareArrowDownLeftIcon,
  BookUserIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  role: string[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGridIcon,
          submenus: [],
          role: ["admin"],
        },
      ],
    },
    {
      groupLabel: "Paneller",
      menus: [
        {
          href: "/personel",
          label: "Personel",
          active: pathname.includes("/personel"),
          icon: SquareUserIcon,
          submenus: [],
          role: ["admin", "user"],
        },
        {
          href: "/projeler",
          label: "Projeler",
          active: pathname.includes("/projeler"),
          icon: PresentationIcon,
          submenus: [],
          role: ["admin","user"],
        },
        {
          href: "/firma",
          label: "Firma",
          active: pathname.includes("/firma"),
          icon: Building2Icon,
          submenus: [],
          role: ["admin","user"],
        },
        {
          href: "/giderler",
          label: "Giderler",
          active: pathname.includes("/giderler"),
          icon: SquareArrowOutUpRightIcon,
          submenus: [],
          role: ["admin"],
        },
        {
          href: "/gelirler",
          label: "Gelirler",
          active: pathname.includes("/gelirler"),
          icon: SquareArrowDownLeftIcon,
          submenus: [],
          role: ["admin"],
        },
      ],
    },
    {
      groupLabel: "Admin",
      menus: [
        {
          href: "/user",
          label: "Sistem Kullanıcıları",
          active: pathname.includes("/user"),
          icon: BookUserIcon,
          submenus: [
            // {
            //   href: "/posts",
            //   label: "All Posts",
            //   active: pathname === "/posts"
            // },
            // {
            //   href: "/posts/new",
            //   label: "New Post",
            //   active: pathname === "/posts/new"
            // }
          ],
          role: ["admin"],
        },
      ],
    },
  ];
}
