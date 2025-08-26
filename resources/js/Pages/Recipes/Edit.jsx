import React from "react";
import { usePage, router, Head } from "@inertiajs/react";
import RecipeForm from "@/Components/RecipeForm";

export default function Edit() {
    const { recipe, categories, selectedCategories, imageUrl } =
        usePage().props;

    const handleSubmit = (data) => {
        router.post(
            route("recipes.update", recipe.id),
            {
                ...data,
                _method: "PATCH",
            },
            {
                forceFormData: true, // Kép feltöltéshez szükséges
            }
        );
    };

    return (
        <>
            <Head title="Recept szerkesztése" />
            <div>
                <RecipeForm
                    categories={categories}
                    recipe={recipe}
                    onSubmit={handleSubmit}
                    selectedCategories={selectedCategories}
                    imageUrl={imageUrl}
                />
            </div>
        </>
    );
}
