import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Users,
  Award,
  Globe,
  Mail,
  Phone,
  FileText,
  X,
  Menu,
  ChevronRight,
  Sparkles,
  Briefcase,
  Info
} from 'lucide-react';
import './App.css';

// Types
interface DelegatePackage {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  perText: string;
  badge?: string;
  isPopular?: boolean;
  desc: string;
  features: string[];
  capacityFill: number;
  remainingText: string;
  category: 'standard' | 'group' | 'vip';
}

interface SponsorTier {
  id: string;
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
}

interface ScheduleSession {
  time: string;
  track: string;
  title: string;
  room: string;
  desc: string;
  speakers: string[];
}

interface Speaker {
  id: string;
  name: string;
  role: string;
  org: string;
  category: 'keynote' | 'investment' | 'tech' | 'policy';
  image: string;
  accentColor: string;
  bio: string;
  sessions: string;
}

export const App: React.FC = () => {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Schedule Tab
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  // Speaker Filter State
  const [speakerFilter, setSpeakerFilter] = useState<'all' | 'keynote' | 'investment' | 'tech' | 'policy'>('all');

  // Active Modals State
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [sponsorshipModalOpen, setSponsorshipModalOpen] = useState(false);
  const [registrationSuccessData, setRegistrationSuccessData] = useState<{
    refId: string;
    name: string;
    packageName: string;
    delegatesCount: number;
    email: string;
  } | null>(null);
  const [sponsorSuccessData, setSponsorSuccessData] = useState<{
    refId: string;
    orgName: string;
    tier: string;
  } | null>(null);

  // Registration Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    country: 'Ghana',
    packageId: 'individual',
    delegatesCount: 1,
    notes: '',
    groupDelegate2Name: '',
    groupDelegate2Email: '',
    groupDelegate2Role: '',
    groupDelegate3Name: '',
    groupDelegate3Email: '',
    groupDelegate3Role: '',
    agreedPrivacy: true,
  });

  // Sponsorship Form State
  const [sponsorForm, setSponsorForm] = useState({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    tier: 'Gold',
    message: '',
  });

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: 26 May 2027 08:00:00 GMT
    const targetDate = new Date('2027-05-26T08:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Delegate Packages Data from Requirement Doc
  const delegatePackages: DelegatePackage[] = [
    {
      id: 'startup',
      name: 'Start-up Package',
      price: 2985,
      formattedPrice: 'GH₵2,985',
      perText: 'per person',
      desc: 'Engineered for emerging founders, tech entrepreneurs, and early-stage innovators.',
      features: [
        'Full 2-Day Conference Pass',
        'Access to all Plenary & Panel Discussions',
        'Executive Breakfast & Gourmet Lunch daily',
        'B2B Startup Showcase & Pitch Exhibition area',
        'Direct Networking with Angel & Global Investors',
        'Digital Summit Materials & Official Delegate Pack',
      ],
      capacityFill: 75,
      remainingText: 'Limited Seats for Founders',
      category: 'standard',
    },
    {
      id: 'individual',
      name: 'Individual Delegate',
      price: 3600,
      formattedPrice: 'GH₵3,600',
      perText: 'per person',
      badge: 'Most Popular',
      isPopular: true,
      desc: 'The comprehensive executive pass for corporate leaders, investors, and advisors.',
      features: [
        'Full 2-Day Executive Conference Access',
        'Priority Seating at all Keynotes & Panel Discussions',
        'Gourmet Breakfast & Networking Luncheon both days',
        'Business Matchmaking & Dedicated Meeting Lounges',
        '50% Discount on Global Business Executive Group Membership',
        'Exclusive Investor Deal Book & Summit Directory Access',
        'Certificate of Participation & VIP Reception Access',
      ],
      capacityFill: 84,
      remainingText: '84% Booked • Early Rate Available',
      category: 'standard',
    },
    {
      id: 'group',
      name: 'Group Delegate (3 Passes)',
      price: 9600,
      formattedPrice: 'GH₵9,600',
      perText: 'total (GH₵3,200 / person)',
      badge: 'Best Value • Save GH₵1,200',
      desc: 'Exclusive collaborative corporate bundle for 3 delegates registering together.',
      features: [
        'Complete passes for 3 Executives registered together',
        'Substantial Saving of GH₵1,200 total (GH₵400/person)',
        'Reserved corporate table seating at keynotes & meals',
        'Full access to all 2-Day panels & networking lounges',
        'Corporate listing in the Summit Delegate Guide',
        'Access to B2B Deal Rooms & Private Networking Suite',
        '50% Discount on GBEG membership for all 3 delegates',
      ],
      capacityFill: 65,
      remainingText: 'Limited Corporate Tables Remaining',
      category: 'group',
    },
    {
      id: 'vip',
      name: 'VIP Package',
      price: 8995,
      formattedPrice: 'GH₵8,995',
      perText: 'per person',
      badge: 'Executive Tier',
      desc: 'Premium executive experience with private lounge access and ministerial bilateral forums.',
      features: [
        'All-Access 2-Day VIP Priority Credential',
        'Dedicated VIP Fast-Track Registration & Concierge',
        'Private VIP Networking Lounge & Executive Dining Room',
        'Direct Access to International Dignitaries & Speakers',
        '10% Discount on Global Business Executive Group Membership',
        'Invitation to the Host VIP Welcome Cocktail',
        'Priority Bilateral Deal-Making Introductions',
      ],
      capacityFill: 88,
      remainingText: 'Only 18 VIP Passes Remaining',
      category: 'vip',
    },
    {
      id: 'vvip',
      name: 'VVIP Package',
      price: 13799,
      formattedPrice: 'GH₵13,799',
      perText: 'per person',
      badge: 'Premier Platinum Access',
      desc: 'The pinnacle summit credential for sovereign leaders, board chairs, and institutional investors.',
      features: [
        'Unrestricted 2-Day Presidential & VVIP Summit Access',
        'Access to Global Business Executive Network platform',
        'Exclusive Opportunity to Pitch a Business / Deal on Stage',
        'Reserved Front-Row Plenary Seating & Private Meeting Suites',
        'VIP Table at the Summit Gala Dinner',
        'Private Chauffeur Airport Transit to Mövenpick Accra',
        'Dedicated Bilateral Matchmaker & Summit Advisor',
      ],
      capacityFill: 92,
      remainingText: 'Strictly Limited to 25 Delegates',
      category: 'vip',
    },
  ];

  // Sponsorship Tiers Data from Requirement Doc
  const sponsorTiers: SponsorTier[] = [
    {
      id: 'bronze',
      name: 'Bronze Sponsor',
      price: 'GH₵25,000',
      features: [
        'Official Summit Bronze Partner recognition',
        'Logo on summit website, backdrop & official collateral',
        '2 Complimentary Delegate Passes',
        'Exhibition table in the Summit Foyer',
        'Digital promotional insert in delegate welcome kit',
      ],
    },
    {
      id: 'silver',
      name: 'Silver Sponsor',
      price: 'GH₵35,000',
      features: [
        'Prominent Silver Sponsor branding across all media',
        '4 Complimentary Executive Delegate Passes',
        'Dedicated 2m x 2m Exhibition Booth',
        'Verbal acknowledgment during opening ceremony',
        'Access to the Summit B2B Investor Lounge',
      ],
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      price: 'GH₵50,000',
      highlight: true,
      features: [
        'Strategic Gold Partner positioning & plenary session branding',
        '6 Complimentary Executive Delegate Passes + 2 VIP Passes',
        'Prime Exhibition Booth in the Main Plenary Foyer',
        'Speaker / Panelist seat in an executive session',
        'Full-page feature in the Summit Programme Book',
        'Pre-summit press release & social media campaign',
      ],
    },
    {
      id: 'platinum',
      name: 'Platinum Sponsor',
      price: 'GH₵80,000',
      features: [
        'Co-host status for an official Summit Luncheon or Reception',
        '10 Complimentary Executive Passes + 4 VIP Passes',
        'Double Prime Exhibition Booth space',
        'Keynote introduction or panel moderation opportunity',
        'Access to private bilateral deal rooms with sovereign partners',
        'Prominent brand placement on all international broadcasts',
      ],
    },
    {
      id: 'diamond',
      name: 'Diamond Sponsor',
      price: 'GH₵100,000',
      highlight: true,
      features: [
        'Headline Summit Principal Partner status',
        '15 VIP Delegate Passes with VVIP Gala Table',
        'Exclusive sponsorship of the Presidential Opening Plenary',
        'Opening Keynote address slot by CEO / Chairman',
        'Permanent logo on all digital assets & press backdrops',
        'Dedicated VIP Bilateral Suite for the duration of GBS 2027',
      ],
    },
  ];

  // Speakers Data
  const speakers: Speaker[] = [
    {
      id: 'sp-1',
      name: 'Dr. Kwame Mensah',
      role: 'Managing Partner',
      org: 'Pan-African Capital Partners',
      category: 'keynote',
      image: '/images/hero_keynote.jpg',
      accentColor: '#0B2240',
      bio: 'Dr. Kwame Mensah oversees a $1.8B cross-border portfolio specializing in West African infrastructure, renewable energy, and sovereign debt restructuring. He is an advisor to multilateral development banks and has structured transformative FDI across seven African economies.',
      sessions: 'Opening Keynote: Unlocking Capital & Accelerating Economic Growth (Day 1)',
    },
    {
      id: 'sp-2',
      name: 'Amara Ndiaye',
      role: 'Director of Sustainable Finance',
      org: 'West Africa Development Fund',
      category: 'investment',
      image: '/images/speaker1.jpg',
      accentColor: '#0B4635',
      bio: 'Amara Ndiaye leads ESG and green sovereign debt initiatives across Africa. With over 18 years in private equity and multilateral finance, she has mobilized over $650M for climate-resilient agriculture and commercial industrialization projects.',
      sessions: 'Plenary Panel: Catalyzing Foreign Direct Investment & ESG Frontiers (Day 1)',
    },
    {
      id: 'sp-3',
      name: 'Sir Edward Vance',
      role: 'Global Head of Sovereign Advisory',
      org: 'Rothschild & Co. Global',
      category: 'policy',
      image: '/images/speaker2.jpg',
      accentColor: '#C58F28',
      bio: 'Sir Edward has advised more than 15 national governments on sovereign wealth governance, currency risk hedging, and international capital market access. He is a prominent commentator on emerging market macroeconomics.',
      sessions: 'Executive Briefing: Currency, Risk & Capital Flow Projections (Day 2)',
    },
    {
      id: 'sp-4',
      name: 'Kofi Asare',
      role: 'Founder & Chief Executive Officer',
      org: 'AfrikTech Innovations',
      category: 'tech',
      image: '/images/speaker3.jpg',
      accentColor: '#0B2240',
      bio: 'Kofi Asare is a pioneer in African cross-border payment rails and digital banking infrastructure. AfrikTech serves over 12 million SMEs across the continent and recently closed an oversubscribed Series B round.',
      sessions: 'Session: FinTech, Digital Rails & High-Growth Venture Deals (Day 2)',
    },
  ];

  // Schedule Data
  const scheduleDay1: ScheduleSession[] = [
    {
      time: '08:00 AM – 09:00 AM',
      track: 'Registration & Welcome',
      title: 'Delegate Accreditation & Welcome Networking Breakfast',
      room: 'Grand Ballroom Foyer',
      desc: 'Accreditation, collection of executive badges, and morning networking breakfast hosted by FKI Holdings.',
      speakers: ['GBS Secretariat', 'Executive Hosts'],
    },
    {
      time: '09:00 AM – 10:15 AM',
      track: 'Plenary Keynote',
      title: 'Official Opening: Bridging the Global Investment Gap',
      room: 'Main Plenary Hall',
      desc: 'Presidential opening address and high-level macroeconomic keynote on unlocking international liquidity and expanding commercial opportunities in Africa.',
      speakers: ['Dr. Kwame Mensah', 'FKI Holdings Leadership', 'Ministerial Delegates'],
    },
    {
      time: '10:30 AM – 11:45 AM',
      track: 'Investment Panel',
      title: 'Catalyzing Foreign Direct Investment in West Africa',
      room: 'Main Plenary Hall',
      desc: 'Strategic panel examining regulatory harmonisation, currency risk mitigation, and public-private structures that attract sovereign wealth.',
      speakers: ['Amara Ndiaye', 'Institutional Fund Managers'],
    },
    {
      time: '12:00 PM – 01:00 PM',
      track: 'Deal-Making',
      title: 'Executive Q&A & B2B Deal-Making Fireside Chat',
      room: 'Executive Lounge',
      desc: 'Curated fireside conversation connecting multinational project sponsors with institutional private equity syndicates.',
      speakers: ['Global Asset Allocators', 'Venture Builders'],
    },
    {
      time: '01:00 PM – 02:30 PM',
      track: 'Networking',
      title: 'Delegates Networking Luncheon & B2B Matchmaking',
      room: 'Mövenpick Garden Terrace',
      desc: 'Structured networking luncheon featuring bilateral deal tables and sector-focused discussion pods.',
      speakers: ['All Summit Delegates'],
    },
    {
      time: '02:30 PM – 04:30 PM',
      track: 'Sector Focus',
      title: 'Infrastructure, Energy Transition & Agribusiness Financing',
      room: 'Hall B',
      desc: 'Deep-dive breakout sessions on project preparation, blended finance mechanisms, and bankable infrastructure portfolios.',
      speakers: ['Infrastructure Consortium Leaders', 'DFI Directors'],
    },
    {
      time: '05:00 PM – 07:00 PM',
      track: 'Evening Reception',
      title: 'GBS 2027 Welcome Cocktail Reception hosted by FKI Holdings',
      room: 'Ballroom Poolside Deck',
      desc: 'An evening of cultural entertainment, executive networking, and informal deal negotiations with summit sponsors.',
      speakers: ['FKI Holdings Board of Directors'],
    },
  ];

  const scheduleDay2: ScheduleSession[] = [
    {
      time: '08:30 AM – 09:30 AM',
      track: 'Executive Briefing',
      title: 'Currency, Risk & Sovereign Capital Flow Projections',
      room: 'Main Plenary Hall',
      desc: 'Forward-looking global economic briefing on African debt markets, AfCFTA trade finance, and currency volatility.',
      speakers: ['Sir Edward Vance', 'Central Bank Representatives'],
    },
    {
      time: '09:30 AM – 11:00 AM',
      track: 'Innovation & Tech',
      title: 'Unlocking Digital Economy Capital: FinTech, AI & Trade',
      room: 'Main Plenary Hall',
      desc: 'How technology is reshaping cross-border settlement, supply chain liquidity, and venture capital syndication across emerging markets.',
      speakers: ['Kofi Asare', 'Global Venture Partners'],
    },
    {
      time: '11:15 AM – 01:00 PM',
      track: 'Venture Showcase',
      title: 'SME & Enterprise Deal Room: Live Pitch Showcase',
      room: 'Summit Deal Suite',
      desc: 'Pre-screened African growth companies pitch before an elite panel of angel syndicates, sovereign funds, and corporate venture capitalists.',
      speakers: ['VVIP & Start-up Presenters', 'Investor Jury'],
    },
    {
      time: '01:00 PM – 02:15 PM',
      track: 'Executive Luncheon',
      title: 'Partners & Sponsors Executive Luncheon',
      room: 'Grand Ballroom',
      desc: 'Private luncheon dedicated to honoring GBS 2027 sponsors, corporate partners, and international delegations.',
      speakers: ['Partner Representatives'],
    },
    {
      time: '02:15 PM – 04:00 PM',
      track: 'Strategic Roundtables',
      title: 'Institutional Capital & Sovereign Wealth Alliances',
      room: 'Hall A & B',
      desc: 'Closed-door roundtable for sovereign fund executives, pension trustees, and commercial bankers formulating investment syndicates.',
      speakers: ['Sovereign Wealth Trustees', 'Banking Executives'],
    },
    {
      time: '04:00 PM – 05:30 PM',
      track: 'Closing Ceremony',
      title: 'Summit Communiqué, Closing Remarks & Gala Dinner Announcement',
      room: 'Main Plenary Hall',
      desc: 'Presentation of the official GBS 2027 Investment Declaration, partner awards, and formal closing ceremony.',
      speakers: ['FKI Holdings Leadership', 'Summit Patrons'],
    },
  ];

  // Filtered Speakers
  const filteredSpeakers = speakerFilter === 'all'
    ? speakers
    : speakers.filter(s => s.category === speakerFilter);

  // Handle Package Selection & Modal Open
  const handleSelectPackage = (pkgId: string) => {
    setRegForm(prev => ({
      ...prev,
      packageId: pkgId,
      delegatesCount: pkgId === 'group' ? 3 : 1
    }));
    setRegistrationModalOpen(true);
  };

  // Handle Delegate Registration Form Submit
  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg = delegatePackages.find(p => p.id === regForm.packageId) || delegatePackages[1];
    const generatedRef = `GBS-2027-REG-${Math.floor(100000 + Math.random() * 900000)}`;
    
    setRegistrationSuccessData({
      refId: generatedRef,
      name: regForm.fullName,
      packageName: pkg.name,
      delegatesCount: regForm.delegatesCount,
      email: regForm.email,
    });
  };

  // Handle Sponsorship Form Submit
  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `GBS-2027-SPON-${Math.floor(10000 + Math.random() * 90000)}`;
    setSponsorSuccessData({
      refId: generatedRef,
      orgName: sponsorForm.orgName,
      tier: sponsorForm.tier,
    });
  };

  return (
    <div className="gbs-app-wrapper">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="top-announcement-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-item">
              <Calendar size={14} />
              <span><strong>DATES:</strong> 26–27 MAY 2027</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <MapPin size={14} />
              <span>MÖVENPICK AMBASSADOR HOTEL ACCRA, GHANA</span>
            </div>
            <div className="top-bar-item">
              <Building size={14} />
              <span>OFFICIALLY HOSTED BY <strong>FKI HOLDINGS</strong></span>
              <span style={{ opacity: 0.5 }}>|</span>
              <Mail size={14} />
              <a href="mailto:info@gbsummit2027.com" style={{ color: '#FFFFFF' }}>info@gbsummit2027.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & NAVBAR */}
      <header className="site-header">
        <div className="container">
          <div className="nav-container">
            {/* Brand Logo & Title */}
            <a href="#home" className="brand-logo-wrap">
              <img src="/logo.jpeg" alt="GBS 2027 Logo" className="brand-logo-img" />
              <div className="brand-text-block">
                <span className="brand-title">THE GLOBAL BUSINESS SUMMIT</span>
                <span className="brand-subtitle">GBS 2027 • ACCRA</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="nav-menu">
              <li><a href="#about" className="nav-link">About Summit</a></li>
              <li><a href="#speakers" className="nav-link">Speakers</a></li>
              <li><a href="#schedule" className="nav-link">Programme</a></li>
              <li><a href="#packages" className="nav-link">Delegate Packages</a></li>
              <li><a href="#sponsorship" className="nav-link">Sponsorship</a></li>
              <li><a href="#partners" className="nav-link">Partners</a></li>
              <li><a href="#venue" className="nav-link">Venue</a></li>
            </ul>

            {/* CTA Button */}
            <div className="nav-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSelectPackage('individual')}
              >
                Register Now
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-header">
            <div className="brand-logo-wrap">
              <img src="/logo.jpeg" alt="GBS 2027 Logo" style={{ height: 44 }} />
              <div className="brand-text-block">
                <span className="brand-title" style={{ fontSize: '1rem' }}>GBS 2027</span>
                <span className="brand-subtitle" style={{ fontSize: '0.65rem' }}>ACCRA, GHANA</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: 8, color: 'var(--color-navy)' }}
            >
              <X size={26} />
            </button>
          </div>
          <ul className="mobile-nav-links">
            <li><a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About Summit</a></li>
            <li><a href="#speakers" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Keynote Speakers</a></li>
            <li><a href="#schedule" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Summit Programme</a></li>
            <li><a href="#packages" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Delegate Packages & Pricing</a></li>
            <li><a href="#sponsorship" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Sponsorship Tiers</a></li>
            <li><a href="#partners" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Summit Partners</a></li>
            <li><a href="#venue" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Venue & Travel</a></li>
          </ul>
          <div className="mobile-nav-footer">
            <button
              className="btn btn-gold btn-lg"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                handleSelectPackage('individual');
              }}
            >
              Register as Delegate
              <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-outline"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                setSponsorshipModalOpen(true);
              }}
            >
              Become a Sponsor
            </button>
          </div>
        </div>
      )}

      {/* 3. HERO SECTION (Faithful recreation of ui.jpg Hero with White Theme) */}
      <section id="home" className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Heading, Theme & CTAs */}
            <div className="hero-content">
              <div className="section-badge gold">
                <Sparkles size={14} />
                WEST AFRICA'S PREMIER INVESTMENT SUMMIT
              </div>

              <h1 className="hero-title">
                THE GLOBAL <br />
                BUSINESS SUMMIT <span className="highlight-gold">2027</span>
              </h1>

              {/* Summit Theme Box from Requirement Document */}
              <div className="hero-theme-card">
                <div className="theme-card-label">Official Summit Theme</div>
                <div className="theme-card-text">
                  “Bridging the Global Investment Gap: Unlocking Capital, Expanding Opportunities and Accelerating Economic Growth”
                </div>
              </div>

              <p className="hero-desc">
                Convening sovereign leaders, institutional fund managers, multinational enterprises, and transformative African innovators for two days of strategic deal-making at Mövenpick Ambassador Hotel Accra.
              </p>

              <div className="hero-cta-group">
                <button
                  className="btn btn-gold btn-lg"
                  onClick={() => handleSelectPackage('individual')}
                >
                  Register as Delegate
                  <ArrowRight size={18} />
                </button>
                <button
                  className="btn btn-outline btn-lg"
                  onClick={() => setSponsorshipModalOpen(true)}
                >
                  Become a Sponsor
                </button>
              </div>

              <div className="hero-trust-badges">
                <div className="trust-item">
                  <Calendar size={18} />
                  <span>26–27 May 2027</span>
                </div>
                <div className="trust-item">
                  <MapPin size={18} />
                  <span>Accra, Ghana</span>
                </div>
                <div className="trust-item">
                  <Building size={18} />
                  <span>Host: FKI Holdings</span>
                </div>
              </div>
            </div>

            {/* Right Column: Stage Media & Floating Countdown Card (as in ui.jpg) */}
            <div className="hero-visual-col">
              <div className="hero-stage-card">
                <img
                  src="/images/hero_keynote.jpg"
                  alt="GBS Keynote Stage at Mövenpick Ambassador Hotel"
                  className="hero-stage-img"
                />
                <div className="hero-stage-overlay">
                  <div className="hero-stage-info">
                    <span className="hero-venue-tag">Plenary Grand Ballroom</span>
                    <strong style={{ fontSize: '1.1rem' }}>Mövenpick Ambassador Hotel Accra</strong>
                  </div>
                  <div className="hero-live-badge">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80' }}></span>
                    SUMMIT 2027
                  </div>
                </div>
              </div>

              {/* Floating Countdown Card (Exact geometry from ui.jpg) */}
              <div className="countdown-card">
                <div className="countdown-label">COUNTDOWN TO GBS 2027 INAUGURATION</div>
                <div className="countdown-digits-grid">
                  <div className="digit-box">
                    <span className="digit-num">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="digit-unit">DAYS</span>
                  </div>
                  <div className="digit-box">
                    <span className="digit-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="digit-unit">HOURS</span>
                  </div>
                  <div className="digit-box">
                    <span className="digit-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="digit-unit">MINS</span>
                  </div>
                  <div className="digit-box">
                    <span className="digit-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="digit-unit">SECS</span>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => handleSelectPackage('individual')}
                >
                  SECURE YOUR PASS TODAY
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT EVENT SECTION (Replicating ui.jpg About Section with Geometric Colored Squares) */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            {/* Left: Overlapping Photo Collage with Geometric Color Blocks (ui.jpg design) */}
            <div className="about-visual-wrap">
              {/* Colored Geometric Backdrop Boxes */}
              <div className="about-accent-box-1"></div>
              <div className="about-accent-box-2"></div>
              <div className="about-accent-box-3"></div>

              {/* Primary Summit Networking Image */}
              <div className="about-photo-primary">
                <img
                  src="/images/summit_networking.jpg"
                  alt="Delegates networking at Mövenpick Ambassador Hotel"
                />
              </div>

              {/* Secondary Overlapping Speaker Image */}
              <div className="about-photo-secondary">
                <img
                  src="/images/speaker1.jpg"
                  alt="Executive speaker"
                />
              </div>
            </div>

            {/* Right: Content, Theme Pillars & Stats Grid */}
            <div className="about-content">
              <div className="section-badge green">
                <Calendar size={14} />
                26–27 MAY 2027 • ACCRA, GHANA
              </div>

              <h2 className="section-title">
                ABOUT THE EVENT <br />
                <span className="highlight-gold">THE GLOBAL BUSINESS SUMMIT</span>
              </h2>

              <p className="about-lead">
                The Global Business Summit (GBS 2027) is an elite, dedicated international business and investment summit convened by <strong>FKI Holdings</strong> to catalyze private-sector capital and sovereign partnerships across Africa.
              </p>

              <p className="about-body">
                Against the backdrop of dynamic continental integration and emerging market industrialization, GBS 2027 addresses the urgent imperative to bridge the global investment gap. The summit provides an institutional platform where global institutional investors, venture syndicates, corporate decision-makers, and African enterprise leaders connect directly to unlock catalytic capital, structure transformative cross-border transactions, and accelerate sustainable economic growth.
              </p>

              {/* Stats Grid Matching ui.jpg Numbers */}
              <div className="about-stats-grid">
                <div className="stat-item">
                  <div className="stat-num">40<span className="accent">+</span></div>
                  <div className="stat-label">Sponsors & Corporate Partners</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">2.5K<span className="accent">+</span></div>
                  <div className="stat-label">C-Level & Global Investors</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">35<span className="accent">+</span></div>
                  <div className="stat-label">Keynote & Plenary Speakers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">50<span className="accent">+</span></div>
                  <div className="stat-label">Represented Global Economies</div>
                </div>
              </div>

              {/* Actions */}
              <div className="about-btn-group">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectPackage('individual')}
                >
                  Register Your Interest
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    alert('Official GBS 2027 Summit Prospectus is being prepared by FKI Holdings Secretariat and will be dispatched to registered interest holders.');
                  }}
                >
                  <FileText size={16} />
                  Download Prospectus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET THE SPEAKERS SECTION (Replicating ui.jpg Speakers Section) */}
      <section id="speakers" className="speakers-section">
        <div className="container">
          <div className="speakers-header-row">
            <div>
              <div className="section-badge gold">
                <Users size={14} />
                WORLD-CLASS FACULTY
              </div>
              <h2 className="section-title">
                MEET THE INCREDIBLE <br />
                <span className="highlight-gold">SPEAKERS</span>
              </h2>
              <p className="section-desc">
                Engage with seasoned sovereign wealth managers, private equity partners, visionary policy architects, and transformative business pioneers.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="speakers-filter-pills">
              {(['all', 'keynote', 'investment', 'tech', 'policy'] as const).map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${speakerFilter === cat ? 'active' : ''}`}
                  onClick={() => setSpeakerFilter(cat)}
                >
                  {cat === 'all' && 'All Faculty'}
                  {cat === 'keynote' && 'Keynote Speakers'}
                  {cat === 'investment' && 'Capital & PE'}
                  {cat === 'tech' && 'Tech & Trade'}
                  {cat === 'policy' && 'Policy & Macro'}
                </button>
              ))}
            </div>
          </div>

          {/* Speakers Grid with visual accents as seen in ui.jpg */}
          <div className="speakers-grid">
            {filteredSpeakers.map(speaker => (
              <div key={speaker.id} className="speaker-card">
                <div className="speaker-img-wrapper">
                  <img src={speaker.image} alt={speaker.name} />
                  <div className="speaker-color-accent">
                    <span className="speaker-badge-tag">{speaker.category.toUpperCase()}</span>
                  </div>
                </div>
                <div className="speaker-info-block">
                  <h3 className="speaker-name">{speaker.name}</h3>
                  <div className="speaker-role">{speaker.role}</div>
                  <div className="speaker-org">{speaker.org}</div>

                  <div className="speaker-card-footer">
                    <div className="speaker-socials">
                      <a href="#linkedin" className="speaker-social-icon" title="LinkedIn Profile"><Globe size={13} /></a>
                      <a href="#twitter" className="speaker-social-icon" title="Twitter / X Profile"><Briefcase size={13} /></a>
                    </div>
                    <button
                      className="speaker-bio-btn"
                      onClick={() => setSelectedSpeaker(speaker)}
                    >
                      View Profile
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SCHEDULE OF SUMMIT / PROGRAMME (ui.jpg Timeline recreation) */}
      <section id="schedule" className="schedule-section">
        <div className="container">
          <div className="schedule-header">
            <div className="section-badge green">
              <Clock size={14} />
              TWO-DAY COMPREHENSIVE AGENDA
            </div>
            <h2 className="section-title">
              SCHEDULE OF <span className="highlight-gold">MEETUP</span>
            </h2>
            <p className="section-desc mx-auto">
              A dynamic programme structured to stimulate strategic debates, institutional co-investments, and executive deal-making.
            </p>
          </div>

          {/* Day Selection Tabs as in ui.jpg */}
          <div className="schedule-tabs-wrap">
            <button
              className={`schedule-tab-btn ${activeDay === 1 ? 'active' : ''}`}
              onClick={() => setActiveDay(1)}
            >
              <span>DAY 1</span>
              <span className="tab-badge">26 MAY 2027</span>
              <span>Global Capital & Sovereign FDI</span>
            </button>
            <button
              className={`schedule-tab-btn ${activeDay === 2 ? 'active' : ''}`}
              onClick={() => setActiveDay(2)}
            >
              <span>DAY 2</span>
              <span className="tab-badge">27 MAY 2027</span>
              <span>Enterprise Acceleration & Deal Rooms</span>
            </button>
          </div>

          {/* Vertical Timeline Structure (ui.jpg layout) */}
          <div className="timeline-container">
            {(activeDay === 1 ? scheduleDay1 : scheduleDay2).map((session, idx) => (
              <div key={idx} className="timeline-row">
                {/* Left: Time */}
                <div className="timeline-time-col">
                  {session.time}
                </div>

                {/* Center: Node on vertical line */}
                <div className="timeline-node-col">
                  <div className="timeline-node-dot"></div>
                </div>

                {/* Right: Card */}
                <div className="timeline-card-col">
                  <div className="timeline-card-top">
                    <span className="timeline-track-tag">{session.track}</span>
                    <span className="timeline-room-tag">
                      <MapPin size={12} />
                      {session.room}
                    </span>
                  </div>
                  <h3 className="timeline-session-title">{session.title}</h3>
                  <p className="timeline-session-desc">{session.desc}</p>
                  <div className="timeline-speakers-list">
                    {session.speakers.map((sp, sIdx) => (
                      <span key={sIdx} className="timeline-speaker-chip">
                        <Users size={12} />
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Bottom CTA Buttons */}
          <div className="schedule-bottom-cta">
            <button
              className="btn btn-gold btn-lg"
              onClick={() => handleSelectPackage('individual')}
            >
              Register as Delegate
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => setSponsorshipModalOpen(true)}
            >
              Become a Sponsor
            </button>
          </div>
        </div>
      </section>

      {/* 7. GET YOUR TICKET / DELEGATE PACKAGES (ui.jpg Pricing Section) */}
      <section id="packages" className="pricing-section">
        <div className="container">
          <div className="pricing-header">
            <div className="section-badge gold">
              <Award size={14} />
              CONFIRMED DELEGATE PACKAGES
            </div>
            <h2 className="section-title">
              GET YOUR <span className="highlight-gold">TICKET</span>
            </h2>
            <p className="section-desc mx-auto">
              Select your delegate package to secure your presence at West Africa's flagship business and investment summit.
            </p>
          </div>

          {/* Policy Alert from Requirement Document (Section 7) */}
          <div className="pricing-policy-alert">
            <Info size={24} />
            <div className="pricing-policy-text">
              <strong>Official Registration Policy:</strong> Payment is <em>not</em> collected at initial registration. You may register your interest and delegate details today. Following verification, the <strong>FKI Holdings</strong> Summit Secretariat will issue an official invoice with approved payment instructions.
            </div>
          </div>

          {/* Primary 3 Cards as prominently seen in ui.jpg */}
          <div className="pricing-cards-grid">
            {delegatePackages.slice(0, 3).map(pkg => (
              <div
                key={pkg.id}
                className={`pricing-card ${pkg.isPopular ? 'featured' : ''}`}
              >
                {pkg.badge && (
                  <div className="pricing-badge-popular">{pkg.badge}</div>
                )}
                <div className="pricing-card-header">
                  <h3 className="pricing-tier-name">{pkg.name}</h3>
                  <p className="pricing-tier-desc">{pkg.desc}</p>
                </div>

                <div className="pricing-amount-wrap">
                  <span className="pricing-currency">GH₵</span>
                  <span className="pricing-amount">{pkg.price.toLocaleString()}</span>
                  <span className="pricing-per">{pkg.perText}</span>
                </div>

                {/* Capacity Fill Bar from ui.jpg */}
                <div className="pricing-capacity-wrap">
                  <div className="capacity-label-row">
                    <span>Availability</span>
                    <span>{pkg.remainingText}</span>
                  </div>
                  <div className="capacity-bar">
                    <div
                      className="capacity-fill"
                      style={{ width: `${pkg.capacityFill}%` }}
                    ></div>
                  </div>
                </div>

                <ul className="pricing-features-list">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item">
                      <CheckCircle2 size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${pkg.isPopular ? 'btn-gold' : 'btn-primary'}`}
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => handleSelectPackage(pkg.id)}
                >
                  Register Now
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Executive & VIP Packages (VIP and VVIP from docx) */}
          <div className="text-center" style={{ marginBottom: '1.75rem' }}>
            <span className="section-badge green">EXECUTIVE & HIGH-NET-WORTH PACKAGES</span>
          </div>
          <div className="pricing-cards-secondary-grid">
            {delegatePackages.slice(3, 5).map(pkg => (
              <div
                key={pkg.id}
                className="pricing-card"
                style={{ borderColor: 'var(--color-navy)' }}
              >
                {pkg.badge && (
                  <div className="pricing-badge-popular" style={{ background: 'var(--color-navy)' }}>
                    {pkg.badge}
                  </div>
                )}
                <div className="pricing-card-header">
                  <h3 className="pricing-tier-name">{pkg.name}</h3>
                  <p className="pricing-tier-desc">{pkg.desc}</p>
                </div>

                <div className="pricing-amount-wrap">
                  <span className="pricing-currency">GH₵</span>
                  <span className="pricing-amount">{pkg.price.toLocaleString()}</span>
                  <span className="pricing-per">{pkg.perText}</span>
                </div>

                <div className="pricing-capacity-wrap">
                  <div className="capacity-label-row">
                    <span>Executive Allocation</span>
                    <span>{pkg.remainingText}</span>
                  </div>
                  <div className="capacity-bar">
                    <div
                      className="capacity-fill"
                      style={{ width: `${pkg.capacityFill}%`, background: 'var(--grad-navy)' }}
                    ></div>
                  </div>
                </div>

                <ul className="pricing-features-list">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item special">
                      <CheckCircle2 size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-outline"
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => handleSelectPackage(pkg.id)}
                >
                  Reserve Executive Pass
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SPONSORSHIP TIERS SECTION (From Requirement Doc Section 6) */}
      <section id="sponsorship" className="sponsorship-section">
        <div className="container">
          <div className="text-center">
            <div className="section-badge gold">
              <ShieldCheck size={14} />
              STRATEGIC CORPORATE ALLIANCES
            </div>
            <h2 className="section-title">
              SUMMIT SPONSORSHIP <span className="highlight-gold">PACKAGES</span>
            </h2>
            <p className="section-desc mx-auto">
              Showcase your corporate leadership, generate prime B2B investment leads, and secure direct alignment with Africa's high-growth economic corridors.
            </p>
          </div>

          <div className="sponsorship-grid">
            {sponsorTiers.map(tier => (
              <div
                key={tier.id}
                className={`sponsor-tier-card ${tier.id === 'diamond' ? 'diamond' : ''}`}
              >
                <div className="sponsor-tier-badge">{tier.name}</div>
                <div className="sponsor-tier-price">{tier.price}</div>
                <ul className="sponsor-features-mini">
                  {tier.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', textAlign: 'left' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: 2 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn btn-sm ${tier.highlight ? 'btn-gold' : 'btn-outline'}`}
                  style={{ width: '100%' }}
                  onClick={() => {
                    setSponsorForm(prev => ({ ...prev, tier: tier.name }));
                    setSponsorshipModalOpen(true);
                  }}
                >
                  Enquire Tier
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PARTNERS OF CONFERENCE (ui.jpg replication using official logos) */}
      <section id="partners" className="partners-section">
        <div className="container">
          <div className="partners-title-row">
            <span className="partners-host-badge">CONVENED & PRESENTED BY</span>
            <h2 className="partners-title">
              PARTNERS OF <span className="highlight-gold">THE GLOBAL BUSINESS SUMMIT</span>
            </h2>
          </div>

          {/* Grid of official partner logos provided in workspace */}
          <div className="partners-logos-grid">
            {/* Host Partner: FKI Holdings */}
            <div className="partner-card" style={{ borderColor: 'var(--color-gold)' }}>
              <img src="/partner1.jpeg" alt="FKI Holdings" className="partner-logo-img" />
              <div className="partner-label">FKI HOLDINGS</div>
              <div className="partner-sublabel">Official Summit Host & Convener</div>
            </div>

            {/* Partner 2: FKI HR Solutions */}
            <div className="partner-card">
              <img src="/partner2.jpeg" alt="FKI HR Solutions" className="partner-logo-img" />
              <div className="partner-label">FKI HR SOLUTIONS</div>
              <div className="partner-sublabel">People, Performance, Purpose</div>
            </div>

            {/* Partner 3: CoreDefend Security */}
            <div className="partner-card">
              <img src="/partner3.jpeg" alt="CoreDefend Security" className="partner-logo-img" />
              <div className="partner-label">COREDEFEND SECURITY</div>
              <div className="partner-sublabel">Protecting What Matters Most</div>
            </div>

            {/* Partner 4: FKI Construction Limited */}
            <div className="partner-card">
              <img src="/partner4.jpeg" alt="FKI Construction Limited" className="partner-logo-img" />
              <div className="partner-label">FKI CONSTRUCTION</div>
              <div className="partner-sublabel">Infrastructure & Real Estate</div>
            </div>

            {/* Partner 5: FKI Konnect */}
            <div className="partner-card">
              <img src="/partner5.jpeg" alt="FKI Konnect" className="partner-logo-img" />
              <div className="partner-label">FKI KONNECT</div>
              <div className="partner-sublabel">Innovation & Tech Ecosystems</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. VENUE & DESTINATION SHOWCASE */}
      <section id="venue" className="venue-section">
        <div className="container">
          <div className="venue-card-elevated">
            <div className="venue-content-side">
              <div className="venue-badge">
                <MapPin size={15} />
                OFFICIAL SUMMIT VENUE
              </div>
              <h2 className="venue-name">
                Mövenpick Ambassador Hotel Accra, Ghana
              </h2>
              <p className="venue-desc">
                Set amidst 16 acres of lush landscaped gardens in the heart of Accra’s central business district, Mövenpick Ambassador Hotel is West Africa's leading five-star corporate and diplomatic convention destination.
              </p>
              <div className="venue-details-list">
                <div className="venue-detail-item">
                  <MapPin size={18} />
                  <span>Independence Avenue, Ridge, Accra</span>
                </div>
                <div className="venue-detail-item">
                  <Globe size={18} />
                  <span>15 Mins to Kotoka Int'l Airport</span>
                </div>
                <div className="venue-detail-item">
                  <ShieldCheck size={18} />
                  <span>Diplomatic Level Security Protocol</span>
                </div>
                <div className="venue-detail-item">
                  <Users size={18} />
                  <span>Executive Suites & Boardrooms</span>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-gold"
                  onClick={() => handleSelectPackage('individual')}
                >
                  Join Us in Accra
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="venue-visual-side">
              <img
                src="/images/summit_networking.jpg"
                alt="Mövenpick Ambassador Hotel Accra Grand Ballroom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. SITE FOOTER (ui.jpg replication) */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-grid">
            {/* Col 1: About & Branding */}
            <div className="footer-col">
              <div className="footer-logo-wrap">
                <img src="/logo.jpeg" alt="GBS 2027 Logo" className="footer-logo-img" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.04em' }}>THE GLOBAL BUSINESS SUMMIT</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-gold-light)' }}>GBS 2027 • ACCRA</div>
                </div>
              </div>
              <p className="footer-about">
                The Global Business Summit 2027 is West Africa’s premier international gathering dedicated to bridging the global investment gap, accelerating capital flow, and expanding transformative opportunities across Africa.
              </p>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>
                Organized and hosted by <strong>FKI Holdings</strong>.
              </div>
            </div>

            {/* Col 2: Summit Quick Links */}
            <div className="footer-col">
              <div className="footer-col-title">Summit Navigation</div>
              <ul className="footer-links-list">
                <li><a href="#about" className="footer-link">About Summit</a></li>
                <li><a href="#speakers" className="footer-link">Confirmed Speakers</a></li>
                <li><a href="#schedule" className="footer-link">Two-Day Programme</a></li>
                <li><a href="#packages" className="footer-link">Delegate Packages</a></li>
                <li><a href="#sponsorship" className="footer-link">Sponsorship Tiers</a></li>
                <li><a href="#partners" className="footer-link">Current Partners</a></li>
              </ul>
            </div>

            {/* Col 3: Packages */}
            <div className="footer-col">
              <div className="footer-col-title">Delegate Passes</div>
              <ul className="footer-links-list">
                <li><a href="#packages" className="footer-link" onClick={() => handleSelectPackage('startup')}>Start-up Package (GH₵2,985)</a></li>
                <li><a href="#packages" className="footer-link" onClick={() => handleSelectPackage('individual')}>Individual Delegate (GH₵3,600)</a></li>
                <li><a href="#packages" className="footer-link" onClick={() => handleSelectPackage('group')}>Group Package (GH₵9,600)</a></li>
                <li><a href="#packages" className="footer-link" onClick={() => handleSelectPackage('vip')}>VIP Package (GH₵8,995)</a></li>
                <li><a href="#packages" className="footer-link" onClick={() => handleSelectPackage('vvip')}>VVIP Package (GH₵13,799)</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Secretariat */}
            <div className="footer-col">
              <div className="footer-col-title">Summit Secretariat</div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>Mövenpick Ambassador Hotel, Accra, Ghana</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a href="mailto:info@gbsummit2027.com" style={{ color: 'inherit' }}>info@gbsummit2027.com</a>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+233 (0) 30 200 0000</span>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <button
                  className="btn btn-outline-white btn-sm"
                  onClick={() => setSponsorshipModalOpen(true)}
                >
                  Sponsorship Enquiries
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              © 2027 The Global Business Summit (GBS 2027). All rights reserved. Hosted by FKI Holdings.
            </div>
            <div className="footer-social-icons">
              <a href="#linkedin" className="footer-social-btn" title="LinkedIn"><Globe size={16} /></a>
              <a href="#twitter" className="footer-social-btn" title="Twitter / X"><Briefcase size={16} /></a>
              <a href="mailto:info@gbsummit2027.com" className="footer-social-btn" title="Email"><Mail size={16} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL: DELEGATE REGISTRATION ================= */}
      {registrationModalOpen && (
        <div className="modal-overlay" onClick={() => setRegistrationModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.75rem 2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge-tag gold" style={{ marginBottom: 4 }}>GBS 2027 REGISTRATION</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-navy)' }}>
                  Delegate Registration Form
                </h3>
              </div>
              <button
                onClick={() => setRegistrationModalOpen(false)}
                style={{ padding: 6, color: 'var(--color-navy)', borderRadius: '50%' }}
              >
                <X size={22} />
              </button>
            </div>

            {registrationSuccessData ? (
              <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(11,70,53,0.1)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                  Registration Submitted Successfully!
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Thank you, <strong>{registrationSuccessData.name}</strong>. Your registration for <strong>{registrationSuccessData.packageName}</strong> has been logged in the summit secretariat database.
                </p>

                <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.75rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Reference Number:</span>
                    <strong style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-mono)' }}>{registrationSuccessData.refId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Registered Package:</span>
                    <strong>{registrationSuccessData.packageName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Number of Delegates:</span>
                    <strong>{registrationSuccessData.delegatesCount}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Confirmation Email:</span>
                    <strong>{registrationSuccessData.email}</strong>
                  </div>
                </div>

                <div style={{ background: 'rgba(197, 143, 40, 0.1)', border: '1px solid rgba(197, 143, 40, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '2rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--color-navy)' }}>
                  <strong>Next Step Notice (No Online Payment Today):</strong><br />
                  As outlined in the GBS 2027 Guidelines, payment is not collected at initial registration. Our delegate relations team will verify your accreditation details and issue the official GBS invoice containing bank transfer and electronic settlement details within 24 hours.
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setRegistrationModalOpen(false);
                    setRegistrationSuccessData(null);
                  }}
                >
                  Return to Summit Overview
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegistrationSubmit} style={{ padding: '1.75rem 2rem' }}>
                <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <ShieldCheck size={15} style={{ verticalAlign: 'middle', marginRight: 6, color: 'var(--color-gold)' }} />
                  <strong>Zero-Risk Registration:</strong> No upfront payment is required at this stage. Submit your details to secure allocation.
                </div>

                {/* Package Select */}
                <div className="form-group">
                  <label className="form-label">Selected Delegate Package *</label>
                  <select
                    className="form-select"
                    value={regForm.packageId}
                    onChange={e => {
                      const val = e.target.value;
                      setRegForm(prev => ({
                        ...prev,
                        packageId: val,
                        delegatesCount: val === 'group' ? 3 : 1
                      }));
                    }}
                    required
                  >
                    {delegatePackages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.formattedPrice} ({pkg.perText})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid for Name & Organization */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Lead Delegate Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Kwabena Mensah"
                      value={regForm.fullName}
                      onChange={e => setRegForm({ ...regForm, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Organisation / Business Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Atlas Capital Group"
                      value={regForm.organization}
                      onChange={e => setRegForm({ ...regForm, organization: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Job Title & Country */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Job Title / Designation</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Chief Executive Officer"
                      value={regForm.jobTitle}
                      onChange={e => setRegForm({ ...regForm, jobTitle: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country of Residence / Origin</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ghana / International"
                      value={regForm.country}
                      onChange={e => setRegForm({ ...regForm, country: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Official Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@company.com"
                      value={regForm.email}
                      onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telephone / Mobile *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+233 24 000 0000"
                      value={regForm.phone}
                      onChange={e => setRegForm({ ...regForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Group Details (if Group Package selected) */}
                {regForm.packageId === 'group' && (
                  <div style={{ background: 'var(--color-navy-soft)', border: '1px solid rgba(11,34,64,0.1)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Users size={16} />
                      Additional Group Delegates (Delegates 2 & 3)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Delegate 2 Full Name"
                        value={regForm.groupDelegate2Name}
                        onChange={e => setRegForm({ ...regForm, groupDelegate2Name: e.target.value })}
                        required
                      />
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Delegate 2 Email"
                        value={regForm.groupDelegate2Email}
                        onChange={e => setRegForm({ ...regForm, groupDelegate2Email: e.target.value })}
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Delegate 3 Full Name"
                        value={regForm.groupDelegate3Name}
                        onChange={e => setRegForm({ ...regForm, groupDelegate3Name: e.target.value })}
                        required
                      />
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Delegate 3 Email"
                        value={regForm.groupDelegate3Email}
                        onChange={e => setRegForm({ ...regForm, groupDelegate3Email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Special Notes */}
                <div className="form-group">
                  <label className="form-label">Special Notes / Dietary / Investment Interests</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="Provide any specific sector focus, deal interests, or dietary requirements..."
                    value={regForm.notes}
                    onChange={e => setRegForm({ ...regForm, notes: e.target.value })}
                  />
                </div>

                {/* Privacy Consent */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <input
                    type="checkbox"
                    id="privacyCheck"
                    style={{ marginTop: 4 }}
                    checked={regForm.agreedPrivacy}
                    onChange={e => setRegForm({ ...regForm, agreedPrivacy: e.target.checked })}
                    required
                  />
                  <label htmlFor="privacyCheck" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    I agree that the information submitted will be processed by FKI Holdings for GBS 2027 registration, accreditation, and communication in compliance with privacy regulations.
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setRegistrationModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-gold"
                  >
                    Complete Registration
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: SPONSORSHIP ENQUIRY ================= */}
      {sponsorshipModalOpen && (
        <div className="modal-overlay" onClick={() => setSponsorshipModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.75rem 2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge-tag gold" style={{ marginBottom: 4 }}>CORPORATE PARTNERSHIP</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-navy)' }}>
                  Sponsorship Enquiry
                </h3>
              </div>
              <button
                onClick={() => setSponsorshipModalOpen(false)}
                style={{ padding: 6, color: 'var(--color-navy)' }}
              >
                <X size={22} />
              </button>
            </div>

            {sponsorSuccessData ? (
              <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(197,143,40,0.1)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                  Sponsorship Enquiry Received
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Thank you for your interest in partnering with <strong>The Global Business Summit 2027</strong>. Our executive corporate partnerships team at FKI Holdings has received your enquiry for <strong>{sponsorSuccessData.tier} Tier</strong>.
                </p>
                <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '2rem', fontSize: '0.85rem' }}>
                  Ref Code: <strong>{sponsorSuccessData.refId}</strong> • An executive partner dossier will be delivered to your contact officer within 1 business day.
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSponsorshipModalOpen(false);
                    setSponsorSuccessData(null);
                  }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSponsorSubmit} style={{ padding: '1.75rem 2rem' }}>
                <div className="form-group">
                  <label className="form-label">Preferred Sponsorship Tier *</label>
                  <select
                    className="form-select"
                    value={sponsorForm.tier}
                    onChange={e => setSponsorForm({ ...sponsorForm, tier: e.target.value })}
                  >
                    <option value="Bronze">Bronze (GH₵25,000)</option>
                    <option value="Silver">Silver (GH₵35,000)</option>
                    <option value="Gold">Gold (GH₵50,000)</option>
                    <option value="Platinum">Platinum (GH₵80,000)</option>
                    <option value="Diamond">Diamond (GH₵100,000)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Organisation / Enterprise *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Apex Global Bank"
                      value={sponsorForm.orgName}
                      onChange={e => setSponsorForm({ ...sponsorForm, orgName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Person Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Nana Afua"
                      value={sponsorForm.contactName}
                      onChange={e => setSponsorForm({ ...sponsorForm, contactName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Work Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="partnerships@company.com"
                      value={sponsorForm.email}
                      onChange={e => setSponsorForm({ ...sponsorForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telephone *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+233 20 000 0000"
                      value={sponsorForm.phone}
                      onChange={e => setSponsorForm({ ...sponsorForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Partnership Goals & Remarks</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Outline your brand objectives, exhibition expectations, or bespoke requirements..."
                    value={sponsorForm.message}
                    onChange={e => setSponsorForm({ ...sponsorForm, message: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setSponsorshipModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-gold"
                  >
                    Submit Sponsorship Enquiry
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: SPEAKER BIO ================= */}
      {selectedSpeaker && (
        <div className="modal-overlay" onClick={() => setSelectedSpeaker(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={selectedSpeaker.image}
                alt={selectedSpeaker.name}
                style={{ width: '100%', height: 260, objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedSpeaker(null)}
                style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', padding: 6, borderRadius: '50%' }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1.75rem 2rem' }}>
              <span className="badge-tag gold" style={{ marginBottom: 8 }}>
                {selectedSpeaker.category.toUpperCase()}
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: 2 }}>
                {selectedSpeaker.name}
              </h3>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: 4 }}>
                {selectedSpeaker.role}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                {selectedSpeaker.org}
              </div>

              <div style={{ background: 'var(--color-bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-navy)', textTransform: 'uppercase', marginBottom: 2 }}>
                  Featured Plenary Session
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                  {selectedSpeaker.sessions}
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {selectedSpeaker.bio}
              </p>

              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setSelectedSpeaker(null);
                  handleSelectPackage('individual');
                }}
              >
                Register to Attend This Keynote
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
