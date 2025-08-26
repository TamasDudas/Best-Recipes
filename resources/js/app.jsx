import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import AppLayout from "./Layouts/AppLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const Root = () => {
            const [user, setUser] = useState(
                props.initialPage?.props?.auth?.user || null
            );

            const computeShowHeader = (page) => {
                // pages that render their own authenticated nav (use AuthenticatedLayout)
                if (!page) return true;
                if (page === "Dashboard") return false;
                if (page.startsWith("Profile/")) return false;
                // add other page-name checks here if you create more authenticated layouts
                return true;
            };

            const [showHeader, setShowHeader] = useState(
                computeShowHeader(props.initialPage?.component)
            );

            useEffect(() => {
                const handleInertiaSuccess = (event) => {
                    const nextUser =
                        event?.detail?.page?.props?.auth?.user || null;
                    setUser(nextUser);

                    const nextComponent =
                        event?.detail?.page?.component || null;
                    setShowHeader(computeShowHeader(nextComponent));
                };

                document.addEventListener(
                    "inertia:success",
                    handleInertiaSuccess
                );

                return () =>
                    document.removeEventListener(
                        "inertia:success",
                        handleInertiaSuccess
                    );
            }, []);

            return (
                <AppLayout user={user} showHeader={showHeader}>
                    <App {...props} />
                </AppLayout>
            );
        };

        root.render(<Root />);
    },
    progress: {
        color: "#4B5563",
    },
});
