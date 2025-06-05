
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertTriangle, MessageCircle, BookOpen } from "lucide-react";

type HelpType = "URGENT" | "TALK" | "SELF-HELP";

interface HelpTypeSelectorProps {
  selectedHelpType: HelpType | null;
  onSelectHelpType: (type: HelpType) => void;
}

export function HelpTypeSelector({ selectedHelpType, onSelectHelpType }: HelpTypeSelectorProps) {
  const getHelpTypeColor = (type: HelpType) => {
    switch (type) {
      case "URGENT": return "bg-red-600 hover:bg-red-700 border-red-600";
      case "TALK": return "bg-teal-600 hover:bg-teal-700 border-teal-600";
      case "SELF-HELP": return "bg-blue-600 hover:bg-blue-700 border-blue-600";
      default: return "bg-gray-600 hover:bg-gray-700 border-gray-600";
    }
  };

  return (
    <div className="space-y-3">
      <Label>Select Request Type</Label>
      <div className="grid grid-cols-1 gap-2">
        <Button
          onClick={() => onSelectHelpType("URGENT")}
          variant={selectedHelpType === "URGENT" ? "default" : "outline"}
          className={selectedHelpType === "URGENT" ? getHelpTypeColor("URGENT") : ""}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          URGENT
        </Button>
        
        <Button
          onClick={() => onSelectHelpType("TALK")}
          variant={selectedHelpType === "TALK" ? "default" : "outline"}
          className={selectedHelpType === "TALK" ? getHelpTypeColor("TALK") : ""}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          TALK
        </Button>
        
        <Button
          onClick={() => onSelectHelpType("SELF-HELP")}
          variant={selectedHelpType === "SELF-HELP" ? "default" : "outline"}
          className={selectedHelpType === "SELF-HELP" ? getHelpTypeColor("SELF-HELP") : ""}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          SELF-HELP
        </Button>
      </div>
    </div>
  );
}
