
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Phone, Mail } from "lucide-react";

const teamMembers = [
  { id: 1, name: "Counsellor 1", specialization: "Academic Stress", activeCases: 12, status: "available" },
  { id: 2, name: "Counsellor 2", specialization: "Personal Issues", activeCases: 8, status: "busy" },
  { id: 3, name: "Counsellor 3", specialization: "Career Guidance", activeCases: 15, status: "available" },
  { id: 4, name: "Counsellor 4", specialization: "Mental Health", activeCases: 6, status: "available" },
  { id: 5, name: "Counsellor 5", specialization: "Academic Stress", activeCases: 10, status: "offline" },
  { id: 6, name: "Counsellor 6", specialization: "Social Issues", activeCases: 9, status: "available" },
  { id: 7, name: "Counsellor 7", specialization: "Personal Issues", activeCases: 11, status: "busy" },
  { id: 8, name: "Counsellor 8", specialization: "Career Guidance", activeCases: 7, status: "available" },
  { id: 9, name: "Counsellor 9", specialization: "Mental Health", activeCases: 13, status: "available" },
];

export function TeamMembersView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Counselling Team Members</h1>
        <p className="text-gray-600">Manage and view counsellor information and availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="shadow-lg">
            <CardHeader className="text-center">
              <Avatar className="mx-auto h-16 w-16">
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <CardDescription>{member.specialization}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Cases:</span>
                <Badge variant="outline">{member.activeCases}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge 
                  variant={
                    member.status === "available" ? "default" : 
                    member.status === "busy" ? "secondary" : "destructive"
                  }
                >
                  {member.status}
                </Badge>
              </div>
              
              <div className="pt-4 border-t flex justify-center gap-4">
                <Phone className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                <Mail className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
