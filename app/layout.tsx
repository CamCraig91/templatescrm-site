import "./globals.css";

export const metadata = {
  icons: {
    icon: "/favicon.ico", // or "/favicon.png" if that's what you saved
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
