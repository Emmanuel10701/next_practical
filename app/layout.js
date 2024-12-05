import localFont from "next/font/local";
import "./globals.css";
import Session from "./sessionwrapper/page";  // Importing the session wrapper

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Chat applications",
  description:
    "This is a chat application that will test the use of socket.io in a Next.js application and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Session>  {/* Wrapping children with the Session wrapper */}
          {children}
        </Session>
      </body>
    </html>
  );
}
