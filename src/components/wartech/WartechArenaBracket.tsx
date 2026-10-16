"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Swords,
  Shield,
  Zap,
  Gauge,
  Activity,
  Calendar,
  Clock,
  ChevronRight,
  Flame,
  Award,
  AlertTriangle,
  Info,
  X,
  Radio,
  Crosshair,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export interface BotProfile {
  name: string;
  institution: string;
  weight: string;
  weaponType: string;
  weaponRpm?: string;
  armorMaterial: string;
  driveSystem: string;
  seed: number;
}

export interface MatchData {
  id: string;
  stage: "Quarterfinal" | "Semifinal" | "Grand Final";
  stageCode: string;
  arena: string;
  botA: BotProfile;
  botB: BotProfile;
  scoreA?: number;
  scoreB?: number;
  winner?: "botA" | "botB";
  status: "live" | "scheduled" | "completed";
  scheduledTime: string;
  refereeNotes?: string;
  damageRatingA?: number;
  damageRatingB?: number;
  aggressionRatingA?: number;
  aggressionRatingB?: number;
  controlRatingA?: number;
  controlRatingB?: number;
}

const robowarMatches: MatchData[] = [
  {
    id: "rw-q1",
    stage: "Quarterfinal",
    stageCode: "Q1",
    arena: "Titan Arena Bay Alpha",
    scheduledTime: "11:00 AM IST",
    status: "completed",
    winner: "botA",
    scoreA: 33,
    scoreB: 12,
    damageRatingA: 9.5,
    damageRatingB: 4.0,
    aggressionRatingA: 8.8,
    aggressionRatingB: 5.2,
    controlRatingA: 9.0,
    controlRatingB: 4.8,
    refereeNotes: "Bot A landed a direct kinetic strike to Bot B's left drive pod at 1m42s, causing wheel detachment.",
    botA: {
      name: "TITAN-X // MK4",
      institution: "AIT Pune (Home Cadre)",
      weight: "14.85 kg",
      weaponType: "Hardened S7 Steel Drum Spinner",
      weaponRpm: "11,200 RPM",
      armorMaterial: "Hardox 500 & Grade 5 Titanium",
      driveSystem: "4WD Brushless Planetary Drive",
      seed: 1,
    },
    botB: {
      name: "VIPER STRIKE",
      institution: "COEP Tech Pune",
      weight: "14.60 kg",
      weaponType: "Horizontal Kinetic Blade",
      weaponRpm: "9,800 RPM",
      armorMaterial: "7075-T6 Billet Aluminum",
      driveSystem: "2WD Mag-Wheel Hub Drive",
      seed: 8,
    },
  },
  {
    id: "rw-q2",
    stage: "Quarterfinal",
    stageCode: "Q2",
    arena: "Titan Arena Bay Alpha",
    scheduledTime: "11:45 AM IST",
    status: "completed",
    winner: "botA",
    scoreA: 28,
    scoreB: 18,
    damageRatingA: 8.0,
    damageRatingB: 6.2,
    aggressionRatingA: 7.5,
    aggressionRatingB: 7.0,
    controlRatingA: 8.5,
    controlRatingB: 6.0,
    refereeNotes: "Bot A utilized pneumatic wedge inversion to flip Bot B into the hazard pit at 2m10s.",
    botA: {
      name: "VALKYRIE 9",
      institution: "VJTI Mumbai",
      weight: "14.92 kg",
      weaponType: "High-Pressure Pneumatic Flipper (120 PSI)",
      weaponRpm: "Instantaneous",
      armorMaterial: "Dual-layer AR400 Plate",
      driveSystem: "4WD Custom Belt Pulley System",
      seed: 4,
    },
    botB: {
      name: "CRUSHER ZERO",
      institution: "BITS Pilani (Goa)",
      weight: "14.70 kg",
      weaponType: "Hydraulic Armor Piercing Claw",
      weaponRpm: "3.5 Ton Force",
      armorMaterial: "Carbon-Kevlar Composite",
      driveSystem: "6WD Independent Planetary",
      seed: 5,
    },
  },
  {
    id: "rw-q3",
    stage: "Quarterfinal",
    stageCode: "Q3",
    arena: "Titan Arena Bay Alpha",
    scheduledTime: "12:30 PM IST",
    status: "live",
    damageRatingA: 7.0,
    damageRatingB: 7.5,
    aggressionRatingA: 8.0,
    aggressionRatingB: 8.0,
    controlRatingA: 7.5,
    controlRatingB: 8.0,
    refereeNotes: "Active round in progress! Both bots trading blows near the perimeter flame jets.",
    botA: {
      name: "HAVOC DRIFT",
      institution: "MIT World Peace University",
      weight: "14.78 kg",
      weaponType: "Vertical Disc Saw (Hardened Carbide)",
      weaponRpm: "10,500 RPM",
      armorMaterial: "Hardox 450 Monocoque",
      driveSystem: "Omni-directional Mecanum Drive",
      seed: 3,
    },
    botB: {
      name: "APEX PREDATOR",
      institution: "IIT Bombay",
      weight: "14.98 kg",
      weaponType: "Overhead Electric Axe / Hammer",
      weaponRpm: "80 km/h Impact",
      armorMaterial: "Aircraft 6061-T6 + UHMWPE",
      driveSystem: "4WD Direct Drive Brushless",
      seed: 6,
    },
  },
  {
    id: "rw-q4",
    stage: "Quarterfinal",
    stageCode: "Q4",
    arena: "Titan Arena Bay Alpha",
    scheduledTime: "01:15 PM IST",
    status: "scheduled",
    refereeNotes: "Weigh-in and safety lockout verified. Teams prepping batteries in pit bay 3.",
    botA: {
      name: "VOLT OMEGA",
      institution: "Army Institute of Technology",
      weight: "14.90 kg",
      weaponType: "Dual Counter-Rotating Bar Spinners",
      weaponRpm: "12,000 RPM",
      armorMaterial: "Titanium Gr.5 Exoskeleton",
      driveSystem: "4WD Planetary Gearbox",
      seed: 2,
    },
    botB: {
      name: "IRON CLAD",
      institution: "PICT Pune",
      weight: "14.65 kg",
      weaponType: "Reinforced Kinetic Battering Ram",
      weaponRpm: "Direct Impact",
      armorMaterial: "Hardox 500 Welded Chassis",
      driveSystem: "4WD High-Torque Track Drive",
      seed: 7,
    },
  },
  {
    id: "rw-s1",
    stage: "Semifinal",
    stageCode: "SF1",
    arena: "Titan Arena Bay Alpha",
    scheduledTime: "03:30 PM IST",
    status: "scheduled",
    refereeNotes: "Semifinal 1: Winner of Q1 (Titan-X MK4) faces Winner of Q2 (Valkyrie 9).",
    botA: {
      name: "TITAN-X // MK4",
      institution: "AIT Pune",
      weight: "14.85 kg",
      weaponType: "Hardened S7 Steel Drum Spinner",
      weaponRpm: "11,200 RPM",
      armorMaterial: "Hardox 500 & Grade 5 Titanium",
      driveSystem: "4WD Brushless Planetary Drive",
      seed: 1,
    },
    botB: {
      name: "VALKYRIE 9",
      institution: "VJTI Mumbai",
      weight: "14.92 kg",
      weaponType: "High-Pressure Pneumatic Flipper",
      weaponRpm: "Instantaneous",
      armorMaterial: "Dual-layer AR400 Plate",
      driveSystem: "4WD Custom Belt Pulley",
      seed: 4,
    },
  },
  {
    id: "rw-finals",
    stage: "Grand Final",
    stageCode: "GF",
    arena: "Main Stadium Colosseum",
    scheduledTime: "05:45 PM IST",
    status: "scheduled",
    refereeNotes: "Grand Championship Match. ₹75,000 top purse and Wartech 2026 Golden Trophy.",
    botA: {
      name: "TBD (SF1 WINNER)",
      institution: "Finalist Bracket A",
      weight: "15.00 kg Max",
      weaponType: "TBD",
      armorMaterial: "Regulated Hardox / Titanium",
      driveSystem: "Brushless 4WD",
      seed: 1,
    },
    botB: {
      name: "TBD (SF2 WINNER)",
      institution: "Finalist Bracket B",
      weight: "15.00 kg Max",
      weaponType: "TBD",
      armorMaterial: "Regulated Hardox / Titanium",
      driveSystem: "Brushless 4WD",
      seed: 2,
    },
  },
];

export interface SoccerTeam {
  teamName: string;
  institution: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  status: "Qualified" | "In Contention" | "Eliminated";
}

const soccerLeaderboard: SoccerTeam[] = [
  {
    teamName: "CEAR Striker Cadre",
    institution: "AIT Pune",
    played: 4,
    won: 4,
    drawn: 0,
    lost: 0,
    goalsFor: 18,
    goalsAgainst: 3,
    points: 12,
    status: "Qualified",
  },
  {
    teamName: "COEP Velocity",
    institution: "COEP Tech Pune",
    played: 4,
    won: 3,
    drawn: 0,
    lost: 1,
    goalsFor: 14,
    goalsAgainst: 6,
    points: 9,
    status: "Qualified",
  },
  {
    teamName: "VJTI Bot Kickers",
    institution: "VJTI Mumbai",
    played: 4,
    won: 2,
    drawn: 1,
    lost: 1,
    goalsFor: 10,
    goalsAgainst: 9,
    points: 7,
    status: "Qualified",
  },
  {
    teamName: "IITB Dribblers",
    institution: "IIT Bombay",
    played: 4,
    won: 1,
    drawn: 1,
    lost: 2,
    goalsFor: 7,
    goalsAgainst: 11,
    points: 4,
    status: "In Contention",
  },
  {
    teamName: "PICT Mech Warriors",
    institution: "PICT Pune",
    played: 4,
    won: 0,
    drawn: 0,
    lost: 4,
    goalsFor: 2,
    goalsAgainst: 22,
    points: 0,
    status: "Eliminated",
  },
];

export function WartechArenaBracket() {
  const [activeTab, setActiveTab] = useState<"robowars" | "soccer">("robowars");
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);

  return (
    <div className="space-y-8">
      {/* Header & Sub-Nav */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/25 text-[#ff6b35] text-[11px] font-mono uppercase tracking-wider mb-2 font-semibold">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>LIVE ARENA TELEMETRY &bull; WARTECH 2026</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-[#240d2b] tracking-tight">
            Championship Bracket &amp; Match HUD
          </h3>
          <p className="text-xs sm:text-sm text-[#240d2b]/65 font-body mt-1">
            Real-time combat bracket progression, kinetic bot weapon dossiers, and RoboSoccer standings.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-white/90 shadow-xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab("robowars")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              activeTab === "robowars"
                ? "bg-[#240d2b] text-white shadow-xs font-bold"
                : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/5"
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-[#ff6b35]" />
            <span>RoboWars 15kg Tree</span>
          </button>

          <button
            onClick={() => setActiveTab("soccer")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              activeTab === "soccer"
                ? "bg-[#240d2b] text-white shadow-xs font-bold"
                : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/5"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>RoboSoccer League Table</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      {activeTab === "robowars" ? (
        <div className="space-y-6">
          {/* Quick Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <span className="text-[10px] font-mono text-[#240d2b]/50 uppercase tracking-wider block">
                COMBAT WEIGHT LIMIT
              </span>
              <span className="text-base sm:text-lg font-black font-display text-[#240d2b]">
                15.00 KG (Max)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <span className="text-[10px] font-mono text-[#240d2b]/50 uppercase tracking-wider block">
                ARENA PERIMETER
              </span>
              <span className="text-base sm:text-lg font-black font-display text-[#ff6b35]">
                12mm Polycarbonate
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <span className="text-[10px] font-mono text-[#240d2b]/50 uppercase tracking-wider block">
                CURRENT STAGE
              </span>
              <span className="text-base sm:text-lg font-black font-display text-[#240d2b]">
                Quarterfinal 3
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
              <span className="text-[10px] font-mono text-[#240d2b]/50 uppercase tracking-wider block">
                CHAMPIONSHIP PURSE
              </span>
              <span className="text-base sm:text-lg font-black font-display text-emerald-600">
                ₹75,000 Pool
              </span>
            </div>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {robowarMatches.map((match) => {
              const isLive = match.status === "live";
              const isCompleted = match.status === "completed";

              return (
                <div
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className={`rounded-3xl p-5 border cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between ${
                    isLive
                      ? "bg-gradient-to-br from-[#ff6b35]/10 via-white/80 to-white/90 border-[#ff6b35]/40 shadow-[0_8px_30px_rgba(255,107,53,0.15)] ring-2 ring-[#ff6b35]/30"
                      : "bg-white/75 backdrop-blur-md border-white/90 shadow-xs hover:border-[#240d2b]/20"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Stage Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#240d2b] text-white font-mono text-[10px] font-bold">
                          {match.stageCode}
                        </span>
                        <span className="font-mono text-xs text-[#240d2b]/70 font-semibold">
                          {match.stage}
                        </span>
                      </div>

                      {/* Status Badge */}
                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 font-mono text-[10px] font-bold border border-red-500/20 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          LIVE IN ARENA
                        </span>
                      ) : isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          VERDICT LOGGED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 text-[#240d2b]/60 font-mono text-[10px]">
                          <Clock className="w-3 h-3" />
                          {match.scheduledTime}
                        </span>
                      )}
                    </div>

                    {/* Bot A Card */}
                    <div
                      className={`p-3 rounded-2xl border transition-all ${
                        match.winner === "botA"
                          ? "bg-emerald-500/10 border-emerald-500/30 font-bold"
                          : "bg-white/90 border-[#240d2b]/[0.08]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                          <span className="text-[10px] font-mono text-[#ff6b35] block">
                            SEED #{match.botA.seed} &bull; {match.botA.weight}
                          </span>
                          <h4 className="text-sm font-black font-display text-[#240d2b] truncate">
                            {match.botA.name}
                          </h4>
                          <p className="text-[11px] font-body text-[#240d2b]/60 truncate">
                            {match.botA.institution}
                          </p>
                        </div>
                        {match.scoreA !== undefined && (
                          <div className="text-xl font-black font-mono text-[#240d2b] shrink-0">
                            {match.scoreA}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* VS Divider */}
                    <div className="flex items-center justify-center -my-2 relative z-10">
                      <span className="px-3 py-0.5 rounded-full bg-[#240d2b] text-white text-[9px] font-mono uppercase tracking-widest font-black shadow-xs">
                        VS
                      </span>
                    </div>

                    {/* Bot B Card */}
                    <div
                      className={`p-3 rounded-2xl border transition-all ${
                        match.winner === "botB"
                          ? "bg-emerald-500/10 border-emerald-500/30 font-bold"
                          : "bg-white/90 border-[#240d2b]/[0.08]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                          <span className="text-[10px] font-mono text-[#240d2b]/50 block">
                            SEED #{match.botB.seed} &bull; {match.botB.weight}
                          </span>
                          <h4 className="text-sm font-black font-display text-[#240d2b] truncate">
                            {match.botB.name}
                          </h4>
                          <p className="text-[11px] font-body text-[#240d2b]/60 truncate">
                            {match.botB.institution}
                          </p>
                        </div>
                        {match.scoreB !== undefined && (
                          <div className="text-xl font-black font-mono text-[#240d2b] shrink-0">
                            {match.scoreB}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 mt-4 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-xs font-mono text-[#ff6b35]">
                    <span className="flex items-center gap-1 text-[11px]">
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Inspect Bot Dossier</span>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* RoboSoccer League Table */
        <div className="rounded-3xl bg-white/75 backdrop-blur-md border border-white/80 p-6 shadow-xs overflow-x-auto">
          <div className="min-w-[650px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#240d2b]/10 text-[11px] font-mono text-[#240d2b]/50 uppercase tracking-wider">
                  <th className="py-3 px-4">Pos / Team</th>
                  <th className="py-3 px-3">Institution</th>
                  <th className="py-3 px-3 text-center">P</th>
                  <th className="py-3 px-3 text-center">W</th>
                  <th className="py-3 px-3 text-center">D</th>
                  <th className="py-3 px-3 text-center">L</th>
                  <th className="py-3 px-3 text-center">GF-GA</th>
                  <th className="py-3 px-3 text-center">PTS</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#240d2b]/[0.06] text-xs font-body font-medium text-[#240d2b]">
                {soccerLeaderboard.map((team, idx) => (
                  <tr key={team.teamName} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 px-4 font-display font-bold flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#240d2b]/10 flex items-center justify-center font-mono text-xs text-[#240d2b]">
                        {idx + 1}
                      </span>
                      <span>{team.teamName}</span>
                    </td>
                    <td className="py-3.5 px-3 text-[#240d2b]/70 font-mono text-[11px]">
                      {team.institution}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">{team.played}</td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-600">
                      {team.won}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-[#240d2b]/60">
                      {team.drawn}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-red-500">{team.lost}</td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      {team.goalsFor}-{team.goalsAgainst}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-black text-sm text-[#ff6b35]">
                      {team.points}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[11px]">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold ${
                          team.status === "Qualified"
                            ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                            : team.status === "In Contention"
                            ? "bg-amber-500/10 text-amber-700 border border-amber-500/20"
                            : "bg-black/5 text-[#240d2b]/40"
                        }`}
                      >
                        {team.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Match Telemetry Inspection Modal */}
      <AnimatePresence>
        {selectedMatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMatch(null)}
              className="fixed inset-0 bg-[#240d2b]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#240d2b]/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#240d2b] text-white font-mono text-xs font-bold">
                    {selectedMatch.stageCode}
                  </span>
                  <div>
                    <h4 className="font-display font-black text-lg text-[#240d2b]">
                      Match Dossier: {selectedMatch.botA.name} vs {selectedMatch.botB.name}
                    </h4>
                    <p className="font-mono text-xs text-[#240d2b]/50">
                      {selectedMatch.arena} &bull; {selectedMatch.scheduledTime}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMatch(null)}
                  className="p-1 rounded-full text-[#240d2b]/40 hover:text-[#240d2b] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bot Comparison Columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Bot A Specs */}
                <div className="p-4 rounded-2xl bg-[#f6f3ee]/80 border border-[#240d2b]/10 space-y-2.5">
                  <span className="text-[10px] font-mono text-[#ff6b35] font-bold uppercase">
                    CORNER RED
                  </span>
                  <h5 className="font-display font-black text-sm text-[#240d2b]">
                    {selectedMatch.botA.name}
                  </h5>
                  <div className="space-y-1 text-xs font-mono text-[#240d2b]/70">
                    <p><span className="text-[#240d2b]/40">Armor:</span> {selectedMatch.botA.armorMaterial}</p>
                    <p><span className="text-[#240d2b]/40">Weapon:</span> {selectedMatch.botA.weaponType}</p>
                    {selectedMatch.botA.weaponRpm && (
                      <p><span className="text-[#240d2b]/40">Output:</span> {selectedMatch.botA.weaponRpm}</p>
                    )}
                    <p><span className="text-[#240d2b]/40">Drive:</span> {selectedMatch.botA.driveSystem}</p>
                    <p><span className="text-[#240d2b]/40">Weight:</span> {selectedMatch.botA.weight}</p>
                  </div>
                </div>

                {/* Bot B Specs */}
                <div className="p-4 rounded-2xl bg-[#f6f3ee]/80 border border-[#240d2b]/10 space-y-2.5">
                  <span className="text-[10px] font-mono text-[#240d2b]/50 font-bold uppercase">
                    CORNER BLUE
                  </span>
                  <h5 className="font-display font-black text-sm text-[#240d2b]">
                    {selectedMatch.botB.name}
                  </h5>
                  <div className="space-y-1 text-xs font-mono text-[#240d2b]/70">
                    <p><span className="text-[#240d2b]/40">Armor:</span> {selectedMatch.botB.armorMaterial}</p>
                    <p><span className="text-[#240d2b]/40">Weapon:</span> {selectedMatch.botB.weaponType}</p>
                    {selectedMatch.botB.weaponRpm && (
                      <p><span className="text-[#240d2b]/40">Output:</span> {selectedMatch.botB.weaponRpm}</p>
                    )}
                    <p><span className="text-[#240d2b]/40">Drive:</span> {selectedMatch.botB.driveSystem}</p>
                    <p><span className="text-[#240d2b]/40">Weight:</span> {selectedMatch.botB.weight}</p>
                  </div>
                </div>
              </div>

              {/* Judges Telemetry Ratings */}
              {selectedMatch.damageRatingA !== undefined && (
                <div className="p-4 rounded-2xl bg-white border border-[#240d2b]/10 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#240d2b] uppercase tracking-wider block">
                    Official Judges Scoring Breakdown
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Kinetic Damage (11 Pts)</span>
                        <span>{selectedMatch.damageRatingA} vs {selectedMatch.damageRatingB}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/10 overflow-hidden flex">
                        <div
                          style={{
                            width: `${(((selectedMatch.damageRatingA ?? 0) / (((selectedMatch.damageRatingA ?? 0) + (selectedMatch.damageRatingB ?? 0)) || 1)) * 100)}%`,
                          }}
                          className="bg-[#ff6b35]"
                        />
                        <div className="flex-1 bg-[#240d2b]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Combat Aggression (10 Pts)</span>
                        <span>{selectedMatch.aggressionRatingA ?? 0} vs {selectedMatch.aggressionRatingB ?? 0}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/10 overflow-hidden flex">
                        <div
                          style={{
                            width: `${(((selectedMatch.aggressionRatingA ?? 0) / (((selectedMatch.aggressionRatingA ?? 0) + (selectedMatch.aggressionRatingB ?? 0)) || 1)) * 100)}%`,
                          }}
                          className="bg-[#ff6b35]"
                        />
                        <div className="flex-1 bg-[#240d2b]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Referee Log */}
              {selectedMatch.refereeNotes && (
                <div className="p-3.5 rounded-2xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-xs font-mono text-[#240d2b]">
                  <span className="font-bold text-[#ff6b35] uppercase block mb-1">
                    Arena Referee Telemetry Log:
                  </span>
                  <p className="text-[#240d2b]/80 leading-relaxed font-body">
                    {selectedMatch.refereeNotes}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WartechArenaBracket;
