import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Users, Eye } from "lucide-react";
import { DashboardSection } from "@/pages/CounsellorDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ViewCaseDialog } from "@/components/ViewCaseDialog";

interface DashboardViewProps {
  onNavigate: (section: DashboardSection) => void;
}

interface StudentCase {
  id: string;
  student_id: string;
  hostel_name: string;
  help_type: 'URGENT' | 'TALK' | 'SELF-HELP';
  note_type: 'text' | 'voice' | null;
  note_content: string | null;
  status: 'pending' | 'assigned' | 'resolved';
  assigned_counsellor: string | null;
  created_at: string;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const { toast } = useToast();
  const [cases, setCases] = useState<StudentCase[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetchCases();
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_cases'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchCases(); // Refresh data on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCases = async () => {
    try {
      const { data, error } = await supabase
        .from('student_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cases:', error);
        toast({
          title: "Error loading cases",
          description: "Please refresh the page.",
          variant: "destructive"
        });
        return;
      }

      setCases(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingCases = cases.filter(c => c.status === "pending").length;
  const solvedCases = cases.filter(c => c.status === "resolved").length;
  const totalCounsellors = 9;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">IIT Madras Counsellor Portal</h1>
          <p className="text-blue-100">Smart Hostel Stress Support System - Dashboard</p>
        </div>
        <div className="text-center py-8">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">IIT Madras Counsellor Portal</h1>
        <p className="text-blue-100">Smart Hostel Stress Support System - Dashboard</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("pending-cases")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingCases}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("solved-cases")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solved Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{solvedCases}</div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("team-members")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Counsellors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalCounsellors}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Student Cases</CardTitle>
          <CardDescription>Latest support requests from students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>STUDENT_ID</TableHead>
                <TableHead>HOSTEL NAME</TableHead>
                <TableHead>REQUEST</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.slice(0, 10).map((case_, index) => (
                <TableRow key={case_.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{case_.student_id}</TableCell>
                  <TableCell>{case_.hostel_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={case_.help_type === "URGENT" ? "destructive" : "default"}>
                        {case_.help_type}
                      </Badge>
                      {case_.note_content && <Eye className="h-4 w-4 text-gray-400" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={case_.status === "pending" ? "secondary" : case_.status === "assigned" ? "default" : "outline"}>
                      {case_.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ViewCaseDialog case_={case_} />
                      {case_.status === "pending" && (
                        <Button size="sm" onClick={() => onNavigate("assign-counsellor")}>
                          Assign
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {cases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No cases found. Waiting for student submissions...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
