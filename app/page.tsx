import Header from "@/components/shared/header/header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="mesh-grid min-h-screen">
        <div className="app-shell w-full">
          <Header />
        </div>
      </div>
    </div>
  );
}
