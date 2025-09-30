export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid place-items-center bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md p-6">{children}</div>
    </div>
  );
}
