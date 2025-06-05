
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type HelpType = "URGENT" | "TALK" | "SELF-HELP";

interface SubmitSectionProps {
  isSubmitting: boolean;
  studentId: string;
  hostelName: string;
  selectedHelpType: HelpType | null;
  onSubmit: () => void;
}

export function SubmitSection({ 
  isSubmitting, 
  studentId, 
  hostelName, 
  selectedHelpType, 
  onSubmit 
}: SubmitSectionProps) {
  const isDisabled = isSubmitting || !studentId.trim() || !hostelName || !selectedHelpType;

  return (
    <Button
      onClick={onSubmit}
      disabled={isDisabled}
      className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg shadow-lg"
    >
      <Send className="mr-2 h-5 w-5" />
      {isSubmitting ? "Submitting..." : "Submit Request"}
    </Button>
  );
}
