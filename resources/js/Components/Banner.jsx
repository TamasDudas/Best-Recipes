import React from "react";
import { Link } from "@inertiajs/react";

export default function Banner({
    mainText,
    text,
    imageUrl,
    ingredients,
    textSize = "text-2xl",
}) {
    return (
        <div className=" my-12">
            <div className="relative">
                <h1
                    className="text-5xl font-bold my-8 leading-tight pb-2 pt-1 text-center"
                    style={{
                        background:
                            "linear-gradient(to right, #10b981, #059669, #047857)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    {mainText}
                </h1>
            </div>

            {/* Két oszlopos elrendezés */}
            <div className="grid md:grid-cols-2 gap-2 items-center max-w-6xl mx-auto mt-12">
                {/* Bal oldal - Bubble kép */}
                <div className="flex justify-center p-2">
                    <div
                        className="relative w-full max-w-md h-96 overflow-hidden shadow-2xl"
                        style={{
                            borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
                            background:
                                "linear-gradient(135deg, #10b981, #059669)",
                            padding: "4px",
                        }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                borderRadius:
                                    "63% 37% 54% 46% / 55% 48% 52% 45%",
                                backgroundImage: imageUrl
                                    ? `url(${imageUrl})`
                                    : "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                            }}
                        >
                            {!imageUrl && (
                                <div className="w-full h-full flex items-center justify-center text-7xl">
                                    🍽️
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Jobb oldal - Szöveg és hozzávalók */}
                <div className="flex flex-col justify-center px-4 space-y-4">
                    <p
                        className={`${textSize} text-gray-800 ingredients leading-[1.7] text-left`}
                    >
                        {text}
                    </p>
                    {ingredients && ingredients.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Hozzávalók
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 mb-6">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
