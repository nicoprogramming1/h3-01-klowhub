import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen ">
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <div className=" w-full">
          <div className="mx-auto w-full h-full relative">
            <div className="absolute top-0 left-0 w-full z-10">
              <Navbar />
            </div>
            <ScrollArea className="flex h-screen w-full justify-between">
              <main className="h-screen pt-16 w-full max-w-screen-2xl  flex flex-col justify-between ">
                {children}
                <Footer />
              </main>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
