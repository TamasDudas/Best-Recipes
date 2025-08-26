import React from "react";
import { useForm } from "@inertiajs/react";

export default function RecipeForm({
    recipe = null,
    onSubmit = null,
    categories = null,
    selectedCategories = null,
    imageUrl = null,
}) {
    const { data, setData, processing, errors } = useForm({
        name: recipe?.name || "",
        description: recipe?.description || "",
        ingredients: recipe?.ingredients ? JSON.parse(recipe.ingredients) : [],
        instructions: recipe?.instructions
            ? JSON.parse(recipe.instructions)
            : [],
        image: recipe?.image || "",
        categories: selectedCategories
            ? selectedCategories.map((id) => id.toString()) // Számokat string-gé konvertáljuk
            : recipe?.categories || [],
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(data); // Küldjük el a `data`-t tömbként, JSON string nélkül
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 my-6">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 via-green-600 to-emerald-900 bg-clip-text text-transparent">
                {recipe ? "Recept szerkesztése" : "Új recept létrehozása"}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Recept neve */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Recept neve
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Pl. Gulyásleves"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Leírás */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Leírás
                    </label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Pl. Egy klasszikus magyar leves."
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Hozzávalók */}
                <div>
                    <label
                        htmlFor="ingredients"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Hozzávalók
                    </label>
                    <div className="space-y-2">
                        {data.ingredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => {
                                        const newIngredients = [
                                            ...data.ingredients,
                                        ];
                                        newIngredients[index] = e.target.value;
                                        setData("ingredients", newIngredients);
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder={`Hozzávaló ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newIngredients =
                                            data.ingredients.filter(
                                                (_, i) => i !== index
                                            );
                                        setData("ingredients", newIngredients);
                                    }}
                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Törlés
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setData("ingredients", [
                                    ...data.ingredients,
                                    "",
                                ])
                            }
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Hozzáadás
                        </button>
                    </div>
                    {errors.ingredients && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.ingredients}
                        </p>
                    )}
                </div>

                {/* Elkészítési lépések */}
                <div>
                    <label
                        htmlFor="instructions"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Elkészítési lépések
                    </label>
                    <div className="space-y-2">
                        {data.instructions.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <textarea
                                    value={step}
                                    onChange={(e) => {
                                        const newInstructions = [
                                            ...data.instructions,
                                        ];
                                        newInstructions[index] = e.target.value;
                                        setData(
                                            "instructions",
                                            newInstructions
                                        );
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder={`Lépés ${index + 1}`}
                                ></textarea>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newInstructions =
                                            data.instructions.filter(
                                                (_, i) => i !== index
                                            );
                                        setData(
                                            "instructions",
                                            newInstructions
                                        );
                                    }}
                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Törlés
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setData("instructions", [
                                    ...data.instructions,
                                    "",
                                ])
                            }
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Lépés hozzáadása
                        </button>
                    </div>
                    {errors.instructions && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.instructions}
                        </p>
                    )}
                </div>

                {/* Kép feltöltés */}
                <div>
                    <label
                        htmlFor="image"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Recept képe
                    </label>

                    {/* Jelenlegi kép megjelenítése szerkesztéskor */}
                    {imageUrl && !data.image && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Jelenlegi kép:
                            </p>
                            <img
                                src={imageUrl}
                                alt="Jelenlegi recept kép"
                                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                            />
                        </div>
                    )}

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        <p className="text-gray-500 text-sm mt-2">
                            JPG, PNG, JPEG, GIF vagy SVG (max. 2MB)
                        </p>
                        {imageUrl && (
                            <p className="text-blue-600 text-sm mt-1">
                                Új kép kiválasztása felülírja a jelenlegi képet
                            </p>
                        )}
                    </div>
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image}
                        </p>
                    )}
                </div>

                {/* Kategória kiválasztása */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kategóriák (több is kiválasztható)
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                        {/* Végigjárjuk az összes kategóriát és mindegyikhez létrehozunk egy checkbox-ot */}
                        {categories &&
                            categories.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        value={cat.id} // A checkbox értéke a kategória ID-ja
                                        // Checked: megnézzük, hogy az aktuális kategória ID benne van-e a kiválasztott kategóriák tömbben
                                        checked={
                                            data.categories.includes(
                                                cat.id.toString() // toString() mert a form-ban string-ként tároljuk az ID-kat
                                            ) ||
                                            data.categories.includes(cat.id)
                                        } // Számként is ellenőrizzük (szerkesztéskor)
                                        onChange={(e) => {
                                            // Megkapjuk a kategória ID-ját
                                            const categoryId = e.target.value;

                                            // Ha be lett pipálva a checkbox
                                            if (e.target.checked) {
                                                // Hozzáadjuk az új kategóriát a meglévő tömböhöz (spread operator)
                                                setData("categories", [
                                                    ...data.categories, // Meglévő kategóriák
                                                    categoryId, // Új kategória
                                                ]);
                                            } else {
                                                // Ha ki lett pipálva a checkbox
                                                // Eltávolítjuk a kategóriát a tömbből (filter használatával)
                                                setData(
                                                    "categories",
                                                    data.categories.filter(
                                                        (id) =>
                                                            id !== categoryId // Megtartjuk azokat, amik nem egyeznek
                                                    )
                                                );
                                            }
                                        }}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {cat.name}
                                    </span>
                                </label>
                            ))}
                    </div>
                    {errors.categories && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.categories}
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
                        ) : recipe ? (
                            "Recept frissítése"
                        ) : (
                            "Recept létrehozása"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
