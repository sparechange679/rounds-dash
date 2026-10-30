import {useRef, useState, type SyntheticEvent} from 'react'
import {Link} from 'react-router-dom'
import photo from '@/assets/login-hospital.jpg'
import {BrandMark} from '@/components/layout/BrandMark.tsx'
import {Button, ButtonLink} from '@/components/ui/Button.tsx'
import {Checkbox, Field, Input} from '@/components/ui/Form.tsx'
import {FormDone} from '@/components/ui/FormDone.tsx'
import {Icon} from '@/components/icons/Icon.tsx'

type Errors = { id?: string; password?: string }

const overlay = {
    backgroundImage: [
        'linear-gradient(rgba(94,224,193,.07) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(94,224,193,.07) 1px, transparent 1px)',
        'linear-gradient(180deg, rgba(11,42,74,.55) 0%, rgba(6,23,42,.96) 78%)',
    ].join(', '),
    backgroundSize: '24px 24px, 24px 24px, 100% 100%',
}

const status = [
    {text: 'Patient record sync', time: '09:41'},
    {text: 'Laboratory interface online'},
    {text: 'Imaging archive online'},
]

export default function Login() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [showPw, setShowPw] = useState(false)
    const [showForgot, setShowForgot] = useState(false)
    const [errors, setErrors] = useState<Errors>({})
    const [done, setDone] = useState(false)
    const idRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const next: Errors = {}
        if (!id.trim()) next.id = 'Enter your staff ID or hospital email.'
        if (password.length < 8) next.password = 'Passwords have at least 8 characters.'
        setErrors(next)
        if (next.id) {
            idRef.current?.focus()
            return
        }
        if (next.password) {
            passRef.current?.focus()
            return
        }
        setDone(true)
    }

    return (
        <div className="grid min-h-screen bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <a
                href="#main"
                className="absolute -top-20 left-3 z-[2000] rounded bg-ink px-3.5 py-2.5 font-semibold text-surface focus:top-3 focus:no-underline"
            >
                Skip to main content
            </a>

            <aside aria-label="About Rounds"
                   className="relative order-first flex min-h-[210px] items-end overflow-hidden bg-navy text-white lg:order-2">
                <img src={photo} alt="Geometric white facade of a modern building" width={1200} height={1400}
                     className="absolute inset-0 size-full object-cover opacity-[.38] contrast-110 grayscale"/>
                <div className="absolute inset-0 z-[1]" style={overlay} aria-hidden="true"/>
                <div className="relative z-[2] max-w-[560px] px-6 py-[30px] lg:p-12">
                    <p className="mb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[.16em] text-mint">
                        St. Aldric General Hospital
                    </p>
                    <p className="text-[22px] font-medium leading-tight tracking-[-.015em] lg:mb-7 lg:text-[30px] lg:leading-tight">
                        Beds, clinics and ward rounds on one screen, from the bed meeting to the night handover.
                    </p>
                    <ul aria-label="System status"
                        className="hidden gap-[9px] rounded-lg border border-white/15 bg-[#06182b]/55 px-4 py-3.5 font-mono text-[12.5px] text-[#c7d6e6] lg:grid">
                        {status.map((s) => (
                            <li key={s.text} className="flex items-center">
                                <span aria-hidden="true"
                                      className="mr-2.5 inline-block size-2 rounded-full bg-mint shadow-[0_0_0_3px_rgba(94,224,193,.2)]"/>
                                {s.text}
                                {s.time && <span className="ml-auto text-white">{s.time}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className="flex min-h-0 flex-col px-4 pt-[18px] sm:px-6 lg:order-1 lg:min-h-screen lg:px-11 lg:pt-[26px]">
                <header>
                    <Link to="/" className="inline-flex items-center gap-[11px] hover:no-underline">
                        <BrandMark/>
                        <span className="flex flex-col leading-[1.1]">
                            <span className="text-[17px] font-bold tracking-[-.01em] text-ink">Rounds</span>
                            <span className="mt-0.5 font-mono text-[10.5px] tracking-[.04em] text-muted">Hospital management</span>
                        </span>
                    </Link>
                </header>

                <main id="main" tabIndex={-1}
                      className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-8 outline-none lg:py-10">
                    <h1 className="mb-1.5 text-2xl tracking-[-.02em] sm:text-[28px]">Sign in to Rounds</h1>
                    <p className="mb-[26px] text-[14.5px] text-muted">
                        Use your staff ID or hospital email. Shared workstations sign out after 15 minutes idle.
                    </p>

                    <form onSubmit={onSubmit} noValidate className="grid gap-4">
                        <Field label="Staff ID or email" htmlFor="l-id" error={errors.id}>
                            <Input id="l-id" ref={idRef} value={id} onChange={(e) => setId(e.target.value)}
                                   invalid={!!errors.id} required autoComplete="username"
                                   placeholder="e.g. SA-10482 or a.okafor@example.com"
                                   className="h-11! text-[15px]!"/>
                        </Field>

                        <Field label="Password" htmlFor="l-pass" error={errors.password}
                               labelAction={
                                   <button type="button" aria-expanded={showForgot} aria-controls="forgot-panel"
                                           onClick={() => setShowForgot((s) => !s)}
                                           className="text-[13px] font-medium text-link hover:underline">
                                       Forgot password?
                                   </button>
                               }>
                            <div className="relative">
                                <Input id="l-pass" ref={passRef} type={showPw ? 'text' : 'password'}
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                       invalid={!!errors.password} required minLength={8}
                                       autoComplete="current-password" className="h-11! pr-12 text-[15px]!"/>
                                <button type="button" aria-label="Show password" aria-pressed={showPw}
                                        onClick={() => setShowPw((s) => !s)}
                                        className="absolute right-1 top-[3px] grid size-[38px] place-items-center rounded text-muted hover:bg-surface-3 hover:text-ink aria-pressed:bg-surface-3 aria-pressed:text-ink">
                                    <Icon name="eye"/>
                                </button>
                            </div>
                        </Field>

                        <div id="forgot-panel" hidden={!showForgot}
                             className="rounded bg-tint-sky px-3.5 py-3 text-[13px]">
                            <p>
                                <strong>Password reset.</strong> Contact the IT service desk on{' '}
                                <span className="font-mono">555-0199</span> or ext.{' '}
                                <span className="font-mono">4000</span>, available 24 hours. Have your staff ID ready.
                            </p>
                        </div>

                        <Checkbox id="l-remember" label="Remember this workstation for 12 hours"
                                  checked={remember} onChange={(e) => setRemember(e.target.checked)}/>

                        <Button type="submit" size="lg" block><Icon name="lock"/> Sign in</Button>

                        {done && (
                            <FormDone inline title="Details accepted"
                                      actions={
                                          <ButtonLink to="/" variant="outline">
                                              Continue to the overview <Icon name="arrowRight" className="size-[15px]"/>
                                          </ButtonLink>
                                      }>
                                This demo has no authentication; connect the form to your identity provider.
                            </FormDone>
                        )}
                    </form>

                    <p className="mt-6 flex items-start gap-2 text-[12.5px] text-muted">
                        <Icon name="shield" className="mt-px size-[15px]"/>
                        <span>
                            Access is logged and audited. Report a lost smart card to security on ext.{' '}
                            <span className="font-mono">2222</span>.
                        </span>
                    </p>
                </main>

                <footer className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-line py-4 text-[12.5px] text-muted">
                    <p>© St. Aldric General Hospital · Rounds HMS 2.4</p>
                    <p>Template by <a href="https://uicookies.com/">uiCookies</a></p>
                </footer>
            </div>
        </div>
    )
}