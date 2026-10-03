"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";
import { workshopGallery as defaultGallery, WorkshopMediaItem } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { WordBlurReveal } from "@/components/ui/WordBlurReveal";

const categories = [
  "All Photos",
  "Club Room & Workbenches",
  "Fabrication Bay",
  "Bootcamps & Cadets",
  "Testing Arena",
];

export function WorkshopAndLab() {
  const { workshopGallery } = useSiteContent();
  const currentGallery = workshopGallery && workshopGallery.length > 0 ? workshopGallery : defaultGallery;

  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Filter gallery items
  const filteredPhotos =
    activeCategory === "All Photos"
      ? currentGallery
      : currentGallery.filter((item) => item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
        );
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  return (
    <section id="workshop" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0d1321]/[0.08] pb-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0d1321]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d1321]" />
              <span>02 // Physical Workspace &amp; Facilities</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#0d1321] leading-[1.15]">
              <WordBlurReveal
                text="Lab 104, Fabrication Bay &amp; Testing Proving Grounds."
                highlightWords={["Lab", "104,", "Fabrication", "Proving", "Grounds."]}
                highlightClassName="text-[#0d1321] underline decoration-[#dcf836] decoration-4 underline-offset-6"
              />
            </h2>

            <p className="text-sm sm:text-base text-[#0d1321]/70 font-body leading-relaxed max-w-2xl pt-1">
              Explore the real hardware nursery at Army Institute of Technology, Pune—where cadets solder multi-layer PCBs, 3D print custom robotic linkages, tune ROS2 nodes, and test combat platforms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#0d1321]/60 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#0d1321]/[0.08] shadow-xs">
              Lab 104 • E&amp;TC Wing
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#0d1321]/[0.08] shadow-xs">
              Proving Grounds
            </span>
          </div>
        </div>

        {/* PHOTO GALLERY SECTION */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0d1321]/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#fafaf9] border border-[#0d1321]/[0.1] text-[#0d1321] flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50 block">
                  Photography Archive
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0d1321]">
                  Inside the Robotics Wing
                </h3>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#0d1321] text-white shadow-xs font-medium"
                      : "bg-white text-[#0d1321]/70 border border-[#0d1321]/[0.08] hover:border-[#0d1321]/20 hover:text-[#0d1321]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group rounded-3xl bg-white border border-[#0d1321]/[0.08] overflow-hidden shadow-[0_10px_30px_-10px_rgba(13,19,33,0.03)] hover:shadow-[0_20px_45px_-15px_rgba(13,19,33,0.08)] hover:border-[#0d1321]/25 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#fafaf9]">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#0d1321]/[0.08] text-[#0d1321] font-bold">
                        {photo.badge}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-[#0d1321]/0 group-hover:bg-[#0d1321]/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-[#0d1321] flex items-center justify-center shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Photo Info */}
                  <div className="p-6 space-y-2.5">
                    <span className="text-[10px] font-mono text-[#0d1321]/50 uppercase tracking-widest">
                      {photo.category}
                    </span>
                    <h4 className="font-display text-lg font-bold text-[#0d1321] tracking-tight group-hover:text-[#1a2640] transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-[#0d1321]/65 font-body leading-relaxed line-clamp-2">
                      {photo.description}
                    </p>
                  </div>
                </div>

                {/* Specs / Tags Footer */}
                {photo.specs && photo.specs.length > 0 && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#0d1321]/[0.06] flex flex-wrap gap-1.5">
                    {photo.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#fafaf9] border border-[#0d1321]/[0.06] text-[#0d1321]/70"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR FULL-RESOLUTION PHOTO INSPECTION */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0d1321]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden border border-[#0d1321]/[0.1] shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Top Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[#0d1321]/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0d1321]/50">
                    {filteredPhotos[selectedPhotoIndex].badge} • {selectedPhotoIndex + 1} of{" "}
                    {filteredPhotos.length}
                  </span>
                  <h3 className="font-display text-lg sm:text-2xl font-bold text-[#0d1321] tracking-tight mt-0.5">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedPhotoIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
                      )
                    }
                    className="p-2 rounded-full border border-[#0d1321]/[0.1] text-[#0d1321] hover:bg-[#fafaf9] transition-colors cursor-pointer"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedPhotoIndex((prev) =>
                        prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="p-2 rounded-full border border-[#0d1321]/[0.1] text-[#0d1321] hover:bg-[#fafaf9] transition-colors cursor-pointer"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="p-2 rounded-full bg-[#0d1321] text-white hover:bg-[#1a2640] transition-colors cursor-pointer ml-2"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Image Area */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#fafaf9] overflow-hidden">
                <Image
                  src={filteredPhotos[selectedPhotoIndex].imageUrl}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Bottom Caption & Technical Details */}
              <div className="p-4 sm:p-6 bg-white border-t border-[#0d1321]/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-[#0d1321]/75 font-body max-w-2xl leading-relaxed">
                  {filteredPhotos[selectedPhotoIndex].description}
                </p>

                {filteredPhotos[selectedPhotoIndex].specs && (
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {filteredPhotos[selectedPhotoIndex].specs!.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321]/80"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WorkshopAndLab;
