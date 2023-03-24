import {UndefinedStrings} from "../interfaces/UndefinedStrings";

const oneWeek = 1000 * 60 * 60 * 24 * 7;

/**
 * Concatenates the String (null possible).
 *
 * @param {UndefinedStrings[]} strings - The Strings to concatenate.
 *
 * @returns {string} - The concatenated String.
 */
export const concatenate = (...strings: UndefinedStrings[]): string => {
    return strings.filter((string) => string).join(" ");
};

/**
 * Returns a date in a specified format.
 *
 * If the difference between the current date and the date passed in is less than two weeks,
 * the date will be returned in the format "HH:MM" (e.g. "10:00"). Otherwise, the date will be returned in the
 * format "DD.MM.YYYY" (e.g. "01.01.2020").
 *
 * @param {string} date - Date in the format "YYYY-MM-DD HH:MM:SS".
 *
 * @returns {string} - Date in the format "DD.MM.YYYY" or "HH:MM".
 */
export const parseDateToTime = (date: string): string => {
    const dateDifference = new Date().getTime() - new Date(date).getTime();

    if (dateDifference < oneWeek) {
        return new Date(date).toLocaleTimeString("default", {hour: "2-digit", minute: "2-digit"});
    }

    return new Date(date).toLocaleDateString("default", {day: "2-digit", month: "2-digit", year: "numeric"});
};

export interface LastSeenDate {
    title: string;
    value?: number | string;
}

/**
 * Converts the `LastActivity` Date of the User to pretty format.
 *
 * @param {string | null} date - Date in the format "YYYY-MM-DD HH:MM:SS".
 *
 * @returns {LastSeenDate} - Object with the title and value of the `LastActivity` Date.
 */
export const parseDateToLastSeen = (date: string | null): LastSeenDate => {
    if (!date) return {title: "lastSeenRecently"};

    const parsedDate = new Date(date);
    const currentDate = new Date();

    if (parsedDate.getTime() + 60000 > currentDate.getTime()) {
        return {title: "lastSeenRecently"};
    }

    if (parsedDate.getTime() + 3600000 > currentDate.getTime()) {
        const minutes = Math.floor((currentDate.getTime() - parsedDate.getTime()) / 60000);
        return {title: "lastSeenMinutesAgo", value: minutes};
    }

    if (parsedDate.getTime() + 86400000 > currentDate.getTime()) {
        const hours = Math.floor((currentDate.getTime() - parsedDate.getTime()) / 3600000);
        return {title: "lastSeenHoursAgo", value: hours};
    }

    if (parsedDate.getTime() + 604800000 > currentDate.getTime()) {
        const days = Math.floor((currentDate.getTime() - parsedDate.getTime()) / 86400000);
        return {title: "lastSeenDaysAgo", value: days};
    }

    return {title: "lastSeenAt", value: parseDateToTime(date)};
};


/**
 * Converts the `CreatedAt` Date of the Message to "HH:MM" format.
 *
 * @param {string} date - Date in the format "YYYY-MM-DD HH:MM:SS".
 *
 * @returns {string} - Date in the format "HH:MM".
 */
export const parseMessageTime = (date: string): string => new Date(date).toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit"
});

/**
 * Parse the Base64 Image.
 *
 * @param {string} base64 - The Base64 Image.
 *
 * @returns {string} - The Image URL.
 */
export const parseBase64 = (base64: string | ArrayBuffer): string => {
    if (typeof base64 === "string") {
        const [, data] = base64.split(",");
        return data;
    }

    return base64.toString();
}

/**
 * Show a Notification with the Given Title and Message
 *
 * @param {string} title - Title of the Notification.
 * @param {NotificationOptions} options - Options of the Notification.
 */
export const sendNotification = (title: string, options: NotificationOptions): void => {
    if (typeof window === "undefined") return;

    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        new Notification(title, options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification(title, options);
            }
        });
    }
};

/**
 * Set the document title.
 *
 * @param {string} title - The title to set.
 */
export const setDocumentTitle = (title: string): void => {
    if (typeof window === "undefined") return;

    document.title = title;
}