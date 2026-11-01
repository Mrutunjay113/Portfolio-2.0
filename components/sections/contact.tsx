import { ArrowUp, ArrowUpRight } from "lucide-react";
import { EmailCopy } from "@/components/contact/email-copy";
import { ExternalLink } from "@/components/ui/external-link";
import { contactInfo, profile, resume } from "@/lib/portfolio-data";

/** Trailing ↗ that nudges and turns accent on hover of the parent `.group`. */
function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden
      className="inline size-[1.1em] align-[-0.15em] transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal group-focus-visible:text-signal"
    />
  );
}

const linkCell =
  "group flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line py-[22px] text-[19px] tracking-[-0.02em] md:border-r md:border-b-0 md:pr-5 md:nth-[n+2]:pl-5 md:last:border-r-0";

const infoCell = linkCell;

export function Contact() {
  return (
    <section id="contact" className="pt-[clamp(100px,16vh,200px)]">
      <h2 data-reveal className="mono mb-7 text-mute">
        (06) Have a project in mind? Let&apos;s talk.
      </h2>
      <div data-reveal>
        <EmailCopy email={profile.email} />
      </div>

      {/* Links */}
      <div data-reveal className="mt-[72px] grid border-t border-ink md:grid-cols-3">
        <ExternalLink href={profile.github.href} className={linkCell}>
          GitHub
          <span className="mono text-right text-mute">
            {profile.github.label} <Arrow />
          </span>
        </ExternalLink>
        <ExternalLink href={profile.linkedin.href} className={linkCell}>
          LinkedIn
          <span className="mono text-right text-mute">
            {profile.linkedin.label} <Arrow />
          </span>
        </ExternalLink>
        <ExternalLink href={profile.phone.href} className={linkCell}>
          Phone
          <span className="mono text-right text-mute">
            {profile.phone.label} <Arrow />
          </span>
        </ExternalLink>
      </div>

      {/* Info row */}
      {/* Same label-left / value-right rhythm as the links row above. */}
      <div data-reveal className="grid border-line md:grid-cols-3 md:border-t">
        <div className={infoCell}>
          {contactInfo.offScreen.label}
          <span className="mono text-right text-mute">{contactInfo.offScreen.value}</span>
        </div>
        <div className={infoCell}>
          {contactInfo.location.label}
          <span className="mono text-right text-mute">{contactInfo.location.value}</span>
        </div>
        <a href={resume.href} download={resume.filename} className={infoCell}>
          {contactInfo.resume.label}
          <span className="mono text-right text-mute">
            {contactInfo.resume.value} <Arrow />
          </span>
        </a>
      </div>

      <footer className="mono mt-10 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line pt-14 pb-7 text-mute">
        <span>© 2026 Mrutunjay Yadav</span>
        <a href="#top" className="group inline-flex items-center gap-1.5">
          <span className="ulink">Back to top</span>
          <ArrowUp aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </footer>
    </section>
  );
}
