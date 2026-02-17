import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-6 py-20">

      <div className="w-full max-w-6xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-12 text-white">

        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4">
            Join EcoLens
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Become part of a responsible wildlife community. Choose how you
            want to explore, contribute, or protect nature.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Tourist */}
          <Link
            href="/register/tourist"
            className="group bg-white/10 border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-5xl mb-6">🌍</div>
            <h2 className="text-xl font-semibold mb-3">
              Tourist
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Discover wildlife locations, explore safely, and engage with the
              EcoLens community.
            </p>
            <div className="py-2 bg-emerald-500 rounded-lg group-hover:bg-emerald-600 transition">
              Register as Tourist
            </div>
          </Link>

          {/* Wildlife Officer */}
          <Link
            href="/register/wildlife-officer"
            className="group bg-white/10 border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-5xl mb-6">🛡️</div>
            <h2 className="text-xl font-semibold mb-3">
              Wildlife Officer
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Monitor protected zones, review community reports, and safeguard
              endangered species.
            </p>
            <div className="py-2 bg-emerald-500 rounded-lg group-hover:bg-emerald-600 transition">
              Register as Officer
            </div>
          </Link>

          {/* Photographer */}
          <Link
            href="/register/photographer"
            className="group bg-white/10 border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-5xl mb-6">📸</div>
            <h2 className="text-xl font-semibold mb-3">
              Wildlife Photographer
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Share your wildlife photography, build your portfolio, and inspire
              conservation.
            </p>
            <div className="py-2 bg-emerald-500 rounded-lg group-hover:bg-emerald-600 transition">
              Register as Photographer
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
