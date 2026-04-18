import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { X } from 'lucide-react';

// Mock AI responses as fallback
const ALIEN_RESPONSES = [
  "My optic sensors appreciate your visual symmetry. Shall we exchange genetic material samples?",
  "Your carbon-based form is adequate. How many standard galactic rotations have you survived?",
  "I observe you only have two manipulating appendages. How do you efficiently consume nutrient paste?",
  "Your transmission implies affectionate intent. My emotion-processing subroutines are currently downloading an update.",
  "Interesting. Most species on my planet communicate via scent-gland excretion. Your vocal vibrations are... quaint.",
  "Warning: Your bio-signature is dangerously attractive. Please lower your gravitational pull.",
  "Are you emitting pheromones or is my atmospheric analyzer malfunctioning?",
];

const TRANSLATOR_GLITCH_RESPONSES = [
  "You are very shiny to my eyes. I forget how to speak my own moon language.",
  "My heart thumps like a heavy moon-rock when I see your handsome face.",
  "You are the premium human. My thoughts are messy like a asteroid belt.",
  "Your smile is very bright. It makes me feel warm in my squishy parts.",
  "I am looking at you so much that I forgot to breathe my air mixture.",
  "You are very precious. Like a rare planet-crystal from the deep pits.",
  "My antenna are doing the happy dance. You are very good looking today."
];

type Message = {
  id: string;
  sender: 'user' | 'alien';
  text: string;
};

export default function Chat() {
  const { id } = useParams();
  const { matches } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const alien = matches.find(m => m.id === id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTranslating]);

  // Simulate an AI or API call to get the alien's response
  const generateAlienResponse = async (userText: string, currentMessages: Message[]) => {
    // Check if the user has provided a Gemini API Key in their environment variables (optional AI integration)
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (geminiApiKey && geminiApiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      // Format the last few messages for conversational context
      const chatHistory = currentMessages.slice(-4).map(m =>
        `${m.sender === 'user' ? 'Human' : alien?.name}: ${m.text}`
      ).join('\n');

      const promptText = `You are a user named ${alien?.name} on the dating app "ALIGNED". 
${chatHistory ? `Here is the recent chat history:\n${chatHistory}\n` : ''}
Human: "${userText}"

Reply directly to the Human's latest message as ${alien?.name}. 
The twist: Act like your response went through a VERY CHEAP intergalactic translation software. 
You must use VERY SIMPLE, basic English. However, insert exactly 1 or 2 awkwardly literal or slightly confusing words that sound like a funny misunderstanding of human culture. DO NOT be creepy, gross, or overly biological. Keep it harmless and charmingly awkward.

For example:
- Instead of "You have beautiful eyes", say: "Your visual orbs are very shiny... good looking."
- Instead of "I am doing well", say: "I am having an excellent rotation today."
- Instead of "What are you doing?", say: "What hobbies are your human hands performing?"

Keep it friendly, slightly flirtatious, and warmly confusing. Keep the grammar simple like a bad tourist translator, but drop in that one hilariously literal phrase. Maximum 2 sentences. Do not prefix the text with your name.`;

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: promptText }]
            }]
          })
        });

        const data = await response.json();
        if (data.error) {
          console.error("Gemini API Error:", data.error);
          return TRANSLATOR_GLITCH_RESPONSES[Math.floor(Math.random() * TRANSLATOR_GLITCH_RESPONSES.length)];
        }

        if (data && data.candidates && data.candidates.length > 0) {
          return data.candidates[0].content.parts[0].text;
        }
      } catch (e) {
        console.error("AI translation failed:", e);
        return TRANSLATOR_GLITCH_RESPONSES[Math.floor(Math.random() * TRANSLATOR_GLITCH_RESPONSES.length)];
      }
    }

    // Fallback ONLY if there is no API key configured at all
    return ALIEN_RESPONSES[Math.floor(Math.random() * ALIEN_RESPONSES.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTranslating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTranslating(true);

    // Simulate "Processing Translation..." delay
    const delay = Math.floor(Math.random() * 1500) + 1500; // 1.5s - 3.0s delay

    setTimeout(async () => {
      // Pass the previous messages list array AND the new user message
      const responseText = await generateAlienResponse(userMessage.text, [...messages, userMessage]);
      const alienMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'alien',
        text: responseText
      };

      setMessages(prev => [...prev, alienMessage]);
      setIsTranslating(false);
    }, delay);
  };

  if (!alien) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Transmission Lost</h2>
        <p>We couldn't connect you to this alien.</p>
        <Link to="/explore" className="btn-outline" style={{ display: 'inline-block', marginTop: '20px' }}>Return to Orbit</Link>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '20px auto', padding: '0 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
        <Link to="/explore" style={{ 
          color: 'var(--color-primary)', 
          textDecoration: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          fontSize: '0.9rem',
          fontWeight: 'bold',
          padding: '6px 12px',
          borderRadius: '20px',
          background: 'rgba(217, 3, 104, 0.1)',
          border: '1px solid var(--color-primary)'
        }}>
          <X size={16} /> Exit
        </Link>
      </div>
      <div className="glass-panel" style={{ backgroundColor: '#1a1829', border: 'none', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
        {/* Chat Header */}
        <div style={{ padding: '20px', position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'absolute', bottom: 0, left: '5%', right: '5%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)', opacity: 0.5 }}></div>
          <img src={alien.profilePic} alt={alien.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{alien.name}</h3>
            <span style={{ fontSize: '0.8rem', color: 'rgba(234, 222, 218, 0.6)' }}>{alien.alienType} • {alien.distanceLY} Light years away</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', margin: '20px 0', color: 'rgba(234, 222, 218, 0.4)', fontSize: '0.9rem' }}>
              Connection established across {alien.distanceLY} Light years. Say hello!
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                backgroundColor: msg.sender === 'user' ? 'var(--color-secondary)' : '#2A263A',
                border: `1px solid ${msg.sender === 'user' ? 'var(--color-secondary)' : '#3F3956'}`,
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                color: 'white',
                boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(217, 3, 104, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.2)',
                lineHeight: 1.5,
                fontWeight: 500
              }}
            >
              {msg.text}
            </div>
          ))}

          {isTranslating && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--color-secondary)', fontSize: '0.9rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid var(--color-secondary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
              Processing Translation...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div style={{ padding: '20px', position: 'relative', display: 'flex', gap: '12px' }}>
          <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)', opacity: 0.5 }}></div>
          <input
            type="text"
            placeholder="Send a transmission..."
            style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 16px', color: 'white' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            disabled={isTranslating}
          />
          <button
            className="btn-primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTranslating}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
