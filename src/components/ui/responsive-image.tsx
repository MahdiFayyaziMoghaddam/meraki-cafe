import * as React from "react";
import { cn } from "../../lib/utils";
import { buildSrcSet, buildTransformUrl, splitImageProps } from "./image-helpers";
import { useResponsiveImage } from "./use-responsive-image";
import type { FocalPoint, ParsedWixMediaUrl } from "./image-helpers";

type FittingType = "fill" | "fit";

export interface ResponsiveImageProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onLoad">,
		Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof React.HTMLAttributes<HTMLSpanElement>> {
	src: string;
	parsed: ParsedWixMediaUrl;
	fittingType: FittingType;
	quality?: number;
	aspectRatio?: string;
	focalPoint?: FocalPoint;
	onLoad?: React.ReactEventHandler<HTMLImageElement>;
	onSourceChange: (src: string, className?: string) => void;
}

export const ResponsiveImage = React.forwardRef<HTMLImageElement, ResponsiveImageProps>(
	({ src, parsed, fittingType, focalPoint, quality, className, style, aspectRatio, onLoad, onSourceChange, ...props }, ref) => {
		const { wrapperRef, imgRef, loaded, options, handleLoad } = useResponsiveImage(
			{ parsed, fittingType, focalPoint, quality, className, onLoad, onSourceChange },
			ref
		);
		const { wrapperProps, imageProps } = splitImageProps(props);

		return (
			<span
				ref={wrapperRef}
				className={cn("inline-block relative", className)}
				style={{ aspectRatio, ...style }}
				{...wrapperProps}
				data-base44-image=""
				data-base44-image-src={src}
			>
				{/* Contain both image layers inside the padded content box without adding an edit target. */}
				<span data-source-location={undefined} className="block relative w-full h-full overflow-hidden">
					{options && !loaded && (
						<img
							data-source-location={undefined}
							src={buildTransformUrl(parsed, {
								...options,
								width: 20,
								height: options.height ? Math.max(1, Math.round((20 * options.height) / options.width)) : undefined,
								quality: 20
							})}
							alt=""
							aria-hidden="true"
							className="w-full h-full inset-0 absolute"
							style={{
								objectFit: fittingType === "fit" ? "contain" : "cover",
								filter: "blur(10px)",
								transform: "scale(1.1)"
							}}
						/>
					)}
					{options && (
						<img
							data-source-location={undefined}
							ref={imgRef}
							src={buildTransformUrl(parsed, options)}
							srcSet={buildSrcSet(parsed, options)}
							loading="lazy"
							className={cn(
								"w-full h-full inset-0 absolute",
								fittingType === "fit" ? "object-contain" : "object-cover"
							)}
							onLoad={handleLoad}
							{...imageProps}
						/>
					)}
				</span>
			</span>
		);
	}
);
ResponsiveImage.displayName = "ResponsiveImage";
