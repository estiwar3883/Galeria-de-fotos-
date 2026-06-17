"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteFile, fetchFiles } from "@/service/ApiForm";

interface Item {
    _id: string;
    title: string;
    description: string;
    fileUrl: string;
}

const ItemsPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFiles();

                console.log(data); // para verificar los datos

                setItems(data);
            } catch (error) {
                console.error("Error al obtener items:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <section className="min-h-screen bg-slate-950 p-6 text-slate-100 sm:p-12">
            <button
                onClick={() => router.back()}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Volver al formulario
            </button>

            <h1 className="mb-10 text-4xl font-bold text-white">
                Galería de imágenes
            </h1>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div
                                key={item._id}
                                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 transition hover:border-indigo-500/50"
                            >
                                <div className="h-64 w-full overflow-hidden">
                                    <img
                                        src={item.fileUrl}
                                        alt={item.title}
                                        onClick={() => setSelectedImage(item.fileUrl)}
                                        className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-white">
                                        {item.title}
                                    </h2>

                                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                        {item.description}
                                    </p>
                                    <button
                                        onClick={async () => {
                                            if (!confirm("¿Deseas eliminar esta imagen?")) return;

                                            await deleteFile(item._id);

                                            setItems((prev) =>
                                                prev.filter((img) => img._id !== item._id)
                                            );
                                        }}
                                        className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">
                            No hay imágenes disponibles aún.
                        </p>
                    )}
                </div>
            )}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Imagen completa"
                        className="max-h-[90vh] max-w-[90vw] rounded-xl"
                    />
                </div>
            )}
        </section>
    );
};

export default ItemsPage;