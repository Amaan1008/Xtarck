// ─────────────────────────────────────────────
//  Xtrack — Shared type definitions
//
//  These are global (non-module) type-only declarations, matching the
//  JSON shapes returned by the PHP API (see api/*.php) and the MySQL
//  schema (see database.sql / migration_*.sql).
//
//  Interfaces declared here need no import — every other .ts file in
//  this project can reference them directly, the same way the app's
//  functions are global (see ts/dom.ts for why).
// ─────────────────────────────────────────────

/** Every api/*.php endpoint replies with this envelope (see jsonResponse() in config/session.php). */
interface ApiResponse<T = {}> {
  success: boolean;
  message: string;
}

/** Convenience alias for an ApiResponse whose extra fields are merged in. */
type ApiResult<T extends object = {}> = ApiResponse & T;

interface User {
  id: number;
  fullname: string;
  email: string;
  phone?: string | null;
  status?: 'active' | 'banned';
  created_at?: string;
}

interface Trip {
  id: number;
  name: string;
  panel: string;
  state: unknown;
  selected: unknown;
  created_at?: string;
}

interface Review {
  id: number;
  user_id?: number;
  place_name: string;
  rating: number;
  tip?: string | null;
  updated_at?: string;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  is_active?: boolean | number;
  created_at?: string;
}

type LocationCategory = 'beach' | 'adventure' | 'cultural' | 'wildlife' | 'mixed';

interface LocationPlace {
  id: number;
  location_id?: number;
  name: string;
  distance_label?: string | null;
  description?: string | null;
  entry_cost_lkr?: number;
  duration_hrs?: number;
  place_lat?: number | null;
  place_lon?: number | null;
}

interface Location {
  id: number;
  name: string;
  region: string;
  lat: number;
  lon: number;
  description?: string | null;
  distance_from_colombo?: number | null;
  emoji?: string;
  is_starting_point?: boolean | number;
  categories?: LocationCategory[];
  places?: LocationPlace[];
}

type HotelTier = 'budget' | 'comfortable' | 'luxury';

interface Hotel {
  id: number;
  location_id: number;
  name: string;
  emoji?: string;
  tier: HotelTier;
  stars?: number;
  rating?: number | null;
  rating_text?: string | null;
  description?: string | null;
  price_lkr?: number | null;
  booking_url?: string | null;
  amenities?: string[];
  image?: string;
}

interface PremiumPlan {
  id: number;
  name: string;
  price_lkr: number;
  duration_days: number;
  features?: string[];
}

interface AdminStats {
  total_users: number;
  total_trips: number;
  total_reviews: number;
  total_hotels?: number;
  premium_users?: number;
  [key: string]: unknown;
}

interface Admin {
  id: number;
  fullname: string;
  email: string;
  last_login?: string | null;
}

/** onboarding.html travel-style quiz answer set, persisted to build the destination match. */
interface OnboardingAnswers {
  [questionKey: string]: string | string[];
}

interface DestinationMatch {
  location: Location;
  score: number;
  reasons?: string[];
}

/** Return type of calc() in ts/pages/xtrack.ts — a trip's cost breakdown by category. */
interface CostBreakdown {
  t: number;
  a: number;
  f: number;
  ac: number;
  total: number;
}
