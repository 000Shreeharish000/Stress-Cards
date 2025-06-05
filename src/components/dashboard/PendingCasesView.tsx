import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, UserPlus, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ViewCaseDialog } from "@/components/ViewCaseDialog";

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

export function PendingCasesView() {
  const { toast } = useToast();
  const [pendingCases, setPendingCases] = useState<StudentCase[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetchPendingCases();
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('pending-cases-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_cases'
        },
        (payload) => {
          console.log('Real-time update in pending cases:', payload);
          fetchPendingCases(); // Refresh data on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPendingCases = async () => {
    try {
      const { data, error } = await supabase
        .from('student_cases')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pending cases:', error);
        toast({
          title: "Error loading pending cases",
          description: "Please refresh the page.",
          variant: "destructive"
        });
        return;
      }

      setPendingCases(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveCase = async (caseId: string) => {
    try {
      const { error } = await supabase
        .from('student_cases')
        .update({ 
          status: 'resolved',
          resolved_at: new Date().toISOString()
        })
        .eq('id', caseId);

      if (error) {
        console.error('Error resolving case:', error);
        toast({
          title: "Error resolving case",
          description: "Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Case resolved",
        description: "The case has been marked as resolved."
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Cases</h1>
          <p className="text-gray-600">Student support requests awaiting assignment or action</p>
        </div>
        <div className="text-center py-8">Loading pending cases...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pending Cases</h1>
        <p className="text-gray-600">Student support requests awaiting assignment or action</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Pending Cases</CardTitle>
          <CardDescription>
            Total: {pendingCases.length} cases requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>STUDENT_ID</TableHead>
                <TableHead>HOSTEL NAME</TableHead>
                <TableHead>REQUEST TYPE</TableHead>
                <TableHead>NOTE TYPE</TableHead>
                <TableHead>SUBMITTED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingCases.map((case_, index) => (
                <TableRow key={case_.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{case_.student_id}</TableCell>
                  <TableCell>{case_.hostel_name}</TableCell>
                  <TableCell>
                    <Badge variant={case_.help_type === "URGENT" ? "destructive" : "default"}>
                      {case_.help_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{case_.note_type || 'none'}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(case_.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ViewCaseDialog case_={case_} />
                      <Button size="sm" variant="default">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleResolveCase(case_.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {pendingCases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No pending cases found.
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
