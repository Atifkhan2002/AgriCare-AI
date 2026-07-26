import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, User, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-[#F8FAF5] dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A] text-xs font-bold uppercase tracking-wider">
            {t('navContact')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] dark:text-white tracking-tight font-heading">
            {t('contactTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-sans">
            Have questions about our crop health platform or interested in agronomy partnerships? Send us a message below.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border border-gray-200 dark:border-slate-800 shadow-md text-left">
          
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#4CAF50]/15 flex items-center justify-center text-[#2E7D32] dark:text-[#8BC34A] mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#2E7D32] dark:text-[#8BC34A]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1F2937] dark:text-white font-heading">
                Thank You for Reaching Out!
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 max-w-md mx-auto">
                Your message has been received. Our agricultural support team will review your request and get back to you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#2E7D32] text-white font-medium text-sm hover:bg-[#256628] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
                  {t('contactName')}
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F8FAF5] dark:bg-slate-800 text-sm text-[#1F2937] dark:text-white focus:outline-none focus:border-[#2E7D32] transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
                  {t('contactEmail')}
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@farm.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F8FAF5] dark:bg-slate-800 text-sm text-[#1F2937] dark:text-white focus:outline-none focus:border-[#2E7D32] transition-all"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
                  {t('contactMessage')}
                </label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-gray-400 dark:text-slate-500 absolute left-4 top-4" />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can AgriCare AI assist your farming operations?"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F8FAF5] dark:bg-slate-800 text-sm text-[#1F2937] dark:text-white focus:outline-none focus:border-[#2E7D32] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[#2E7D32] text-white font-semibold text-base shadow-lg shadow-[#2E7D32]/25 hover:bg-[#256628] active:scale-98 transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-[#8BC34A]" />
                    <span>{t('contactSend')}</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

