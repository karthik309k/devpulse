/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                syne: ["Syne", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            colors: {
                accent: "#58a6ff",
                success: "#3fb950",
                warning: "#e3b341",
                danger: "#ff7b72",
            },
        },
    },
    plugins: [],
};