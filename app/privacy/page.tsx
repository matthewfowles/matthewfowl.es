import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Matt Fowles",
  description: "Privacy policy for mattfowl.es",
};

export default function Privacy() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-[40px] md:text-[56px] font-medium tracking-[4px] mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-left text-[18px] font-light tracking-[2px] leading-relaxed">
          <section>
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">Overview</h2>
            <p>
              This is a personal portfolio website for Matt Fowles (mattfowl.es). This site collects minimal 
              information and respects your privacy.
            </p>
          </section>
          
          <section>
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">Analytics</h2>
            <p>
              This site uses Vercel Analytics and Speed Insights to understand site performance and visitor patterns. 
              These services collect anonymized usage data including page views, geographic location (country level), 
              and performance metrics. No personally identifiable information is collected. Vercel Analytics is 
              privacy-friendly and GDPR compliant.
            </p>
          </section>
          
          <section>
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">Cookies</h2>
            <p>
              This site uses localStorage to remember your dark/light theme preference. This is stored locally in 
              your browser and is not transmitted to any server. No tracking cookies are used.
            </p>
          </section>
          
          <section>
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">Third-Party Links</h2>
            <p>
              This site contains links to third-party services (LinkedIn, GitHub, X/Twitter, Instagram). When you 
              click these links, you leave this site and are subject to the privacy policies of those platforms.
            </p>
          </section>
          
          <section>
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">Contact Information</h2>
            <p>
              If you contact me via email (matt@matthewfowles.io), your email address and message content will be 
              received and stored in my email provider's system. I will only use this information to respond to 
              your inquiry.
            </p>
          </section>
          
          <section>
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">Updates</h2>
            <p>
              This privacy policy may be updated from time to time. The latest version will always be available at 
              this URL. Last updated: September 2026.
            </p>
          </section>
          
          <section>
            <h2 className="text-[28px] font-medium tracking-[2px] mb-3">Contact</h2>
            <p>
              For any privacy-related questions or concerns, please contact me at{" "}
              <a href="mailto:matt@matthewfowles.io" className="text-[var(--link-color)] underline">
                matt@matthewfowles.io
              </a>
            </p>
          </section>
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
