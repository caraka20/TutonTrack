export const dynamic = "force-dynamic"; // contoh SSR
export default async function Status() {
  const ts = new Date().toISOString();
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold">Server Status (SSR)</h2>
      <p className="text-muted-foreground">Rendered at {ts}</p>
    </main>
  );
}
