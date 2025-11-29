import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FamilyMemberCard } from '@/components/dashboard/FamilyMemberCard';
import { AddMemberModal } from '@/components/dashboard/AddMemberModal';
import { Button } from '@/components/ui/button';
import { useFamily } from '@/contexts/FamilyContext';
import { useState } from 'react';
import { Plus, Upload, FileText, TrendingUp, AlertCircle } from 'lucide-react';

export default function FamilyHealth() {
  const { members, selectedMember, setSelectedMember, removeMember } = useFamily();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold">Family Health Hub</h1>
            <p className="text-muted-foreground">
              Manage profiles, upload reports, and track health trends
            </p>
          </div>
          {members.length < 6 && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          )}
        </div>

        {/* Members Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Family Members ({members.length}/6)</h2>
          {members.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-border">
              <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
              <p className="text-muted-foreground mb-4">Add family members to start tracking health</p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Add First Member
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
            </div>
          )}
        </div>

        {/* Selected Member Details */}
        {selectedMember && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload Reports */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Reports</h3>
                  <p className="text-sm text-muted-foreground">Scan or upload lab reports</p>
                </div>
              </div>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG supported</p>
              </div>
            </div>

            {/* Health Trends */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">Health Trends</h3>
                  <p className="text-sm text-muted-foreground">Track key health metrics</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Blood Sugar', value: '--', status: 'pending' },
                  { label: 'Blood Pressure', value: '--', status: 'pending' },
                  { label: 'Cholesterol', value: '--', status: 'pending' },
                ].map(metric => (
                  <div key={metric.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm">{metric.label}</span>
                    <span className="text-sm text-muted-foreground">{metric.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Upload reports to see trends
              </p>
            </div>

            {/* Risk Alerts */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Risk Predictions</h3>
                  <p className="text-sm text-muted-foreground">Early warnings based on health data</p>
                </div>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No risk alerts yet</p>
                <p className="text-sm text-muted-foreground">Upload health reports to enable AI predictions</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddMemberModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </DashboardLayout>
  );
}
