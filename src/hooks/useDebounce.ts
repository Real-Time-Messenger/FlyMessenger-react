import { useEffect, useState } from "react";

/**
 * React hook that denounces the value of an input field or any other variable.
 * It returns a debounced value that is updated after a specified delay.
 *
 * @param {*} value - The value to debounce.
 * @param {number} [delay] - The delay in milliseconds.
 *
 * @returns {*} - The debounced value.
 */
export const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};
