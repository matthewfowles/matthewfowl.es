import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Matt Fowles",
  description: "Get in touch with Matt Fowles for AI-powered product engineering work",
};

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-[40px] md:text-[56px] font-medium tracking-[4px] mb-8">Contact</h1>
        
        <div className="space-y-6 text-left">
          <p className="text-[20px] font-light tracking-[2px] leading-relaxed">
            I'm available for product engineering work involving AI-powered applications, agentic systems, 
            and autonomous workflows. I work remotely from Europe.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-[28px] font-medium tracking-[2px]">Get in Touch</h2>
            
            <div className="space-y-3">
              <p className="text-[20px] font-light tracking-[2px]">
                <strong>Email:</strong>{" "}
                <a href="mailto:matt@matthewfowles.io" className="text-[var(--link-color)] underline">
                  matt@matthewfowles.io
                </a>
              </p>
              
              <p className="text-[20px] font-light tracking-[2px]">
                <strong>LinkedIn:</strong>{" "}
                <a 
                  href="https://www.linkedin.com/in/matt-fowles" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--link-color)] underline"
                >
                  linkedin.com/in/matt-fowles
                </a>
              </p>
              
              <p className="text-[20px] font-light tracking-[2px]">
                <strong>GitHub:</strong>{" "}
                <a 
                  href="https://github.com/matthewfowles" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--link-color)] underline"
                >
                  github.com/matthewfowles
                </a>
              </p>
              
              <p className="text-[20px] font-light tracking-[2px]">
                <strong>Location:</strong> Remote Europe (Albania) • UK Citizen
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">What I Do</h2>
            <ul className="list-disc list-inside space-y-2 text-[20px] font-light tracking-[2px]">
              <li>AI-powered product engineering</li>
              <li>Agentic application development</li>
              <li>Autonomous system integration</li>
              <li>Production-ready AI implementations</li>
            </ul>
          </div>
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
