'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { PositionWithDetails } from '@/types/career';
import { cn } from '@/lib/utils';

interface PositionCardProps {
  position: PositionWithDetails;
  isFirst?: boolean;
  isLast?: boolean;
}

export function PositionCard({ position, isFirst, isLast }: PositionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const startDate = new Date(position.start_date);
  const endDate = position.end_date ? new Date(position.end_date) : null;

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const dateRange = endDate
    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
    : `${formatDate(startDate)} - Present`;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className="relative pl-12 md:pl-20"
      role="listitem"
      aria-label={`${position.title} at ${position.company.name}`}
    >
      {/* Timeline dot */}
      <div
        className={cn(
          'absolute left-2 md:left-6 w-4 h-4 rounded-full bg-background border-2 border-foreground',
          isFirst && 'ring-2 ring-primary ring-offset-2'
        )}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={cn(
          'border rounded-lg p-4 md:p-6 cursor-pointer transition-all',
          'hover:border-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          isExpanded && 'border-foreground/50'
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`position-details-${position.id}`}
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Company logo */}
          {position.company.logo_url && (
            <div className="hidden sm:block flex-shrink-0 w-12 h-12 relative">
              <Image
                src={position.company.logo_url}
                alt={`${position.company.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1">
              <h2 className="font-semibold text-lg">{position.title}</h2>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {dateRange}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {position.company.name}
              </span>
              {position.location && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span>{position.location}</span>
                </>
              )}
            </div>

            {/* Highlights badges */}
            {position.highlights && position.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {position.highlights.map((highlight) => (
                  <span
                    key={highlight.id}
                    className="text-xs bg-muted px-2 py-1 rounded-full"
                  >
                    {highlight.metric_label}: {highlight.metric_value}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Expand indicator */}
          <div
            className={cn(
              'flex-shrink-0 transition-transform',
              isExpanded && 'rotate-180'
            )}
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Expandable content */}
        <div
          id={`position-details-${position.id}`}
          className={cn(
            'overflow-hidden transition-all duration-300',
            isExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          {position.bullets && position.bullets.length > 0 && (
            <ul className="space-y-2 pl-4 border-l-2 border-muted">
              {position.bullets.map((bullet) => (
                <li
                  key={bullet.id}
                  className="text-sm text-muted-foreground pl-4 relative"
                >
                  <span
                    className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                    aria-hidden="true"
                  />
                  {bullet.bullet_text}
                  {bullet.category && (
                    <span className="ml-2 text-xs text-muted-foreground/70">
                      [{bullet.category}]
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
