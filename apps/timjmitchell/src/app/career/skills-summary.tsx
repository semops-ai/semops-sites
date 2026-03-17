import type { DurationByRole } from '@/types/resume';

interface SkillsSummaryProps {
  durationByRole: DurationByRole[];
}

function formatYearsMonths(totalMonths: number): string {
  const months = Math.round(totalMonths);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} months`;
  }
  if (remainingMonths === 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo`;
}

export function SkillsSummary({ durationByRole }: SkillsSummaryProps) {
  if (durationByRole.length === 0) {
    return null;
  }

  // Calculate max for bar scaling
  const maxMonths = Math.max(...durationByRole.map((r) => Number(r.total_months)));

  return (
    <div className="grid gap-4">
      {durationByRole.map((role) => {
        const months = Number(role.total_months);
        const percentage = (months / maxMonths) * 100;

        return (
          <div key={role.role_id} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-medium">{role.role_name}</span>
              <span className="text-sm text-muted-foreground">
                {formatYearsMonths(months)}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
