export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />

        <script src="https://cdn.jsdelivr.net/npm/daisyui@1.0.0-beta.8/dist/full.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
