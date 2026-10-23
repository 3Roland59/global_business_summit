export interface DelegatePackage {
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

export interface SponsorTier {
  id: string;
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
}

export interface ScheduleSession {
  time: string;
  track: string;
  title: string;
  room: string;
  desc: string;
  speakers: string[];
}

export interface Speaker {
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

export interface PartnerItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  isHost?: boolean;
  darkBg?: boolean;
}
