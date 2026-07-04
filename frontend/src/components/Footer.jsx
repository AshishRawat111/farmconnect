import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const sections = [
    {
      title: "Platform",
      links: ["Marketplace", "Weather", "Prices", "AI Assistant"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "FAQs", "Community"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookies"],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#050505] text-white py-16">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[10%] w-[300px] h-[300px] bg-emerald-900/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto grid gap-10 px-6 md:grid-cols-4">

        {/* LOGO + ABOUT */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              <Sprout className="h-5 w-5 text-emerald-400" />
            </div>

            <span className="text-xl font-bold tracking-wide">
              Farm<span className="text-emerald-500">Connect</span>
            </span>
          </Link>

          <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xs">
            Empowering farmers with technology by connecting them directly to buyers,
            ensuring fair pricing, transparency, and fresh produce across India.
          </p>
        </div>

        {/* LINKS */}
        {sections.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {col.title}
            </h4>

            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <span className="cursor-pointer text-sm text-zinc-400 hover:text-emerald-400 transition duration-200">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto mt-12 px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 px-6 gap-4">
        <p>© 2026 FarmConnect. All rights reserved.</p>

        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-emerald-400 transition">Privacy</span>
          <span className="cursor-pointer hover:text-emerald-400 transition">Terms</span>
          <span className="cursor-pointer hover:text-emerald-400 transition">Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;