'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  MapPin, 
  Send, 
  Twitter, 
  Github, 
  MessageCircle,
  CheckCircle,
  Loader2,
  Phone,
  Clock,
  Terminal,
  Sparkles
} from 'lucide-react';

const socialLinks = [
  { 
    icon: Twitter, 
    href: 'https://x.com/hamcodz', 
    label: 'Twitter',
    hoverColor: 'hover:bg-sky-500/20 hover:border-sky-500/40'
  },
  { 
    icon: Github, 
    href: 'https://github.com/hamtechug256', 
    label: 'GitHub',
    hoverColor: 'hover:bg-white/10'
  },
  { 
    icon: MessageCircle, 
    href: 'https://t.me/Hamcodz', 
    label: 'Telegram',
    hoverColor: 'hover:bg-blue-500/20 hover:border-blue-500/40'
  },
];

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const mailtoLink = `mailto:hamzaholix@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/20 mb-6"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400">./contact</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white/90">Let's</span>
              <br />
              <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Ready to build something amazing together?
            </p>
          </AnimatedSection>

          {/* Contact Cards */}
          <AnimatedSection delay={0.1} className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'hamzaholix@gmail.com',
                  href: 'mailto:hamzaholix@gmail.com',
                  gradient: 'from-cyan-400 to-blue-500',
                  description: 'Best for detailed inquiries'
                },
                {
                  icon: Phone,
                  title: 'WhatsApp',
                  value: '+256 742 337 382',
                  href: 'https://wa.me/256742337382',
                  gradient: 'from-emerald-400 to-green-500',
                  description: 'Quick responses'
                },
                {
                  icon: Clock,
                  title: 'Response Time',
                  value: '< 24 hours',
                  href: null,
                  gradient: 'from-amber-400 to-orange-500',
                  description: 'Usually much faster'
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-colors h-full">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                            <p className="text-emerald-400 font-medium text-sm">{item.value}</p>
                            <p className="text-xs text-white/40 mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="glass-card rounded-2xl p-6 border border-white/5 h-full">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-emerald-400 font-medium text-sm">{item.value}</p>
                          <p className="text-xs text-white/40 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Social & Location */}
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="space-y-6">
                {/* Location */}
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Based In</h3>
                      <p className="text-white/50 text-sm">Kampala, Uganda 🇺🇬</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <h3 className="font-semibold text-white mb-4 text-sm">Social Profiles</h3>
                  <div className="space-y-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-3 p-3 rounded-xl glass-card border border-white/5 ${social.hoverColor} transition-colors group`}
                      >
                        <social.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href="https://wa.me/256742337382?text=Hi%20Hamcodz%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full"
                >
                  <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Quick Chat</h3>
                          <p className="text-sm text-white/50">Message me on WhatsApp</p>
                        </div>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                </motion.a>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-3">
              <motion.form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 border border-white/5"
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Opening Email Client!</h3>
                    <p className="text-white/50">Your email client should open with the message pre-filled.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-white/60">Send a message</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                          Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          required
                          className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-white/30 h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          required
                          className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-white/30 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                        Subject
                      </label>
                      <Input
                        type="text"
                        placeholder="What's this about?"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        required
                        className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-white/30 h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell me about your project or question..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-white/30 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-6 text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Opening...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
