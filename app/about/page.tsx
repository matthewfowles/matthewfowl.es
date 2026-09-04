import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Matt Fowles",
  description: "Product engineer specializing in AI-powered applications and agentic systems",
};

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-[40px] md:text-[56px] font-medium tracking-[4px] mb-8">About Matt Fowles</h1>
        
        <div className="space-y-4 text-left">
          <p className="text-[20px] font-light tracking-[2px] leading-relaxed">
            I'm a product engineer specializing in building AI-powered applications that actually ship to production. 
            My focus is on creating agentic systems and autonomous applications that remove real administrative overhead 
            from workflows, not vague "AI transformation" consulting.
          </p>
          
          <p className="text-[20px] font-light tracking-[2px] leading-relaxed">
            I work remotely from Europe (currently based in Albania, UK citizen) and build products that leverage AI 
            agents and autonomous systems to solve concrete problems. This includes working on legal-tech platforms and 
            other production applications where AI integration delivers measurable value.
          </p>
          
          <p className="text-[20px] font-light tracking-[2px] leading-relaxed">
            My approach combines product engineering expertise with practical AI implementation - building systems that 
            work in production, not just demos. I ship code that runs in real environments and solves actual business problems.
          </p>
        </div>
        
        <div className="pt-6">
          <a
            href="/"
            className="social-link"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
