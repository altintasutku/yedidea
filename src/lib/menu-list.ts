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
    SquareArrowDownLeftIcon
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
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Paneller",
        menus: [
          {
            href: "/personel",
            label: "Personel",
            active: pathname.includes("/personel"),
            icon: SquareUserIcon,
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
            ]
          },
          {
            href: "/projeler",
            label: "Projeler",
            active: pathname.includes("/projeler"),
            icon: PresentationIcon,
            submenus: []
          },
          {
            href: "/firma",
            label: "Firma",
            active: pathname.includes("/firma"),
            icon: Building2Icon,
            submenus: []
          },
          {
            href: "/giderler",
            label: "Giderler",
            active: pathname.includes("/giderler"),
            icon: SquareArrowOutUpRightIcon,
            submenus: []
          },
          {
            href: "/gelirler",
            label: "Gelirler",
            active: pathname.includes("/gelirler"),
            icon: SquareArrowDownLeftIcon,
            submenus: []
          }
        ]
      }
    ];
  }
  