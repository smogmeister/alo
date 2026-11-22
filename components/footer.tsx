import { CookieSettingsButton } from "@/components/cookie-settings-button";

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-1 transition-colors duration-150 ease-quiet hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Footer() {
  return (
    <footer
      className="mx-auto w-full max-w-[1040px] px-5 pt-20 pb-8 text-center text-xs text-muted-foreground md:px-8"
      role="contentinfo"
    >
      <p className="mx-auto max-w-sm text-balance leading-relaxed">
        As an Amazon Associate I earn from qualifying purchases. Buying through these
        links supports me at no extra cost to you.
      </p>
      <nav
        aria-label="Footer navigation"
        className="mt-2 flex flex-wrap items-center justify-center gap-x-1"
      >
        <span>&copy; {new Date().getFullYear()} Smog</span>
        <span aria-hidden="true">·</span>
        <a href="https://beautified.app/imprint" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Imprint
        </a>
        <span aria-hidden="true">·</span>
        <a href="https://beautified.app/privacy" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Privacy
        </a>
        <span aria-hidden="true">·</span>
        <CookieSettingsButton className={linkClass} />
      </nav>
    </footer>
  );
}
