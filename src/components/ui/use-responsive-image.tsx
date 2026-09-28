import * as React from "react";
import { useSize } from "../../hooks/use-size";
import { cn } from "../../lib/utils";
import { DEFAULT_TRANSFORM_WIDTH, getImagePreviewClassName } from "./image-helpers";
import type { FocalPoint, ParsedWixMediaUrl } from "./image-helpers";

type FittingType = "fill" | "fit";

type UseResponsiveImageOptions = {
	parsed: ParsedWixMediaUrl;
	fittingType: FittingType;
	focalPoint?: FocalPoint;
	quality?: number;
	className?: string;
	onLoad?: React.ReactEventHandler<HTMLImageElement>;
	onSourceChange: (src: string, className?: string) => void;
};

type TransformRequest = {
	width: number;
	height: number | undefined;
	crop: boolean;
	focalPoint: FocalPoint | undefined;
	quality: number | undefined;
};

export function useResponsiveImage(
	{ parsed, fittingType, focalPoint, quality, className, onLoad, onSourceChange }: UseResponsiveImageOptions,
	parentRef: React.ForwardedRef<HTMLImageElement | null>
) {
	const wrapperRef = React.useRef<HTMLSpanElement>(null);
	const imgRef = React.useRef<HTMLImageElement>(null);
	const size = useSize(wrapperRef);
	const [loaded, setLoaded] = React.useState(false);

	// ponytail: the <img> mounts only after useSize measures, so on the first commit this handle
	// is still null; the forwarded ref is typed as the element it points at once rendered.
	React.useImperativeHandle(parentRef, () => imgRef.current as HTMLImageElement);
	React.useEffect(() => setLoaded(false), [parsed.baseUrl]);
	React.useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;
		const replace = (event: Event) =>
			onSourceChange(
				(event as CustomEvent<{ src: string }>).detail.src,
				getImagePreviewClassName(className, wrapper.className, cn("inline-block relative", className))
			);
		wrapper.addEventListener("base44:image-replace", replace);
		return () => wrapper.removeEventListener("base44:image-replace", replace);
	}, [className, onSourceChange]);

	const crop = fittingType !== "fit";
	// Wait for useSize's pre-paint measurement before requesting a transform.
	const options: TransformRequest | null = size && {
		width: size.width || DEFAULT_TRANSFORM_WIDTH,
		height: size.height || undefined,
		crop,
		focalPoint: crop ? focalPoint : undefined,
		quality
	};

	return {
		wrapperRef,
		imgRef,
		loaded,
		options,
		handleLoad: (event: React.SyntheticEvent<HTMLImageElement>) => {
			setLoaded(true);
			onLoad?.(event);
		}
	};
}
