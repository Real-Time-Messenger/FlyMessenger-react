import useEventListener from "./useEventListener";
import { RefObject } from "react";

/**
 * React hook that detects whether a component is currently being clicked outside.
 * It returns a boolean value indicating whether the component is currently being clicked outside or not.
 *
 * @param {RefObject<*>} ref - The ref of the element to detect the click outside state for.
 * @param {function} handler - The handler to call when the element is clicked outside.
 * @param {string} [mouseEvent] - The mouse event to listen to.
 * @param {string} [touchEvent] - The touch event to listen to.
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void,
    mouseEvent: "mousedown" | "mouseup" = "mouseup",
    touchEvent: "touchstart" | "touchend" = "touchend",
): void => {
    useEventListener(mouseEvent, (event) => {
        const el = ref?.current;

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return;
        }

        handler(event);
    });

    useEventListener(touchEvent, (event) => {
        const el = ref?.current;

        // Do nothing if touching ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return;
        }

        handler(event);
    });
};
