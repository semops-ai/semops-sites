// Career timeline types for Supabase data

export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  created_at: string;
}

export interface Position {
  id: string;
  company_id: string;
  title: string;
  level: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  is_current: boolean;
  display_order: number;
  created_at: string;
  // Joined data
  company?: Company;
  bullets?: PositionBullet[];
  highlights?: PositionHighlight[];
}

export interface PositionBullet {
  id: string;
  position_id: string;
  bullet_text: string;
  display_order: number;
  category: 'leadership' | 'technical' | 'impact' | null;
  created_at: string;
}

export interface PositionHighlight {
  id: string;
  position_id: string;
  metric_label: string;
  metric_value: string;
  display_order: number;
}

// Joined position with all related data
export interface PositionWithDetails extends Position {
  company: Company;
  bullets: PositionBullet[];
  highlights: PositionHighlight[];
}
