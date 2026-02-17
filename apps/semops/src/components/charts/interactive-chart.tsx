'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import type { Data, Layout, Config } from 'plotly.js';

// Plotly must be loaded client-side (no SSR)
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center text-muted-foreground">Loading chart...</div>
});

export interface ChartData {
  [key: string]: string | number | Date;
}

export interface DimensionOption {
  value: string;
  label: string;
}

export interface InteractiveChartProps {
  /** Raw data array */
  data: ChartData[];
  /** Field to use for x-axis */
  xField: string;
  /** Available y-axis dimensions user can switch between */
  yDimensions: DimensionOption[];
  /** Default y dimension */
  defaultYDimension?: string;
  /** Chart title */
  title?: string;
  /** Chart type */
  chartType?: 'scatter' | 'bar' | 'line';
  /** Chart height in pixels */
  height?: number;
  /** Additional Plotly layout options */
  layoutOverrides?: Partial<Layout>;
}

/**
 * Interactive chart component with dimension switching.
 *
 * Usage in MDX:
 * ```mdx
 * import { InteractiveChart } from '@/components/charts/interactive-chart';
 *
 * <InteractiveChart
 *   data={myData}
 *   xField="date"
 *   yDimensions={[
 *     { value: 'revenue', label: 'Revenue ($)' },
 *     { value: 'users', label: 'Active Users' },
 *   ]}
 *   title="Growth Metrics"
 * />
 * ```
 */
export function InteractiveChart({
  data,
  xField,
  yDimensions,
  defaultYDimension,
  title,
  chartType = 'scatter',
  height = 400,
  layoutOverrides = {},
}: InteractiveChartProps) {
  const [yDimension, setYDimension] = useState(
    defaultYDimension || yDimensions[0]?.value
  );

  const currentDimensionLabel = yDimensions.find(d => d.value === yDimension)?.label || yDimension;

  const plotData: Data[] = useMemo(() => [{
    x: data.map(d => d[xField]),
    y: data.map(d => d[yDimension]),
    type: chartType === 'line' ? 'scatter' : chartType,
    mode: chartType === 'scatter' || chartType === 'line' ? 'lines+markers' : undefined,
    marker: { color: 'hsl(var(--primary))' },
    line: { color: 'hsl(var(--primary))' },
  }], [data, xField, yDimension, chartType]);

  const layout: Partial<Layout> = useMemo(() => ({
    title: title ? { text: title, font: { size: 16 } } : undefined,
    xaxis: { title: { text: xField } },
    yaxis: { title: { text: currentDimensionLabel } },
    autosize: true,
    margin: { l: 60, r: 30, t: title ? 50 : 30, b: 50 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { family: 'inherit' },
    ...layoutOverrides,
  }), [title, xField, currentDimensionLabel, layoutOverrides]);

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    displaylogo: false,
  };

  return (
    <div className="w-full">
      {yDimensions.length > 1 && (
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="dimension-select" className="text-sm font-medium">
            Metric:
          </label>
          <select
            id="dimension-select"
            value={yDimension}
            onChange={(e) => setYDimension(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            {yDimensions.map((dim) => (
              <option key={dim.value} value={dim.value}>
                {dim.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ height }}>
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
      </div>
    </div>
  );
}
