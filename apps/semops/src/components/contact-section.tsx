import {
 FullBleedSection,
 Container,
 Eyebrow,
} from '@/components/layouts/section-layouts';
import { ContactForm } from '@/components/contact-form';

export function ContactSection {
 return (
 <FullBleedSection bg="muted">
 <Container>
 <Eyebrow>Contact</Eyebrow>
 <h2 className="mb-2">Get in Touch</h2>
 <p className="text-muted-foreground mb-8">
 Questions, ideas, or just want to connect — reach out.
 </p>
 <ContactForm />
 <div className="flex gap-6 mt-8">
 <a
 href="https://www.linkedin.com/in/timjmitchell"
 target="_blank"
 rel="noopener noreferrer"
 className="text-sm text-muted-foreground hover:text-foreground transition-colors"
 >
 LinkedIn →
 </a>
 <a
 href="https://github.com/semops-ai"
 target="_blank"
 rel="noopener noreferrer"
 className="text-sm text-muted-foreground hover:text-foreground transition-colors"
 >
 GitHub →
 </a>
 </div>
 </Container>
 </FullBleedSection>
 );
}
