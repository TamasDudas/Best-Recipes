import { usePage, router, Head } from "@inertiajs/react";
import { useState } from "react";

export default function AdminComments() {
    const { props } = usePage();
    const { comments } = props;

    // Local state for optimistic UI updates
    const [localComments, setLocalComments] = useState(comments.data || []);
    const [loadingIds, setLoadingIds] = useState({});
    const [error, setError] = useState(null);

    function setLoading(id, value) {
        setLoadingIds((s) => ({ ...s, [id]: value }));
    }

    function removeComment(id) {
        setLocalComments((list) => list.filter((c) => c.id !== id));
    }

    function approve(id) {
        if (loadingIds[id]) return;
        setLoading(id, true);
        router.post(
            `/admin/comments/${id}/approve`,
            {},
            {
                onSuccess: () => {
                    removeComment(id);
                    setLoading(id, false);
                    setError(null);
                    router.reload();
                },
                onError: () => {
                    setLoading(id, false);
                    setError("A komment jóváhagyása sikertelen.");
                },
            }
        );
    }

    function reject(id) {
        if (loadingIds[id]) return;
        // remove modal prompt; send reject without interactive popup
        const reason = null;
        setLoading(id, true);
        router.post(
            `/admin/comments/${id}/reject`,
            { rejected_reason: reason },
            {
                onSuccess: () => {
                    removeComment(id);
                    setLoading(id, false);
                    router.reload();
                },
                onError: () => {
                    setLoading(id, false);
                    setError("A komment elutasítása sikertelen.");
                },
            }
        );
    }

    return (
        <>
            <Head title="Kommentek" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Megerősítésre váró kommentek
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                        {error}
                    </div>
                )}

                {localComments.length === 0 ? (
                    <div>Nincsenek megerősítésre váró kommentek.</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-2 py-2">Felhasználó</th>
                                <th className="px-2 py-2">Részlet</th>
                                <th className="px-2 py-2">Recept</th>
                                <th className="px-2 py-2">Létrehozva</th>
                                <th className="px-2 py-2">Műveletek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localComments.map((c) => (
                                <tr key={c.id} className="border-t">
                                    <td className="px-2 py-3">
                                        {c.user?.name}
                                    </td>
                                    <td className="px-2 py-3">
                                        {c.content.substring(0, 80)}
                                    </td>
                                    <td className="px-2 py-3">
                                        {c.recipe?.name}
                                    </td>
                                    <td className="px-2 py-3">
                                        {new Date(
                                            c.created_at
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-2 py-3">
                                        <button
                                            onClick={() => approve(c.id)}
                                            disabled={!!loadingIds[c.id]}
                                            className="mr-2 bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                                        >
                                            {loadingIds[c.id]
                                                ? "..."
                                                : "Jóváhagyás"}
                                        </button>
                                        <button
                                            onClick={() => reject(c.id)}
                                            disabled={!!loadingIds[c.id]}
                                            className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                                        >
                                            {loadingIds[c.id]
                                                ? "..."
                                                : "Elutasítás"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4">
                    {comments.prev_page_url && (
                        <button
                            onClick={() => router.visit(comments.prev_page_url)}
                            className="mr-2"
                        >
                            Előző
                        </button>
                    )}
                    {comments.next_page_url && (
                        <button
                            onClick={() => router.visit(comments.next_page_url)}
                        >
                            Következő
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
