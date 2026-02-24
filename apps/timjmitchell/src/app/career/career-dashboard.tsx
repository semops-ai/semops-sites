'use client';

import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 PieChart,
 Pie,
 Cell,
 Legend,
} from 'recharts';
import type { CareerTimelineJob, DurationByRole } from '@/types/resume';

interface CareerDashboardProps {
 jobs: CareerTimelineJob[];
 durationByRole: DurationByRole[];
}

// Color palette matching the site's forest green theme
const COLORS = {
 primary: 'hsl(152 32% 28%)',
 secondary: 'hsl(152 20% 45%)',
 tertiary: 'hsl(152 15% 60%)',
 quaternary: 'hsl(152 10% 75%)',
};

const PIE_COLORS = [
 'hsl(152 32% 28%)', // forest green
 'hsl(200 50% 45%)', // blue
 'hsl(280 40% 50%)', // purple
 'hsl(35 80% 55%)', // orange
 'hsl(340 50% 50%)', // pink
 'hsl(180 40% 45%)', // teal
];

function MetricCard({ label, value, subtitle }: { label: string; value: string | number; subtitle?: string }) {
 return (
 <div className="border rounded-lg p-4">
 <p className="text-sm text-muted-foreground">{label}</p>
 <p className="text-3xl font-bold mt-1">{value}</p>
 {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
 </div>
 );
}

export function CareerDashboard({ jobs, durationByRole }: CareerDashboardProps) {
 // Calculate summary metrics
 const totalMonths = durationByRole.reduce((sum, r) => sum + Number(r.total_months), 0);
 const totalYears = Math.round(totalMonths / 12);
 const uniqueCompanies = new Set(jobs.map(j => j.company_id)).size;

 // Extract all unique skills across jobs
 const allSkills = jobs.flatMap(j => j.skills || []);
 const uniqueSkills = new Set(allSkills.map(s => s.skill_id)).size;

 // Prepare role duration data for bar chart
 const roleData = durationByRole.map(r => ({
 name: r.role_name,
 years: Number((Number(r.total_months) / 12).toFixed(1)),
 months: Number(r.total_months),
 }));

 // Aggregate skills by type for pie chart
 const skillsByType = allSkills.reduce((acc, js) => {
 const type = js.skill?.skill_type || 'other';
 acc[type] = (acc[type] || 0) + 1;
 return acc;
 }, {} as Record<string, number>);

 const skillTypeData = Object.entries(skillsByType)
 .map(([name, value]) => ({
 name: formatSkillType(name),
 value,
 }))
 .sort((a, b) => b.value - a.value);

 // Aggregate industries
 const industriesByJob = jobs.flatMap(j => j.industries || []);
 const industryCount = industriesByJob.reduce((acc, ji) => {
 const name = ji.industry?.name || ji.industry_id;
 acc[name] = (acc[name] || 0) + 1;
 return acc;
 }, {} as Record<string, number>);

 const industryData = Object.entries(industryCount)
 .map(([name, value]) => ({ name, value }))
 .sort((a, b) => b.value - a.value)
 .slice(0, 6);

 return (
 <div className="space-y-8">
 {/* Summary Metrics */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <MetricCard label="Total Experience" value={`${totalYears}+`} subtitle="years" />
 <MetricCard label="Companies" value={uniqueCompanies} />
 <MetricCard label="Positions" value={jobs.length} />
 <MetricCard label="Skills" value={uniqueSkills} subtitle="unique" />
 </div>

 {/* Charts Row */}
 <div className="grid md:grid-cols-2 gap-8">
 {/* Duration by Role Bar Chart */}
 <div className="border rounded-lg p-4">
 <h3 className="text-sm font-medium mb-4">Experience by Role</h3>
 <div className="h-64">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={roleData} layout="vertical" margin={{ left: 0, right: 20 }}>
 <XAxis type="number" unit=" yrs" tick={{ fontSize: 12 }} />
 <YAxis
 type="category"
 dataKey="name"
 width={140}
 tick={{ fontSize: 12 }}
 />
 <Tooltip
 formatter={(value) => [`${value} years`, 'Duration']}
 contentStyle={{
 backgroundColor: 'hsl(var(--background))',
 border: '1px solid hsl(var(--border))',
 borderRadius: '6px',
 }}
 />
 <Bar
 dataKey="years"
 fill={COLORS.primary}
 radius={[0, 4, 4, 0]}
 />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>

 {/* Skills by Type Pie Chart */}
 <div className="border rounded-lg p-4">
 <h3 className="text-sm font-medium mb-4">Skills by Category</h3>
 <div className="h-64">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie
 data={skillTypeData}
 cx="50%"
 cy="50%"
 innerRadius={50}
 outerRadius={80}
 paddingAngle={2}
 dataKey="value"
 label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
 labelLine={false}
 >
 {skillTypeData.map((_, index) => (
 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
 ))}
 </Pie>
 <Tooltip
 contentStyle={{
 backgroundColor: 'hsl(var(--background))',
 border: '1px solid hsl(var(--border))',
 borderRadius: '6px',
 }}
 />
 </PieChart>
 </ResponsiveContainer>
 </div>
 </div>
 </div>

 {/* Industry Distribution */}
 {industryData.length > 0 && (
 <div className="border rounded-lg p-4">
 <h3 className="text-sm font-medium mb-4">Industry Experience</h3>
 <div className="h-48">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={industryData} margin={{ left: 0, right: 20, bottom: 40 }}>
 <XAxis
 dataKey="name"
 tick={{ fontSize: 11 }}
 angle={-30}
 textAnchor="end"
 height={60}
 />
 <YAxis tick={{ fontSize: 12 }} />
 <Tooltip
 formatter={(value) => [`${value} positions`, 'Count']}
 contentStyle={{
 backgroundColor: 'hsl(var(--background))',
 border: '1px solid hsl(var(--border))',
 borderRadius: '6px',
 }}
 />
 <Bar
 dataKey="value"
 fill={COLORS.secondary}
 radius={[4, 4, 0, 0]}
 />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>
 )}
 </div>
 );
}

function formatSkillType(type: string): string {
 const labels: Record<string, string> = {
 cognitive: 'Cognitive',
 technical: 'Technical',
 social: 'Social',
 resource_mgmt: 'Resource Mgmt',
 domain: 'Domain',
 other: 'Other',
 };
 return labels[type] || type;
}
