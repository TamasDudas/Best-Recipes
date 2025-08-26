import React from "react";
import CategoryCard from "@/Components/CategoryCard";
import { Link, Head, usePage } from "@inertiajs/react";

export default function Index({ catWithImages }) {
    return (
        <>
            <Head title={"Kategóriák"} />
            <div>
                <div className="flex flex-wrap gap-2 mt-6">
                    {usePage().props.can_manage_categories ? (
                        <Link
                            href={`/categories/create`}
                            className="bg-green-600 category-link rounded-lg px-4 py-1 text-white transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            + Kategoria Létrehozása
                        </Link>
                    ) : null}
                </div>
                <div className="py-16">
                    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                        {catWithImages.map((category) => (
                            <CategoryCard
                                key={category.id}
                                id={category.id}
                                featured_image={category.image_url}
                                mainText={category.name}
                                text={`Fedezd fel a ${category.name.toLowerCase()} recepteket`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
