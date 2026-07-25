import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live. Try. Expand. TRANS×HOME [The Transforming Home]",
  description:
    "TRANS×HOME [The Transforming Home] is an experimental residence offered by Osaka Gas Urban Development.",
  openGraph: {
    type: "article",
    siteName: "Live. Try. Expand. TRANS×HOME [The Transforming Home]",
    title: "Live. Try. Expand. TRANS×HOME [The Transforming Home]",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/overrides.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
