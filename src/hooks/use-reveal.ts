import { useEffect, useRef } from "react";

/**
 * Fades an element in the first time it scrolls into view, by flipping
 * `data-reveal` from "pending" to "shown".
 *
 * The hidden styling lives in index.css behind `[data-reveal="pending"]`, so
 * nothing is hidden unless this hook has actually run — a script that never
 * loads, or an element that is never observed, just renders normally.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (typeof IntersectionObserver === "undefined") return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					(entry.target as HTMLElement).dataset.reveal = "shown";
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
		);

		el.dataset.reveal = "pending";
		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	return ref;
}
