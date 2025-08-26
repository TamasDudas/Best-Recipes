import { Link } from "@inertiajs/react";

export default function Header({ user }) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between py-6 px-6">
            {/* Logó és oldal neve balra */}
            <div className="flex items-center space-x-3">
                <img
                    src="/storage/logo/best-recipies-logo.png"
                    alt="Best Recipes Logo"
                    className="w-12 h-12 object-contain rounded-full"
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-emerald-800 bg-clip-text text-transparent">
                    Best Recipes
                </h1>
            </div>

            <nav className="flex items-center space-x-2">
                {/* Főnavigációs linkek mindenkinek */}
                <Link
                    href={route("home")}
                    className="bg-green-300 hover:bg-green-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                >
                    Főoldal
                </Link>
                <Link
                    href={route("recipes.index")}
                    className="bg-menuBg hover:bg-green-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                >
                    Receptek
                </Link>
                <Link
                    href={route("categories.index")}
                    className="bg-green-300 hover:bg-green-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                >
                    Kategóriák
                </Link>
                <Link
                    href={route("contact.index")}
                    className="bg-menuBg hover:bg-green-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                >
                    Kapcsolat
                </Link>

                {/* Divider a navigáció és az auth linkek között */}
                <div className="mx-3 border-l border-gray-300 h-6"></div>

                {/* Auth linkek */}
                {user ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700 text-sm">
                            Üdv, {user.name}!
                        </span>
                        <Link
                            href={route("dashboard")}
                            className="bg-blue-100 hover:bg-blue-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                        >
                            Irányítópult
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="bg-red-100 hover:bg-red-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                        >
                            Kijelentkezés
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                        >
                            Bejelentkezés
                        </Link>
                        <Link
                            href={route("register")}
                            className="bg-orange-100 hover:bg-orange-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                        >
                            Regisztráció
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
