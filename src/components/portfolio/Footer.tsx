'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Heart, Mail, Phone, Terminal } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 mb-4 group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-black" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
                </div>
                <span className="text-xl font-bold gradient-text">Hamcodz</span>
              </motion.a>
              <p className="text-sm text-white/40 leading-relaxed">
                Multi-disciplinary technologist bridging development, security, and financial markets.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-semibold text-white/60 mb-4 uppercase tracking-wider">Navigation</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'About', href: '#about' },
                  { label: 'Skills', href: '#skills' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-white/40 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold text-white/60 mb-4 uppercase tracking-wider">Contact</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:hamzaholix@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hamzaholix@gmail.com
                </a>
                <a 
                  href="https://wa.me/256742337382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +256 742 337 382
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/40 flex items-center gap-1">
              <span>© {currentYear} Hamcodz. Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>in Kampala</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://hamcodz-ptfl.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-emerald-400 transition-colors font-mono"
              >
                hamcodz-ptfl.vercel.app
              </a>
            </div>
          </div>

          {/* Easter Egg */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-white/20 font-mono">
              <Terminal className="w-3 h-3" />
              <span>$ echo "Thanks for visiting!" && exit 0</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
