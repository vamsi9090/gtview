export type EventName='setup_started'|'safety_checklist_completed'|'package_item_missing'|'installation_step_viewed'|'installation_step_completed'|'animation_replayed'|'help_opened'|'alignment_passed'|'alignment_failed'|'connectivity_test_passed'|'connectivity_test_failed'|'troubleshooting_flow_started'|'support_contacted'|'installation_submitted'|'setup_completed'|'setup_abandoned';
// Disabled adapter: no requests, identifiers, images, location, or personal data.
// Connect an approved consent-aware adapter before enabling production analytics.
export function track(_event:EventName,_data?:{step?:number;mode?:'manual'|'local';result?:'confirmed'|'attention'|'uncertain'}){return;}
