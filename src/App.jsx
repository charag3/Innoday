import Hero from './components/Hero'
import RSVPForm from './components/RSVPForm'
import styles from './App.module.css'

const VARIANTS = {
  nacional: {
    image: '/corp-national.png',
    dates: 'October 27 – 28, 2026',
    address: 'Medellín 65, Roma Norte — Mexico City',
    eventValue: 'Nacional — October 27–28, 2026',
    successDates: 'October 27 – 28',
  },
  internacional: {
    image: '/corp-internacional.png',
    dates: 'October 29 – 30, 2026',
    address: 'Medellín 65, Roma Norte — Mexico City',
    eventValue: 'Internacional — October 29–30, 2026',
    successDates: 'October 29 – 30',
  },
}

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const key = params.get('v') === 'internacional' ? 'internacional' : 'nacional'
  const variant = VARIANTS[key]

  return (
    <div className={styles.page}>
      <Hero variant={variant} />
      <RSVPForm variant={variant} />
    </div>
  )
}
