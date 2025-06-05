
import { 
  Home, 
  Building, 
  Users, 
  Clock, 
  CheckCircle, 
  UserPlus 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { DashboardSection } from "@/pages/CounsellorDashboard";

interface CounsellorSidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

const menuItems = [
  {
    title: "DASHBOARD",
    icon: Home,
    section: "dashboard" as DashboardSection,
  },
  {
    title: "HOSTEL DETAIL",
    icon: Building,
    section: "hostel-detail" as DashboardSection,
  },
  {
    title: "COUNSELLING TEAM MEMBERS",
    icon: Users,
    section: "team-members" as DashboardSection,
  },
  {
    title: "PENDING CASES",
    icon: Clock,
    section: "pending-cases" as DashboardSection,
  },
  {
    title: "SOLVED CASES",
    icon: CheckCircle,
    section: "solved-cases" as DashboardSection,
  },
  {
    title: "ASSIGN A COUNSELLOR",
    icon: UserPlus,
    section: "assign-counsellor" as DashboardSection,
  },
];

export function CounsellorSidebar({ activeSection, onSectionChange }: CounsellorSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="text-lg font-bold text-slate-800">IIT Madras</div>
        <div className="text-sm text-slate-600">Counsellor Portal</div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton 
                    onClick={() => onSectionChange(item.section)}
                    isActive={activeSection === item.section}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span className="text-xs">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
