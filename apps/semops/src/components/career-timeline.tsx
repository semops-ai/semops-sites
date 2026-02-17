import { createClient } from '@/lib/supabase/server';
import type { PositionWithDetails } from '@/types/career';
import { PositionCard } from './position-card';

// Static fallback data for when Supabase is unavailable
const FALLBACK_POSITIONS: PositionWithDetails[] = [
  {
    id: '1',
    company_id: '1',
    title: 'Group Principal Product Manager, Technical',
    level: 'Group Principal',
    start_date: '2021-03-01',
    end_date: '2023-12-31',
    location: 'Seattle, WA',
    is_current: false,
    display_order: 1,
    created_at: '',
    company: {
      id: '1',
      name: 'Microsoft',
      logo_url: '/logos/microsoft.svg',
      website: 'https://microsoft.com',
      created_at: '',
    },
    bullets: [
      {
        id: '1',
        position_id: '1',
        bullet_text: 'Led product roadmap, strategy, and execution for data and analytics across Azure Communications Services',
        display_order: 1,
        category: 'leadership',
        created_at: '',
      },
    ],
    highlights: [],
  },
];

async function getPositions(): Promise<PositionWithDetails[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('positions')
      .select(`
        *,
        company:companies(*),
        bullets:position_bullets(
          id,
          bullet_text,
          display_order,
          category
        ),
        highlights:position_highlights(
          id,
          metric_label,
          metric_value,
          display_order
        )
      `)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      return FALLBACK_POSITIONS;
    }

    // Sort bullets and highlights by display_order
    const sortedData = data?.map((position) => ({
      ...position,
      bullets: position.bullets?.sort(
        (a: { display_order: number }, b: { display_order: number }) =>
          a.display_order - b.display_order
      ),
      highlights: position.highlights?.sort(
        (a: { display_order: number }, b: { display_order: number }) =>
          a.display_order - b.display_order
      ),
    })) as PositionWithDetails[];

    return sortedData || FALLBACK_POSITIONS;
  } catch (error) {
    console.error('Failed to fetch positions:', error);
    return FALLBACK_POSITIONS;
  }
}

export async function CareerTimeline() {
  const positions = await getPositions();

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div
        className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border"
        aria-hidden="true"
      />

      <div className="space-y-8" role="list" aria-label="Career timeline">
        {positions.map((position, index) => (
          <PositionCard
            key={position.id}
            position={position}
            isFirst={index === 0}
            isLast={index === positions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
