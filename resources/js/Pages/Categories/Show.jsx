import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import RecipeCard from "../../Components/RecipeCard";

export default function Show({ category, recipes }) {
    const recipesData = recipes.data;

    return (
        <>
            <Head title={category.name} />
            <div className="container mx-auto p-6">
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {usePage().props.can_manage_categories ? (
                            <Link
                                href={route("categories.edit", category.id)}
                                key={category.id}
                                className={`category-link rounded-lg px-4 py-1 text-white transition-transform transform hover:-translate-y-1`}
                                style={{ backgroundColor: category.color }}
                            >
                                Kategoria Szerkesztése
                            </Link>
                        ) : null}
                    </div>
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-green-600 to-emerald-900 bg-clip-text text-transparent">
                        {category.name}
                    </h1>
                </div>
                <div className="flex flex-wrap gap-6 justify-center">
                    {recipesData.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </>
    );
}
