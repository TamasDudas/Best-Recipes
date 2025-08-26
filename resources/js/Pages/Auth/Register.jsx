import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen w-full h-full flex items-center justify-center py-16 px-4">
            <Head title="Regisztráció" />
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 w-full">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl px-6 py-4 text-center w-full">
                        <h1 className="text-3xl font-bold text-white">
                            Regisztráció
                        </h1>
                    </div>
                    <form onSubmit={submit} className="space-y-6 w-full mt-6">
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Név"
                                className="text-gray-700 font-medium"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full px-4 py-3 border border-green-200 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 placeholder:text-gray-400"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Adja meg a nevét"
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Adja meg e-mail címét"
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
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
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Adja meg jelszavát"
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Jelszó megerősítése"
                                className="text-gray-700 font-medium"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-2 block w-full px-4 py-3 border border-green-200 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 placeholder:text-gray-400"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                placeholder="Adja meg újra a jelszavát"
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-4 mt-6">
                            <Link
                                href={route("login")}
                                className="text-sm text-green-600 hover:text-green-800 underline font-medium"
                            >
                                Már van fiókja? Jelentkezzen be!
                            </Link>
                            <PrimaryButton
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl text-center flex justify-center items-center"
                                disabled={processing}
                            >
                                <span className="w-full text-center">
                                    {processing
                                        ? "Regisztráció..."
                                        : "Regisztráció"}
                                </span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
