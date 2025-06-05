
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, User, MapPin, FileText } from "lucide-react";

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

interface ViewCaseDialogProps {
  case_: StudentCase;
}

export function ViewCaseDialog({ case_ }: ViewCaseDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Case Details</DialogTitle>
          <DialogDescription>
            Student support request information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Student ID:</span>
            <span>{case_.student_id}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Hostel:</span>
            <span>{case_.hostel_name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-medium">Request Type:</span>
            <Badge variant={case_.help_type === "URGENT" ? "destructive" : "default"}>
              {case_.help_type}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Submitted:</span>
            <span className="text-sm">{new Date(case_.created_at).toLocaleString()}</span>
          </div>
          
          {case_.note_content && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Note:</span>
                {case_.note_type && (
                  <Badge variant="outline">{case_.note_type}</Badge>
                )}
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                {case_.note_content}
              </div>
            </div>
          )}
          
          {case_.assigned_counsellor && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Assigned to:</span>
              <span>{case_.assigned_counsellor}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
