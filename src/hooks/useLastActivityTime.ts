import { useCallback, useEffect, useState } from "react";
import { LastSeenDate, parseDateToLastSeen } from "@/helpers/helpers";

const minutes = 1000 * 60;

/**
 * React hook that returns the last seen date of a user.
 * It returns an object containing the last-seen date and the title of the last-seen date.
 *
 * @param {string | null} date - The date to parse.
 *
 * @returns {LastSeenDate} - The last-seen date and the title of the last-seen date.
 */
export const useLastActivityTime = (date: string | null) => {
    const [lastSeen, setLastSeen] = useState<LastSeenDate>();

    const updateDate = useCallback(() => {
        setLastSeen(parseDateToLastSeen(date));
    }, [date]);

    useEffect(() => {
        updateDate();

        const interval = setInterval(() => {
            updateDate();
        }, minutes);

        return () => {
            clearInterval(interval);
        };
    }, [date, updateDate]);

    if (!date) return { title: "lastSeenRecently" };

    return { ...lastSeen };
};
