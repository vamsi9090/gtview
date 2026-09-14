'use client';
import {createContext,useContext,useEffect,useState,useCallback,type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {toast} from 'sonner';
import {Toaster} from '@/components/ui/sonner';
import {initialState,stateSchema,storageKey,type PortalState} from '@/lib/gtview/state';
type Context={state:PortalState;patch:(p:Partial<PortalState>)=>void;check:(key:string,value:boolean)=>void;ready:boolean;saved:boolean;error:string;offline:boolean;save:()=>boolean};
const Ctx=createContext<Context|null>(null);
export function Provider({children}:{children:ReactNode}){const [state,setState]=useState(initialState);const[ready,setReady]=useState(false);const[saved,setSaved]=useState(false);const[error,setError]=useState('');const[restoreFailed,setRestoreFailed]=useState(false);const[offline,setOffline]=useState(false);const path=usePathname();
useEffect(()=>{try{const raw=localStorage.getItem(storageKey);if(raw){const parsed=stateSchema.safeParse(JSON.parse(raw));if(parsed.success){setState(parsed.data);setSaved(true)}else {setRestoreFailed(true);setError('Your saved checklist could not be read. Its stored copy has been kept. Complete a new checklist and choose Save and finish later to replace it, or get help. Saved photos are separate.')}}}catch{setRestoreFailed(true);setError('This browser could not load local progress. Keep this tab open and enable browser storage or get help.')}setReady(true);setOffline(!navigator.onLine);const on=()=>setOffline(!navigator.onLine);window.addEventListener('online',on);window.addEventListener('offline',on);return()=>{window.removeEventListener('online',on);window.removeEventListener('offline',on)}},[]);
const saveState=useCallback((s:PortalState)=>{try{localStorage.setItem(storageKey,JSON.stringify(s));setSaved(true);setError('');return true}catch{setSaved(false);setError('Your latest changes could not be saved on this browser. Keep this tab open, free storage, then choose Save and finish later to retry. Get help if this continues.');return false}},[]);
useEffect(()=>{if(ready&&!restoreFailed)saveState(state)},[state,ready,restoreFailed,saveState]);
useEffect(()=>{document.documentElement.classList.toggle('large-text',state.largeText)},[state.largeText]);
useEffect(()=>{if(ready&&['/before-you-start','/unbox','/install','/alignment-check','/connect-and-test','/review'].includes(path))setState(s=>({...s,lastPath:path}))},[path,ready]);
const patch=useCallback((p:Partial<PortalState>)=>setState(s=>({...s,...p})),[]);const check=useCallback((key:string,value:boolean)=>setState(s=>({...s,checks:{...s.checks,[key]:value},receipt:null})),[]);
const save=()=>{const ok=saveState(state);if(ok)setRestoreFailed(false);ok?toast.success('Your setup is saved on this browser. You can return here later.'):toast.error('Progress could not be saved. Keep this tab open and retry.');return ok};
return <Ctx.Provider value={{state,patch,check,ready,saved,error,offline,save}}>{children}<Toaster position="top-center" richColors/></Ctx.Provider>}
export function usePortal(){const value=useContext(Ctx);if(!value)throw Error('Portal provider missing');return value}
