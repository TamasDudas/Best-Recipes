import { Link } from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { useState } from "react";

export default function AuthNav({ user = null }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex items-center justify-between py-6">
                    <div className="flex items-center space-x-3">
                        <Link href="/">
                            <img
                                src="/storage/logo/best-recipies-logo.png"
                                alt="Best Recipes Logo"
                                className="w-12 h-12 object-contain rounded-full"
                            />
                        </Link>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-emerald-800 bg-clip-text text-transparent">
                            Best Recipes
                        </h1>
                    </div>

                    <div className="flex items-center">
                        <div className="hidden sm:flex space-x-3 items-center">
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

                            <div className="mx-3 border-l border-gray-300 h-6" />

                            {user ? (
                                <>
                                    <Link
                                        href={route("dashboard")}
                                        className="bg-blue-100 hover:bg-blue-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                                    >
                                        Irányítópult
                                    </Link>
                                    <span className="text-gray-700 text-sm">
                                        Üdv, {user.name}!
                                    </span>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="bg-red-100 hover:bg-red-200 text-gray-800 font-medium px-4 py-2 rounded-full border border-white transition duration-200"
                                    >
                                        Kijelentkezés
                                    </Link>
                                </>
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
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown((s) => !s)
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="space-y-1 pb-3 pt-2 px-4">
                    {user && (
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Irányítópult
                        </ResponsiveNavLink>
                    )}
                    <ResponsiveNavLink
                        href={route("home")}
                        active={route().current("home")}
                    >
                        Főoldal
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("recipes.index")}
                        active={route().current("recipes.*")}
                    >
                        Receptek
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("categories.index")}
                        active={route().current("categories.*")}
                    >
                        Kategóriák
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("contact.index")}
                        active={route().current("contact")}
                    >
                        Kapcsolat
                    </ResponsiveNavLink>
                </div>

                <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600 px-4">
                    <div className="px-0">
                        {user ? (
                            <>
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    {user.name}
                                </div>
                                {user.role_labels &&
                                    user.role_labels.length > 0 && (
                                        <div className="text-sm font-medium text-gray-500">
                                            {user.role_labels.join(", ")}
                                        </div>
                                    )}
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    Vendég
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    Kérlek jelentkezz be vagy regisztrálj
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-3 space-y-1 px-2">
                        {user ? (
                            <>
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Kijelentkezés
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <>
                                <ResponsiveNavLink href={route("login")}>
                                    Bejelentkezés
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("register")}>
                                    Regisztráció
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
