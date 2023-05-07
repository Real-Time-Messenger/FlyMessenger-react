import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const BlockIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            stroke="none"
        >
            <g xmlns="http://www.w3.org/2000/svg">
                <path d="M 16 1.332031 C 7.164062 1.332031 1.332031 7.164062 1.332031 16 C 1.332031 24.835938 7.164062 30.667969 16 30.667969 C 24.835938 30.667969 30.667969 24.835938 30.667969 16 C 30.667969 7.164062 24.835938 1.332031 16 1.332031 Z M 24.394531 7.605469 C 28.617188 11.828125 28.515625 18.808594 25.332031 23.332031 L 8.667969 6.667969 C 13.195312 3.480469 20.171875 3.386719 24.394531 7.605469 Z M 7.605469 24.394531 C 3.382812 20.171875 3.484375 13.191406 6.667969 8.667969 L 23.332031 25.332031 C 18.804688 28.519531 11.824219 28.613281 7.605469 24.394531 Z M 7.605469 24.394531 " />
            </g>
        </svg>
    );
};
