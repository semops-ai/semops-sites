import type { CareerTimelineJob } from '@/types/resume';

interface CareerTimelineProps {
 jobs: CareerTimelineJob[];
}

function formatDateRange(startDate: string, endDate: string | null): string {
 const start = new Date(startDate);
 const end = endDate ? new Date(endDate) : null;

 const startStr = start.toLocaleDateString('en-US', {
 month: 'short',
 year: 'numeric',
 });

 const endStr = end
 ? end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
 : 'Present';

 return `${startStr} – ${endStr}`;
}

function JobRow({ job }: { job: CareerTimelineJob }) {
 return (
 <div className="relative pl-8 pb-6 last:pb-0">
 {/* Timeline line */}
 <div className="absolute left-0 top-3 bottom-0 w-px bg-border last:hidden" />

 {/* Timeline dot */}
 <div className="absolute left-0 top-3 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background" />

 <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
 <div>
 <span className="font-semibold">{job.title}</span>
 <span className="text-muted-foreground"> · {job.company?.name}</span>
 </div>
 <span className="text-sm text-muted-foreground whitespace-nowrap">
 {formatDateRange(job.start_date, job.end_date)}
 </span>
 </div>
 </div>
 );
}

export function CareerTimeline({ jobs }: CareerTimelineProps) {
 if (jobs.length === 0) {
 return (
 <div className="text-center py-12 text-muted-foreground">
 <p>No career data available.</p>
 <p className="text-sm mt-2">Run the synthetic seed to populate data.</p>
 </div>
 );
 }

 return (
 <div className="relative">
 {jobs.map((job) => (
 <JobRow key={job.id} job={job} />
 ))}
 </div>
 );
}
