import AuthNav from "@/Components/AuthNav";
import Footer from "@/Components/Footer";

export default function AppLayout({ children, user = null }) {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="relative min-h-screen">
                {/* Use the dashboard-style AuthNav as the single top navigation everywhere */}
                <AuthNav user={user} />
                <div className="relative w-full max-w-2xl mx-auto px-6 lg:max-w-7xl">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
}
