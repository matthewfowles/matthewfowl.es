import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Matt Fowles",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6 text-center">
        <h1 className="text-[56px] font-medium tracking-[4px]">404</h1>
        <h2 className="text-[28px] font-light tracking-[2px]">Page Not Found</h2>
        
        <p className="text-[20px] font-light tracking-[2px] pt-4">
          The page you're looking for doesn't exist. Here are some helpful links:
        </p>
        
        <nav className="flex flex-col items-center gap-4 pt-6">
          <a href="/" className="social-link">Home</a>
          <a href="/about" className="social-link">About</a>
          <a href="/contact" className="social-link">Contact</a>
          <a href="/llms.txt" className="social-link">AI Agent Guide (llms.txt)</a>
          <a href="/sitemap.xml" className="social-link">Sitemap</a>
        </nav>
      </div>
    </main>
  );
}
