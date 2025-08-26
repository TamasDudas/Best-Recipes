import React from "react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import CategoryForm from "@/Components/CategoryForm";

export default function Create() {
    const handleSubmit = (data) => {
        router.post("/categories", data, {
            forceFormData: true, // Important for file uploads
            onSuccess: () => {
                // Redirect will be handled by the backend
            },
            onError: (errors) => {
                // validation errors handled by Inertia
            },
        });
    };

    return (
        <>
            <Head title="Új kategória létrehozása" />
            <div className="container mx-auto p-6">
                <CategoryForm onSubmit={handleSubmit} />
            </div>
        </>
    );
}
