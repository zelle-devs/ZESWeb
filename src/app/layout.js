
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import FooterZesCloud from "@/components/FooterZesCloud/FooterZesCloud";
import HeaderZesCloud from "@/components/HeaderZesCloud/HeaderZesCloud";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "ZesCloud | AI Operations Cloud — Your Business. Always On.",
  description:
    "ZesCloud is an AI-powered operations platform powered by Zaura™ Intelligence that monitors, understands, and protects your digital business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body>
        <HeaderZesCloud />

        <main className="zescloud-main-content">
          {children}
        </main>

        <FooterZesCloud />
      </body>
    </html>
  );
}
