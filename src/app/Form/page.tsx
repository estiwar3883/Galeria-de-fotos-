"use client"; // <--- ESTO DEBE SER LO PRIMERO

import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importante: añade los estilos de la librería
import { Link } from "@heroui/react/link";

import { ApiForm } from "@/service/ApiForm";

const FormPage = () => {
  // --- Estados ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !file) {
      goTop();
      toast.error("Por favor completa todos los campos y selecciona una imagen.");
      return;
    }

    try {
      setLoading(true);
      const resp = await ApiForm(title, description, file);

      if (resp?.status === 200) {
        goTop();
        setFile(null);
        setPreview(null);
        setTitle("");
        setDescription("");
        toast.success("¡Se cargó tu imagen correctamente!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Algo falló al intentar subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.30),_transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.25),_transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(168,85,247,0.20),_transparent_40%)]" />

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_0_80px_rgba(99,102,241,0.15)] backdrop-blur-xl">
        {/* Encabezado */}
        <div className="flex items-start justify-between p-8">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-indigo-500/15 px-3 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300 ring-1 ring-indigo-400/20">
              Formulario
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Sube tu imagen con estilo
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Completa los datos, elige una imagen y envíala. ¡Es fácil y rápido!
            </p>
          </div>
          <Link
            href="/img"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Ver imágenes
          </Link>
        </div>

        <div className="border-t border-white/10 bg-slate-950/90 px-6 py-8 sm:px-10 sm:py-10">
          <form onSubmit={submitForm} className="grid gap-7">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-200">Título</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe un título..."
                className="rounded-3xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-white shadow-sm shadow-slate-950/20 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-200">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe la imagen..."
                rows={4}
                className="rounded-3xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-white shadow-sm shadow-slate-950/20 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 resize-none"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                <span className="font-semibold">Imagen</span>
                <span className="rounded-full bg-slate-800/80 px-3 py-1 text-slate-400">PNG, JPG, WEBP</span>
              </div>

              <div
                onClick={() => inputRef.current?.click()}
                className="group relative overflow-hidden rounded-[1.75rem] border border-dashed border-slate-700/80 bg-slate-900/80 px-5 py-9 text-center transition hover:border-indigo-400 hover:bg-indigo-500/10 hover:shadow-[0_20px_60px_-35px_rgba(99,102,241,0.75)] cursor-pointer"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="mx-auto max-h-56 rounded-3xl object-contain"
                  />
                ) : (
                  <>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition group-hover:bg-indigo-500/15 group-hover:text-indigo-300">
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-base font-medium text-slate-200">Haz clic para seleccionar</p>
                    <p className="mt-2 text-sm text-slate-400">Arrastra, suelta o elige un archivo</p>
                  </>
                )}
              </div>

              {file && (
                <p className="truncate text-sm text-slate-400">
                  Archivo seleccionado: <span className="text-slate-100">{file.name}</span> ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] hover:shadow-xl active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Subir imagen"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Contenedor de Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default FormPage;
