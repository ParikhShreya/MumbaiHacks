import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useFamily } from '@/contexts/FamilyContext';
import { useState } from 'react';
import { Check, Sun, Moon, Droplets, Wind, Heart } from 'lucide-react';

const morningRoutine = [
  { id: 1, time: '6:00 AM', task: 'Wake up (Brahma Muhurta)', icon: Sun, category: 'morning' },
  { id: 2, time: '6:15 AM', task: 'Oil pulling (Gandusha)', icon: Droplets, category: 'morning' },
  { id: 3, time: '6:30 AM', task: 'Tongue scraping', icon: Droplets, category: 'morning' },
  { id: 4, time: '6:45 AM', task: 'Warm water with lemon', icon: Droplets, category: 'morning' },
  { id: 5, time: '7:00 AM', task: 'Pranayama (5 min)', icon: Wind, category: 'morning' },
  { id: 6, time: '7:15 AM', task: 'Light yoga or stretching', icon: Heart, category: 'morning' },
  { id: 7, time: '7:30 AM', task: 'Abhyanga (self-massage)', icon: Heart, category: 'morning' },
  { id: 8, time: '8:00 AM', task: 'Breakfast', icon: Sun, category: 'morning' },
];

const eveningRoutine = [
  { id: 9, time: '6:00 PM', task: 'Light dinner', icon: Moon, category: 'evening' },
  { id: 10, time: '7:00 PM', task: 'Evening walk', icon: Heart, category: 'evening' },
  { id: 11, time: '8:00 PM', task: 'Digital detox begins', icon: Moon, category: 'evening' },
  { id: 12, time: '9:00 PM', task: 'Warm milk with nutmeg', icon: Droplets, category: 'evening' },
  { id: 13, time: '9:30 PM', task: 'Foot massage with oil', icon: Heart, category: 'evening' },
  { id: 14, time: '10:00 PM', task: 'Sleep (Nidra)', icon: Moon, category: 'evening' },
];

export default function Routines() {
  const { selectedMember } = useFamily();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'dincharya' | 'ratricharya'>('dincharya');

  const toggleTask = (id: number) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const routine = activeTab === 'dincharya' ? morningRoutine : eveningRoutine;
  const completedCount = completedTasks.filter(id => routine.some(t => t.id === id)).length;
  const progress = (completedCount / routine.length) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Personalized Routines</h1>
          <p className="text-muted-foreground">
            Dincharya & Ratricharya based on your Prakriti
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'dincharya'
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => setActiveTab('dincharya')}
          >
            <Sun className="w-4 h-4 inline mr-2" />
            Dincharya (Morning)
          </button>
          <button
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'ratricharya'
                ? 'bg-secondary text-secondary-foreground shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => setActiveTab('ratricharya')}
          >
            <Moon className="w-4 h-4 inline mr-2" />
            Ratricharya (Evening)
          </button>
        </div>

        {/* Progress */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{routine.length} completed
            </span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                activeTab === 'dincharya' ? 'gradient-primary' : 'bg-secondary'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Routine Tasks */}
        <div className="space-y-3">
          {routine.map((task, index) => (
            <div 
              key={task.id}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                completedTasks.includes(task.id)
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-card border-border hover:border-primary/30'
              }`}
              onClick={() => toggleTask(task.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  completedTasks.includes(task.id)
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                }`}>
                  {completedTasks.includes(task.id) && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeTab === 'dincharya' ? 'bg-primary/10' : 'bg-secondary/10'
                }`}>
                  <task.icon className={`w-5 h-5 ${
                    activeTab === 'dincharya' ? 'text-primary' : 'text-secondary'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    completedTasks.includes(task.id) ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {task.task}
                  </h3>
                  <p className="text-sm text-muted-foreground">{task.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <h3 className="font-display font-semibold mb-3">💡 Adaptive Tip</h3>
          <p className="text-sm text-muted-foreground">
            {selectedMember?.prakriti?.includes('vata') 
              ? "Vata types benefit from warm, grounding routines. Focus on consistency and warmth."
              : selectedMember?.prakriti?.includes('pitta')
              ? "Pitta types should avoid overheating. Include cooling practices and moderate intensity."
              : "Kapha types benefit from stimulating activities. Add some vigor to your routine!"}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
