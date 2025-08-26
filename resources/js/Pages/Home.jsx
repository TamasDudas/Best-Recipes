import Banner from "@/Components/Banner";
import CategoryCard from "@/Components/CategoryCard";
import { Head, Link } from "@inertiajs/react";

export default function Home({ auth, catWithImages }) {
    return (
        <>
            <Head title="Főoldal" />

            {/* Hero szekció saját háttérrel */}
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center ">
                <Banner
                    mainText={"Üdvözöljük a Best Recipes oldalon!"}
                    text={
                        "Fedezze fel a legfinomabb recepteket, ossza meg saját kreációit, és inspirálódjon a kulináris világból. Minden ínyenc számára találunk valami különlegeset. Csatlakozz közösségünkhöz és oszd meg te is kedvenc receptjeidet! Minden nap új ízekkel és kreatív ötletekkel várunk."
                    }
                    imageUrl="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                />
            </div>

            {/* Call to Action gombok */}
            <div className="flex gap-4 justify-center pb-16">
                <Link
                    href={route("recipes.index")}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    Receptek böngészése
                </Link>
                <Link
                    href={route("categories.index")}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    Kategóriák
                </Link>
            </div>

            {/* Kategória kártyák */}
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
        </>
    );
}
