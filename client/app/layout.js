
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";





const inter = Inter({
  subsets: ["latin"],
});



export const metadata = {
  title: "AI Summarizer",
  description: "Generate concise summaries of lengthy texts using AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen w-full`}>
        <div className="w-full h-full">
          <AuthProvider>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
            </AuthProvider>
        </div>
      </body>
    </html>
  );
}
