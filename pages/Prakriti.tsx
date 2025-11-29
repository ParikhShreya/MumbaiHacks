import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useFamily } from '@/contexts/FamilyContext';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What is your body frame?",
    options: [
      { text: "Thin, light, difficulty gaining weight", dosha: "vata" },
      { text: "Medium, muscular, athletic", dosha: "pitta" },
      { text: "Large, heavy, gains weight easily", dosha: "kapha" },
    ]
  },
  {
    id: 2,
    question: "How would you describe your skin?",
    options: [
      { text: "Dry, rough, thin, cool", dosha: "vata" },
      { text: "Warm, oily, prone to rashes", dosha: "pitta" },
      { text: "Thick, moist, smooth, cool", dosha: "kapha" },
    ]
  },
  {
    id: 3,
    question: "How is your appetite?",
    options: [
      { text: "Variable, irregular eating habits", dosha: "vata" },
      { text: "Strong, can't skip meals", dosha: "pitta" },
      { text: "Steady, can skip meals easily", dosha: "kapha" },
    ]
  },
  {
    id: 4,
    question: "How do you handle stress?",
    options: [
      { text: "Anxiety, worry, fear", dosha: "vata" },
      { text: "Anger, irritation, frustration", dosha: "pitta" },
      { text: "Withdrawal, depression, lethargy", dosha: "kapha" },
    ]
  },
  {
    id: 5,
    question: "What is your sleep pattern?",
    options: [
      { text: "Light, interrupted, difficulty falling asleep", dosha: "vata" },
      { text: "Moderate, wake up if disturbed", dosha: "pitta" },
      { text: "Deep, heavy, hard to wake up", dosha: "kapha" },
    ]
  },
];

export default function Prakriti() {
  const { selectedMember, updateMember } = useFamily();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (dosha: string) => {
    setAnswers({ ...answers, [currentQuestion]: dosha });
  };

  const calculatePrakriti = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach(dosha => {
      counts[dosha as keyof typeof counts]++;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] === sorted[1][1]) {
      return `${sorted[0][0]}-${sorted[1][0]}` as any;
    }
    return sorted[0][0] as any;
  };

  const handleComplete = () => {
    const prakriti = calculatePrakriti();
    if (selectedMember) {
      updateMember(selectedMember.id, { prakriti });
    }
    setShowResults(true);
  };

  const prakritiInfo = {
    vata: { color: 'blue', qualities: 'Creative, Quick, Energetic', elements: 'Air + Space', care: 'Warm foods, routine, grounding activities' },
    pitta: { color: 'orange', qualities: 'Intelligent, Focused, Ambitious', elements: 'Fire + Water', care: 'Cooling foods, moderation, relaxation' },
    kapha: { color: 'green', qualities: 'Calm, Loyal, Nurturing', elements: 'Earth + Water', care: 'Light foods, exercise, stimulation' },
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2">Prakriti Analyzer</h1>
          <p className="text-muted-foreground">
            Discover your Ayurvedic body constitution through a quick assessment
          </p>
        </div>

        {!selectedMember ? (
          <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-border">
            <div className="text-4xl mb-3">👤</div>
            <p className="text-muted-foreground mb-4">Select a family member first to start the assessment</p>
            <Button variant="outline" asChild>
              <a href="/dashboard/family">Go to Family Hub</a>
            </Button>
          </div>
        ) : showResults ? (
          <div className="text-center p-8 rounded-2xl bg-card border border-border">
            <div className="text-6xl mb-4">🌿</div>
            <h2 className="text-2xl font-display font-bold mb-2">
              {selectedMember.name}'s Prakriti
            </h2>
            <div className="inline-flex px-6 py-3 rounded-full bg-primary/10 text-primary text-xl font-semibold capitalize mb-6">
              {calculatePrakriti().replace('-', ' / ')}
            </div>
            
            <div className="grid gap-4 text-left mt-6">
              {Object.entries(prakritiInfo).map(([dosha, info]) => (
                <div 
                  key={dosha}
                  className={`p-4 rounded-xl border ${
                    calculatePrakriti().includes(dosha) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <h3 className="font-semibold capitalize mb-1">{dosha}</h3>
                  <p className="text-sm text-muted-foreground">{info.qualities}</p>
                  <p className="text-xs text-muted-foreground mt-1">Elements: {info.elements}</p>
                </div>
              ))}
            </div>

            <Button 
              className="mt-6" 
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
            >
              Retake Assessment
            </Button>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-card border border-border">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              {questions.map((_, i) => (
                <div 
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    i < currentQuestion ? 'bg-primary' :
                    i === currentQuestion ? 'bg-primary/50' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            <div className="mb-6">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <h2 className="text-xl font-display font-semibold mt-2">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    answers[currentQuestion] === option.dosha
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleAnswer(option.dosha)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === option.dosha
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {answers[currentQuestion] === option.dosha && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleComplete}
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  See Results
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={!answers[currentQuestion]}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
