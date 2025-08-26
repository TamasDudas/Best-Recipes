import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <Head title="Irányítópult" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-slate-200 shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-800 ">
                            Sikeresen be vagy jelentkezve!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
