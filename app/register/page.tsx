import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="bg-[#F5F5DC] min-h-screen flex items-center justify-center py-20">
      <div className="bg-[#E0E0E0] w-full max-w-5xl px-10 py-12 rounded-lg shadow-lg">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#263238] mb-10">
          EcoLens Register
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Tourist */}
          <div className="flex flex-col items-center">
            <div className="w-full h-64 bg-[#5D4037] rounded-md flex items-center justify-center">
              {/* Image Placeholder */}
              <span className="text-[#F5F5DC]/70 text-sm">
                Image
              </span>
            </div>

            <Link
              href="/register/tourist"
              className="mt-4 w-full text-center py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded hover:bg-[#66BB6A] transition no-underline"
            >
              Tourist (Local / Foreign)
            </Link>
          </div>

          {/* Wildlife Officer */}
          <div className="flex flex-col items-center">
            <div className="w-full h-64 bg-[#5D4037] rounded-md flex items-center justify-center">
              <span className="text-[#F5F5DC]/70 text-sm">
                Image
              </span>
            </div>

            <Link
              href="/register/wildlife-officer"
              className="mt-4 w-full text-center py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded hover:bg-[#66BB6A] transition no-underline"
            >
              Wildlife Officer
            </Link>
          </div>

          {/* Wildlife Photographer */}
          <div className="flex flex-col items-center">
            <div className="w-full h-64 bg-[#5D4037] rounded-md flex items-center justify-center">
              <span className="text-[#F5F5DC]/70 text-sm">
                Image
              </span>
            </div>

            <Link
              href="/register/photographer"
              className="mt-4 w-full text-center py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded hover:bg-[#66BB6A] transition no-underline"
            >
              Wildlife Photographer
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
