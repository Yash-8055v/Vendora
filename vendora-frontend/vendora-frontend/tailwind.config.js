/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Neutral palette — warm, soft greys that sit quietly behind the
        // pastel brand colors instead of competing with them.
        stone: {
          25: "#FDFBFC",
          50: "#FAF7F9",
          100: "#F3EEF2",
          200: "#E6DEE4",
          300: "#D2C5CE",
          400: "#AA9AA6",
          500: "#83717D",
          600: "#635462",
          700: "#4A3E48",
          800: "#332A32",
          900: "#201A1F",
        },
        // Primary brand color: "hot pink" (#ffafcc) — the palette's most
        // saturated pastel, used for CTAs, active states, and price accents.
        brand: {
          50: "#FFF3F8",
          100: "#FFE3EE",
          200: "#FFC8DD",
          300: "#FFAFCC",
          400: "#FA8FBB",
          500: "#F16FA3",
          600: "#DE4C85",
          700: "#B7376A",
          800: "#8F2A52",
          900: "#5F1C37",
        },
        // Secondary accent: sky blue (#a2d2ff) — used for info states,
        // secondary badges, and alternating section backgrounds.
        sky: {
          50: "#F3F9FF",
          100: "#E3F0FF",
          200: "#BDE0FE",
          300: "#A2D2FF",
          400: "#7CB8F5",
          500: "#549CE6",
          600: "#3A7BC4",
          700: "#2C5F9A",
          800: "#20486F",
        },
        // Tertiary accent: lavender (#cdb4db) — used sparingly for
        // decorative flourishes, gradients, and hero overlays.
        lavender: {
          50: "#FAF7FB",
          100: "#F1E7F4",
          200: "#E3CEEB",
          300: "#CDB4DB",
          400: "#B78FC7",
          500: "#9C6FAE",
          600: "#7E5590",
          700: "#5F4070",
        },
        amber: {
          50: "#FFF8EC",
          100: "#FFEDCB",
          200: "#FFDD9E",
          300: "#FFC864",
          400: "#FBAE3A",
          500: "#F2941F",
          600: "#CE7414",
          700: "#A25A12",
          800: "#764212",
        },
        success: { 50: "#EDFAF1", 500: "#34A467", 600: "#278753" },
        warning: { 50: "#FFF8EC", 500: "#F2941F", 600: "#CE7414" },
        error: { 50: "#FDEEF2", 500: "#E24E7C", 600: "#C33965" },
        info: { 50: "#F3F9FF", 500: "#3A7BC4", 600: "#2C5F9A" },
      },
      fontFamily: {
        // Headings: elegant, editorial serif — the classic premium
        // fashion/beauty ecommerce pairing partner for a sans body font.
        display: ["'Playfair Display'", "ui-serif", "Georgia", "serif"],
        // Body copy: clean, rounded, highly legible geometric sans.
        sans: ["'DM Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        // Accent: used for eyebrow labels, badges, nav — a friendly
        // geometric sans that pairs well with the serif display font.
        accent: ["'Poppins'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        card: "20px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(28,25,22,0.04), 0 4px 12px rgba(28,25,22,0.06)",
        elevated: "0 2px 4px rgba(28,25,22,0.05), 0 12px 28px rgba(28,25,22,0.10)",
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};
