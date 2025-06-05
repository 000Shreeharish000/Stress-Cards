
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const counsellors = [
  "Counsellor 1", "Counsellor 2", "Counsellor 3", "Counsellor 4", "Counsellor 5",
  "Counsellor 6", "Counsellor 7", "Counsellor 8", "Counsellor 9"
];

interface StudentCase {
  id: string;
  student_id: string;
  help_type: 'URGENT' | 'TALK' | 'SELF-HELP';
  status: 'pending' | 'assigned' | 'resolved';
}

export function AssignCounsellorView() {
  const { toast } = useToast();
  const [selectedCase, setSelectedCase] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [notes, setNotes] = useState("");
  const [pendingCases, setPendingCases] = useState<StudentCase[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending cases
  useEffect(() => {
    fetchPendingCases();
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('assign-counsellor-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_cases'
        },
        (payload) => {
          console.log('Real-time update in assign counsellor:', payload);
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
        .select('id, student_id, help_type, status')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pending cases:', error);
        return;
      }

      setPendingCases(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignment = async () => {
    if (!selectedCase || !selectedCounsellor) {
      toast({
        title: "Please select both a case and counsellor",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('student_cases')
        .update({
          status: 'assigned',
          assigned_counsellor: selectedCounsellor,
          assigned_at: new Date().toISOString()
        })
        .eq('id', selectedCase);

      if (error) {
        console.error('Error assigning counsellor:', error);
        toast({
          title: "Assignment failed",
          description: "Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Assignment Successful",
        description: `Case has been assigned to ${selectedCounsellor}`,
      });

      // Reset form
      setSelectedCase("");
      setSelectedCounsellor("");
      setNotes("");
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Assignment failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assign a Counsellor</h1>
        <p className="text-gray-600">Assign pending cases to available counsellors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              New Assignment
            </CardTitle>
            <CardDescription>Select a case and assign it to a counsellor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="case-select">Select Case</Label>
              <Select value={selectedCase} onValueChange={setSelectedCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a pending case" />
                </SelectTrigger>
                <SelectContent>
                  {pendingCases.map((case_) => (
                    <SelectItem key={case_.id} value={case_.id}>
                      {case_.student_id} - {case_.help_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="counsellor-select">Select Counsellor</Label>
              <Select value={selectedCounsellor} onValueChange={setSelectedCounsellor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a counsellor" />
                </SelectTrigger>
                <SelectContent>
                  {counsellors.map((counsellor) => (
                    <SelectItem key={counsellor} value={counsellor}>
                      {counsellor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes/Comments</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions or notes for the counsellor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            <Button onClick={handleAssignment} className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Assign Counsellor
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Assignment Overview
            </CardTitle>
            <CardDescription>Current workload distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{pendingCases.length}</div>
                <div className="text-sm text-gray-600">Pending Cases</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{counsellors.length}</div>
                <div className="text-sm text-gray-600">Available Counsellors</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Recent Assignments</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    <div>• Assign The Available Counsellor</div>
                    <div>• Make sure to Provide the Neccessary resources and Information</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
