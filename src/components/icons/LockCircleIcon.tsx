import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { FC } from "react";

export const LockCircleIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
            <g xmlns="http://www.w3.org/2000/svg" id="surface1">
                <path d="M 12 14.667969 L 12 13.332031 C 12 11.121094 12.667969 9.332031 16 9.332031 C 19.332031 9.332031 20 11.121094 20 13.332031 L 20 14.667969 M 16 19.464844 C 16.105469 19.464844 16.210938 19.445312 16.304688 19.40625 C 16.402344 19.367188 16.492188 19.308594 16.566406 19.230469 C 16.640625 19.15625 16.699219 19.070312 16.738281 18.972656 C 16.78125 18.875 16.800781 18.773438 16.800781 18.667969 C 16.800781 18.5625 16.78125 18.457031 16.738281 18.359375 C 16.699219 18.261719 16.640625 18.175781 16.566406 18.101562 C 16.492188 18.027344 16.402344 17.96875 16.304688 17.925781 C 16.210938 17.886719 16.105469 17.867188 16 17.867188 C 15.789062 17.867188 15.585938 17.949219 15.433594 18.101562 C 15.285156 18.25 15.199219 18.453125 15.199219 18.667969 C 15.199219 18.878906 15.285156 19.082031 15.433594 19.230469 C 15.585938 19.382812 15.789062 19.464844 16 19.464844 Z M 16 19.464844 " />
                <path d="M 19.332031 22.667969 L 12.667969 22.667969 C 10 22.667969 9.332031 22 9.332031 19.332031 L 9.332031 18 C 9.332031 15.332031 10 14.667969 12.667969 14.667969 L 19.332031 14.667969 C 22 14.667969 22.667969 15.332031 22.667969 18 L 22.667969 19.332031 C 22.667969 22 22 22.667969 19.332031 22.667969 Z M 19.332031 22.667969 " />
                <path d="M 16 29.332031 C 23.363281 29.332031 29.332031 23.363281 29.332031 16 C 29.332031 8.636719 23.363281 2.667969 16 2.667969 C 8.636719 2.667969 2.667969 8.636719 2.667969 16 C 2.667969 23.363281 8.636719 29.332031 16 29.332031 Z M 16 29.332031 " />
            </g>
        </svg>
    );
};
