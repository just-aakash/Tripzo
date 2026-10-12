import { useState } from "react";
import { Check, Palette, Sparkles } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const isGenZ = theme === "genz";

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={
          isGenZ
            ? "group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            : "group flex items-center gap-2 border border-[#26332c]/15 bg-transparent px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#26332c]/60 transition-colors duration-300 hover:border-[#26332c]/30 hover:text-[#26332c]"
        }
      >
        <Palette
          size={isGenZ ? 16 : 14}
          className={
            isGenZ
              ? "transition-transform duration-300 group-hover:rotate-12"
              : "transition-transform duration-500 group-hover:rotate-12"
          }
        />

        <span>
          {isGenZ ? "Theme" : "Style"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Mobile/background click area */}
          <button
            type="button"
            aria-label="Close theme menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div
            className={
              isGenZ
                ? "absolute right-0 top-full z-50 mt-3 w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-[#10131d]/95 p-4 shadow-2xl backdrop-blur-2xl"
                : "absolute right-0 top-full z-50 mt-3 w-[320px] overflow-hidden border border-[#26332c]/15 bg-[#f3f0e7] p-5 shadow-[0_20px_60px_rgba(38,51,44,0.12)]"
            }
          >
            {isGenZ ? (
              <GenZDropdown
                theme={theme}
                setTheme={setTheme}
                close={() => setOpen(false)}
              />
            ) : (
              <MillenialDropdown
                theme={theme}
                setTheme={setTheme}
                close={() => setOpen(false)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}


/* =====================================================
   GEN Z DROPDOWN
===================================================== */

function GenZDropdown({
  theme,
  setTheme,
  close,
}) {
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-2 text-white">
          <Sparkles size={15} className="text-fuchsia-400" />

          <p className="text-sm font-semibold">
            Change your vibe
          </p>
        </div>

        <p className="mt-1 text-xs leading-relaxed text-white/40">
          Choose how you want TravelMate to feel.
        </p>
      </div>

      <div className="space-y-2">
        <GenZThemeOption
          active={theme === "genz"}
          onClick={() => {
            setTheme("genz");
            close();
          }}
          title="Gen Z"
          description="Bold, colorful & energetic"
        />

        <GenZThemeOption
          active={theme === "millennial"}
          onClick={() => {
            setTheme("millennial");
            close();
          }}
          title="Millenial"
          description="Elegant, minimal & refined"
        />
      </div>
    </>
  );
}


function GenZThemeOption({
  active,
  onClick,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 ${
        active
          ? "border-fuchsia-400/40 bg-white/10"
          : "border-white/5 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.07]"
      }`}
    >
      <div className="flex items-center gap-3">

        {/* Preview */}
        <div
          className={`relative h-12 w-14 shrink-0 overflow-hidden rounded-xl ${
            active
              ? "bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400"
              : "bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-cyan-400/30"
          }`}
        >
          <div className="absolute left-2 top-2 h-2 w-6 rounded-full bg-white/70" />

          <div className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-white/50" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">
            {title}
          </p>

          <p className="mt-0.5 truncate text-xs text-white/40">
            {description}
          </p>
        </div>

        {active && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-400/20 text-fuchsia-300">
            <Check size={13} />
          </div>
        )}
      </div>
    </button>
  );
}


/* =====================================================
   MILLENIAL DROPDOWN
===================================================== */

function MillenialDropdown({
  theme,
  setTheme,
  close,
}) {
  return (
    <>
      <div className="mb-5 border-b border-[#26332c]/10 pb-4">
        <p className="font-serif text-xl text-[#26332c]">
          Choose your style
        </p>

        <p className="mt-1 text-xs leading-relaxed text-[#26332c]/45">
          Select the atmosphere you'd like for your
          TravelMate experience.
        </p>
      </div>

      <div className="space-y-2">
        <MillenialThemeOption
          active={theme === "genz"}
          onClick={() => {
            setTheme("genz");
            close();
          }}
          title="Gen Z"
          description="Bold, colorful & energetic"
          type="genz"
        />

        <MillenialThemeOption
          active={theme === "millennial"}
          onClick={() => {
            setTheme("millennial");
            close();
          }}
          title="Millenial"
          description="Elegant, minimal & refined"
          type="millenial"
        />
      </div>

      <div className="mt-5 border-t border-[#26332c]/10 pt-4">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#26332c]/30">
          TravelMate
        </p>
      </div>
    </>
  );
}


function MillenialThemeOption({
  active,
  onClick,
  title,
  description,
  type,
}) {
  const isMillenial = type === "millenial";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full border p-3 text-left transition-all duration-300 ${
        active
          ? "border-[#718477]/50 bg-[#ebe7dc]"
          : "border-transparent hover:border-[#26332c]/10 hover:bg-[#ebe7dc]/60"
      }`}
    >
      <div className="flex items-center gap-4">

        {/* Editorial preview */}
        <div
          className={`relative h-14 w-14 shrink-0 overflow-hidden border ${
            isMillenial
              ? "border-[#718477]/30 bg-[#dfe3d9]"
              : "border-[#26332c]/10 bg-[#171922]"
          }`}
        >
          {isMillenial ? (
            <>
              <div className="absolute inset-x-2 top-3 h-[2px] bg-[#718477]/70" />

              <div className="absolute left-2 top-6 h-1.5 w-8 bg-[#26332c]/20" />

              <div className="absolute bottom-3 left-2 h-[2px] w-5 bg-[#a28c5b]" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 opacity-70" />

              <div className="absolute left-2 top-2 h-2 w-7 rounded-full bg-white/70" />

              <div className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-white/60" />
            </>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-serif text-base text-[#26332c]">
            {title}
          </p>

          <p className="mt-0.5 truncate text-xs text-[#26332c]/40">
            {description}
          </p>
        </div>

        {active && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#718477]/40 text-[#718477]">
            <Check size={13} />
          </div>
        )}
      </div>
    </button>
  );
}
