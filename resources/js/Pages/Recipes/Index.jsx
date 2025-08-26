import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import RecipeCard from "../../Components/RecipeCard";

export default function Index({ getRecipes }) {
    const recipeList = getRecipes.data || [];

    return (
        <>
            <Head title={"Receptek"} />

            <div className="flex flex-wrap gap-2 mt-6">
                {usePage().props.can_create_recipe ? (
                    <Link
                        href={route("recipes.create")}
                        className="bg-green-600 category-link rounded-lg px-4 py-1 text-white transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        + Recept Létrehozása
                    </Link>
                ) : null}
            </div>

            <div className="text-center mb-8">
                <h1 className="text-3xl mt-6 font-bold bg-gradient-to-r from-green-400 via-green-600 to-emerald-900 bg-clip-text text-transparent">
                    Találd meg kedvenc receptjeidet!
                </h1>
            </div>
            <div className="container mx-auto p-6 flex flex-wrap gap-6 justify-center">
                {recipeList.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </>
    );
}
