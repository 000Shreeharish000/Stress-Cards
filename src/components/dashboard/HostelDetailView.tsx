
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, AlertTriangle } from "lucide-react";

const hostelData = [
  {
    name: "Vaigai Hostel",
    totalStudents: 450,
    activeCases: 0,
    urgentCases: 0,
    description: "Main residential facility for undergraduate students"
  },
  {
    name: "Sarayu Hostel",
    totalStudents: 380,
    activeCases: 1,
    urgentCases: 1,
    description: "Graduate and postgraduate residential facility"
  }
];

export function HostelDetailView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hostel Details</h1>
        <p className="text-gray-600">Overview of residential facilities and current cases</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hostelData.map((hostel) => (
          <Card key={hostel.name} className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                {hostel.name}
              </CardTitle>
              <CardDescription>{hostel.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{hostel.totalStudents}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{hostel.activeCases}</div>
                  <div className="text-sm text-gray-600">Active Cases</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">{hostel.urgentCases}</div>
                  <div className="text-sm text-gray-600">Urgent</div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Badge variant="outline">Operational</Badge>
                  <Badge variant={hostel.urgentCases > 0 ? "destructive" : "secondary"}>
                    {hostel.urgentCases > 0 ? "Attention Needed" : "Stable"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
