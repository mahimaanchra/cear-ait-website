"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  facultyIncharge as defaultFaculty,
  secretaries as defaultSecretaries,
  jointSecretaries as defaultJointSecretaries,
  coreContributors as defaultContributors,
  upcomingEvents as defaultEvents,
  projects as defaultProjects,
  workshopGallery as defaultGallery,
  achievements as defaultAchievements,
  TeamMember,
  EventItem,
  Project,
  WorkshopMediaItem,
  Achievement,
} from "@/data/siteData";

const STORAGE_KEY = "cear_site_content_v1";

interface SiteContentContextType {
  facultyIncharge: TeamMember;
  secretaries: TeamMember[];
  jointSecretaries: TeamMember[];
  coreContributors: TeamMember[];
  upcomingEvents: EventItem[];
  projects: Project[];
  workshopGallery: WorkshopMediaItem[];
  achievements: Achievement[];

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

  // Gallery actions
  addGalleryItem: (item: WorkshopMediaItem) => void;
  updateGalleryItem: (id: string, item: Partial<WorkshopMediaItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Achievement actions
  addAchievement: (item: Achievement) => void;
  updateAchievement: (id: string, item: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;

  // Persistence & Health
  saveChanges: () => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  importFullBackup: (backup: any) => Promise<boolean>;
  isSaving: boolean;
  lastSaved: string | null;
  cloudConnected: boolean;
  hasUnsavedChanges: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [facultyIncharge, setFacultyIncharge] = useState<TeamMember>(defaultFaculty);
  const [secretaries, setSecretaries] = useState<TeamMember[]>(defaultSecretaries);
  const [jointSecretaries, setJointSecretaries] = useState<TeamMember[]>(defaultJointSecretaries);
  const [coreContributors, setCoreContributors] = useState<TeamMember[]>(defaultContributors);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>(defaultEvents);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [workshopGallery, setWorkshopGallery] = useState<WorkshopMediaItem[]>(defaultGallery);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [cloudConnected, setCloudConnected] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
          if (parsed.workshopGallery) setWorkshopGallery(parsed.workshopGallery);
          if (parsed.achievements) setAchievements(parsed.achievements);
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
          if (data.workshopGallery) setWorkshopGallery(data.workshopGallery);
          if (data.achievements) setAchievements(data.achievements);
          if (data.lastUpdated) setLastSaved(data.lastUpdated);
          if (typeof data.cloudConnected === "boolean") {
            setCloudConnected(data.cloudConnected);
          }

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
      workshopGallery,
      achievements,
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
        const result = await res.json();
        if (typeof result.cloudConnected === "boolean") {
          setCloudConnected(result.cloudConnected);
        }
        setLastSaved(new Date().toLocaleTimeString());
        setHasUnsavedChanges(false);
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
    setWorkshopGallery(defaultGallery);
    setAchievements(defaultAchievements);
    localStorage.removeItem(STORAGE_KEY);
    setHasUnsavedChanges(true);

    const defaultPayload = {
      facultyIncharge: defaultFaculty,
      secretaries: defaultSecretaries,
      jointSecretaries: defaultJointSecretaries,
      coreContributors: defaultContributors,
      upcomingEvents: defaultEvents,
      projects: defaultProjects,
      workshopGallery: defaultGallery,
      achievements: defaultAchievements,
      lastUpdated: new Date().toISOString(),
    };

    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultPayload),
      });
      setLastSaved(new Date().toLocaleTimeString());
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error("Failed to reset server state:", err);
    }
  };

  // Import full JSON backup
  const importFullBackup = async (backup: any): Promise<boolean> => {
    try {
      if (backup.facultyIncharge) setFacultyIncharge(backup.facultyIncharge);
      if (backup.secretaries) setSecretaries(backup.secretaries);
      if (backup.jointSecretaries) setJointSecretaries(backup.jointSecretaries);
      if (backup.coreContributors) setCoreContributors(backup.coreContributors);
      if (backup.upcomingEvents) setUpcomingEvents(backup.upcomingEvents);
      if (backup.projects) setProjects(backup.projects);
      if (backup.workshopGallery) setWorkshopGallery(backup.workshopGallery);
      if (backup.achievements) setAchievements(backup.achievements);

      setHasUnsavedChanges(true);
      return true;
    } catch (err) {
      console.error("Failed to parse backup:", err);
      return false;
    }
  };

  // --- Team Actions ---
  const addMember = (member: TeamMember) => {
    setHasUnsavedChanges(true);
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
    setHasUnsavedChanges(true);
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
    setHasUnsavedChanges(true);
    setSecretaries((prev) => prev.filter((m) => m.id !== id));
    setJointSecretaries((prev) => prev.filter((m) => m.id !== id));
    setCoreContributors((prev) => prev.filter((m) => m.id !== id));
  };

  // --- Event Actions ---
  const addEvent = (event: EventItem) => {
    setHasUnsavedChanges(true);
    setUpcomingEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setHasUnsavedChanges(true);
    setUpcomingEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setHasUnsavedChanges(true);
    setUpcomingEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // --- Project Actions ---
  const addProject = (project: Project) => {
    setHasUnsavedChanges(true);
    setProjects((prev) => [project, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setHasUnsavedChanges(true);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setHasUnsavedChanges(true);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // --- Gallery Actions ---
  const addGalleryItem = (item: WorkshopMediaItem) => {
    setHasUnsavedChanges(true);
    setWorkshopGallery((prev) => [item, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<WorkshopMediaItem>) => {
    setHasUnsavedChanges(true);
    setWorkshopGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setHasUnsavedChanges(true);
    setWorkshopGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // --- Achievement Actions ---
  const addAchievement = (item: Achievement) => {
    setHasUnsavedChanges(true);
    setAchievements((prev) => [item, ...prev]);
  };

  const updateAchievement = (id: string, updated: Partial<Achievement>) => {
    setHasUnsavedChanges(true);
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const deleteAchievement = (id: string) => {
    setHasUnsavedChanges(true);
    setAchievements((prev) => prev.filter((a) => a.id !== id));
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
        workshopGallery,
        achievements,
        addMember,
        updateMember,
        deleteMember,
        addEvent,
        updateEvent,
        deleteEvent,
        addProject,
        updateProject,
        deleteProject,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        saveChanges,
        resetToDefaults,
        importFullBackup,
        isSaving,
        lastSaved,
        cloudConnected,
        hasUnsavedChanges,
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
