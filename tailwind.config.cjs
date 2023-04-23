/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./safelist.txt"],
    theme: {
        extend: {
            transitionProperty: {
                "background-color": "background-color",
                "border-color": "border-color",
            },
        },
        // screens: {
        //   sm: "640px",
        //   md: "768px",
        //   lg: "1024px",
        //   xl: "1280px",
        //   "2xl": "1536px",
        //   "3xl": "1920px",
        //   "4xl": "2560px",
        // },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
