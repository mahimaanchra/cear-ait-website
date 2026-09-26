"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  facultyIncharge as defaultFaculty,
  secretaries as defaultSecretaries,
  jointSecretaries as defaultJointSecretaries,
  coreContributors as defaultContributors,
  upcomingEvents as defaultEvents,
  projects as defaultProjects,
  TeamMember,
  EventItem,
  Project,
} from "@/data/siteData";

const STORAGE_KEY = "cear_site_content_v1";

interface SiteContentContextType {
  facultyIncharge: TeamMember;
  secretaries: TeamMember[];
  jointSecretaries: TeamMember[];
  coreContributors: TeamMember[];
  upcomingEvents: EventItem[];
  projects: Project[];

  // Team actions
  addMember: (member: TeamMember) => void;
  updateMember: (id: string, member: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;

  // Event actions
  addEvent: (event: EventItem) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Project actions
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Persistence
  saveChanges: () => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  isSaving: boolean;
  lastSaved: string | null;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [facultyIncharge, setFacultyIncharge] = useState<TeamMember>(defaultFaculty);
  const [secretaries, setSecretaries] = useState<TeamMember[]>(defaultSecretaries);
  const [jointSecretaries, setJointSecretaries] = useState<TeamMember[]>(defaultJointSecretaries);
  const [coreContributors, setCoreContributors] = useState<TeamMember[]>(defaultContributors);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>(defaultEvents);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Initialize from API / localStorage on mount
  useEffect(() => {
    async function loadContent() {
      try {
        // First check localStorage cache for instant hydration
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.facultyIncharge) setFacultyIncharge(parsed.facultyIncharge);
          if (parsed.secretaries) setSecretaries(parsed.secretaries);
          if (parsed.jointSecretaries) setJointSecretaries(parsed.jointSecretaries);
          if (parsed.coreContributors) setCoreContributors(parsed.coreContributors);
          if (parsed.upcomingEvents) setUpcomingEvents(parsed.upcomingEvents);
          if (parsed.projects) setProjects(parsed.projects);
          if (parsed.lastUpdated) setLastSaved(parsed.lastUpdated);
        }

        // Fetch authoritative content from API
        const res = await fetch("/api/content");
        if (res.ok) {
          const data = await res.json();
          if (data.facultyIncharge) setFacultyIncharge(data.facultyIncharge);
          if (data.secretaries) setSecretaries(data.secretaries);
          if (data.jointSecretaries) setJointSecretaries(data.jointSecretaries);
          if (data.coreContributors) setCoreContributors(data.coreContributors);
          if (data.upcomingEvents) setUpcomingEvents(data.upcomingEvents);
          if (data.projects) setProjects(data.projects);
          if (data.lastUpdated) setLastSaved(data.lastUpdated);

          // Update local cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      } catch (err) {
        console.warn("Could not load from /api/content, using local state:", err);
      }
    }

    loadContent();
  }, []);

  // Save current state to API & localStorage
  const saveChanges = async (): Promise<boolean> => {
    setIsSaving(true);
    const payload = {
      facultyIncharge,
      secretaries,
      jointSecretaries,
      coreContributors,
      upcomingEvents,
      projects,
      lastUpdated: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setLastSaved(new Date().toLocaleTimeString());
        setIsSaving(false);
        return true;
      }
    } catch (err) {
      console.error("Failed to save changes to server:", err);
    }

    setIsSaving(false);
    return false;
  };

  // Reset to original defaults
  const resetToDefaults = async () => {
    setFacultyIncharge(defaultFaculty);
    setSecretaries(defaultSecretaries);
    setJointSecretaries(defaultJointSecretaries);
    setCoreContributors(defaultContributors);
    setUpcomingEvents(defaultEvents);
    setProjects(defaultProjects);
    localStorage.removeItem(STORAGE_KEY);

    const defaultPayload = {
      facultyIncharge: defaultFaculty,
      secretaries: defaultSecretaries,
      jointSecretaries: defaultJointSecretaries,
      coreContributors: defaultContributors,
      upcomingEvents: defaultEvents,
      projects: defaultProjects,
      lastUpdated: new Date().toISOString(),
    };

    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultPayload),
    });
  };

  // --- Member Actions ---
  const addMember = (member: TeamMember) => {
    if (member.tier === "faculty") {
      setFacultyIncharge(member);
    } else if (member.tier === "secretary") {
      setSecretaries((prev) => [...prev, member]);
    } else if (member.tier === "joint_secretary") {
      setJointSecretaries((prev) => [...prev, member]);
    } else {
      setCoreContributors((prev) => [...prev, member]);
    }
  };

  const updateMember = (id: string, updated: Partial<TeamMember>) => {
    if (facultyIncharge.id === id) {
      setFacultyIncharge((prev) => ({ ...prev, ...updated }));
      return;
    }
    setSecretaries((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
    setJointSecretaries((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
    setCoreContributors((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteMember = (id: string) => {
    setSecretaries((prev) => prev.filter((m) => m.id !== id));
    setJointSecretaries((prev) => prev.filter((m) => m.id !== id));
    setCoreContributors((prev) => prev.filter((m) => m.id !== id));
  };

  // --- Event Actions ---
  const addEvent = (event: EventItem) => {
    setUpcomingEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setUpcomingEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setUpcomingEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // --- Project Actions ---
  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <SiteContentContext.Provider
      value={{
        facultyIncharge,
        secretaries,
        jointSecretaries,
        coreContributors,
        upcomingEvents,
        projects,
        addMember,
        updateMember,
        deleteMember,
        addEvent,
        updateEvent,
        deleteEvent,
        addProject,
        updateProject,
        deleteProject,
        saveChanges,
        resetToDefaults,
        isSaving,
        lastSaved,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
