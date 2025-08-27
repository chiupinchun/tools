export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: "#app", // ✅ 讓 Tailwind 的 CSS 限定套用在 #app 內，並增加一層 selector 權重
  prefix: "tw-", // ✅ 可選：避免與 Vuetify class 衝突
  theme: {
    extend: {},
  },
  plugins: [],
};
