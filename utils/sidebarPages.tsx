import { SmilePlus, Users, AudioLines, Timer } from "lucide-react";

type SidebarPagesType = {
  id: number;
  icon: JSX.Element;
  title: string;
  href: string;
};

export const sidebarPages: SidebarPagesType[] = [
  {
    id: 1,
    icon: <AudioLines />,
    title: "Response Length",
    href: "/dashboard/response-length",
  },
  {
    id: 2,
    icon: <Timer />,
    title: "Session Length",
    href: "/dashboard/session-length",
  },
  {
    id: 3,
    icon: <SmilePlus />,
    title: "Mood Preferences",
    href: "/dashboard/mood-preferences",
  },
  {
    id: 4,
    icon: <Users />,
    title: "Feedback Module",
    href: "/dashboard/feedback-module",
  },
];
