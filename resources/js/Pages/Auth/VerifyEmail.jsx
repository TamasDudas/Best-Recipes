import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email megerősítése" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Köszönjük a regisztrációt! Mielőtt folytatnád, kérjük, hogy
                erősítsd meg az e-mail címedet az elküldött levélben található
                linkre kattintva.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    Új megerősítő linket küldtünk a regisztrációkor megadott
                    e-mail címedre.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Megerősítő e-mail újraküldése
                    </PrimaryButton>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Kijelentkezés
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
