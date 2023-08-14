import { LandingContent } from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";

// Landing page for user if they are not signed in
const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavBar />
            <LandingHero />
            <LandingContent />
        </div>
    );
}

export default LandingPage;
