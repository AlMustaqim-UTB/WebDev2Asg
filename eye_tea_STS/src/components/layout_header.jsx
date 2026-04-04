import React, { useState } from "react";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-white font-bold">
            E
          </span>
          <span className="text-xl font-semibold text-slate-900">EyeTea</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-slate-700 hover:text-slate-900 transition">
            Home
          </a>
          <a href="#" className="text-slate-700 hover:text-slate-900 transition">
            Features
          </a>
          <a href="#" className="text-slate-700 hover:text-slate-900 transition">
            Pricing
          </a>
          <a href="#" className="text-slate-700 hover:text-slate-900 transition">
            Contact
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Log in
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      <div id="mobile-menu" className={`md:hidden ${mobileOpen ? "block" : "hidden"} px-4 pb-4`}>
        <nav className="space-y-2">
          <a href="#" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">
            Home
          </a>
          <a href="#" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">
            Features
          </a>
          <a href="#" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">
            Pricing
          </a>
          <a href="#" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">
            Contact
          </a>
        </nav>

        <div className="mt-3 flex flex-col gap-2">
          <a
            href="#"
            className="rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Log in
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;