import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const ProfileCircleIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
				<path d="M 16.160156 17.039062 C 16.054688 17.027344 15.945312 17.027344 15.839844 17.039062 C 14.710938 17 13.636719 16.527344 12.851562 15.710938 C 12.066406 14.898438 11.625 13.8125 11.625 12.679688 C 11.625 10.265625 13.574219 8.308594 16 8.308594 C 17.144531 8.304688 18.246094 8.753906 19.066406 9.554688 C 19.882812 10.355469 20.355469 11.449219 20.375 12.59375 C 20.394531 13.742188 19.964844 14.847656 19.175781 15.679688 C 18.390625 16.511719 17.304688 17 16.160156 17.039062 Z M 24.988281 25.839844 C 22.535156 28.09375 19.328125 29.339844 16 29.332031 C 12.535156 29.332031 9.386719 28.011719 7.011719 25.839844 C 7.148438 24.585938 7.945312 23.359375 9.375 22.398438 C 13.027344 19.972656 19 19.972656 22.625 22.398438 C 24.054688 23.359375 24.851562 24.585938 24.988281 25.839844 Z M 24.988281 25.839844 " />
				<path d="M 16 29.332031 C 23.363281 29.332031 29.332031 23.363281 29.332031 16 C 29.332031 8.636719 23.363281 2.667969 16 2.667969 C 8.636719 2.667969 2.667969 8.636719 2.667969 16 C 2.667969 23.363281 8.636719 29.332031 16 29.332031 Z M 16 29.332031 " />
			</g>
		</svg>
	);
};
