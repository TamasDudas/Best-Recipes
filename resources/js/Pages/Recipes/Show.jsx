import React from "react";
import { Link, Head, usePage, useForm } from "@inertiajs/react";
import Banner from "@/Components/Banner";

export default function Show({ recipe }) {
    const ingredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : JSON.parse(recipe.ingredients || "[]");

    const instructions = Array.isArray(recipe.instructions)
        ? recipe.instructions
        : JSON.parse(recipe.instructions || "[]");

    const { categories } = recipe;

    return (
        <>
            <Head title={recipe.name} />
            <div className="container mx-auto p-6">
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {usePage().props.can_edit ||
                        usePage().props.auth?.user?.id === recipe.user?.id ? (
                            <Link
                                href={route("recipes.edit", recipe.id)}
                                key={recipe.id}
                                className="bg-green-600 category-link rounded-lg px-4 py-1 text-white transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                Recept Szerkesztése
                            </Link>
                        ) : null}
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Kategóriák:
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Link
                                href={`/categories/${category.id}`}
                                key={category.id}
                                className={`category-link rounded-lg px-4 py-1 text-white transition-transform transform hover:-translate-y-1`} // Add hover effect
                                style={{ backgroundColor: category.color }}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <Banner
                    mainText={recipe.name}
                    text={recipe.description}
                    imageUrl={recipe.image_url}
                    textSize="text-xl"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white shadow-md rounded-lg p-6 border-green-600 border-e-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Hozzávalók
                        </h2>
                        <ul className="list-decimal list-inside text-gray-600 space-y-2">
                            {ingredients.map((ing, index) => (
                                <li key={index}>{ing}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 border-green-600 border-e-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Elkészítés
                        </h2>
                        <ul className="list-decimal list-inside text-gray-600 space-y-2">
                            {instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-8 container mx-auto p-6">
                    <h3 className="text-xl font-semibold mb-4">Kommentek</h3>
                    {recipe.approved_comments &&
                    recipe.approved_comments.length > 0 ? (
                        <div className="space-y-4">
                            {recipe.approved_comments.map((c) => (
                                <div
                                    key={c.id}
                                    className="bg-white p-4 rounded shadow"
                                >
                                    <div className="text-sm text-gray-600 mb-2">
                                        {c.user?.name} •{" "}
                                        {new Date(
                                            c.approved_at
                                        ).toLocaleString()}
                                    </div>
                                    <div className="text-gray-800">
                                        {c.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            Még nincs hozzászólás.
                        </div>
                    )}
                    {/* Comment form for authenticated users */}
                    {usePage().props.auth?.user ? (
                        <CommentForm recipeId={recipe.id} />
                    ) : (
                        <div className="mt-4 text-sm text-gray-600">
                            Kérlek <Link href="/login">jelentkezz be</Link>,
                            hogy hozzászólhass.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function CommentForm({ recipeId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        parent_id: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("recipes.comments.store", { recipe: recipeId }), {
            onSuccess: () => {
                reset("content");
                // optional: show a small message, or rely on page flash
            },
        });
    }

    return (
        <form onSubmit={submit} className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
                Írj hozzá egy kommentet
            </label>
            <textarea
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={4}
                required
            />
            {errors.content && (
                <div className="text-sm text-red-500">{errors.content}</div>
            )}
            <div className="mt-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {processing ? "Küldés..." : "Komment elküldése"}
                </button>
            </div>
        </form>
    );
}
