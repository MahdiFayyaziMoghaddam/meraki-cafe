import React from "react";
import { Flame, Snowflake, CakeSlice, EggFried } from "lucide-react";

const map = { hot: Flame, cold: Snowflake, cake: CakeSlice, breakfast: EggFried };

export default function CategoryIcon({ slug, size = 20, className }) {
	const Icon = map[slug] || Flame;
	return <Icon size={size} strokeWidth={1.5} className={className} />;
}
