import styles from './Hero.module.css'

export default function Hero({ variant }) {
  return (
    <section className={styles.hero}>
      <div className={styles.frameWrap} id="top">
        <picture>
          <source media="(max-width: 640px)" srcSet="/hero-mobile.png" />
          <img className={styles.photo} src="/hero-modelo.png" alt="Innodays Amxricas 2026" />
        </picture>

        <div className={styles.overlay}>
          <p className={styles.title}>
            INNODAYS A<span className={styles.mx}>MX</span>RICAS
          </p>
          <p className={styles.dates}>{variant.dates}</p>
          <p className={styles.address}>{variant.address}</p>
          <p className={styles.rsvpBy}>Kindly RSVP by October 1</p>
        </div>
      </div>
    </section>
  )
}
