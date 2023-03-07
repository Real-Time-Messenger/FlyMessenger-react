import {FC, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import classNames from "classnames";
import {motion} from "framer-motion";

export interface ScrollReaderData {
    title: string;
    content?: string | string[];
    children?: ScrollReaderData[];
}

interface ScrollReaderProps {
    data: ScrollReaderData[];
    numeration?: boolean;
    height?: number;
}

const fontSizes = ["text-lg", "text-base", "text-sm"];

export const ScrollReader: FC<ScrollReaderProps> = ({data, height = null, numeration = false}) => {
    const {t} = useTranslation();

    const [activeIndex, setActiveIndex] = useState<string | number>("1");

    const contentRef = useRef<HTMLDivElement>(null);

    const scrollToElement = (index: string | number) => {
        if (!contentRef.current) return;

        setActiveIndex(index);

        const element = contentRef.current.querySelector(`[data-target-id="${index}"]`);
        if (!element) return;

        element.scrollIntoView({behavior: "smooth", block: "center"});
    }

    const renderChildrenNavigation = (children?: ScrollReaderData[], depth = 1, prefix = '1') => {
        if (!children) return null;
        return (
            <div className="flex flex-col">
                {children.map((child, index) => (
                    <div
                        data-target-id={`${prefix}.${index + 1}`}
                        key={index} className="flex flex-col">
                        <span
                            onClick={() => scrollToElement(`${prefix}.${index + 1}`)}
                            className={classNames("transition-colors leading-6 mt-2 cursor-pointer", fontSizes[depth - 1], activeIndex === `${prefix}.${index + 1}` ? "text-[#161616] dark:text-white" : "text-[#696969] dark:text-[#4E5772]")}
                            style={{marginLeft: depth * 10}}>{numeration && `${prefix}.${index + 1}`} {t(child.title)}</span>

                        {renderChildrenNavigation(child.children, depth + 1, `${Number(prefix) + 1}`)}
                    </div>
                ))}
            </div>
        );
    };

    const renderChildrenContent = (children?: ScrollReaderData[], depth = 1, prefix = '1') => {
        if (!children) return null;
        return (
            <div className="flex flex-col">
                {children.map((child, index) => (
                    <div key={index} className="transition-all flex flex-col gap-2 relative py-2 pl-5 my-2"
                         data-target-id={`${prefix}.${index + 1}`}
                         style={{marginLeft: depth * 20}}>
                        <span
                            className="transition-colors leading-6 text-xl text-[#161616] dark:text-white">{numeration && `${prefix}.${index + 1}`} {t(child.title)}</span>
                        {child.content && (
                            <>
                                {typeof child.content === "string" ? (
                                    <span
                                        className={classNames("transition-colors leading-6 text-[#7B7B7B] dark:text-[#797D93]")}>{t(child.content)}</span>
                                ) : (
                                    <ul className="list-disc pl-5">
                                        {child.content.map((item, index) => (
                                            <li key={index}
                                                className={classNames("transition-colors text-[#7B7B7B] dark:text-[#797D93]")}>{t(item)}</li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}

                        {renderChildrenContent(child.children, depth + 1, `${prefix}.${index + 1}`)}

                        {activeIndex === `${prefix}.${index + 1}` && (
                            <motion.div
                                layoutId="scrollReader"
                                className="absolute top-0 left-0 w-1 h-full bg-[#98BDE7] dark:bg-[#1F2B49] transition-colors rounded-full"
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const getElementInViewport = (e: Event) => {
        if (!contentRef.current) return;

        const elements = contentRef.current.querySelectorAll('[data-target-id]');
        if (!elements.length) return;

        const element = Array.from(elements).find((element) => {
            const rect = element.getBoundingClientRect();
            return rect.top >= 100 && rect.top <= rect.height + 100;
        });
        if (!element) return;

        const index = element.getAttribute('data-target-id');
        if (!index) return;

        setActiveIndex(index);
    }

    useEffect(() => {
        document.addEventListener('wheel', getElementInViewport);

        return () => {
            document.removeEventListener('wheel', getElementInViewport);
        }
    }, [activeIndex]);

    return (
        <div className="grid grid-cols-[1fr_1px_3fr] gap-10" style={{height: height ? `${height}px` : "auto"}}>
            <div className="sticky top-[100px] h-fit overflow-auto max-h-[calc(100vh-140px)] navigation-content pr-5 hidden lg:block">
                <div className="flex flex-col gap-3">
                    {data.map((item, index) => (
                        <div data-target-id={`${index + 1}`} key={index} className="flex flex-col">
                            <span
                                onClick={() => scrollToElement(`${index + 1}`)}
                                className={classNames("transition-colors text-xl cursor-pointer", activeIndex === `${index + 1}` ? "text-[#161616] dark:text-white" : "text-[#696969] dark:text-[#4E5772]")}>
                                {numeration && `${index + 1}.`} {t(item.title)}
                            </span>

                            {renderChildrenNavigation(item.children, 1, String(index + 1))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-1 max-h-[650px] sticky top-[100px] border-r-[4px] border-dashed border-[#CBD8F2] transition-colors dark:border-[#1F2B49] hidden lg:block"/>

            <div className="flex flex-col gap-5 col-span-3 lg:col-span-1" ref={contentRef}>
                {data.map((item, index) => (
                    <div key={index}
                         data-target-id={`${index + 1}`}
                         className="transition-all flex flex-col gap-2 relative py-2 lg:pl-10" data-index={index + 1}>
                        <span className="text-xl text-[#161616] dark:text-white transition-colors">{numeration && `${index + 1}.`} {t(item.title)}</span>

                        {item.content && (
                            <>
                                {typeof item.content === "string" ? (
                                    <span className="text-base text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t(item.content)}</span>
                                ) : (
                                    <ul className="list-disc pl-5">
                                        {item.content.map((content, index) => (
                                            <li key={index} className="text-base text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t(content)}</li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}

                        {renderChildrenContent(item.children, 1, String(index + 1))}

                        {activeIndex === `${index + 1}` && (
                            <motion.div
                                layoutId="scrollReader"
                                className="absolute top-0 left-0 w-1 h-full bg-[#98BDE7] dark:bg-[#1F2B49] transition-colors rounded-full hidden lg:block"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}