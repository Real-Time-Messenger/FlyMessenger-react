import { ClassNameProps } from "interfaces/components/ClassNameProps";
import { FC } from "react";

export const LogoIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 28.751221 3.75 C 27.553711 4.595947 26.228027 5.240479 24.825439 5.661621 C 24.071045 4.797363 23.071289 4.182129 21.958008 3.903809 C 20.844727 3.625488 19.672852 3.695068 18.603516 4.105225 C 17.530518 4.515381 16.611328 5.244141 15.966797 6.192627 C 15.322266 7.141113 14.985352 8.265381 15 9.411621 L 15 10.664062 C 12.802734 10.718994 10.627441 10.231934 8.664551 9.243164 C 6.70166 8.258057 5.013428 6.796875 3.75 4.998779 C 3.75 4.998779 -1.248779 16.248779 10.001221 21.251221 C 7.426758 22.998047 4.35791 23.873291 1.248779 23.748779 C 12.498779 30 26.25 23.748779 26.25 9.375 C 26.25 9.0271 26.217041 8.679199 26.151123 8.338623 C 27.425537 7.078857 28.326416 5.489502 28.751221 3.75 Z M 28.751221 3.75 "
					transform="matrix(1.066667,0,0,1.066667,0,0)"
				/>
			</g>
		</svg>
	);
};
