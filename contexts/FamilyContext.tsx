import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FamilyMember } from '@/types/family';

interface FamilyContextType {
  members: FamilyMember[];
  addMember: (member: Omit<FamilyMember, 'id' | 'createdAt'>) => void;
  removeMember: (id: string) => void;
  updateMember: (id: string, updates: Partial<FamilyMember>) => void;
  selectedMember: FamilyMember | null;
  setSelectedMember: (member: FamilyMember | null) => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

const avatars = [
  '👨', '👩', '👴', '👵', '👦', '👧', '🧑', '👶'
];

export function FamilyProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const addMember = (member: Omit<FamilyMember, 'id' | 'createdAt'>) => {
    if (members.length >= 6) return;
    
    const newMember: FamilyMember = {
      ...member,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setMembers(prev => [...prev, newMember]);
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }
  };

  const updateMember = (id: string, updates: Partial<FamilyMember>) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, ...updates } : m
    ));
  };

  return (
    <FamilyContext.Provider value={{
      members,
      addMember,
      removeMember,
      updateMember,
      selectedMember,
      setSelectedMember,
    }}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
}
