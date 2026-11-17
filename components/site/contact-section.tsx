import { Ident } from "@/components/site/code"
import { NEW_TAB_SR, contactChannels, contactSection, cvLinks, email, sectionMood } from "@/lib/portfolio-content"
import styles from "./sections.module.css"

const [emailUser, emailDomain] = email.split("@")

/** Contacto: email as the primary action, channels as key/value rows, both CV downloads. */
export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      data-mood={sectionMood.contacto}
      className="px-pad py-[104px] max-[900px]:py-[72px]"
    >
      <div className="mx-auto grid max-w-[1340px] grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-[clamp(28px,4vw,64px)] max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:gap-6">
        <header>
          <Ident ident={contactSection.ident} className="mt-3" />
          <h2
            id="contact-title"
            className="mt-2.5 font-display text-[clamp(30px,2.6vw,40px)] font-bold leading-[1.12] tracking-[-0.025em]"
          >
            {contactSection.title}
          </h2>
          <p className="mt-3 max-w-[34em] text-ink-muted">{contactSection.lead}</p>
        </header>

        <div className="glass px-[34px] pb-[30px] pt-[34px] max-[900px]:p-5">
          <a className={styles.mail} href={`mailto:${email}`}>
            {emailUser}
            <wbr />@{emailDomain}
          </a>

          <ul className={styles.channels}>
            {contactChannels.map((channel) => (
              <li key={channel.key}>
                <a href={channel.href} target="_blank" rel="noopener noreferrer">
                  <span className={styles.channelKey}>{channel.key}</span>
                  <span className={styles.channelValue}>{channel.label}</span>
                  <span className={styles.channelGo} aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only">{NEW_TAB_SR}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-[26px] flex flex-wrap gap-3">
            {cvLinks.map((cv) => (
              <a
                key={cv.href}
                className={cv.primary ? "action-btn action-btn-primary" : "action-btn"}
                href={cv.href}
                hrefLang={cv.lang}
                download
              >
                {cv.label} <small>{cv.suffix}</small>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
