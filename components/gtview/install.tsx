'use client';
import {useEffect,useState} from 'react';
import {ArrowRight,Check,ChevronLeft,Save,Smartphone,ShieldCheck} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {usePortal} from './provider';
import {withBasePath} from '@/lib/gtview/base-path';
import {Guided,CheckRow,Notice,HelpLink} from './ui';
import {MountLab} from './mount-lab';
import {isPreparationReady,isKitReady} from '@/lib/gtview/state';

const stages=[
 {short:'Position',title:'Give your phone a clear view.',description:'Your supplied phone captures the road. Start with the approved dashboard position for your vehicle.',steps:['Park safely and keep your kit instructions nearby.','Find the approved holder position. Keep the windshield view, controls and airbags clear.','Prepare the surface using the kit’s cleaning instructions.'],confirm:'I checked the approved position and prepared the surface.'},
 {short:'Secure',title:'A steady holder. A secure phone.',description:'Attach the supplied holder, then seat the phone with its rear camera facing the road.',steps:['Follow the holder’s attachment instructions, including any required waiting time.','Place the phone in the holder. Keep the rear camera and its view unobstructed.','Use the kit’s stability check. Stop if the holder or phone moves.'],confirm:'The holder and phone are secure using the approved check.'},
 {short:'Align',title:'See the road. Keep it level.',description:'Use the official phone preview and alignment guidance to check what the rear camera sees.',steps:['Open the official camera preview while parked.','Adjust the holder so the road is visible and the horizon matches the approved guidance.','Check for dashboard, holder, cable or windshield obstructions.'],confirm:'I checked the phone’s actual view using the official alignment guidance.'},
 {short:'Power',title:'Tidy cable. Ready for checks.',description:'Connect power using the approved instructions, then continue to the road-view and connection checks.',steps:['Use the supplied cable and approved power source.','Secure the cable away from steering, pedals, airbags and moving parts.','Recheck the phone and holder after routing the cable. Remain parked for the next checks.'],confirm:'Power and cable routing follow my kit instructions.'},
];
export default function Install(){
 const {state,patch,check,ready,save,saved}=usePortal();const router=useRouter();
 const [stage,setStage]=useState(0);
 useEffect(()=>{if(ready){const requested=Number(new URLSearchParams(window.location.search).get('stage'));setStage(requested>=1&&requested<=4?requested-1:state.phoneInstallStage)}},[ready]);
 const go=(n:number)=>{setStage(n);patch({phoneInstallStage:n});};
 const current=stages[stage];const prerequisites=ready&&isPreparationReady(state)&&isKitReady(state);
 const earlierDone=stages.slice(0,stage).every((_,i)=>state.checks['phone-stage-'+i]);
 const checked=!!state.checks['phone-stage-'+stage];const canConfirm=prerequisites&&earlierDone;
 return <Guided phase={2} title="Four simple steps to road-ready." description="Your phone is the road-facing device. Follow along while safely parked." eyebrow="The phone installation guide">
 <div className="phone-install">
 <nav className="phone-stages" aria-label="Installation stages">{stages.map((s,i)=><button key={s.short} onClick={()=>go(i)} aria-current={stage===i?'step':undefined} className={stage===i?'active':''}><span>{state.checks['phone-stage-'+i]?<Check size={18}/>:i+1}</span><strong>{s.short}</strong><small>{state.checks['phone-stage-'+i]?'Confirmed':stage===i?'You are here':'View step'}</small></button>)}</nav>
 <div className="phone-stage-body"><figure className="phone-photo"><img src={withBasePath("/assets/phone-dashboard.webp")} width="1200" height="800" alt="Concept photograph of hands placing a phone in a dashboard holder, with the road visible ahead."/><figcaption><Smartphone size={16}/> Supplied phone + dashboard holder <span>Concept placement</span></figcaption></figure><section className="phone-instruction" aria-live="polite"><p className="eyebrow">STEP 0{stage+1} / 04</p><h2>{current.title}</h2><p>{current.description}</p><ol>{current.steps.map((step,i)=><li key={step}><span>{i+1}</span>{step}</li>)}</ol><HelpLink/></section></div>
 <details className="phone-detail" open={stage===2}><summary>What does a good road view look like?</summary><MountLab/></details>
 <Notice><ShieldCheck size={16}/> Exact placement, attachment, waiting time and angle limits come from your approved kit. The illustration and practice view do not verify your installation.</Notice>
 {!prerequisites&&<Notice tone="warning">You can explore all four steps. <a href="/before-you-start">Complete preparation</a> and <a href="/unbox">check your kit</a> before confirming them.</Notice>}
 {Object.keys(state.checks).some(k=>k.startsWith('install-')&&state.checks[k])&&!state.checks['phone-stage-0']&&<Notice>The phone guide has changed. Review these four phone checks; your other saved progress is kept.</Notice>}
 <CheckRow label={current.confirm} checked={checked} disabled={!canConfirm} detail={!earlierDone?'Confirm the earlier phone steps first.':undefined} onChange={value=>{if(canConfirm)check('phone-stage-'+stage,value)}}/>
 <div className="phone-actions"><button className="back-link" onClick={()=>stage?go(stage-1):router.push('/unbox')}><ChevronLeft size={18}/>{stage?'Previous':'Your kit'}</button><button className="phone-save" onClick={save}><Save size={17}/>Save for later</button><button className="btn primary" disabled={!canConfirm||!checked} onClick={()=>stage<3?go(stage+1):router.push('/alignment-check')}>{stage<3?'Next: '+stages[stage+1].short:'Check road view'}<ArrowRight size={18}/></button></div><p className="phone-save-note">{saved?'Progress saved on this browser.':'Your progress saves on this browser when storage is available.'} Return to the same browser to continue.</p>
 </div></Guided>
}
