import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Speakers } from './components/Speakers';
import { Schedule } from './components/Schedule';
import { Pricing } from './components/Pricing';
import { Sponsorship } from './components/Sponsorship';
import { Partners } from './components/Partners';
import { Venue } from './components/Venue';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { SponsorshipModal } from './components/SponsorshipModal';
import { SpeakerModal } from './components/SpeakerModal';
import { ContactModal } from './components/ContactModal';
import type { Speaker } from './types';

export const App: React.FC = () => {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState('individual');
  const [sponsorshipOpen, setSponsorshipOpen] = useState(false);
  const [selectedSponsorTier, setSelectedSponsorTier] = useState('Gold');
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const handleOpenRegistration = (packageId: string = 'individual') => {
    setSelectedPackageId(packageId);
    setRegistrationOpen(true);
  };

  const handleOpenSponsorship = (tierName: string = 'Gold') => {
    setSelectedSponsorTier(tierName);
    setSponsorshipOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-gold selection:text-white">
      {/* Navigation */}
      <Navbar
        onRegisterClick={() => handleOpenRegistration('individual')}
        onSponsorClick={() => handleOpenSponsorship('Gold')}
        onContactClick={() => setContactOpen(true)}
      />

      <main>
        <Hero
          onRegisterClick={() => handleOpenRegistration('individual')}
          onSponsorClick={() => handleOpenSponsorship('Gold')}
        />

        <About
          onRegisterClick={() => handleOpenRegistration('individual')}
        />

        <Speakers
          onSpeakerSelect={sp => setSelectedSpeaker(sp)}
        />

        <Schedule
          onRegisterClick={() => handleOpenRegistration('individual')}
          onSponsorClick={() => handleOpenSponsorship('Gold')}
        />

        <Pricing
          onSelectPackage={pkgId => handleOpenRegistration(pkgId)}
        />

        <Sponsorship
          onSelectSponsorTier={tierName => handleOpenSponsorship(tierName)}
        />

        <Partners />

        <Venue
          onRegisterClick={() => handleOpenRegistration('individual')}
        />
      </main>

      {/* Footer */}
      <Footer
        onRegisterClick={pkgId => handleOpenRegistration(pkgId || 'individual')}
        onSponsorClick={() => handleOpenSponsorship('Gold')}
        onContactClick={() => setContactOpen(true)}
      />

      {/* Modals & Workflows with direct Email Transmission */}
      <RegistrationModal
        isOpen={registrationOpen}
        onClose={() => setRegistrationOpen(false)}
        initialPackageId={selectedPackageId}
      />

      <SponsorshipModal
        isOpen={sponsorshipOpen}
        onClose={() => setSponsorshipOpen(false)}
        initialTier={selectedSponsorTier}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <SpeakerModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
        onRegisterClick={() => {
          setSelectedSpeaker(null);
          handleOpenRegistration('individual');
        }}
      />
    </div>
  );
};

export default App;
