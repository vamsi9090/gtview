// CMS-ready content. Unknown operational details must stay visibly unapproved.
export const config = {
  brand: 'GTview', firstName: '[Driver first name]', reward: '[Eligible reward]',
  installTime: '[Approved installation time]', tools: '[Approved required tools]',
  weather: '[Approved weather requirements]', temperature: '[Device operating temperature]',
  mountingLocation: '[Approved mounting location]', mountingRules: '[Approved vehicle-specific mounting rules]',
  cleaning: '[Approved cleaning method]',
  alignmentTolerance: '[Required alignment tolerance]', power: '[Approved power source]',
  indicator: '[Expected indicator behavior]', cable: '[Approved vehicle-specific cable route]',
  supportUrl: '[Support URL]', supportPhone: '[Support phone number]', supportEmail: '[Support email]',
  supportHours: '[Support hours]', responseTime: '[Expected response time]',
  privacyUrl: '[Privacy policy URL]', termsUrl: '[Terms and conditions URL]',
  rewardRequirements: '[Reward eligibility requirements]', approved: false,
};
export const phases=[{label:'Prepare',href:'/before-you-start'},{label:'Unbox',href:'/unbox'},{label:'Install',href:'/install'},{label:'Align',href:'/alignment-check'},{label:'Connect',href:'/connect-and-test'},{label:'Review',href:'/review'}];
export const safetyChecks=[
'I’m parked in a safe, legal, well-lit place, away from traffic.',
'The engine is off, unless my kit instructions say otherwise.',
'The inside of the windshield is clean, dry and not hot to the touch.',
'I’ve read the weather and temperature limits in my kit instructions.',
'I have the kit and its instructions within reach.',
'I won’t install while driving or standing in traffic.'
];
export const inventory=[
{id:'device',name:'GTview phone',detail:'The supplied phone uses its rear camera to face the road.',why:'Captures the street view described by the program.',quantity:'[Approved quantity]'},
{id:'mount',name:'Windshield mount',detail:'The supplied suction-cup mount holds the phone at the approved windshield position.',why:'Secures the camera in its approved position.',quantity:'[Approved quantity]'},
{id:'attachment',name:'Attachment hardware',detail:'Any extra parts your mount needs, such as an adapter disc.',why:'Helps the suction cup seal on your windshield.',quantity:'[Approved quantity]'},
{id:'cable',name:'Power cable',detail:'The cable specified for your device.',why:'Connects to the approved power source.',quantity:'[Approved quantity]'},
{id:'clips',name:'Cable clips',detail:'The supplied cable-retention parts.',why:'Keeps the approved cable route tidy and secure.',quantity:'[Approved quantity]'},
{id:'wipe',name:'Cleaning wipe',detail:'Use only if specified in your kit.',why:'Prepares the surface using the approved method.',quantity:'[Approved quantity]'},
{id:'guide',name:'Alignment guide',detail:'Your kit’s placement template.',why:'Helps locate and orient the mount.',quantity:'[Approved quantity]'},
{id:'card',name:'Quick-start card',detail:'Instructions for the exact hardware.',why:'Provides the verified setup and support details.',quantity:'[Approved quantity]'}
];
export const diagnostics=['Power detected','Device started','Pairing completed','Network confirmed','Device registered','Test upload completed'];
export const alignmentChecks=['Device points straight down the road.','Horizon is level using the approved tolerance.','Bonnet, stickers, cables, wipers, and accessories do not block the view.','Mount is stable and the camera direction matches the approved guidance.'];
export const photoTypes=[{id:'front',label:'Front view',why:'Shows the overall placement. Avoid readable plates and bystanders.'},{id:'side',label:'Side view',why:'Shows the mount attachment and device orientation.'},{id:'driver',label:'Driver’s-eye view',why:'Shows whether driving visibility is obstructed. Exclude people and personal items.'},{id:'cable',label:'Cable routing',why:'Shows cable retention and clearance from controls.'},{id:'status',label:'Device status light',why:'Records the indicator for the official support team.'}];
export const faq=[
['What is GTview?','GTview is an invitation-only street-imaging program for selected drivers. The program described in this concept uses a road-facing device to help enrich map data.'],
['Why was I invited?','Your invitation explains your selection. [Approved selection and eligibility policy]'],
['What information does the device collect?','The program is described as capturing street-level imagery. [Approved complete data collection policy]'],
['Does the device record inside my vehicle?','[Approved interior-recording policy]. No claim about interior video or audio is verified in this concept.'],
['When does street-image collection occur?','[Approved collection schedule and activation conditions]'],
['How is imagery protected?','[Approved security, access, transfer, and retention policy]'],
['How do I receive the incentive?','Your eligible reward depends on your invitation. '+config.rewardRequirements+'. Completing this local guide does not issue a reward.'],
['How long does installation take?',config.installTime+'. Plan uninterrupted time and follow all required waiting periods.'],
['Can I use a different vehicle?','[Approved vehicle-change policy]. Pause and ask the program team before moving the device to another vehicle.'],
['Can I move the device?','[Approved repositioning procedure]. Release the suction mount only as your kit shows, then re-check the view.'],
['What if the mount becomes loose?','Park safely and stop using the device. Follow approved safety instructions and contact the program team.'],
['Can I drive in rain or snow?',config.weather+'. Do not assume weather resistance has been approved.'],
['How do I clean the device?','[Approved lens and device cleaning method]. Do not pressure-wash unless explicitly approved.'],
['What happens if the device is damaged?','Stop using an unsafe or damaged device. [Approved damage-reporting and replacement process]'],
['How do I return or remove it?','[Approved removal and return instructions]. Request the exact procedure before removing the mount.'],
['Who can I contact for help?','Use the program contact in your invitation. Public support details are not configured in this concept.']
];
export const doRules=[['Install while safely parked.','Stay away from active traffic.'],['Use the approved mounting location.','Vehicle-specific placement protects visibility and vehicle functions.'],['Clean and dry the mounting area.','Use the kit’s approved preparation method.'],['Keep the device facing forward.','Follow the approved alignment procedure.'],['Keep the lens clean.','Use the approved cleaning method.'],['Secure the cable.','Retain it along the approved route.'],['Recheck the mount regularly.','Follow [Approved inspection interval].'],['Follow weather and temperature guidance.','Use '+config.weather+' and '+config.temperature+'.'],['Report a loose or damaged device.','Park safely and stop using it.']];
export const dontRules=[['Don’t install while driving.','Setup needs your full attention in a safe location.'],['Don’t block visibility or vehicle equipment.','Keep clear of the windshield, lights, sensors, and license plate.'],['Don’t attach to unsuitable surfaces.','Avoid damage, moisture, dirt, or excessive heat.'],['Don’t substitute mounting parts.','Use only the supplied mount, clips and replacement parts.'],['Don’t open or modify the device.','Use the approved support process.'],['Don’t route near hazards.','Keep clear of airbags, pedals, steering, heat, sharp edges, and moving parts.'],['Don’t use an unsafe device.','Stop if it is loose, damaged, or overheating.'],['Don’t pressure-wash the device.','Only do so if explicitly approved.']];
export const privacyTopics=[['What the device captures','[Approved capture scope: street imagery and any additional data]'],['What it does not capture','[Approved exclusions, including interior recording and audio]'],['When collection occurs','[Approved collection triggers and driver controls]'],['How information is transferred','[Approved transmission method and destinations]'],['How information is secured','[Approved security and access controls]'],['How long information is retained','[Approved retention and deletion policy]'],['Faces and license plates','[Approved treatment of faces and license plates, if applicable]'],['Your controls and choices','[Approved pause, access, removal, and complaint procedures]'],['Reporting a concern','[Approved privacy contact and concern-reporting procedure]']];
export const issues=[
{title:'Device will not turn on',code:'POWER',meaning:'The expected startup behavior has not been observed.',steps:['Compare the power source with the kit’s approved instructions.','Check the connector orientation without forcing or opening it.','Record the indicator behavior and use the program contact in your invitation.']},
{title:'Status light is unexpected',code:'LIGHT',meaning:'Light meanings depend on the exact device.',steps:['Compare the pattern with your kit’s indicator guide.','Record the color and pattern without assuming readiness.','Ask support if the pattern is not documented.']},
{title:'Device will not connect',code:'CONNECT',meaning:'The official connection process has not completed.',steps:['Stay parked and read the official pairing instructions.','Check any permission or connection error in the approved setup tool.','Use only the documented retry process.']},
{title:'Setup cannot find my device',code:'DISCOVERY',meaning:'The official setup tool is not finding the expected device.',steps:['Confirm the device identifier against your assigned kit.','Check the documented discovery requirements.','Record the exact message for support.']},
{title:'Alignment check failed',code:'ALIGN',meaning:'The view does not meet the approved alignment guidance.',steps:['Compare the forward view with your approved guide.','Check the horizon and obstructions while parked.','Use only the documented adjustment method.']},
{title:'Mount will not attach',code:'MOUNT',meaning:'The specified attachment check has not passed.',steps:['Check the approved location and surface requirements.','Clean and dry the cup and glass, then press and lock the suction mount as your kit shows.','Do not add tape, glue or other fasteners; ask support.']},
{title:'Device feels loose',code:'LOOSE',meaning:'The installation may be unsafe.',steps:['Park safely and stop using the device.','Do not drive with an unsafe installation.','Follow the approved safety procedure and contact support.']},
{title:'Cable does not reach',code:'CABLE',meaning:'The approved route or supplied cable needs review.',steps:['Compare the cable and vehicle with your assigned kit.','Check the approved vehicle-specific route.','Do not stretch, extend, splice, or route across controls; ask support.']},
{title:'Image is blocked or tilted',code:'VIEW',meaning:'An obstruction or angle may affect the road view.',steps:['Check for wipers, accessories, cables, or stickers in the view.','Compare the horizon with the approved guide.','Use the documented adjustment process or contact support.']},
{title:'App or website is frozen',code:'WEB',meaning:'The interface may have stopped responding.',steps:['Check your connection and whether local progress was saved.','Refresh this site; existing saved checklists and photos are restored on this browser.','If it repeats, record the browser and error for support. Do not clear storage before saving a copy.']},
{title:'Package item is missing',code:'MISSING',meaning:'A component may be absent from the assigned kit.',steps:['Compare contents with your kit’s approved packing list.','Check packaging compartments without substituting parts.','Request the missing item through the invitation’s support contact.']},
{title:'Device appears damaged',code:'DAMAGE',meaning:'The device needs a safety assessment.',steps:['Park safely and stop using the device.','Do not open or attempt to repair the hardware.','Follow approved safety instructions and contact support.']},
{title:'I changed vehicles',code:'VEHICLE',meaning:'The invitation or mounting rules may no longer match.',steps:['Pause installation on the new vehicle.','Confirm vehicle eligibility with the program team.','Get approved reassignment and mounting instructions before continuing.']},
{title:'I need to remove the device',code:'REMOVE',meaning:'Removal depends on the exact mounting system.',steps:['Request the approved removal and return instructions.','Do not pry, heat, or dissolve the mount without approval.','Follow the documented procedure while safely parked.']}
];
export const edgeCases:Record<string,{title:string,body:string,action:string,href:string}>={
expired:{title:'Your invitation needs to be renewed.',body:'Pause setup and ask the program team to confirm a current invitation. Your local progress is saved when browser storage is available.',action:'Find support',href:'/support'},
ineligible:{title:'Eligibility needs a review.',body:'Do not install until the program team confirms eligibility. Your checklist stays on this browser.',action:'Review invitation with support',href:'/support'},
vehicle:{title:'This vehicle needs confirmation.',body:'Do not transfer or install the device on an unapproved vehicle. Your completed local steps are retained.',action:'Get vehicle help',href:'/support'},
unsupported:{title:'Vehicle compatibility is not confirmed.',body:'Ask for vehicle-specific approval before mounting anything. Your local progress is retained.',action:'Contact the program team',href:'/support'},
registration:{title:'Device registration needs attention.',body:'Record the exact error in the official setup tool. Do not retry with another account. Your checklist remains saved locally.',action:'Get registration help',href:'/support'},
duplicate:{title:'This device may already be registered.',body:'Ask support to verify the assigned device. Do not reset ownership yourself. Your local progress is retained.',action:'Review the device assignment',href:'/support'},
linked:{title:'The device is linked to another account.',body:'Pause pairing and contact the program team. Your local checklist is retained.',action:'Get account help',href:'/support'},
camera:{title:'Camera access is unavailable.',body:'This concept does not request live camera permission. Choose an existing image, use your phone’s file-picker camera option if available, or follow the written comparison. Saved checklists remain available.',action:'Use manual alignment',href:'/alignment-check'},
content:{title:'Approved instructions are not available yet.',body:'Items marked as pending need approval. Use the exact manual from your kit before performing physical installation. Your local checklist stays saved.',action:'Ask for approved instructions',href:'/support'},
browser:{title:'This browser cannot save progress.',body:'Keep the page open and download a local summary if available. Try a current browser with local storage enabled. Photos that fail to save must be selected again.',action:'Get accessibility help',href:'/accessibility'},
};
