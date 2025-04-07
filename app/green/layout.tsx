import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Green | Rahul Babu",
  description: "Emerald green page",
};

export default function GreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full overflow-hidden m-0 p-0">
      {children}
    </div>
  );
}
