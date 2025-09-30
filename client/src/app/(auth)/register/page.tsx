"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Schema = z.object({
  nim: z.string().trim().min(3, "NIM minimal 3 karakter"),
  noHp: z.string().trim().min(10, "Nomor HP tidak valid").max(20),
  nama: z.string().trim().min(3).max(100),
});
type FormValues = z.infer<typeof Schema>;

export default function RegisterPage() {
  const r = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (v: FormValues) => {
    // 1) daftar
    await api("/api/students/register", { method: "POST", body: JSON.stringify(v) }, false);
    // 2) auto-login (pakai nim sebagai username sesuai BE kamu)
    const login = await api<{ data: { token: string } }>(
      "/api/students/login",
      { method: "POST", body: JSON.stringify({ username: v.nim }) },
      false
    );
    setToken(login.data.token);
    r.replace("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Buat Akun Student</h1>
        <p className="text-sm text-muted-foreground">Masukkan data singkat di bawah</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">NIM</label>
          <input className="w-full rounded-md border px-3 py-2"
                 placeholder="e.g. 12345678"
                 {...register("nim")} />
          {errors.nim && <p className="text-xs text-destructive">{errors.nim.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">No HP</label>
          <input className="w-full rounded-md border px-3 py-2"
                 placeholder="08xxxxxxxxxx"
                 {...register("noHp")} />
          {errors.noHp && <p className="text-xs text-destructive">{errors.noHp.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Nama</label>
          <input className="w-full rounded-md border px-3 py-2"
                 placeholder="Nama lengkap"
                 {...register("nama")} />
          {errors.nama && <p className="text-xs text-destructive">{errors.nama.message}</p>}
        </div>

        <button disabled={isSubmitting}
                className="w-full rounded-md bg-foreground text-background py-2 font-medium">
          {isSubmitting ? "Mendaftarkan..." : "Daftar & Masuk"}
        </button>
      </form>

      <p className="text-center text-sm">
        Sudah punya akun?{" "}
        <a href="/login" className="underline">Masuk</a>
      </p>
    </div>
  );
}
