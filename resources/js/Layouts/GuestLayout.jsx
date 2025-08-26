import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            {/* Egyszerű header logóval és címmel */}
            <div className="bg-white shadow-sm border-b border-gray-200 py-6 px-6">
                <div className="flex items-center justify-center">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/storage/logo/best-recipies-logo.png"
                            alt="Best Recipes Logo"
                            className="w-12 h-12 object-contain rounded-full mr-3"
                        />
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                            Best Recipes
                        </h2>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-center py-16 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                    {children}
                </div>
            </div>
        </div>
    );
}
