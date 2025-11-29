import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Camera, Upload, Sparkles, Leaf, AlertCircle } from 'lucide-react';

const skinConditions = [
  { name: 'Acne', remedy: 'Neem paste + Turmeric mask, avoid oily foods' },
  { name: 'Dry Skin', remedy: 'Coconut oil massage, increase healthy fats' },
  { name: 'Pigmentation', remedy: 'Kumkumadi oil, saffron-infused milk' },
  { name: 'Rashes', remedy: 'Sandalwood paste, cooling foods' },
];

const hairConditions = [
  { name: 'Dandruff', remedy: 'Neem oil scalp massage, reduce dairy' },
  { name: 'Hair Fall', remedy: 'Bhringraj oil, amla supplements' },
  { name: 'Premature Greying', remedy: 'Curry leaves, coconut oil with henna' },
  { name: 'Dry Hair', remedy: 'Warm oil treatment, sesame oil massage' },
];

export default function Scanner() {
  const [scanType, setScanType] = useState<'skin' | 'hair'>('skin');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(scanType === 'skin' ? 'Acne' : 'Dandruff');
    }, 2000);
  };

  const conditions = scanType === 'skin' ? skinConditions : hairConditions;
  const resultCondition = conditions.find(c => c.name === scanResult);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2">
            AI Skin & Hair Scanner
          </h1>
          <p className="text-muted-foreground">
            Get Ayurvedic remedies based on AI image analysis
          </p>
        </div>

        {/* Scan Type Toggle */}
        <div className="flex justify-center gap-2">
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              scanType === 'skin'
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => { setScanType('skin'); setScanResult(null); }}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Skin Analysis
          </button>
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              scanType === 'hair'
                ? 'bg-secondary text-secondary-foreground shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => { setScanType('hair'); setScanResult(null); }}
          >
            <Leaf className="w-4 h-4 inline mr-2" />
            Hair Analysis
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-8 rounded-2xl bg-card border border-border text-center">
          {isScanning ? (
            <div className="py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground">Analyzing your {scanType}...</p>
            </div>
          ) : scanResult ? (
            <div className="animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Detected: {scanResult}
              </h3>
              {resultCondition && (
                <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 mt-4 text-left">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    Ayurvedic Remedy
                  </h4>
                  <p className="text-sm">{resultCondition.remedy}</p>
                </div>
              )}
              <Button 
                className="mt-6" 
                variant="outline"
                onClick={() => setScanResult(null)}
              >
                Scan Again
              </Button>
            </div>
          ) : (
            <>
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
                <Camera className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Upload {scanType === 'skin' ? 'Face' : 'Scalp'} Photo
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Our AI will analyze and suggest Ayurvedic remedies
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleScan}>
                  <Camera className="w-4 h-4" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={handleScan}>
                  <Upload className="w-4 h-4" />
                  Upload Image
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Common Conditions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Common {scanType === 'skin' ? 'Skin' : 'Hair'} Conditions & Remedies
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {conditions.map(condition => (
              <div 
                key={condition.name}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <h3 className="font-semibold mb-2">{condition.name}</h3>
                <p className="text-sm text-muted-foreground">{condition.remedy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">
            ⚠️ This tool provides general Ayurvedic guidance only. 
            For serious conditions, please consult a qualified healthcare provider.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
