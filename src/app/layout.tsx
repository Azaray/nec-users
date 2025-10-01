import { UsersProvider } from "@/lib/context/users-context";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UsersProvider>{children}</UsersProvider>
      </body>
    </html>
  );
}
