import { RefObject, useCallback, useState } from "react";
import useEventListener from "./useEventListener";

const visibilityChangeEvent = "visibilitychange";
const loadEvent = "load";

const noop = () => {};

export interface Config {
    onHide?: () => void;
    onShow?: (result?: ShowResults) => void;
    onLoad?: (result?: ShowResults) => void;
    storageKey?: string;
    shouldReturnResult?: boolean;
    element?: Document;
}

interface ShowResults {
    lastSeenDate: Date | null;
}

/**
 * React hook that toggles the online status of a user depending on the visibility of the page.
 * It returns an object containing the last-seen date.
 *
 * @param {Config} config - The config object.
 *
 * @returns {ShowResults} - The last-seen date.
 */
export const useOnlineStatus = (config: Config = {}) => {
    const {
        onHide = noop,
        onShow = noop,
        onLoad = noop,
        shouldReturnResult = onHide === noop && onShow === noop,
        element = document,
    } = config;

    const buildResult = useCallback((): ShowResults => {
        const lastSeenDate = new Date();
        return { lastSeenDate };
    }, []);

    const initialValue = (shouldReturnResult && buildResult) || undefined;
    const [result, setResult] = useState(initialValue);

    const elementRef = element as unknown as RefObject<Document>;

    useEventListener(
        visibilityChangeEvent,
        () => {
            const isHidden = element.visibilityState === "hidden";

            if (isHidden) {
                onHide();
                return;
            }

            const callbackResult = buildResult();
            if (shouldReturnResult) {
                setResult(callbackResult);
            }

            onShow(callbackResult);
        },
        elementRef,
    );

    useEventListener(
        loadEvent,
        () => {
            const callbackResult = buildResult();
            if (shouldReturnResult) {
                setResult(callbackResult);
            }

            onLoad(callbackResult);
        },
        elementRef,
    );

    return result;
};
