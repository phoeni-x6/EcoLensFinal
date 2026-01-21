export default function UserRegisterPage() {
  return (
    <section className="bg-[#F5F5DC] min-h-screen flex items-center justify-center py-20">
      <div className="bg-[#E0E0E0] w-full max-w-xl px-10 py-12 rounded-lg shadow-lg border border-[#90CAF9]">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#263238] mb-8">
          EcoLens Register
        </h1>

        {/* Form */}
        <form className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded-full hover:bg-[#66BB6A] transition"
          >
            Register
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-[#263238]">
          Already registered?{" "}
          <a
            href="/login"
            className="font-medium text-[#2E7D32] hover:underline"
          >
            Login
          </a>
        </p>

      </div>
    </section>
  );
}
