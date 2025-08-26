import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                lightGreen: "rgb(187, 247, 208)",
                deepGreen: "rgb(21, 128, 61)",
                textGreen: "rgb(24, 165, 76)",
                menuBg: "rgb(134, 239, 172)",
            },
        },
    },

    plugins: [forms],
};
