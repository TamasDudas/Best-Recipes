import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen w-full h-full flex items-center justify-center py-16 px-4">
            <Head title="Bejelentkezés" />
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 w-full">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl px-6 py-4 text-center w-full">
                        <h1 className="text-3xl font-bold text-white">
                            Bejelentkezés
                        </h1>
                    </div>
                    {status && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm font-medium text-green-700">
                            {status}
                        </div>
                    )}
                    <form onSubmit={submit} className="space-y-6 w-full mt-6">
                        {/* Email mező */}
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="E-mail cím"
                                className="text-gray-700 font-medium"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full px-4 py-3 border border-green-200 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 placeholder:text-gray-400"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Adja meg e-mail címét"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        {/* Jelszó mező */}
                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Jelszó"
                                className="text-gray-700 font-medium"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full px-4 py-3 border border-green-200 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 placeholder:text-gray-400"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Adja meg jelszavát"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        {/* Emlékezz rám checkbox */}
                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded border-green-300 bg-white text-green-600 focus:ring-green-400 focus:ring-offset-0"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Emlékezzen rám
                            </span>
                        </div>
                        {/* Gombok */}
                        <div className="space-y-4">
                            <PrimaryButton
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl text-center flex justify-center items-center"
                                disabled={processing}
                            >
                                <span className="w-full text-center">
                                    {processing
                                        ? "Bejelentkezés..."
                                        : "Bejelentkezés"}
                                </span>
                            </PrimaryButton>
                            {canResetPassword && (
                                <div className="text-center">
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-green-600 hover:text-green-800 underline font-medium"
                                    >
                                        Elfelejtette jelszavát?
                                    </Link>
                                </div>
                            )}
                        </div>
                    </form>
                    {/* Regisztráció link */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600">
                            Még nincs fiókja?{" "}
                            <Link
                                href={route("register")}
                                className="text-green-600 hover:text-green-800 underline font-medium"
                            >
                                Regisztráljon itt
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
