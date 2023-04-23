import { useEffect } from "react";

/**
 * A helper hook that sets the title for the page.
 *
 * @param {string} title - The title to set.
 * @param {boolean} keepOnUnmount - Whether to keep the title when the component unmounts.
 */
export const useDocumentTitle = (title: string, keepOnUnmount = true): void => {
    const defaultTitle = document.title;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = defaultTitle;
            }
        };
    }, [defaultTitle, keepOnUnmount]);
};
