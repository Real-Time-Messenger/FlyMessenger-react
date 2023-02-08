import { ClassNameProps } from "interfaces/components/ClassNameProps";
import path from "path";
import { FC } from "react";

export const MoonIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
				<path
					d="M 2.030273 12.418945 C 2.390625 17.569336 6.758789 21.758789 11.991211 21.990234 C 15.679688 22.151367 18.981445 20.428711 20.958984 17.71875 C 21.779297 16.611328 21.339844 15.870117 19.96875 16.119141 C 19.300781 16.239258 18.609375 16.289062 17.888672 16.259766 C 12.999023 16.060547 9 11.970703 8.979492 7.139648 C 8.970703 5.838867 9.240234 4.611328 9.729492 3.489258 C 10.271484 2.25 9.621094 1.661133 8.370117 2.191406 C 4.40918 3.861328 1.699219 7.848633 2.030273 12.418945 Z M 2.030273 12.418945 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
			</g>
		</svg>
	);
};
