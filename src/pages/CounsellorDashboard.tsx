
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CounsellorSidebar } from "@/components/CounsellorSidebar";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { HostelDetailView } from "@/components/dashboard/HostelDetailView";
import { TeamMembersView } from "@/components/dashboard/TeamMembersView";
import { PendingCasesView } from "@/components/dashboard/PendingCasesView";
import { SolvedCasesView } from "@/components/dashboard/SolvedCasesView";
import { AssignCounsellorView } from "@/components/dashboard/AssignCounsellorView";

export type DashboardSection = 
  | "dashboard" 
  | "hostel-detail" 
  | "team-members" 
  | "pending-cases" 
  | "solved-cases" 
  | "assign-counsellor";

const CounsellorDashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardView onNavigate={setActiveSection} />;
      case "hostel-detail":
        return <HostelDetailView />;
      case "team-members":
        return <TeamMembersView />;
      case "pending-cases":
        return <PendingCasesView />;
      case "solved-cases":
        return <SolvedCasesView />;
      case "assign-counsellor":
        return <AssignCounsellorView />;
      default:
        return <DashboardView onNavigate={setActiveSection} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CounsellorSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          <div className="mb-4">
            <SidebarTrigger />
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CounsellorDashboard;
