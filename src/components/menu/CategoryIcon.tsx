import { Flame, Snowflake, CakeSlice, EggFried, type LucideIcon } from "lucide-react";

const map = { hot: Flame, cold: Snowflake, cake: CakeSlice, breakfast: EggFried };

export type CategorySlug = keyof typeof map;

type CategoryIconProps = {
	slug: CategorySlug | string;
	size?: number;
	className?: string;
};

export default function CategoryIcon({ slug, size = 20, className }: CategoryIconProps) {
	const Icon: LucideIcon = (map as Record<string, LucideIcon>)[slug] ?? Flame;
	return <Icon size={size} strokeWidth={1.5} className={className} />;
}
