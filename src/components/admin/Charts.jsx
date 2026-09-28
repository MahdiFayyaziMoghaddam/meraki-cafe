import React from "react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
	Legend
} from "recharts";

const axisStyle = { fill: "hsl(var(--cream-300))", fontSize: 12 };
const gridProps = { stroke: "rgba(227,212,188,0.06)", vertical: false };

function ChartTooltip({ active, payload, label, formatter }) {
	if (!active || !payload?.length) return null;
	return (
		<div className="rounded-lg border border-bark-700 bg-bark-800 px-3 py-2 text-sm text-cream-100 shadow-md">
			<p className="text-cream-300 mb-1">{label}</p>
			{payload.map((p, i) => (
				<p key={i} className="tabular-nums" style={{ color: p.color || p.fill }}>
					{p.name}: {formatter ? formatter(p.value) : p.value.toLocaleString("en-US")}
				</p>
			))}
		</div>
	);
}

export function RevenueLine({ data }) {
	return (
		<ResponsiveContainer width="100%" height={260}>
			<LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
				<CartesianGrid {...gridProps} />
				<XAxis dataKey="date" tick={axisStyle} tickLine={false} axisLine={false} minTickGap={40} />
				<YAxis
					tick={axisStyle}
					tickLine={false}
					axisLine={false}
					width={48}
					tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
				/>
				<Tooltip content={<ChartTooltip formatter={(v) => v.toLocaleString("en-US")} />} />
				<Line
					type="monotone"
					dataKey="revenue"
					name="Revenue"
					stroke="hsl(var(--coffee-500))"
					strokeWidth={2}
					dot={false}
				/>
				<Line
					type="monotone"
					dataKey="expenses"
					name="Expenses"
					stroke="hsl(var(--cream-300))"
					strokeWidth={1.5}
					strokeDasharray="4 4"
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

export function WeeklyBars({ data }) {
	return (
		<ResponsiveContainer width="100%" height={260}>
			<BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
				<CartesianGrid {...gridProps} />
				<XAxis dataKey="week" tick={axisStyle} tickLine={false} axisLine={false} />
				<YAxis
					tick={axisStyle}
					tickLine={false}
					axisLine={false}
					width={48}
					tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
				/>
				<Tooltip content={<ChartTooltip formatter={(v) => v.toLocaleString("en-US")} />} />
				<Bar dataKey="revenue" name="Revenue" fill="hsl(var(--coffee-500))" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}

export function CategoryDonut({ data }) {
	return (
		<ResponsiveContainer width="100%" height={260}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					innerRadius={55}
					outerRadius={85}
					paddingAngle={3}
					stroke="none"
				>
					{data.map((entry, i) => (
						<Cell key={i} fill={entry.color} />
					))}
				</Pie>
				<Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
				<Legend wrapperStyle={{ fontSize: 12, color: "hsl(var(--cream-300))" }} />
			</PieChart>
		</ResponsiveContainer>
	);
}

export function ProfitArea({ data }) {
	return (
		<ResponsiveContainer width="100%" height={260}>
			<AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
				<defs>
					<linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="hsl(var(--coffee-500))" stopOpacity={0.4} />
						<stop offset="100%" stopColor="hsl(var(--coffee-500))" stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid {...gridProps} />
				<XAxis dataKey="date" tick={axisStyle} tickLine={false} axisLine={false} minTickGap={40} />
				<YAxis
					tick={axisStyle}
					tickLine={false}
					axisLine={false}
					width={48}
					tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
				/>
				<Tooltip content={<ChartTooltip formatter={(v) => v.toLocaleString("en-US")} />} />
				<Area
					type="monotone"
					dataKey="revenue"
					name="Net"
					stroke="hsl(var(--coffee-500))"
					strokeWidth={2}
					fill="url(#profitFill)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
