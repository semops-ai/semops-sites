import type { Metadata } from 'next';
import { Database, Lightbulb, TrendingUp } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export const metadata: Metadata = {
 title: 'Consulting',
 description:
 'Data strategy, AI solutions, and product leadership consulting services from Tim Mitchell.',
};

const services = [
 {
 icon: Database,
 title: 'Intelligence & Data',
 description:
 "Rather than simply analyzing data or creating dashboards, I partner with clients to improve decision-making processes and provide necessary tools. I emphasize sound fundamentals as the foundation for leveraging AI to convert data into knowledge and better decisions.",
 },
 {
 icon: Lightbulb,
 title: 'AI Powered',
 description:
 'AI is a powerful accelerant when paired with proper mindset, measurement, and foundational work. My expertise enables rapid development of tools, prototypes, and analytics with minimal investment, with capacity to scale predictably as needed.',
 },
 {
 icon: TrendingUp,
 title: 'Product & Marketing',
 description:
 'Drawing from experience at top-tier tech companies and startups, I help clients understand relationships between product, market, and business results through practical improvements. My approach begins with traditional consulting to identify challenges, then shifts toward building solutions.',
 },
];

export default function ConsultingPage {
 return (
 <div className="animate-fade-in">
 {/* Hero Section */}
 <section className="py-16 md:py-24">
 <div className="container mx-auto px-4 max-w-4xl text-center">
 <p className="text-sm uppercase tracking-[0.3em] mb-6 font-display font-medium text-primary">
 Consulting Services
 </p>
 <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6">
 Data Strategy & AI
 </h1>
 <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
 Combining 20+ years of technical Product Management and Marketing
 leadership with expertise in data, analytics, and custom AI
 solutions. I work cross-functionally to translate business strategy
 into actionable projects and metrics.
 </p>
 </div>
 </section>

 <div className="divider max-w-4xl mx-auto" />

 {/* Services Section */}
 <section className="py-12 md:py-16">
 <div className="container mx-auto px-4 max-w-4xl">
 <div className="grid gap-8">
 {services.map((service) => (
 <div
 key={service.title}
 className="flex gap-6 p-6 border rounded-lg"
 >
 <div className="flex-shrink-0">
 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
 <service.icon className="w-6 h-6 text-primary" />
 </div>
 </div>
 <div>
 <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
 <p className="text-muted-foreground">{service.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 <div className="divider max-w-4xl mx-auto" />

 {/* Contact Section */}
 <ContactSection />
 </div>
 );
}
