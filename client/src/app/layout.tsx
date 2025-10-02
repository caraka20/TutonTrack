import "./globals.css";
import GlobalLoader from "@/components/ui/global-loader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <GlobalLoader />
        {children}
      </body>
    </html>
  );
}
