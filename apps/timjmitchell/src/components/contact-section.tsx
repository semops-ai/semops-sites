'use client';

import { useState } from 'react';
import { Linkedin, Mail, Send } from 'lucide-react';

export function ContactSection {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [message, setMessage] = useState('');

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault;

 const subject = encodeURIComponent(`Contact from ${name}`);
 const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
 window.location.href = `mailto:hello@timjmitchell.com?subject=${subject}&body=${body}`;
 };

 return (
 <section className="py-12 md:py-16">
 <div className="container mx-auto px-4 max-w-2xl">
 <h2 className="text-center mb-8">Get in Touch</h2>

 {/* Social Links */}
 <div className="flex justify-center gap-4 mb-8">
 <a
 href="https://linkedin.com/in/timjmitchell"
 target="_blank"
 rel="noopener noreferrer"
 aria-label="LinkedIn"
 className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
 >
 <Linkedin className="w-5 h-5" />
 </a>
 <a
 href="mailto:hello@timjmitchell.com"
 aria-label="Email"
 className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
 >
 <Mail className="w-5 h-5" />
 </a>
 </div>

 {/* Contact Form */}
 <form onSubmit={handleSubmit} className="space-y-4">
 <div className="grid sm:grid-cols-2 gap-4">
 <div>
 <label htmlFor="name" className="block text-sm font-medium mb-1">
 Name
 </label>
 <input
 type="text"
 id="name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 required
 className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
 />
 </div>
 <div>
 <label htmlFor="email" className="block text-sm font-medium mb-1">
 Email
 </label>
 <input
 type="email"
 id="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
 />
 </div>
 </div>
 <div>
 <label htmlFor="message" className="block text-sm font-medium mb-1">
 Message
 </label>
 <textarea
 id="message"
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 required
 rows={4}
 className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
 />
 </div>
 <button
 type="submit"
 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
 >
 Send Message
 <Send className="w-4 h-4" />
 </button>
 </form>

 <p className="text-center text-sm text-muted-foreground mt-6">
 Or email directly at{' '}
 <a
 href="mailto:hello@timjmitchell.com"
 className="text-primary hover:underline"
 >
 hello@timjmitchell.com
 </a>
 </p>
 </div>
 </section>
 );
}
