import React from "react";
import { Link } from "@inertiajs/react";

export default function RecipeCard({ recipe }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow w-full sm:w-1/2 md:w-1/4  flex-shrink-0 flex items-center gap-4">
            {/* Bubble/banner stílusú kép bal oldalon */}
            <div className="flex-shrink-0">
                <div
                    className="relative w-24 h-24 overflow-hidden shadow-lg"
                    style={{
                        borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        padding: "4px",
                    }}
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
                            backgroundImage: recipe.image_url
                                ? `url(${recipe.image_url})`
                                : "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                        }}
                    >
                        {!recipe.image_url && (
                            <div className="w-full h-full flex items-center justify-center text-3xl">
                                🍽️
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Link href={`/recipes/${recipe.id}`} className="flex-1">
                <h2 className="text-xl font-semibold text-green-600 mb-2">
                    {recipe.name}
                </h2>
                <p className="text-gray-500">
                    {recipe.description
                        ? recipe.description.split(" ").slice(0, 4).join(" ") +
                          "..."
                        : "No description available."}
                </p>
            </Link>
        </div>
    );
}
