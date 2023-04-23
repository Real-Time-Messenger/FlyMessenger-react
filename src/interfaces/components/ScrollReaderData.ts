/**
 * Input props for the {@link ScrollReader} component data.
 *
 * @interface ScrollReaderProps
 *
 * @property {string} title - The title of the section.
 * @property {string | string[]} content - The content of the section.
 * @property {ScrollReaderData[]} children - The children of the section.
 */
export interface ScrollReaderData {
    title: string;
    content?: string | string[];
    children?: ScrollReaderData[];
}
