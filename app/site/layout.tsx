import NavBarWrapper from "./components/NavBarWrapper";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarWrapper />
      {children}
      <Footer />
      <CookieBanner />
    </>
  );
}
