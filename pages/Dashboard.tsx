import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FamilyMemberCard } from '@/components/dashboard/FamilyMemberCard';
import { AddMemberModal } from '@/components/dashboard/AddMemberModal';
import { Button } from '@/components/ui/button';
import { useFamily } from '@/contexts/FamilyContext';
import { useState } from 'react';
import { Plus, TrendingUp, Calendar, Heart, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { members, selectedMember, setSelectedMember, removeMember } = useFamily();
  const [showAddModal, setShowAddModal] = useState(false);

  const quickStats = [
    { icon: Heart, label: 'Health Score', value: '78%', color: 'text-primary' },
    { icon: TrendingUp, label: 'Weekly Progress', value: '+12%', color: 'text-secondary' },
    { icon: Calendar, label: 'Tasks Today', value: '5', color: 'text-accent' },
    { icon: AlertTriangle, label: 'Alerts', value: '2', color: 'text-destructive' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="animate-slide-up">
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
            Welcome to <span className="text-gradient">AyurKin</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your family's health journey with Ayurvedic wisdom and AI intelligence.
          </p>
        </div>

        {/* Quick Stats */}
        {members.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {quickStats.map(stat => (
              <div key={stat.label} className="p-4 rounded-2xl bg-card border border-border shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <span className="text-2xl font-display font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Family Members Section */}
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-semibold">Family Members</h2>
              <p className="text-sm text-muted-foreground">
                {members.length}/6 profiles created
              </p>
            </div>
            {members.length < 6 && (
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            )}
          </div>

          {members.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-border bg-muted/30">
              <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-display font-semibold mb-2">No family members yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Start by adding your first family member to unlock personalized health tracking and Ayurvedic guidance.
              </p>
              <Button onClick={() => setShowAddModal(true)} variant="hero">
                <Plus className="w-4 h-4" />
                Add Your First Member
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  isSelected={selectedMember?.id === member.id}
                  onSelect={() => setSelectedMember(member)}
                  onDelete={() => removeMember(member.id)}
                />
              ))}
              {members.length < 6 && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="p-5 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-all flex flex-col items-center justify-center min-h-[180px] group"
                >
                  <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-3 transition-colors">
                    <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Add Member
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {members.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h2 className="text-xl font-display font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { text: 'Complete your Prakriti assessment', action: 'Start Now', time: '2 min' },
                { text: 'Upload recent blood test report', action: 'Upload', time: '5 min' },
                { text: 'Review today\'s meal plan', action: 'View', time: '' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.time && (
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    )}
                    <Button variant="ghost" size="sm">{item.action}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AddMemberModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </DashboardLayout>
  );
}
