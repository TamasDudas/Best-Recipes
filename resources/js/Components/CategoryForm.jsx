import React from "react";
import { useForm } from "@inertiajs/react";

export default function CategoryForm({ category = null, onSubmit = null }) {
    const isEdit = !!category?.id;

    const { data, setData, processing, errors } = useForm({
        name: category?.name || "",
        color: category?.color || "#10b981",
        is_featured: category?.is_featured || false,
        featured_image: null,
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            const payload = isEdit ? { ...data, id: category.id } : data;
            onSubmit(payload);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 my-6">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 via-green-600 to-emerald-900 bg-clip-text text-transparent">
                {category
                    ? "Kategória szerkesztése"
                    : "Új kategória létrehozása"}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6 ">
                {/* Kategória neve */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Kategória neve
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Pl. Magyar ételek"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Szín választó */}
                <div>
                    <label
                        htmlFor="color"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Kategória színe
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            id="color"
                            value={data.color}
                            onChange={(e) => setData("color", e.target.value)}
                            className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                            type="text"
                            value={data.color}
                            onChange={(e) => setData("color", e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            placeholder="#10b981"
                        />
                    </div>
                    {errors.color && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.color}
                        </p>
                    )}
                </div>

                {/* Kiemelt kategória checkbox */}
                <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={(e) =>
                                setData("is_featured", e.target.checked)
                            }
                            className="w-5 h-5 text-green-600 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                            Kiemelt kategória
                        </span>
                    </label>
                    {errors.is_featured && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.is_featured}
                        </p>
                    )}
                </div>

                {/* Kép feltöltés */}
                <div>
                    <label
                        htmlFor="featured_image"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Kategória képe
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <input
                            type="file"
                            id="featured_image"
                            accept="image/*"
                            onChange={(e) =>
                                setData("featured_image", e.target.files[0])
                            }
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        <p className="text-gray-500 text-sm mt-2">
                            JPG, PNG, JPEG, GIF vagy SVG (max. 2MB)
                        </p>
                    </div>
                    {errors.featured_image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.featured_image}
                        </p>
                    )}
                </div>

                {/* Submit gomb */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-green-400 via-green-600 to-emerald-900 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Feldolgozás...
                            </span>
                        ) : category ? (
                            "Kategória frissítése"
                        ) : (
                            "Kategória létrehozása"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
