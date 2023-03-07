import {FC} from "react";
import {ClassNameProps} from "../../interfaces/ClassNameProps";

export const WebAppIcon: FC<ClassNameProps> = ({className}: ClassNameProps) => {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            stroke="none"
        >
            <g xmlns="http://www.w3.org/2000/svg" id="surface1">
                <path
                      d="M 20.25 2.109375 C 9.269531 2.109375 3.953125 16.546875 10.734375 25.019531 C 13.089844 27.949219 16.449219 29.898438 20.25 29.898438 C 22.59375 29.898438 24.785156 29.179688 26.664062 27.933594 C 23.835938 30.464844 20.089844 32 16 32 C 15.746094 32 15.484375 32 15.230469 31.980469 C 6.746094 31.585938 0 24.585938 0 16 C 0 7.160156 7.160156 0 16 0 L 16.050781 0 C 20.121094 0.0195312 23.835938 1.554688 26.65625 4.070312 C 24.785156 2.820312 22.585938 2.109375 20.25 2.109375 Z M 26.816406 27.769531 C 24.179688 29.359375 20.964844 29.289062 18.300781 27.394531 C 21.929688 26.070312 24.605469 21.484375 24.605469 16 C 24.605469 10.535156 21.945312 5.949219 18.320312 4.605469 C 21.019531 2.722656 24.207031 2.652344 26.894531 4.285156 C 33.726562 10.652344 33.703125 21.425781 26.816406 27.769531 Z M 26.816406 27.769531 "/>
            </g>
        </svg>
    );
};
