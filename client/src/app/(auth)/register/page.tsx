// client/src/app/(auth)/register/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStudent, loginStudentByNim } from "@/services/student.service";
import { setToken } from "@/lib/auth";
import { showError, showSuccess } from "@/utils/alert";
import AuthShell from "@/components/auth/AuthShell";
import { Phone, UserRound, IdCard } from "lucide-react";

const Schema = z.object({
  nim: z.string().trim().min(3, "NIM minimal 3 karakter"),
  noHp: z.string().trim().regex(/^0[0-9]{9,19}$/g, "Nomor HP tidak valid").max(20),
  nama: z.string().trim().min(3, "Nama minimal 3 karakter").max(100),
});
type FormValues = z.infer<typeof Schema>;

export default function RegisterPage() {
  const r = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = async (v: FormValues) => {
    try {
      await registerStudent(v);
      const token = await loginStudentByNim(v.nim);
      setToken(token);
      await showSuccess("Pendaftaran berhasil", "Kamu akan diarahkan ke dashboard.");
      r.replace("/dashboard");
    } catch (e: unknown) {
      await showError(e, "Gagal mendaftar.");
    }
  };

  return (
    <AuthShell
      title="Buat Akun"
      subtitle="Daftar cepat, cukup isi 3 kolom"
      footer={<>Sudah punya akun?{" "}
        <a href="/login" className="underline decoration-[var(--ut-gold)] hover:text-[var(--ut-gold)]">Masuk</a></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="NIM" error={errors.nim?.message} icon={<IdCard className="h-4 w-4" />}>
          <input {...register("nim")} placeholder="e.g. 12345678" className="field-input" />
        </Field>

        <Field label="No HP" error={errors.noHp?.message} icon={<Phone className="h-4 w-4" />}>
          <input {...register("noHp")} placeholder="08xxxxxxxxxx" className="field-input" />
        </Field>

        <Field label="Nama" error={errors.nama?.message} icon={<UserRound className="h-4 w-4" />}>
          <input {...register("nama")} placeholder="Nama lengkap" className="field-input" />
        </Field>

        <button disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? "Mendaftarkan…" : "Daftar"}
        </button>
      </form>
    </AuthShell>
  );
}

function Field({
  label, error, icon, children,
}: { label: string; error?: string; icon?: React.ReactNode; children: React.ReactNode; }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/90">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">{icon}</span>}
        <div className="rounded-xl border border-white/15 bg-white/10 focus-within:ring-2"
             style={{ boxShadow: "0 0 0 2px transparent", outline: "none" }}>
          <div className="px-3 py-2 pl-10">{children}</div>
        </div>
      </div>
      {error && <p className="text-xs text-yellow-200">{error}</p>}
    </div>
  );
}
