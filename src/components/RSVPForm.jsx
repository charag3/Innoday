import { useState } from 'react'
import styles from './RSVPForm.module.css'

const FORMSPREE_ENDPOINT = 'PLACEHOLDER_FORMSPREE_ENDPOINT'

const FIELDS = [
  { id: 'name',    label: 'Full Name',               type: 'text',  placeholder: 'Your name',          required: true,  autocomplete: 'name' },
  { id: 'company', label: 'Company / Organization',  type: 'text',  placeholder: 'Your company',       required: true,  autocomplete: 'organization' },
  { id: 'role',    label: 'Job Title',                type: 'text',  placeholder: 'Your position',      required: false, autocomplete: 'organization-title' },
  { id: 'email',   label: 'Email Address',            type: 'email', placeholder: 'you@company.com',    required: true,  autocomplete: 'email' },
  { id: 'phone',   label: 'WhatsApp / Phone',         type: 'tel',   placeholder: '+52 55 0000 0000',   required: false, autocomplete: 'tel' },
]

export default function RSVPForm({ variant }) {
  const [values, setValues] = useState({
    name: '', company: '', role: '', email: '', phone: '', guests: '', notes: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, event: variant.eventValue }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.success}>
            <p className={styles.successTitle}>See you there.</p>
            <p className={styles.successSub}>
              Your RSVP has been confirmed.<br />
              We look forward to welcoming you on {variant.successDates}.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="rsvp">
      <div className={styles.inner}>
        <p className={styles.heading}>Confirm your attendance</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid}>
            {FIELDS.map(f => (
              <div className={styles.field} key={f.id}>
                <label htmlFor={f.id}>{f.label}</label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  autoComplete={f.autocomplete}
                  value={values[f.id]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className={styles.field}>
              <label htmlFor="guests">Number of Attendees</label>
              <div className={styles.selectWrap}>
                <select
                  id="guests"
                  name="guests"
                  required
                  value={values.guests}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label htmlFor="notes">Comments or dietary restrictions</label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                placeholder="Optional..."
                value={values.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          {status === 'error' && (
            <p className={styles.error}>Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            className={styles.btn}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Confirm Attendance →'}
          </button>

          <p className={styles.note}>
            Your information is shared only with the Schwan Cosmetics team.
          </p>
        </form>

        <div className={styles.logoWrap}>
          <img src="/schwan_logo_stacked_red.svg" alt="Schwan Cosmetics" className={styles.logo} />
        </div>
      </div>
    </section>
  )
}
