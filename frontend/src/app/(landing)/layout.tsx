import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BannerCta from "../components/Banner-cta";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <BannerCta />
      <Footer />
    </>
  );
}
