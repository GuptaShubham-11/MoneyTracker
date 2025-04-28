"use client";

export default function Footer() {
    return (
        <footer className="w-full bg-bg border-t border-second/50 text-txt py-8 px-4 mt-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Left side */}
                <div className="text-center md:text-left text-sm">
                    © {new Date().getFullYear()} Finance Visualizer. All rights reserved.
                </div>

                {/* Right side */}
                <div className="flex gap-6 text-second text-sm">
                    <a href="#" className="hover:text-main transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-main transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-main transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
