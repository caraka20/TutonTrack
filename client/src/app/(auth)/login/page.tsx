"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { apiPost } from "@/lib/api";
import { setToken } from "@/lib/auth"; // file kamu sebelumnya, tetap dipakai
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Schema = z.object({
  username: z.string().trim().min(3, "Masukkan NIM atau No HP"),
});
type FormValues = z.infer<typeof Schema>;

export default function LoginPage() {
  const r = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (v: FormValues) => {
    const res = await apiPost<{ token: string }>("/api/students/login", v, false);
    setToken(res.data.token);
    r.replace("/dashboard");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input placeholder="NIM atau No HP" {...register("username")} />
            {errors.username && (
              <p className="text-xs text-red-600">{errors.username.message}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
