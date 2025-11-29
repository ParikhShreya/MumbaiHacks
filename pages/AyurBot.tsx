import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AYURBOT_URL = "https://id-preview--7ecef122-d909-4707-a7a9-871e53ba11ce.lovable.app/?__lovable_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNnNKM2xXdzdBbVpUR2E3bGNMNTF1UEdJUUN4MiIsInByb2plY3RfaWQiOiI3ZWNlZjEyMi1kOTA5LTQ3MDctYTdhOS04NzFlNTNiYTExY2UiLCJub25jZSI6IjU1Y2I4MmI1Zjc0OTExOTZjODVkZmM4YjVlMDkzYzlmIiwiaXNzIjoibG92YWJsZS1hcGkiLCJzdWIiOiI3ZWNlZjEyMi1kOTA5LTQ3MDctYTdhOS04NzFlNTNiYTExY2UiLCJhdWQiOlsibG92YWJsZS1hcHAiXSwiZXhwIjoxNzY0Njc5NTA4LCJuYmYiOjE3NjQwNzQ3MDgsImlhdCI6MTc2NDA3NDcwOH0.hNhosrySEozCWLHeKyycE1iqX7x6suA_v73Lyjh8mpc";

export default function AyurBot() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold">AyurBot</h1>
            <p className="text-muted-foreground">
              Voice or text your symptoms in Indic languages for Ayurvedic guidance
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { emoji: '🗣️', title: 'Voice Input', desc: 'Speak in Hindi, Gujarati, or English' },
            { emoji: '🌿', title: 'Dosha Analysis', desc: 'Maps symptoms to Vata/Pitta/Kapha' },
            { emoji: '💊', title: 'Remedies', desc: 'Get herbs, breathing, and lifestyle tips' },
          ].map(feature => (
            <div key={feature.title} className="p-4 rounded-xl bg-card border border-border">
              <span className="text-2xl">{feature.emoji}</span>
              <h3 className="font-semibold mt-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* AyurBot iframe */}
        <div className={`flex-1 rounded-2xl overflow-hidden border border-border bg-card shadow-card transition-all duration-300 ${
          isFullscreen ? 'fixed inset-4 z-50' : 'min-h-[500px]'
        }`}>
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-10">
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => setIsFullscreen(false)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          <iframe
            src={AYURBOT_URL}
            className="w-full h-full min-h-[500px]"
            title="AyurBot - Ayurvedic Voice Doctor"
            allow="microphone"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
