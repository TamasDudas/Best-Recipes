import React from "react";
import { Link } from "@inertiajs/react";
export default function CategoryCard({
    mainText,
    text,
    featured_image,
    icon = "🥘",
    id,
}) {
    return (
        <>
            <Link href={route("categories.show", id)} className="block">
                <div className="relative bg-green-300 rounded-lg shadow-lg overflow-hidden h-64 cursor-pointer hover:scale-105 transition-transform">
                    {/* Háttérkép */}
                    {featured_image ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${featured_image})`,
                            }}
                        >
                            {/* Sötét overlay a jobb olvashatóságért */}
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-green-300"></div>
                    )}

                    {/* Tartalom */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                        {!featured_image && (
                            <div className="text-4xl mb-4 text-gray-900">
                                {icon}
                            </div>
                        )}
                        <h3 className="text-xl font-semibold mb-2 drop-shadow-lg">
                            {mainText}
                        </h3>
                        <p className="text-gray-100 drop-shadow-md">{text}</p>
                    </div>
                </div>
            </Link>
        </>
    );
}
