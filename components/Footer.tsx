"use client";

export default function Footer() {
  const links = [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter / X", href: "https://x.com" },
  ];

  return (
    <footer
      className="py-16 px-6 relative"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)" }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* brand */}
        <div>
          <p
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-gradient">Side</span>
            <span style={{ color: "#f0f0f0" }}>on</span>
            <span className="text-gradient">AI</span>
          </p>
          <p className="text-sm" style={{ color: "rgba(240,240,240,0.35)" }}>
            어떤 도메인이든, AI를 더하면 달라진다.
          </p>
        </div>

        {/* links */}
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-200 hover:opacity-100"
              style={{
                color: "rgba(240,240,240,0.4)",
                fontFamily: "var(--font-space-grotesk)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#8b5cf6";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(240,240,240,0.4)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* contact */}
        <div className="text-right">
          <a
            href="mailto:hello@sideonai.com"
            className="text-sm transition-colors duration-200"
            style={{ color: "#06b6d4", fontFamily: "var(--font-space-grotesk)" }}
          >
            hello@sideonai.com
          </a>
          <p className="text-xs mt-1" style={{ color: "rgba(240,240,240,0.2)" }}>
            © 2026 Sideonai
          </p>
        </div>
      </div>
    </footer>
  );
}
