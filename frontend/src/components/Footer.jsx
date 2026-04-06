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
    <footer className="border-t bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto grid gap-8 px-6 md:grid-cols-4">
        
        {/* Logo Section */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
              <Sprout className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              FarmConnect
            </span>
          </Link>

          <p className="mt-3 text-sm text-gray-600">
            Connecting farmers directly with buyers for fair prices and fresh produce.
          </p>
        </div>

        {/* Links Sections */}
        {sections.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-semibold text-gray-800">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <span className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 transition">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-8 border-t pt-6 text-center text-xs text-gray-500 px-6">
        © 2026 FarmConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;