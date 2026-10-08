import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import "./globals.css";

export const metadata = {
  title: "Pk store",
  description: "Discover thoughtful picks for your everyday at Pk store.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}

        <Footer/>
      </body>
    </html>
  );
}
