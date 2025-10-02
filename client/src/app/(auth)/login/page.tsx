// client/src/app/(auth)/login/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginStudentByNim } from "@/services/student.service";
import { setToken } from "@/lib/auth";
import { showError, showSuccess } from "@/utils/alert";
import AuthShell from "@/components/auth/AuthShell";
import { IdCard } from "lucide-react";

const Schema = z.object({ nim: z.string().trim().min(3, "NIM minimal 3 karakter") });
type FormValues = z.infer<typeof Schema>;

export default function LoginPage() {
  const r = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = async (v: FormValues) => {
    try {
      const token = await loginStudentByNim(v.nim);
      setToken(token);
      await showSuccess("Login berhasil");
      r.replace("/dashboard");
    } catch (e: unknown) {
      await showError(e, "Login gagal. Periksa NIM kamu.");
    }
  };

  return (
    <AuthShell
      title="Masuk"
      subtitle="Login cepat pakai NIM saja"
      footer={<>Belum punya akun?{" "}
        <a href="/register" className="underline decoration-[var(--ut-gold)] hover:text-[var(--ut-gold)]">Daftar</a></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="NIM" error={errors.nim?.message} icon={<IdCard className="h-4 w-4" />}>
          <input {...register("nim")} placeholder="e.g. 12345678" className="field-input" />
        </Field>

        <button disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? "Memproses…" : "Masuk"}
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
