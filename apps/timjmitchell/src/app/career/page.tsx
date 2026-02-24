import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import {
 PageLayout,
 PageHeader,
} from '@/components/layouts/page-layout';
import { CareerTimeline } from './career-timeline';
import { CareerDashboard } from './career-dashboard';
import type { CareerTimelineJob, DurationByRole } from '@/types/resume';

export const metadata: Metadata = {
 title: 'Career',
 description: 'Career timeline and experience across product management, data platforms, and streaming media.',
};

async function getCareerData {
 const supabase = await createClient;

 // Fetch jobs with company, bullets, skills, and platforms
 const { data: jobs, error: jobsError } = await supabase
 .from('resume_job')
 .select(`
 *,
 company:companies(*),
 bullets:resume_job_bullet(*),
 skills:resume_job_skill(*, skill:resume_skill(*)),
 platforms:resume_job_platform(*, platform:resume_platform(*)),
 industries:resume_job_industry(*, industry:resume_industry(*)),
 product_domains:resume_job_product_domain(*, product_domain:resume_product_domain(*))
 `)
 .order('start_date', { ascending: false });

 if (jobsError) {
 console.error('Error fetching jobs:', jobsError);
 return { jobs: [], durationByRole: [] };
 }

 // Fetch duration by role view
 const { data: durationByRole, error: durationError } = await supabase
 .from('v_duration_by_role')
 .select('*')
 .order('total_months', { ascending: false });

 if (durationError) {
 console.error('Error fetching duration by role:', durationError);
 }

 // Calculate duration for each job
 const jobsWithDuration: CareerTimelineJob[] = (jobs || []).map((job) => {
 const startDate = new Date(job.start_date);
 const endDate = job.end_date ? new Date(job.end_date) : new Date;
 const durationMonths = (endDate.getTime - startDate.getTime) / (1000 * 60 * 60 * 24 * 30.44);

 return {
 ...job,
 duration_months: Math.round(durationMonths),
 bullets: job.bullets || [],
 };
 });

 return {
 jobs: jobsWithDuration,
 durationByRole: (durationByRole || []) as DurationByRole[],
 };
}

export default async function CareerPage {
 const { jobs, durationByRole } = await getCareerData;

 // Calculate total years
 const totalMonths = durationByRole.reduce((sum, r) => sum + Number(r.total_months), 0);
 const totalYears = Math.round(totalMonths / 12);

 return (
 <PageLayout width="wide">
 {/* Back link */}
 <Link
 href="/"
 className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline mb-8"
 >
 <ArrowLeft className="w-4 h-4" />
 Back to home
 </Link>

 <PageHeader
 title="Career Timeline"
 subtitle={`${totalYears}+ years building products across enterprise platforms, streaming media, and e-commerce.`}
 />

 <div className="divider" />

 {/* Career Dashboard */}
 <section className="mb-12">
 <h2 className="mb-6">Overview</h2>
 <CareerDashboard jobs={jobs} durationByRole={durationByRole} />
 </section>

 <div className="divider" />

 {/* Timeline */}
 <section>
 <h2 className="mb-8">Timeline</h2>
 <CareerTimeline jobs={jobs} />
 </section>
 </PageLayout>
 );
}
