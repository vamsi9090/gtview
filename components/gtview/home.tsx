'use client';
import Link from 'next/link';
import {ArrowRight,ChevronRight,ShieldCheck,BookmarkCheck,LifeBuoy} from 'lucide-react';
import {usePortal} from './provider';
import {resumePath} from '@/lib/gtview/state';
import {MountLab} from './mount-lab';
import {withBasePath} from '@/lib/gtview/base-path';

const steps=[
  {n:'01',title:'Position',line:'Find the approved spot on the windshield.',img:'gt-position',alt:'Illustration: a suction-cup mount pressed against the inside of the windshield, with a pink target marking the approved spot.'},
  {n:'02',title:'Secure',line:'Click the phone into its supplied mount.',img:'gt-secure',alt:'Illustration: the phone moving into the windshield mount, with pink marks showing the side clamps closing.'},
  {n:'03',title:'Align',line:'Level the horizon. Centre the road.',img:'gt-align',alt:'Illustration: the phone screen showing the road with a pink level line across the horizon.'},
  {n:'04',title:'Power',line:'Connect and tuck the cable away.',img:'gt-power',alt:'Illustration: the mounted phone with its cable tucked along the base of the windshield, held by two pink clips.'},
];

const promises=[
  {Icon:ShieldCheck,title:'Safe by design.',line:'Every step assumes you are parked, with checks before anything is attached.'},
  {Icon:BookmarkCheck,title:'Saved as you go.',line:'Progress stays on this browser, so you can stop and pick up where you left off.'},
  {Icon:LifeBuoy,title:'Help at every turn.',line:'Symptom-based checks and a ready-to-send support draft when something looks wrong.'},
];

export default function Home(){
  const {state,patch,ready}=usePortal();
  const startHref=state.started?resumePath(state):'/before-you-start';
  return <main id="main" className="ax-home">
    <section className="ax-hero" aria-labelledby="hero-title">
      <p className="ax-kicker">GTview Driver Setup</p>
      <h1 id="hero-title">A clear view.<br/>A confident <em>start.</em></h1>
      <p className="ax-lede">You’re invited to help build better maps. Set up your phone in four calm, guided steps.</p>
      <div className="ax-ctas">
        <Link className="btn pink" href={startHref} onClick={()=>patch({started:true})}>{ready&&state.started?'Continue my setup':'Let’s set up your phone'}<ArrowRight size={19}/></Link>
        <a className="ax-link" href="#how-it-works">See how it works<ChevronRight size={18}/></a>
      </div>
      <figure className="ax-hero-art">
        <img src={withBasePath('/assets/gt-hero.webp')} width="2400" height="1600" fetchPriority="high" alt="Illustration: a phone mounted on the inside of a car windshield with a suction-cup mount, its screen showing a live view of the road ahead."/>
      </figure>
      <p className="ax-note"><ShieldCheck size={16} aria-hidden="true"/>Stay parked. Take your time. We’ll guide you.</p>
    </section>

    <section id="how-it-works" className="ax-section" aria-labelledby="steps-title">
      <header className="ax-head">
        <p className="ax-kicker">Less guesswork. More confidence.</p>
        <h2 id="steps-title">Four moves.<br/>One clear road view.</h2>
        <p>Check your invitation and kit first. Then follow four focused steps before your final view and connection checks.</p>
      </header>
      <div className="ax-bento">
        {steps.map((s,i)=><Link key={s.n} href={'/install?stage='+(i+1)} className="ax-tile">
          <div className="ax-tile-copy">
            <span className="ax-step">Step {s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.line}</p>
            <span className="ax-tile-link">View step<ChevronRight size={16}/></span>
          </div>
          <img src={withBasePath('/assets/'+s.img+'.webp')} width="2400" height="1600" loading="lazy" alt={s.alt}/>
        </Link>)}
      </div>
    </section>

    <section id="mount-examples" className="ax-section ax-lab" aria-label="Practice the road view">
      <MountLab/>
    </section>

    <section className="ax-section" aria-labelledby="promise-title">
      <header className="ax-head">
        <p className="ax-kicker">Built for drivers</p>
        <h2 id="promise-title">Designed to get out of your way.</h2>
      </header>
      <div className="ax-promises">
        {promises.map(({Icon,title,line})=><article key={title}><Icon size={28} aria-hidden="true"/><h3>{title}</h3><p>{line}</p></article>)}
      </div>
    </section>

    <section className="phone-start ax-close" aria-labelledby="close-title">
      <div>
        <p className="eyebrow">Ready when you are</p>
        <h2 id="close-title">A little guidance.<br/>At every turn.</h2>
        <p>Save your place on this browser, revisit any step, or find help when something doesn’t look right.</p>
      </div>
      <div>
        <Link className="btn primary" href={startHref} onClick={()=>patch({started:true})}>{ready&&state.started?'Continue my setup':'Start with the essentials'}<ArrowRight size={18}/></Link>
        <Link className="phone-secondary" href="/troubleshooting">Something not right? Find help →</Link>
      </div>
    </section>
  </main>
}
