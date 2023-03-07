import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const AtSignIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<g
				xmlns="http://www.w3.org/2000/svg"
				id="surface1"
			>
				<path d="M 16 21.332031 C 18.945312 21.332031 21.332031 18.945312 21.332031 16 C 21.332031 13.054688 18.945312 10.667969 16 10.667969 C 13.054688 10.667969 10.667969 13.054688 10.667969 16 C 10.667969 18.945312 13.054688 21.332031 16 21.332031 Z M 16 21.332031 " />
				<path d="M 21.332031 10.667969 L 21.332031 17.332031 C 21.332031 18.394531 21.753906 19.410156 22.503906 20.160156 C 23.253906 20.910156 24.273438 21.332031 25.332031 21.332031 C 26.394531 21.332031 27.410156 20.910156 28.160156 20.160156 C 28.910156 19.410156 29.332031 18.394531 29.332031 17.332031 L 29.332031 16 C 29.332031 12.992188 28.316406 10.070312 26.445312 7.710938 C 24.574219 5.355469 21.960938 3.699219 19.03125 3.015625 C 16.097656 2.332031 13.023438 2.660156 10.304688 3.945312 C 7.582031 5.230469 5.375 7.398438 4.042969 10.097656 C 2.710938 12.796875 2.332031 15.867188 2.964844 18.808594 C 3.597656 21.75 5.210938 24.390625 7.535156 26.300781 C 9.859375 28.210938 12.761719 29.28125 15.769531 29.332031 C 18.78125 29.382812 21.71875 28.417969 24.105469 26.585938 " />
			</g>
		</svg>
	);
};
