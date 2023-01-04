/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  fontFamily: {
    'sans': ['ui-sans-serif', 'system-ui'],
    'serif': ['ui-serif', 'Georgia'],
    'mono': ['ui-monospace', 'SFMono-Regular'],
    'display': ['Oswald'],
    'body': ['"Open Sans"'],
  }
};
export const plugins = [];
