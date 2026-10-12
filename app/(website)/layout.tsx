import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
