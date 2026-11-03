import { profileCopy } from "@/lib/i18n/profile";
import type { Locale } from "@/lib/i18n/locales";
import { PROFILE_LINKS } from "@/lib/profile/links";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface ProfileSectionProps {
  locale: Locale;
}

export function ProfileSection({ locale }: ProfileSectionProps) {
  const copy = profileCopy[locale];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
      <section id="about" aria-labelledby="about-title" className="scroll-mt-28 border-t border-foreground/10 pt-16">
        <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">{copy.aboutEyebrow}</p>
        <h2
          id="about-title"
          className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {copy.aboutTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">{copy.aboutLead}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{copy.aboutBody}</p>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-title"
        className="scroll-mt-28 mt-14 border-t border-foreground/10 pt-12"
      >
        <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">
          {copy.experienceEyebrow}
        </p>
        <h2
          id="experience-title"
          className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {copy.experienceTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{copy.experienceLead}</p>

        <ul className="mt-8 border-t border-foreground/10">
          {copy.experience.map((item) => (
            <li
              key={item.id}
              className="grid gap-2 border-b border-foreground/10 py-5 sm:grid-cols-[minmax(11rem,0.34fr)_minmax(0,0.66fr)] sm:gap-8"
            >
              <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="max-w-prose text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="scroll-mt-28 mt-14 border-t border-foreground/10 pt-12"
      >
        <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">{copy.contactEyebrow}</p>
        <h2
          id="contact-title"
          className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {copy.contactTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{copy.contactLead}</p>
        <p className="mt-2 text-sm text-muted">{PROFILE_LINKS.location[locale]}</p>

        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <a
            href={PROFILE_LINKS.emailHref}
            className={`${focusRing} inline-flex border border-cyan/40 bg-cyan/10 px-3 py-2 font-medium text-cyan`}
          >
            {copy.contactCta}
          </a>
          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-cyan ${focusRing}`}
          >
            {copy.githubLabel}
          </a>
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-cyan ${focusRing}`}
          >
            {copy.linkedinLabel}
          </a>
          <a
            href={PROFILE_LINKS.cv}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-cyan ${focusRing}`}
          >
            {copy.cvLabel}
          </a>
        </p>
        <p className="mt-3 font-mono text-xs tracking-wide text-muted">
          <span className="sr-only">{copy.emailLabel}: </span>
          {PROFILE_LINKS.email}
        </p>
      </section>
    </div>
  );
}
