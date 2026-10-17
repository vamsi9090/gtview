'use client';
import Link from 'next/link';
import {ArrowRight,ChevronRight,ShieldCheck,BookmarkCheck,LifeBuoy,ClipboardCheck,Package,Smartphone,ScanLine,Wifi,BadgeCheck} from 'lucide-react';
import {usePortal} from './provider';
import {resumePath} from '@/lib/gtview/state';
import {MountLab} from './mount-lab';
import {withBasePath} from '@/lib/gtview/base-path';

// Mirrors the six phases in the guide's own progress tracker, so the promise matches the journey.
const steps=[
  {n:'01',title:'Prepare',line:'Park safely and confirm your invitation and vehicle.',href:'/before-you-start',Icon:ClipboardCheck},
  {n:'02',title:'Unbox',line:'Lay out the kit and tick off each item.',href:'/unbox',Icon:Package},
  {n:'03',title:'Install',line:'Position, secure, aim and power the phone.',href:'/install',Icon:Smartphone},
  {n:'04',title:'Align',line:'Check the real road view is level and clear.',href:'/alignment-check',Icon:ScanLine},
  {n:'05',title:'Connect',line:'Run the official test and note each result.',href:'/connect-and-test',Icon:Wifi},
  {n:'06',title:'Review',line:'Check everything once and save your confirmation.',href:'/review',Icon:BadgeCheck},
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
      <p className="ax-lede">You’re invited to help map your city. Set up your phone in six short, guided phases.</p>
      <div className="ax-ctas">
        <Link className="btn pink" href={startHref} onClick={()=>patch({started:true})}>{ready&&state.started?'Continue my setup':'Let’s set up your phone'}<ArrowRight size={19}/></Link>
        <a className="ax-link" href="#how-it-works">See how it works<ChevronRight size={18}/></a>
      </div>
      <figure className="ax-hero-art">
        <img src={withBasePath('/assets/gt-hero-wide.webp')} width="2400" height="1120" fetchPriority="high" alt="Illustration: a phone in landscape, mounted high on the inside of the windshield with a suction-cup mount, its screen showing a live road view with a REC indicator."/>
      </figure>
      <p className="ax-note"><ShieldCheck size={16} aria-hidden="true"/>Stay parked. Take your time. We’ll guide you.</p>
    </section>

    <section id="how-it-works" className="ax-section" aria-labelledby="steps-title">
      <header className="ax-head">
        <p className="ax-kicker">Less guesswork. More confidence.</p>
        <h2 id="steps-title">Six short phases.<br/>One clear road view.</h2>
        <p>Your progress saves as you go, so you can stop after any phase and pick up right where you left off.</p>
      </header>
      <div className="ax-bento">
        {steps.map(({n,title,line,href,Icon})=><Link key={n} href={href} className="ax-tile" aria-label={'Phase '+n+', '+title+': '+line}>
          <Icon size={30} aria-hidden="true"/>
          <span className="ax-step">Phase {n}</span>
          <h3>{title}</h3>
          <p>{line}</p>
          <span className="ax-tile-link">Open<ChevronRight size={16}/></span>
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
