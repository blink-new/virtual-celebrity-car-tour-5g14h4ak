import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, MessageCircle, ThumbsUp, ThumbsDown, Smile, User } from "lucide-react";
import { delay } from "@/lib/utils";

interface AvatarInteractionProps {
  avatar: string;
  celebrity: {
    name: string;
    image: string;
    specialty: string;
  };
  onInteractionComplete?: () => void;
}

// Predefined conversation script
const CONVERSATION = [
  {
    speaker: "celebrity",
    text: "Hi there! I'm so excited to show you around this amazing car today. How are you feeling about this tour?"
  },
  {
    speaker: "user",
    text: "I'm really looking forward to seeing all the features!"
  },
  {
    speaker: "celebrity",
    text: "Great! Let's start with the exterior. This model has a sleek aerodynamic design that reduces drag and improves fuel efficiency."
  },
  {
    speaker: "celebrity",
    text: "The LED headlights aren't just beautiful - they provide 30% better visibility than traditional headlights."
  },
  {
    speaker: "user",
    text: "Wow, that's impressive. What about the interior features?"
  },
  {
    speaker: "celebrity",
    text: "The interior is where this car really shines! Hand-stitched leather seats with cooling and heating, a 15-speaker premium sound system, and a panoramic sunroof."
  },
  {
    speaker: "celebrity",
    text: "Would you like to see how it feels to ride in this beauty?"
  },
  {
    speaker: "user",
    text: "Absolutely! Let's take it for a virtual spin."
  },
  {
    speaker: "celebrity",
    text: "Perfect! I'll prepare our virtual ride experience. This is going to be amazing!"
  }
];

export default function AvatarInteraction({ avatar, celebrity, onInteractionComplete }: AvatarInteractionProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  useEffect(() => {
    const showNextMessage = async () => {
      if (currentMessageIndex < CONVERSATION.length) {
        setIsTyping(true);
        
        // Simulate typing delay based on message length
        const typingDelay = Math.min(CONVERSATION[currentMessageIndex].text.length * 30, 2000);
        await delay(typingDelay);
        
        setIsTyping(false);
        
        // Show reaction options for user messages occasionally
        if (CONVERSATION[currentMessageIndex].speaker === "celebrity" && Math.random() > 0.5) {
          setShowReactions(true);
        } else {
          // Auto advance after a delay for reading
          const readingDelay = CONVERSATION[currentMessageIndex].text.length * 50;
          await delay(readingDelay);
          setCurrentMessageIndex(prev => prev + 1);
        }
      } else {
        // Conversation complete
        if (onInteractionComplete) {
          onInteractionComplete();
        }
      }
    };

    showNextMessage();
  }, [currentMessageIndex, onInteractionComplete]);

  const handleReactionSelect = async (reaction: string) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
    
    await delay(1000);
    setCurrentMessageIndex(prev => prev + 1);
  };

  const handleSkipInteraction = () => {
    if (onInteractionComplete) {
      onInteractionComplete();
    }
  };

  const currentMessage = CONVERSATION[currentMessageIndex] || { speaker: "", text: "" };
  const displayedMessages = CONVERSATION.slice(0, currentMessageIndex + (isTyping ? 0 : 1));

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      <div className="p-4 bg-muted border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Interactive Conversation</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground"
          onClick={handleSkipInteraction}
        >
          Skip
        </Button>
      </div>
      
      <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4">
        {displayedMessages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.speaker === "celebrity" ? "justify-start" : "justify-end"}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.speaker === "celebrity" 
                  ? "bg-muted text-foreground rounded-tl-none" 
                  : "bg-primary text-primary-foreground rounded-tr-none"
              }`}
            >
              {index === currentMessageIndex && isTyping ? (
                <div className="flex gap-1 items-center h-6">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "100ms" }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                </div>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {showReactions && (
          <motion.div 
            className="p-4 border-t border-border bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-muted-foreground mb-3">How do you want to respond?</p>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleReactionSelect("positive")}
              >
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span>That's amazing!</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleReactionSelect("question")}
              >
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span>Tell me more</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleReactionSelect("excited")}
              >
                <Smile className="h-4 w-4 text-amber-500" />
                <span>I'm excited!</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="p-3 bg-muted/50 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="Your avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
            <img src={celebrity.image} alt={celebrity.name} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {currentMessageIndex}/{CONVERSATION.length} interactions
        </div>
      </div>
    </div>
  );
}