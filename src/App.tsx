import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "./lib/gsap";
import { useTheme } from "./hooks/useTheme";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GitHub from "./components/GitHub";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { theme, toggle } = useTheme();
  // `ready` → the curtain is lifting, start the hero entrance.
  // `loading` → the preloader is still mounted.
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const onReveal = useCallback(() => setReady(true), []);
  const onDone = useCallback(() => setLoading(false), []);

  const syncMusicState = useCallback(() => {
    setIsMusicPlaying(!audioRef.current?.paused);
  }, []);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  }, []);

  // Recalculate trigger positions once fonts and the photo have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    void playMusic();

    const unlockOnInteraction = () => {
      void playMusic();
      window.removeEventListener("pointerdown", unlockOnInteraction);
      window.removeEventListener("keydown", unlockOnInteraction);
    };

    window.addEventListener("pointerdown", unlockOnInteraction);
    window.addEventListener("keydown", unlockOnInteraction);

    audio.addEventListener("play", syncMusicState);
    audio.addEventListener("pause", syncMusicState);

    return () => {
      window.removeEventListener("pointerdown", unlockOnInteraction);
      window.removeEventListener("keydown", unlockOnInteraction);
      audio.removeEventListener("play", syncMusicState);
      audio.removeEventListener("pause", syncMusicState);
    };
  }, [playMusic, syncMusicState]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void playMusic();
    } else {
      audio.pause();
    }
  }, [playMusic]);

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {loading && <Preloader onReveal={onReveal} onDone={onDone} />}

      <Nav ready={ready} theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero ready={ready} />
        <About />
        <Projects />
        <Skills />
        <GitHub />
        <Contact />
      </main>

      <Footer />

      <button
        type="button"
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-[90] flex h-11 items-center gap-2 rounded-full border border-current bg-paper px-4 font-mono text-xs uppercase tracking-widest text-ink shadow-lg"
        aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
      >
        <span aria-hidden="true">{isMusicPlaying ? "Ⅱ" : "▶"}</span>
        <span>{isMusicPlaying ? "Music" : "Play"}</span>
      </button>

      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
