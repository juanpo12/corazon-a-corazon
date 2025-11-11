import localFont from "next/font/local"

export const awesomeLathusca = localFont({
  src: [
    {
      path: "../public/fonts/AwesomeLathusca-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-awesome-lathusca",
  display: "swap",
  adjustFontFallback: false,
})