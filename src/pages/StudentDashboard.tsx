
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StudentDetailsForm } from "@/components/student/StudentDetailsForm";
import { HelpTypeSelector } from "@/components/student/HelpTypeSelector";
import { NoteInput } from "@/components/student/NoteInput";
import { SubmitSection } from "@/components/student/SubmitSection";

type HelpType = "URGENT" | "TALK" | "SELF-HELP";

const StudentDashboard = () => {
  const { toast } = useToast();
  const [textNote, setTextNote] = useState("");
  const [studentId, setStudentId] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [selectedHelpType, setSelectedHelpType] = useState<HelpType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = async () => {
    if (!studentId.trim()) {
      toast({ title: "Please enter your Student ID", variant: "destructive" });
      return;
    }

    if (!hostelName) {
      toast({ title: "Please select your hostel", variant: "destructive" });
      return;
    }

    if (!selectedHelpType) {
      toast({ title: "Please select a request type", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const noteContent = textNote.trim() || `${selectedHelpType} request`;
      
      const { error } = await supabase
        .from('student_cases')
        .insert({
          student_id: studentId.trim(),
          hostel_name: hostelName,
          help_type: selectedHelpType as "URGENT" | "TALK" | "SELF-HELP",
          note_type: textNote.trim() ? "text" as const : null,
          note_content: noteContent,
          status: "pending" as const
        });

      if (error) {
        console.error("Error submitting case:", error);
        toast({ 
          title: "Submission failed", 
          description: "Please try again later.",
          variant: "destructive" 
        });
        return;
      }
      
      toast({
        title: "Your request has been submitted",
        description: "A counsellor will review your case shortly."
      });
      
      // Reset form
      setTextNote("");
      setStudentId("");
      setHostelName("");
      setSelectedHelpType(null);
      setIsRecording(false);
      
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({ 
        title: "Submission failed", 
        description: "Please try again later.",
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="absolute inset-0 bg-[url('/iit-madras-indian-institute-of-technology-madras4653.jpg')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Please let us know
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <StudentDetailsForm
              studentId={studentId}
              hostelName={hostelName}
              onStudentIdChange={setStudentId}
              onHostelNameChange={setHostelName}
            />

            <HelpTypeSelector
              selectedHelpType={selectedHelpType}
              onSelectHelpType={setSelectedHelpType}
            />
            
            <NoteInput
              textNote={textNote}
              isRecording={isRecording}
              onTextNoteChange={setTextNote}
              onToggleRecording={handleToggleRecording}
            />

            <SubmitSection
              isSubmitting={isSubmitting}
              studentId={studentId}
              hostelName={hostelName}
              selectedHelpType={selectedHelpType}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
