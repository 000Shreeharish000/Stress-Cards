
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const solvedCases = [
  {
    id: 1,
    studentId: "CS21B010",
    hostelName: "Vaigai Hostel",
    helpType: "TALK",
    assignedCounsellor: "Counsellor 2",
    resolvedDate: "2024-01-10",
    notes: "Successfully provided academic guidance"
  },
  {
    id: 2,
    studentId: "ME21B032",
    hostelName: "Sarayu Hostel",
    helpType: "URGENT",
    assignedCounsellor: "Counsellor 1",
    resolvedDate: "2024-01-12",
    notes: "Crisis intervention completed"
  },
  {
    id: 3,
    studentId: "EE21B018",
    hostelName: "Vaigai Hostel",
    helpType: "SELF-HELP",
    assignedCounsellor: "Counsellor 3",
    resolvedDate: "2024-01-14",
    notes: "Resources provided and follow-up completed"
  }
];

export function SolvedCasesView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Solved Cases</h1>
        <p className="text-gray-600">Successfully resolved student support cases</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Resolved Cases
          </CardTitle>
          <CardDescription>
            Total: {solvedCases.length} cases successfully completed
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
                <TableHead>ASSIGNED COUNSELLOR</TableHead>
                <TableHead>RESOLVED DATE</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solvedCases.map((case_, index) => (
                <TableRow key={case_.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{case_.studentId}</TableCell>
                  <TableCell>{case_.hostelName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{case_.helpType}</Badge>
                  </TableCell>
                  <TableCell>{case_.assignedCounsellor}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {case_.resolvedDate}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolved
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
