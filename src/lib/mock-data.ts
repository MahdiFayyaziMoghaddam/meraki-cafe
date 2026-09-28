export const categories = [
	{ id: "hot", slug: "hot", name_fa: "نوشیدنی‌های گرم", name_en: "Hot Drinks", icon: "Flame" },
	{ id: "cold", slug: "cold", name_fa: "نوشیدنی‌های سرد", name_en: "Cold Drinks", icon: "Snowflake" },
	{ id: "cake", slug: "cake", name_fa: "کیک و دسر", name_en: "Cakes & Desserts", icon: "CakeSlice" },
	{ id: "breakfast", slug: "breakfast", name_fa: "صبحانه", name_en: "Breakfast", icon: "EggFried" }
];

const img = {
	coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=70",
	pour: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=70",
	latte: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=70",
	iced: "https://images.unsplash.com/photo-1461023058943-2fc11be300a1?auto=format&fit=crop&w=800&q=70",
	croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=70",
	cake: "https://images.unsplash.com/photo-1578779126832-e2989bb0c1ca?auto=format&fit=crop&w=800&q=70",
	sandwich: "https://images.unsplash.com/photo-1526080678457-5283e533876b?auto=format&fit=crop&w=800&q=70",
	breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a886ce?auto=format&fit=crop&w=800&q=70"
};

export const menuItems = [
	{
		id: "m1",
		name_fa: "اسپرسو",
		name_en: "Espresso",
		desc_fa: "شاتِ غلیظ با کرمای طلایی",
		desc_en: "Intense shot with golden crema",
		price: 65000,
		category: "hot",
		image: img.coffee,
		available: true,
		isNew: false,
		isBestSeller: true
	},
	{
		id: "m2",
		name_fa: "کاپوچینو",
		name_en: "Cappuccino",
		desc_fa: "اسپرسو با شیر بخارپز و فوم مخملی",
		desc_en: "Espresso with steamed milk and velvety foam",
		price: 95000,
		category: "hot",
		image: img.latte,
		available: true,
		isNew: false,
		isBestSeller: true
	},
	{
		id: "m3",
		name_fa: "موکا",
		name_en: "Caffè Mocha",
		desc_fa: "ترکیب اسپرسو، شکلات و شیر",
		desc_en: "Espresso, chocolate and milk",
		price: 110000,
		category: "hot",
		image: img.pour,
		available: true,
		isNew: true,
		isBestSeller: false
	},
	{
		id: "m4",
		name_fa: "آیس لاته",
		name_en: "Iced Latte",
		desc_fa: "لاته سرد روی یخ",
		desc_en: "Chilled latte over ice",
		price: 105000,
		category: "cold",
		image: img.iced,
		available: true,
		isNew: true,
		isBestSeller: true
	},
	{
		id: "m5",
		name_fa: "کلد برو",
		name_en: "Cold Brew",
		desc_fa: "دم‌سرد ۱۸ ساعته، نرم و شیرین",
		desc_en: "18-hour cold brew, smooth and sweet",
		price: 120000,
		category: "cold",
		image: img.iced,
		available: true,
		isNew: false,
		isBestSeller: false
	},
	{
		id: "m6",
		name_fa: "چیز‌کیک",
		name_en: "Cheesecake",
		desc_fa: "چیز‌کیک نیویورکی با سس توت‌فرنگی",
		desc_en: "New York cheesecake with strawberry coulis",
		price: 145000,
		category: "cake",
		image: img.cake,
		available: true,
		isNew: false,
		isBestSeller: true
	},
	{
		id: "m7",
		name_fa: "کروسان شکلاتی",
		name_en: "Chocolate Croissant",
		desc_fa: "کروسان کره‌ای با شکلات تلخ",
		desc_en: "Buttery croissant with dark chocolate",
		price: 85000,
		category: "breakfast",
		image: img.croissant,
		available: true,
		isNew: true,
		isBestSeller: false
	},
	{
		id: "m8",
		name_fa: "صبحانه کامل",
		name_en: "Full Breakfast",
		desc_fa: "تخم، نان، پنیر و سبزی",
		desc_en: "Eggs, bread, cheese and greens",
		price: 180000,
		category: "breakfast",
		image: img.breakfast,
		available: false,
		isNew: false,
		isBestSeller: false
	}
];

export const tables = [
	{ id: "t1", number: 1, status: "empty" },
	{ id: "t2", number: 2, status: "occupied" },
	{ id: "t3", number: 3, status: "empty" },
	{ id: "t4", number: 4, status: "occupied" },
	{ id: "t5", number: 5, status: "empty" },
	{ id: "t6", number: 6, status: "empty" },
	{ id: "t7", number: 7, status: "occupied" },
	{ id: "t8", number: 8, status: "empty" },
	{ id: "t9", number: 9, status: "occupied" },
	{ id: "t10", number: 10, status: "empty" }
];

const waiters = ["سارا", "رضا", "مهدی"] as const;
const orderStatuses = ["open", "inProgress", "paid", "closed"] as const;

export const orders = Array.from({ length: 15 }, (_, i) => {
	const items = Array.from({ length: 1 + (i % 3) }, (_, j) => {
		const m = menuItems[(i + j) % menuItems.length];
		const qty = 1 + ((i + j) % 2);
		return { id: m.id, name_fa: m.name_fa, name_en: m.name_en, price: m.price, qty };
	});
	const total = items.reduce((s, it) => s + it.price * it.qty, 0);
	const d = new Date();
	d.setHours(d.getHours() - i * 2);
	return {
		id: 1043 - i,
		table: (i % 10) + 1,
		items,
		total,
		status: orderStatuses[i % orderStatuses.length],
		time: d.toISOString(),
		waiter: waiters[i % waiters.length]
	};
});

export const expenses = [
	{
		id: "e1",
		title_fa: "خرید دانه قهوه",
		title_en: "Coffee beans",
		amount: 4200000,
		category: "مواد اولیه",
		date: "2026-09-25",
		note_fa: "۲۰ کیلو عربیکا"
	},
	{
		id: "e2",
		title_fa: "حقوق گارسن‌ها",
		title_en: "Staff salaries",
		amount: 18500000,
		category: "حقوق",
		date: "2026-09-24",
		note_fa: "سه نفر"
	},
	{
		id: "e3",
		title_fa: "قبض برق",
		title_en: "Electricity",
		amount: 980000,
		category: "قبوض",
		date: "2026-09-20",
		note_fa: ""
	},
	{
		id: "e4",
		title_fa: "نگهداری دستگاه",
		title_en: "Machine service",
		amount: 750000,
		category: "تعمیرات",
		date: "2026-09-18",
		note_fa: "سرویس اسپرسوساز"
	},
	{
		id: "e5",
		title_fa: "بسته‌بندی",
		title_en: "Packaging",
		amount: 640000,
		category: "مواد اولیه",
		date: "2026-09-15",
		note_fa: "لیوان و درب"
	},
	{
		id: "e6",
		title_fa: "اینترنت",
		title_en: "Internet",
		amount: 320000,
		category: "قبوض",
		date: "2026-09-10",
		note_fa: ""
	},
	{
		id: "e7",
		title_fa: "تبلیغات اینستاگرام",
		title_en: "Instagram ads",
		amount: 1500000,
		category: "بازاریابی",
		date: "2026-09-08",
		note_fa: "پست تبلیغاتی"
	},
	{
		id: "e8",
		title_fa: "شیر تازه",
		title_en: "Fresh milk",
		amount: 560000,
		category: "مواد اولیه",
		date: "2026-09-05",
		note_fa: "هفتگی"
	}
];

export const users = [
	{
		id: "u1",
		username: "admin",
		fullName_fa: "نگار محمدی",
		fullName_en: "Negar Mohammadi",
		role: "admin",
		active: true
	},
	{ id: "u2", username: "sara", fullName_fa: "سارا احمدی", fullName_en: "Sara Ahmadi", role: "waiter", active: true },
	{ id: "u3", username: "reza", fullName_fa: "رضا کریمی", fullName_en: "Reza Karimi", role: "waiter", active: true },
	{
		id: "u4",
		username: "mehdi",
		fullName_fa: "مهدی رستگار",
		fullName_en: "Mehdi Rastegar",
		role: "waiter",
		active: false
	},
	{
		id: "u5",
		username: "manager",
		fullName_fa: "پویا شریعتی",
		fullName_en: "Pouya Shariati",
		role: "admin",
		active: true
	}
];

export const revenue30 = Array.from({ length: 30 }, (_, i) => {
	const d = new Date();
	d.setDate(d.getDate() - (29 - i));
	const base = 2400000 + Math.round(Math.sin(i / 3) * 600000) + i * 25000;
	const exp = Math.round(base * (0.42 + Math.cos(i / 5) * 0.06));
	return { date: d.toISOString().slice(0, 10), revenue: base, expenses: exp };
});

export const revenue12 = Array.from({ length: 12 }, (_, i) => ({
	week: `W${i + 1}`,
	revenue: 18000000 + Math.round(Math.sin(i / 2) * 4000000) + i * 600000
}));

export const categoryShare = [
	{ name: "Hot", value: 42, color: "hsl(var(--coffee-500))" },
	{ name: "Cold", value: 28, color: "hsl(var(--cream-300))" },
	{ name: "Cake", value: 20, color: "hsl(var(--success))" },
	{ name: "Breakfast", value: 10, color: "hsl(var(--warning))" }
];

export type Category = (typeof categories)[number];
export type MenuItem = (typeof menuItems)[number];
export type CafeTable = (typeof tables)[number];
export type TableStatus = CafeTable["status"];
export type OrderLine = (typeof orders)[number]["items"][number];
export type Order = (typeof orders)[number];
export type OrderStatus = Order["status"];
export type Expense = (typeof expenses)[number];
export type User = (typeof users)[number];
export type UserRole = User["role"];
