import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import RecipeForm from "@/Components/RecipeForm";

export default function Create() {
    const { categories } = usePage().props;

    const handleSubmit = (data) => {
        router.post("/recipes", data, {
            forceFormData: true, // Important for file uploads
            onSuccess: () => {
                // Redirect will be handled by the backend
            },
            onError: (errors) => {
                // validation errors are handled by Inertia form errors
            },
        });
    };

    return (
        <>
            <Head title="Új recept létrehozása" />
            <div className="container mx-auto p-6">
                <RecipeForm onSubmit={handleSubmit} categories={categories} />
            </div>
        </>
    );
}
