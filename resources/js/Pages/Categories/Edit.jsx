import React from "react";
import { usePage, router, Head } from "@inertiajs/react";
import CategoryForm from "../../Components/CategoryForm";

export default function Edit() {
    const { category } = usePage().props;

    const handleSubmit = (data) => {
        router.post(
            route("categories.update", category.id),
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
        <div>
            <Head title="Kategoria szerkesztése" />
            <CategoryForm category={category} onSubmit={handleSubmit} />
        </div>
    );
}
