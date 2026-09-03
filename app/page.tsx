import { Devices } from "@/components/devices";
import Header from "@/components/shared/header/header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="mesh-grid min-h-screen">
        <div className="app-shell w-full">
          <Header />
          <main className="w-full px-4 pb-10 pt-5 sm:px-8">
            <section className="mx-auto max-w-7xl">
              <Devices />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
