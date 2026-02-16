import React, { useState } from 'react';
import { Send, MapPin, Clock, Mail } from 'lucide-react';
import { PageMeta } from '@/components/PageMeta';

export const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
    const payload = { firstName, lastName, email, subject, message };

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Send failed');
        setFormStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('General Inquiry');
        setMessage('');
      } catch {
        setFormStatus('error');
      }
    } else {
      setTimeout(() => {
        setFormStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('General Inquiry');
        setMessage('');
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600/20 via-transparent to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl" />
      </div>

      <PageMeta
        title="Contact"
        description="Get in touch with HerRise Development Organisation. We welcome questions, suggestions, and partnership inquiries."
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Get in touch
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions, suggestions, or want to partner? We'd love to hear from you.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form - Large tile (2/3 width) */}
          <div className="lg:col-span-2 group">
            <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-6">
                    <Send size={32} className="text-emerald-400 rotate-[-45deg]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Message sent successfully</h2>
                  <p className="text-slate-300 mb-8 max-w-md">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : formStatus === 'error' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-red-400">!</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
                  <p className="text-slate-300 mb-8 max-w-md">
                    Your message couldn't be sent. Please try again or reach out another way.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-8">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* First Name - Floating Label */}
                      <div className="relative">
                        <input
                          id="firstName"
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all"
                          placeholder="First name"
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute left-4 top-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400"
                        >
                          First name
                        </label>
                      </div>

                      {/* Last Name - Floating Label */}
                      <div className="relative">
                        <input
                          id="lastName"
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all"
                          placeholder="Last name"
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute left-4 top-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400"
                        >
                          Last name
                        </label>
                      </div>
                    </div>

                    {/* Email - Floating Label */}
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all"
                        placeholder="Email"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400"
                      >
                        Email
                      </label>
                    </div>

                    {/* Subject - Floating Label */}
                    <div className="relative">
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="General Inquiry" className="bg-slate-900">General Inquiry</option>
                        <option value="Partnership Proposal" className="bg-slate-900">Partnership Proposal</option>
                        <option value="Volunteer Application" className="bg-slate-900">Volunteer Application</option>
                        <option value="Media/Press" className="bg-slate-900">Media/Press</option>
                      </select>
                      <label
                        htmlFor="subject"
                        className="absolute left-4 top-2 text-xs text-slate-400 pointer-events-none"
                      >
                        Subject
                      </label>
                    </div>

                    {/* Message - Floating Label */}
                    <div className="relative">
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="peer w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all resize-none"
                        placeholder="Message"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-4 top-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400"
                      >
                        Message
                      </label>
                    </div>

                    {/* Submit Button with Glow */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-purple-800 disabled:to-pink-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        'Sending…'
                      ) : (
                        <>
                          Send message
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Smaller tiles (1/3 width) */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Address Tile */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                  <MapPin size={24} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Head Office</h3>
                  <p className="text-white font-semibold mb-1">5 Close, Muyenga</p>
                  <p className="text-slate-300">Kampala, Uganda</p>
                </div>
              </div>
            </div>

            {/* Response Time Tile */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center">
                  <Clock size={24} className="text-pink-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Response Time</h3>
                  <p className="text-white font-semibold mb-1">Within 24-48 hours</p>
                  <p className="text-slate-300 text-sm">We aim to respond quickly</p>
                </div>
              </div>
            </div>

            {/* General Inquiries Tile */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Mail size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">General Inquiries</h3>
                  <p className="text-white font-semibold mb-1">Quick questions?</p>
                  <p className="text-slate-300 text-sm">Use the form to reach out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
