import StudioNav, { StudioFooter } from '../StudioNav';
import ContactSection from '../ContactSection';
export const metadata = {
  title: 'Start a Conversation | WEBSTELL',
  description:
    'Share what you want to build or improve. WEBSTELL replies with questions or a sensible next step within one business day.',
};
export default function ContactPage() {
  return (
    <>
      <StudioNav current="contact" />
      <main className="studio-page contact-page contact-page-refresh">
        <ContactSection />
      </main>
      <StudioFooter />
    </>
  );
}
