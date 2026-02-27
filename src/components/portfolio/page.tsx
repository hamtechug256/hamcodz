'use client';

import { Navigation } from '@/components/portfolio/Navigation';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Projects } from '@/components/portfolio/Projects';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { WhatsAppButton } from '@/components/portfolio/WhatsAppButton';
import { Terminal } from '@/components/portfolio/Terminal';
import { MatrixRainCSS } from '@/components/portfolio/MatrixRain';
import { Scanlines } from '@/components/portfolio/GlitchEffects';
import { ParticleTrail, SparkleEffect } from '@/components/portfolio/ParticleTrail';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Matrix Rain Background */}
      <MatrixRainCSS opacity={0.04} />
      
      {/* Scanlines overlay */}
      <Scanlines />
      
      {/* Particle mouse trail */}
      <ParticleTrail color="#10b981" particleCount={2} trailLength={30} />
      
      {/* Sparkle on click */}
      <SparkleEffect />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Skills Section */}
      <Skills />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Interactive Terminal */}
      <Terminal />
    </main>
  );
}
