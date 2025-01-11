import { Navbar } from "@/components/home-page/navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-screen-2xl">
        <Navbar/>
    {children}
    </div>
  );
}
