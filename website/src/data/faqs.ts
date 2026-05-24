import type { FAQ } from '../components/FAQSection'

export const productFaqs: Record<string, FAQ[]> = {
  'ball-valve': [
    {
      q: 'What pressure classes are ISA ball valves rated for?',
      a: 'ISA ball valves are available from PN16 through ANSI 600 (Class 600), covering working pressures up to approximately 100 bar. The exact pressure-temperature rating depends on body material, trim selection, and operating temperature. Carbon steel ANSI 300 and 600 bodies achieve the highest ratings. Full pressure-temperature tables are available on request.',
    },
    {
      q: 'Are ISA ball valves API 6D certified for pipeline service?',
      a: 'Yes. ISA\'s carbon steel and stainless steel ball valves for pipeline and process service carry API 6D certification. Each valve is supplied with full material traceability documentation, mill certificates, hydrostatic test certificates, and a certificate of conformance. These documents are required for oil and gas procurement and are standard for all API 6D supply.',
    },
    {
      q: 'What sealing materials are available for chemical and corrosive service?',
      a: 'ISA ball valves are available with PTFE, PEEK, or Nylon ball seats and stem packing for general chemical service. For aggressive acids, solvents, or chlorinated media, PTFE-lined bodies and PEEK seats are recommended. High-temperature or abrasive service is handled with metal-to-metal seats in Stellite or hardened stainless steel. Specify the fluid and temperature range when ordering.',
    },
    {
      q: 'Can ISA ball valves be supplied with electric or pneumatic actuators?',
      a: 'Yes. ISA supplies ball valves mounted with pneumatic rack-and-pinion or scotch-yoke actuators, electric quarter-turn actuators (standard and SIL-rated for hazardous areas), and manual lever or gearbox operation up to DN600. Solenoid valves, limit switches, and positioners can be included. Actuated valve assemblies are factory-tested and shipped as a complete unit.',
    },
    {
      q: 'What is the standard delivery lead time for ISA ball valves?',
      a: 'Standard DN15–DN100 ball valves in PN16 carbon steel or stainless steel are typically available from stock or within 2–4 weeks. Larger sizes (DN150–DN600), ANSI 300/600 pressure classes, special materials, and actuated assemblies require 4–10 weeks depending on specification. Contact ISA Valve Solutions for a specific lead time on your application.',
    },
  ],
  'butterfly-valve': [
    {
      q: 'What size range and end connections do ISA butterfly valves cover?',
      a: 'ISA butterfly valves are available from DN50 to DN1200 in standard size increments. End connections include wafer (between flanges), lug (bolted direct to one flange), and double-flanged. Wafer and lug types suit most HVAC and water systems; double-flanged are preferred for large-bore high-cycle water main and irrigation applications.',
    },
    {
      q: 'Which liner and disc materials are suitable for potable water service?',
      a: 'ISA butterfly valves for potable water service use EPDM liners and aluminium bronze or stainless steel discs — all WRAS-approved and compliant with SABS 664. The EPDM liner provides long-term resistance to chlorinated water and UV exposure in above-ground installations. Nitrile (NBR) liners are used for non-potable water and mild hydrocarbons.',
    },
    {
      q: 'Can ISA butterfly valves be used for throttling as well as shut-off?',
      a: 'Yes. ISA concentric butterfly valves provide good throttling control in the 30°–70° opening range. For precise flow control applications, a gearbox or electric actuator with positioner is recommended rather than a manual lever, which cannot hold intermediate positions accurately. Triple-offset butterfly valves are available for tight shut-off in steam and high-temperature gas service.',
    },
    {
      q: 'Are ISA butterfly valves suitable for fire protection systems?',
      a: 'ISA\'s ductile iron butterfly valves with EPDM liners comply with SABS fire protection standards and are suitable for fire sprinkler header isolation service. FM-approved models are available for projects requiring Factory Mutual approval. Supervisory switches for monitoring valve position can be fitted as standard for fire system compliance.',
    },
    {
      q: 'What is the maximum temperature rating for ISA butterfly valves?',
      a: 'Standard EPDM-lined butterfly valves are rated to 120°C continuous service. Viton-lined versions handle up to 150°C for steam condensate and hot water systems. For temperatures above 150°C, ISA offers high-performance triple-offset butterfly valves with metal seats, rated to 450°C and available in stainless steel or carbon steel bodies.',
    },
  ],
  'gate-valve': [
    {
      q: 'What is the difference between rising stem and non-rising stem gate valves?',
      a: 'Rising stem gate valves have a stem that extends above the handwheel when open, providing a visual indication of valve position — preferred for above-ground installations where stem travel can be observed. Non-rising stem valves have an internal thread; the stem rotates but does not move axially, making them suitable for underground or space-constrained installations where vertical clearance is limited.',
    },
    {
      q: 'What standards do ISA gate valves comply with?',
      a: 'ISA gate valves are manufactured to SABS 664 for cast iron and ductile iron gate valves used in water service, and ISO 7259 for general industrial service. All valves carry ISO 9001:2015 quality certification. Pressure and leak testing is performed per EN 12266-1 at 1.5× rated working pressure. Client-specific inspection and testing requirements can be accommodated.',
    },
    {
      q: 'Can ISA gate valves be used for throttling flow?',
      a: 'Gate valves are designed for full-open or full-closed isolation service only — they should not be used for flow throttling. In a partially open position, the gate is subjected to high-velocity fluid that causes vibration, accelerated seat erosion, and gate damage. For flow regulation, specify a butterfly valve, globe valve, or control valve instead. Gate valves are ideal for infrequent operation.',
    },
    {
      q: 'Are ISA gate valves suitable for buried service?',
      a: 'Yes. ISA ductile iron gate valves with non-rising stem configuration and fusion-bonded epoxy (FBE) internal and external coating are widely used for buried water main service. Extension spindles and operating keys are available for deep burial. The FBE coating provides corrosion protection for 50+ years in typical soil conditions and complies with SABS 649.',
    },
    {
      q: 'What actuator options are available for large-bore gate valves?',
      a: 'Gate valves DN200 and above typically require gearbox operation due to high torque requirements. ISA supplies bevel gearboxes as standard for DN200–DN1000. Electric actuators with position indication and remote control are available for automated isolation duties. Hydraulic actuators can be provided for high-cycle or remote underwater service. Factory pre-mounting and testing is included.',
    },
  ],
  'knife-gate-valve': [
    {
      q: 'How long do ISA knife gate valves last in slurry service?',
      a: 'Service life in slurry depends on particle size, concentration, and abrasivity. Standard knife gate valves typically last 3–6 months in high-solids mining slurry. ISA\'s ceramic-lined knife gate valves with alumina ceramic seats have demonstrated 14-month service life on platinum mine tailings lines — a 4× improvement over standard valves. Ceramic-lined options are recommended for all high-abrasion applications.',
    },
    {
      q: 'What is the difference between metal seat and resilient seat knife gate valves?',
      a: 'Metal seat knife gate valves provide positive shut-off for abrasive and viscous media but require higher actuating force. Resilient (elastomeric) seat valves use a rubber sleeve or port liner to seal against the gate, offering bi-directional sealing and lower operating torque — ideal for wastewater and pulp service. For mining slurry with high solids content, metal or ceramic seats are recommended.',
    },
    {
      q: 'Can ISA knife gate valves handle fibrous pulp and paper media?',
      a: 'Yes. The full-bore opening and shearing gate action of ISA knife gate valves make them the standard choice for pulp, stock, black liquor, and process effluent in pulp and paper mills. The knife gate cuts through fibrous media cleanly without plugging — a problem common with ball and butterfly valves. Stainless steel bodies and EPDM or Viton seals are recommended for black liquor service.',
    },
    {
      q: 'Are pneumatic actuators available for mine-duty knife gate valves?',
      a: 'Yes. ISA supplies knife gate valves with pneumatic single or double-acting cylinder actuators as standard for mine-duty applications. The actuators are rated for high-cycle service and can be fitted with solenoid valves, limit switches, and manual overrides. For hazardous area installations, ATEX-certified solenoid valves and Ex-rated limit switches are available. Spring-fail-close and spring-fail-open configurations are both offered.',
    },
    {
      q: 'What is the maximum solids concentration ISA knife gate valves can handle?',
      a: 'ISA knife gate valves are designed for slurry up to 70% solids by weight, depending on particle size and shape. For extremely high-concentration or coarse-particle slurry (e.g., coarse ore or sand), ceramic-lined bodies with hardened gates are recommended. The valve must be installed in a vertical or near-vertical pipeline orientation for reliable seating. Contact ISA engineering for applications above 50% solids.',
    },
  ],
  'pinch-valve': [
    {
      q: 'What is the ISO 5208 Grade A certification on the ISA Pinch Valve?',
      a: 'ISO 5208 defines leakage classifications for industrial valves during seat acceptance testing. Grade A is the most stringent — it permits zero measurable leakage under hydrostatic pressure. The ISA Pinch Valve Series is certified to Grade A, making it suitable for audit-grade isolation duties in mining and mineral processing where any leakage past the shut-off valve is unacceptable. Test certificates are supplied with every valve.',
    },
    {
      q: 'How do I select the correct ISA sleeve grade for my application?',
      a: 'ISA-Flex™ is the standard choice for general mining slurry, thickener underflow, and tailings lines. ISA-Extrem™ is specified for high-velocity slurry, autoclave/POX feed, and high-temperature service up to 110°C. ISA-Shield™ is used for outdoor and above-ground pipelines exposed to UV radiation and ozone. ISA-Chem™ is formulated for CIL/CIP circuits, acid wash, and reagent dosing lines where chemical attack is the primary failure mode. Contact ISA engineering if unsure — we will specify based on your exact fluid and conditions.',
    },
    {
      q: 'How long does a pinch valve sleeve last and how is it replaced?',
      a: 'Sleeve life depends on application severity. In thickener underflow service, ISA-Flex™ sleeves typically last 6–18 months before replacement is required. ISA recommends stocking 1 spare sleeve per 3 installed valves. Sleeve replacement is carried out in-situ without removing the valve from the pipeline — unbolt the end plates, extract the worn sleeve, insert the new one, and re-torque. No specialist tools or welding are required. Typical replacement time is under 30 minutes.',
    },
    {
      q: 'Can the ISA Pinch Valve be used with pneumatic or electric actuation?',
      a: 'Yes. The standard configuration is manual handwheel operation via a rising spindle. Pneumatic double-acting or spring-return cylinder actuation is available for automated isolation and remote control. Electric actuators are offered for low-cycle or quarter-hourly operation. For hazardous mining atmospheres, ATEX-rated actuators and intrinsically safe limit switches are available on request. Actuated assemblies are factory assembled and stroke-tested before dispatch.',
    },
    {
      q: 'What flange standards does the ISA Pinch Valve comply with?',
      a: 'The ISA Pinch Valve Series is drilled to SANS 1123 (Table 1000/1), BS10 Table E and Table D, and ANSI 150 Class. This multi-standard drilling allows direct bolt-up to existing South African, British, and ANSI-flanged pipelines without adapters. PN16 pressure rating (1600 kPa) is standard. Consult ISA for PN25 or higher-pressure requirements.',
    },
  ],
  'dxst-kgv': [
    {
      q: 'What does "466% longer life" mean and where was it proven?',
      a: 'Under standard operating conditions in a copper mining thickener underflow circuit in the Northern Cape, standard knife gate valves were failing within 3 months of installation. ISA DXST Series valves with premium injection-moulded natural rubber lining achieved 14-month service life in the same application — 466% longer than the incumbent. This equated to 72% less maintenance downtime and R1.2 million per year in parts and shutdown cost savings.',
    },
    {
      q: 'What is the natural rubber lining and how does it protect the valve?',
      a: 'The DXST Series uses 100% premium natural rubber, injection-moulded (not cast) as a continuous one-piece lining that covers the entire wetted surface — body bore, gate passage, and seat area. Injection moulding eliminates the cold-pours and thickness variations common in cast linings. The rubber absorbs abrasive impact through elastic deformation, dramatically reducing erosion compared to hard-surface valves. Operating range is -10°C to +85°C. Above 85°C, contact ISA for EPDM or Viton-lined options.',
    },
    {
      q: 'What sizes and pressure classes does the DXST Series cover?',
      a: 'The DXST Series is available from DN25 to DN300 in standard size increments. Pressure ratings range from PN6 to PN20 depending on size. For DN350 and above or PN25+ requirements, contact ISA — larger sizes are available on extended lead time. The cast iron body uses multi-standard flange drillings (SANS 1123, BS10, ANSI 150) for universal compatibility.',
    },
    {
      q: 'Can the DXST KGV handle bi-directional flow?',
      a: 'The DXST Series is designed for uni-directional flow in the standard configuration. The lining geometry and gate seating are optimised for slurry flowing in one defined direction. Bi-directional versions are available on request with reinforced seating geometry. For applications with regular flow reversal (e.g., backwash circuits), specify the requirement when ordering so the correct configuration is supplied.',
    },
    {
      q: 'What maintenance does the DXST Slurry KGV require?',
      a: 'The precision-machined stainless steel rising spindle is self-indicating (position visible at a glance) and requires only periodic grease application to the stem threads — non-hydrocarbon grease only. The gland packing should be checked every 6 months and re-torqued or replaced if leakage is observed. Lining inspection is recommended at each planned maintenance shutdown. No special tools are required. ISA recommends stocking one replacement lining kit per 5 installed valves.',
    },
  ],
}
