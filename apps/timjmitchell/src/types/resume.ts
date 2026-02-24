// Resume Schema Types
// Based on ADR-0001-resume-schema-design.md

export interface Company {
 id: string;
 name: string;
 logo_url: string | null;
 website: string | null;
}

export interface ResumeJob {
 id: string;
 company_id: string;
 title: string;
 start_date: string;
 end_date: string | null;
 seniority_level: string | null;
 level_equivalent: string | null;
 is_manager: boolean;
 direct_reports: number;
 indirect_reports: number;
 summary: string | null;
 employment_type: string | null;
 customer_type: 'b2b' | 'b2c' | null;
 metadata: Record<string, unknown>;
 // Joined data
 company?: Company;
 bullets?: ResumeJobBullet[];
 roles?: ResumeJobRoleWithDetails[];
 skills?: ResumeJobSkillWithDetails[];
 platforms?: ResumeJobPlatformWithDetails[];
 industries?: ResumeJobIndustryWithDetails[];
 product_domains?: ResumeJobProductDomainWithDetails[];
}

export interface ResumeJobBullet {
 id: string;
 job_id: string;
 text: string;
 format: 'CAR' | 'STAR' | 'PAR' | 'XYZ' | 'APR' | 'simple' | null;
 category: 'achievement' | 'responsibility' | 'skill' | 'leadership' | 'technical' | 'strategic' | 'cross_functional' | null;
 metrics: Array<{
 type: string;
 value: number | string;
 context: string;
 }>;
 display_order: number;
 is_highlight: boolean;
 composition_tags: string[];
}

export interface ResumeRole {
 id: string;
 name: string;
 category: string | null;
 description: string | null;
}

export interface ResumeJobRoleWithDetails {
 job_id: string;
 role_id: string;
 percentage: number;
 role?: ResumeRole;
}

export interface ResumeSkill {
 id: string;
 name: string;
 skill_type: 'cognitive' | 'technical' | 'social' | 'resource_mgmt' | 'domain' | null;
 parent_id: string | null;
 aliases: string[];
}

export interface ResumeJobSkillWithDetails {
 job_id: string;
 skill_id: string;
 proficiency: 'novice' | 'intermediate' | 'advanced' | 'expert' | null;
 skill?: ResumeSkill;
}

export interface ResumePlatform {
 id: string;
 name: string;
 platform_type: string | null;
}

export interface ResumeJobPlatformWithDetails {
 job_id: string;
 platform_id: string;
 platform?: ResumePlatform;
}

export interface ResumeIndustry {
 id: string;
 name: string;
 level: number;
 parent_id: string | null;
}

export interface ResumeJobIndustryWithDetails {
 job_id: string;
 industry_id: string;
 industry?: ResumeIndustry;
}

export interface ResumeProductDomain {
 id: string;
 name: string;
 description: string | null;
}

export interface ResumeJobProductDomainWithDetails {
 job_id: string;
 product_domain_id: string;
 product_domain?: ResumeProductDomain;
}

// Computed views
export interface DurationByRole {
 role_id: string;
 role_name: string;
 total_months: number;
}

export interface CompanyTenure {
 company_id: string;
 company_name: string;
 first_start: string;
 last_end: string;
 tenure_months: number;
 job_count: number;
}

// Timeline display type
export interface CareerTimelineJob extends ResumeJob {
 company: Company;
 bullets: ResumeJobBullet[];
 duration_months: number;
}
