import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
	({ className, containerClassName, ...props }, ref) => (
		<OTPInput
			ref={ref}
			containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
			className={cn("focus-ring disabled:cursor-not-allowed", className)}
			{...props}
		/>
	)
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & { index: number }>(
	({ index, className, ...props }, ref) => {
		const inputOTPContext = React.useContext(OTPInputContext);
		const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

		return (
			<div
				ref={ref}
				className={cn(
					// border-s/e + rounded-s/e rather than border-l/r: the slots sit in a row, so in
					// RTL the group grows right-to-left and the outer corners must follow.
					"relative flex h-9 w-9 items-center justify-center border-y border-e border-input text-sm shadow-sm transition-[color,background-color,border-color,outline-color] duration-150 first:rounded-s-md first:border-s last:rounded-e-md",
					isActive && "z-10 border-coffee-500 outline outline-2 -outline-offset-2 outline-coffee-500",
					className
				)}
				{...props}
			>
				{char}
				{hasFakeCaret && (
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
						<div className="h-4 w-px animate-caret-blink bg-foreground duration-1000 motion-reduce:animate-none" />
					</div>
				)}
			</div>
		);
	}
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ ...props }, ref) => (
		<div ref={ref} role="separator" {...props}>
			<Minus />
		</div>
	)
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
