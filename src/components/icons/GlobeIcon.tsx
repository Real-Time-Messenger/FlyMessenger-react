import { ClassNameProps } from "../../interfaces/components/ClassNameProps";
import { FC } from "react";

export const GlobeIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
			<path d="M 16 29.332031 C 23.363281 29.332031 29.332031 23.363281 29.332031 16 C 29.332031 8.636719 23.363281 2.667969 16 2.667969 C 8.636719 2.667969 2.667969 8.636719 2.667969 16 C 2.667969 23.363281 8.636719 29.332031 16 29.332031 Z M 16 29.332031 " />
			<path d="M 2.667969 16 L 29.332031 16 " />
			<path d="M 16 2.667969 C 19.335938 6.316406 21.230469 11.054688 21.332031 16 C 21.230469 20.945312 19.335938 25.683594 16 29.332031 C 12.664062 25.683594 10.769531 20.945312 10.667969 16 C 10.769531 11.054688 12.664062 6.316406 16 2.667969 Z M 16 2.667969 " />
		</svg>
	);
};
