import "./globals.css";

export const metadata = {
  title: "Jobs Dashboard",
  description: "A dashboard to show latest jobs fetched from different sources.",
};

const RootLayout = ({ children }) => <html lang="en">
  <body className="bg-gray-50 text-gray-900">
    <header className="bg-teal-light text-white py-1 text-center shadow rounded">
      <h1 className="text-xl font-bold">Jobs Admin Portal</h1>
    </header>
    {children}
  </body>
</html>;

export default RootLayout;

