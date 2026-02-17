'use client';

import dynamic from 'next/dynamic';
import type { Data, Layout, Config } from 'plotly.js';

// Plotly must be loaded client-side (no SSR)
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center text-muted-foreground">Loading chart...</div>
});

export interface PlotlyChartProps {
  /** Plotly data array - can be exported directly from Python */
  data: Data[];
  /** Plotly layout object - can be exported directly from Python */
  layout?: Partial<Layout>;
  /** Plotly config object */
  config?: Partial<Config>;
  /** Chart height in pixels */
  height?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * Direct Plotly chart component for rendering Python-exported figures.
 *
 * Export from Python:
 * ```python
 * import plotly.express as px
 * import json
 *
 * fig = px.line(df, x='date', y='value')
 * with open('chart-data.json', 'w') as f:
 *     json.dump({'data': fig.data, 'layout': fig.layout}, f)
 * ```
 *
 * Usage in MDX:
 * ```mdx
 * import { PlotlyChart } from '@/components/charts/plotly-chart';
 * import chartSpec from '@/data/chart-data.json';
 *
 * <PlotlyChart data={chartSpec.data} layout={chartSpec.layout} />
 * ```
 */
export function PlotlyChart({
  data,
  layout = {},
  config = {},
  height = 400,
  className = '',
}: PlotlyChartProps) {
  const defaultLayout: Partial<Layout> = {
    autosize: true,
    margin: { l: 60, r: 30, t: 50, b: 50 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { family: 'inherit' },
    ...layout,
  };

  const defaultConfig: Partial<Config> = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    displaylogo: false,
    ...config,
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Plot
        data={data}
        layout={defaultLayout}
        config={defaultConfig}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler
      />
    </div>
  );
}
