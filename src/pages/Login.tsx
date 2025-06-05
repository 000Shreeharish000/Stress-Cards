
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const [studentCredentials, setStudentCredentials] = useState({ id: "", password: "" });
  const [counsellorCredentials, setCounsellorCredentials] = useState({ email: "", password: "" });

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production, this would validate against Supabase
    if (studentCredentials.id && studentCredentials.password) {
      localStorage.setItem("userType", "student");
      localStorage.setItem("studentId", studentCredentials.id);
      navigate("/student-dashboard");
    }
  };

  const handleCounsellorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production, this would validate against Supabase
    if (counsellorCredentials.email && counsellorCredentials.password) {
      localStorage.setItem("userType", "counsellor");
      navigate("/counsellor-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-[url('/iit-madras-indian-institute-of-technology-madras4653.jpg')] bg-cover bg-center opacity-10"></div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-800">IIT Madras</CardTitle>
          <CardDescription className="text-slate-600">Smart Hostel Stress Support System</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="student" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="counsellor">Counsellor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input
                    id="student-id"
                    type="text"
                    placeholder="Enter your student ID"
                    value={studentCredentials.id}
                    onChange={(e) => setStudentCredentials(prev => ({ ...prev, id: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Enter your password"
                    value={studentCredentials.password}
                    onChange={(e) => setStudentCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-900">
                  Login as Student
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="counsellor">
              <form onSubmit={handleCounsellorLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="counsellor-email">Email</Label>
                  <Input
                    id="counsellor-email"
                    type="email"
                    placeholder="Enter your email"
                    value={counsellorCredentials.email}
                    onChange={(e) => setCounsellorCredentials(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="counsellor-password">Password</Label>
                  <Input
                    id="counsellor-password"
                    type="password"
                    placeholder="Enter your password"
                    value={counsellorCredentials.password}
                    onChange={(e) => setCounsellorCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-900">
                  Login as Counsellor
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
