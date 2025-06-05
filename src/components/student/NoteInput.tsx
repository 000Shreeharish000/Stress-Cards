
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NoteInputProps {
  textNote: string;
  isRecording: boolean;
  onTextNoteChange: (value: string) => void;
  onToggleRecording: () => void;
}

export function NoteInput({ 
  textNote, 
  isRecording, 
  onTextNoteChange, 
  onToggleRecording 
}: NoteInputProps) {
  const { toast } = useToast();

  const handleVoiceRecording = () => {
    onToggleRecording();
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording ? "Voice recording saved" : "Speak now to record your message"
    });
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="textNote">Add a Note (Optional)</Label>
      <Textarea
        id="textNote"
        placeholder="Share your thoughts or concerns..."
        value={textNote}
        onChange={(e) => onTextNoteChange(e.target.value)}
        className="min-h-[100px]"
      />
      
      <div className="flex gap-2">
        <Button
          onClick={handleVoiceRecording}
          variant="outline"
          className={`flex-1 ${isRecording ? "bg-red-100 border-red-300" : ""}`}
          type="button"
        >
          <Mic className={`mr-2 h-4 w-4 ${isRecording ? "text-red-600" : ""}`} />
          {isRecording ? "Stop Recording" : "Voice Note"}
        </Button>
      </div>
    </div>
  );
}
