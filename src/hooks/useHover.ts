import { RefObject, useState } from "react";
import useEventListener from "./useEventListener";

/**
 * React hook that detects whether a component is currently being hovered over.
 * It returns a boolean value indicating whether the component is currently being hovered over or not.
 *
 * @param {RefObject<*>} elementRef - The ref of the element to detect the hover state for.
 *
 * @returns {boolean} - Whether the element is currently being hovered over or not.
 */
export function useHover<T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>): boolean {
    const [value, setValue] = useState<boolean>(false);

    const handleMouseEnter = () => setValue(true);
    const handleMouseLeave = () => setValue(false);

    useEventListener("mouseenter", handleMouseEnter, elementRef);
    useEventListener("mouseleave", handleMouseLeave, elementRef);
    useEventListener("mousemove", handleMouseEnter, elementRef);

    return value;
}
