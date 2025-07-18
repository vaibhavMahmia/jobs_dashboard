import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jobs Dashboard",
  description: "A dashboard to show latest jobs fetched from different sources.",
};

const RootLayout = ({ children }) => <html lang="en">
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
  >
    {children}
  </body>
</html>;

export default RootLayout;

