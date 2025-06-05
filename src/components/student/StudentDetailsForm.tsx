
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentDetailsFormProps {
  studentId: string;
  hostelName: string;
  onStudentIdChange: (value: string) => void;
  onHostelNameChange: (value: string) => void;
}

export function StudentDetailsForm({ 
  studentId, 
  hostelName, 
  onStudentIdChange, 
  onHostelNameChange 
}: StudentDetailsFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="studentId">Student ID</Label>
        <Input
          id="studentId"
          placeholder="Enter your Student ID (e.g., CS21B001)"
          value={studentId}
          onChange={(e) => onStudentIdChange(e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="hostel">Hostel</Label>
        <Select value={hostelName} onValueChange={onHostelNameChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your hostel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Vaigai Hostel">Vaigai Hostel</SelectItem>
            <SelectItem value="Sarayu Hostel">Sarayu Hostel</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
