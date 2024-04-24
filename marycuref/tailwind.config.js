/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            colors: {
                oroscuro: "#C4AA59",
                oro: "#e5c061",
                verde: "#809169",
                verdescuro: "#464229",
                bluscuro: "#002136",
            },
            screens: {
                xs: "400px",
            },
        },
    },
    plugins: [],
};
