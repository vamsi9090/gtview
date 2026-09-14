import {z} from 'zod';
export const storageKey='gtview-portal-v2';
export const draftSchema=z.object({kind:z.string(),message:z.string(),contact:z.string(),device:z.string(),vehicle:z.string(),reference:z.string(),time:z.string()});
export const stateSchema=z.object({version:z.literal(1),started:z.boolean(),lastPath:z.string(),checks:z.record(z.boolean()),vehicle:z.string(),invitation:z.string(),phoneInstallStage:z.number().int().min(0).max(3).default(0),installStep:z.number().int().min(0).max(8),diagnostics:z.record(z.enum(['unreviewed','confirmed','attention'])),alignment:z.enum(['unreviewed','confirmed','attention','uncertain']),largeText:z.boolean(),receipt:z.object({id:z.string(),time:z.string()}).nullable(),supportDraft:draftSchema.nullable()});
export type PortalState=z.infer<typeof stateSchema>;
export const initialState:PortalState={version:1,started:false,lastPath:'/before-you-start',checks:{},vehicle:'',invitation:'',installStep:0,phoneInstallStage:0,diagnostics:{},alignment:'unreviewed',largeText:false,receipt:null,supportDraft:null};
export function isPreparationReady(s:PortalState){return s.invitation==='current'&&s.vehicle==='matches'&&Array.from({length:6},(_,i)=>s.checks['safe-'+i]).every(Boolean)}
export function isKitReady(s:PortalState){return ['device','mount','attachment','cable','clips','wipe','guide','card'].every(x=>s.checks['kit-'+x])}
export function isInstallationReady(s:PortalState){return Array.from({length:4},(_,i)=>s.checks['phone-stage-'+i]).every(Boolean)}
export function isAlignmentReady(s:PortalState){return s.alignment==='confirmed'&&Array.from({length:4},(_,i)=>s.checks['align-'+i]).every(Boolean)}
export function isConnectionReady(s:PortalState){return Array.from({length:7},(_,i)=>s.diagnostics[i]==='confirmed').every(Boolean)}
export function isReviewReady(s:PortalState){return isPreparationReady(s)&&isKitReady(s)&&isInstallationReady(s)&&isAlignmentReady(s)&&isConnectionReady(s)&&!!s.checks.attestation}
export function completedPhases(s:PortalState){return [isPreparationReady(s),isKitReady(s),isInstallationReady(s),isAlignmentReady(s),isConnectionReady(s),!!s.receipt&&isReviewReady(s)]}
export function resumePath(s:PortalState){const allowed=['/before-you-start','/unbox','/install','/alignment-check','/connect-and-test','/review'];return allowed.includes(s.lastPath)?s.lastPath:'/before-you-start'}
