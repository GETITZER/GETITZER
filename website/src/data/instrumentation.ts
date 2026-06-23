// Controls & Instrumentation range — level measurement & control focus.
// Real product photography supplied to ISA; presented under the ISA instrumentation range.

export interface InstrumentSpec {
  label: string
  value: string
}

export interface Instrument {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  imageAlt: string
  principle: string
  specs: InstrumentSpec[]
  applications: string[]
  featured?: boolean
}

export interface InstrumentCategory {
  id: string
  name: string
  description: string
  instruments: Instrument[]
}

export const instrumentCategories: InstrumentCategory[] = [
  {
    id: 'level',
    name: 'Level Measurement & Control',
    description:
      'Continuous level transmitters, point-level switches and mechanical float control for tanks, vessels, reservoirs and process lines. Selected for reliable detection across water, chemical, slurry and viscous media.',
    instruments: [
      {
        id: 'ultrasonic-level-transmitter',
        name: 'Ultrasonic Level Transmitter',
        tagline: 'Non-contact continuous level measurement',
        description:
          'Compact non-contact transmitter for continuous level measurement of liquids and free-flowing solids. The sensor measures the time-of-flight of an ultrasonic pulse reflected from the medium surface, delivering a stable 4–20 mA signal without any moving or wetted parts.',
        image: '/images/instrumentation/ultrasonic-level-transmitter.webp',
        imageAlt: 'Ultrasonic level transmitter for non-contact continuous level measurement',
        principle: 'Non-contact ultrasonic time-of-flight',
        specs: [
          { label: 'Measurement', value: 'Continuous, non-contact' },
          { label: 'Output', value: '4–20 mA / digital' },
          { label: 'Media', value: 'Liquids, slurries, free-flowing solids' },
          { label: 'Mounting', value: 'Threaded top-of-tank' },
          { label: 'Wetted Parts', value: 'None' },
        ],
        applications: ['Storage tanks', 'Reservoirs', 'Pump stations', 'Open channels'],
        featured: true,
      },
      {
        id: 'vibrating-level-switch-compact',
        name: 'Vibrating Level Switch — Compact',
        tagline: 'Point-level detection for liquids',
        description:
          'Tuning-fork point-level switch for high- or low-level alarm and pump protection. The fork vibrates at its resonant frequency in air; contact with the medium damps the vibration and triggers a switching signal. Largely unaffected by turbulence, foam, build-up or flow.',
        image: '/images/instrumentation/vibrating-level-switch-compact.webp',
        imageAlt: 'Compact vibrating tuning-fork point-level switch',
        principle: 'Vibrating tuning fork',
        specs: [
          { label: 'Measurement', value: 'Point level (high / low)' },
          { label: 'Media', value: 'Liquids, low-viscosity fluids' },
          { label: 'Function', value: 'Overfill, dry-run, pump control' },
          { label: 'Build-up', value: 'Tolerant to coating and foam' },
          { label: 'Mounting', value: 'Threaded, compact body' },
        ],
        applications: ['Overfill protection', 'Dry-run protection', 'Pump control', 'Alarm points'],
      },
      {
        id: 'vibrating-level-switch-extended',
        name: 'Vibrating Level Switch — Extended',
        tagline: 'Tube-extended fork for deep vessels',
        description:
          'Tube-extended version of the vibrating fork switch for detection deep inside tanks and vessels, or where the switching point sits well below the process connection. The same resonant-fork principle gives reliable, maintenance-free point-level detection independent of medium conductivity or dielectric.',
        image: '/images/instrumentation/vibrating-level-switch-extended.webp',
        imageAlt: 'Extended tube vibrating fork level switch for deep vessels',
        principle: 'Vibrating tuning fork, tube-extended',
        specs: [
          { label: 'Measurement', value: 'Point level at depth' },
          { label: 'Media', value: 'Liquids, slurries' },
          { label: 'Extension', value: 'Tube-extended probe' },
          { label: 'Function', value: 'High / low alarm' },
          { label: 'Mounting', value: 'Top or side, threaded' },
        ],
        applications: ['Deep vessels', 'Sumps', 'Buffer tanks', 'Chemical dosing'],
      },
      {
        id: 'buoyancy-level-switch',
        name: 'Buoyancy Level Switch',
        tagline: 'Stainless steel float switch',
        description:
          'Horizontally mounted buoyancy (float) level switch in stainless steel for robust point-level detection. A magnetic float rises and falls with the liquid surface and actuates a sealed reed contact, providing a simple, power-independent switching signal for level alarms and control.',
        image: '/images/instrumentation/buoyancy-level-switch.webp',
        imageAlt: 'Stainless steel horizontal buoyancy float level switch',
        principle: 'Magnetic float / reed contact',
        specs: [
          { label: 'Measurement', value: 'Point level' },
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Mounting', value: 'Horizontal, side-of-tank' },
          { label: 'Contact', value: 'Sealed reed switch' },
          { label: 'Media', value: 'Clean to lightly loaded liquids' },
        ],
        applications: ['Side-mounted alarms', 'Small vessels', 'Clean water systems', 'OEM equipment'],
      },
      {
        id: 'ball-float-valve',
        name: 'Stainless Steel Ball Float Valve',
        tagline: 'Mechanical level control',
        description:
          'Light-pattern stainless steel ball float valve for fully mechanical level control in tanks and reservoirs. As the level rises the float closes the valve to stop inflow, and reopens as level drops — maintaining a set level with no power, signal or external control required.',
        image: '/images/instrumentation/ball-float-valve.webp',
        imageAlt: 'Stainless steel light-pattern ball float valve for mechanical level control',
        principle: 'Mechanical float-actuated valve',
        specs: [
          { label: 'Function', value: 'Automatic level control' },
          { label: 'Body', value: 'Stainless steel, light pattern' },
          { label: 'Power', value: 'None — fully mechanical' },
          { label: 'Action', value: 'Float closes inlet at set level' },
          { label: 'Media', value: 'Water and clean liquids' },
        ],
        applications: ['Storage tanks', 'Header tanks', 'Reservoirs', 'Livestock & irrigation'],
      },
      {
        id: 'universal-process-controller',
        name: 'Universal Process Controller',
        tagline: 'Level, flow, pH & conductivity control',
        description:
          'Panel-mount universal process controller that accepts standard sensor inputs and drives setpoint-based control of level, flow, pH or conductivity. Pairs with the transmitters and switches above to close the loop — handling pump start/stop, fill/empty sequencing and alarm relays from a single display.',
        image: '/images/instrumentation/universal-process-controller.webp',
        imageAlt: 'Universal process controller for level, flow, pH and conductivity control',
        principle: 'Multi-input setpoint controller',
        specs: [
          { label: 'Inputs', value: '4–20 mA, sensor, switch' },
          { label: 'Control', value: 'Level / flow / pH / conductivity' },
          { label: 'Outputs', value: 'Relay / analogue' },
          { label: 'Mounting', value: 'Panel mount' },
          { label: 'Display', value: 'Digital process readout' },
        ],
        applications: ['Pump control', 'Fill / empty sequencing', 'Dosing control', 'Alarm management'],
      },
    ],
  },
  {
    id: 'flow',
    name: 'Flow Metering',
    description:
      'Mechanical and electronic metering for accurate measurement of water and process fluids in municipal, building-services and industrial supply lines.',
    instruments: [
      {
        id: 'water-meter-class-b',
        name: 'Class B Water Meter',
        tagline: 'Accurate volumetric metering',
        description:
          'Multi-jet Class B water meter for accurate volumetric measurement of clean cold water in distribution and sub-metering applications. Robust mechanical movement with a sealed, protected register for long-term accuracy and easy reading.',
        image: '/images/instrumentation/water-meter-class-b.webp',
        imageAlt: 'Class B multi-jet water meter for volumetric flow measurement',
        principle: 'Multi-jet mechanical metering',
        specs: [
          { label: 'Accuracy Class', value: 'Class B' },
          { label: 'Media', value: 'Clean cold water' },
          { label: 'Register', value: 'Sealed, protected' },
          { label: 'Connection', value: 'Threaded' },
          { label: 'Service', value: 'Distribution & sub-metering' },
        ],
        applications: ['Municipal supply', 'Building services', 'Sub-metering', 'Irrigation'],
      },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature Indication',
    description:
      'Mechanical temperature gauges for local indication on process lines, plant equipment and HVAC systems.',
    instruments: [
      {
        id: 'temperature-gauge-general',
        name: 'General Purpose Temperature Gauge',
        tagline: 'Local process temperature indication',
        description:
          'Bimetal general-purpose temperature gauge for robust local indication on process and plant equipment. Stainless steel stem and clear dial for reliable, maintenance-free reading across a wide temperature range.',
        image: '/images/instrumentation/temperature-gauge-general.webp',
        imageAlt: 'General purpose bimetal process temperature gauge',
        principle: 'Bimetal mechanical gauge',
        specs: [
          { label: 'Type', value: 'Bimetal dial gauge' },
          { label: 'Stem', value: 'Stainless steel' },
          { label: 'Mounting', value: 'Back / bottom entry' },
          { label: 'Service', value: 'Process & plant equipment' },
        ],
        applications: ['Process lines', 'Plant equipment', 'Boilers', 'General industry'],
      },
      {
        id: 'temperature-gauge-hvac',
        name: 'HVAC Temperature Gauge',
        tagline: 'Heating & cooling system indication',
        description:
          'Temperature gauge configured for HVAC and building-services duty, giving clear local indication of flow and return temperatures on heating, chilled-water and ventilation systems.',
        image: '/images/instrumentation/temperature-gauge-hvac.webp',
        imageAlt: 'HVAC temperature gauge for heating and cooling systems',
        principle: 'Dial temperature gauge',
        specs: [
          { label: 'Type', value: 'Dial gauge, HVAC duty' },
          { label: 'Service', value: 'Heating / chilled water' },
          { label: 'Mounting', value: 'Pipe / pocket' },
          { label: 'Reading', value: 'Flow & return temperature' },
        ],
        applications: ['HVAC plant', 'Chilled water', 'Heating circuits', 'Building services'],
      },
    ],
  },
]

export const levelCategory = instrumentCategories.find(c => c.id === 'level')!

// ──────────────────────────────────────────────────────────────────────────
// Flow indication & control range — sight flow indicators, sight glasses,
// needle valves and packaged flow control. Real product photography supplied
// to ISA and presented under the ISA instrumentation range.
// ──────────────────────────────────────────────────────────────────────────

const FLOW_IMG = '/images/instrumentation/flow'

export const flowCategories: InstrumentCategory[] = [
  {
    id: 'flow-indicators',
    name: 'Sight Flow Indicators',
    description:
      'In-line indicators that give an immediate visual confirmation of flow, direction and approximate rate. Available in gunmetal, carbon steel and stainless steel with flap, rotor, paddlewheel and spinner elements to suit clean liquids, steam and process media.',
    instruments: [
      {
        id: 'gunmetal-flap-flow-indicator',
        name: 'Gunmetal Flap-Type Flow Indicator',
        tagline: 'Style GF · bi-directional flow',
        description:
          'Gunmetal-bodied flap indicator with a hinged vane visible through a sight window. The flap lifts with flow and falls back when flow stops, giving a clear at-a-glance indication of flow presence and direction in clean liquid lines.',
        image: `${FLOW_IMG}/gunmetal-flap-flow-indicator.jpg`,
        imageAlt: 'Gunmetal flap-type sight flow indicator',
        principle: 'Hinged flap / vane',
        specs: [
          { label: 'Body', value: 'Gunmetal' },
          { label: 'Element', value: 'Hinged flap' },
          { label: 'Indication', value: 'Flow presence & direction' },
          { label: 'Connection', value: 'Screwed BSP' },
          { label: 'Media', value: 'Clean liquids' },
        ],
        applications: ['Water lines', 'Cooling circuits', 'Dosing lines', 'Pump discharge'],
        featured: true,
      },
      {
        id: 'gunmetal-twin-rotor-flow-indicator',
        name: 'Gunmetal Twin-Rotor Flow Indicator',
        tagline: 'Style GR · rotor motion indication',
        description:
          'Gunmetal twin-rotor indicator in which two rotors spin in the flow stream behind the sight window. Rotor motion confirms flow even in turbid or coloured media where a flap would be hard to read, and rotor speed gives a relative sense of flow rate.',
        image: `${FLOW_IMG}/gunmetal-twin-rotor-flow-indicator.jpg`,
        imageAlt: 'Gunmetal twin-rotor sight flow indicator',
        principle: 'Twin rotating rotors',
        specs: [
          { label: 'Body', value: 'Gunmetal' },
          { label: 'Element', value: 'Twin rotors' },
          { label: 'Indication', value: 'Flow & relative rate' },
          { label: 'Connection', value: 'Screwed BSP' },
          { label: 'Media', value: 'Clean to turbid liquids' },
        ],
        applications: ['Process water', 'Chemical lines', 'Coolant loops', 'Return lines'],
      },
      {
        id: 'gunmetal-vista-spinner-flow-indicator',
        name: 'Gunmetal Vista Spinner Flow Indicator',
        tagline: 'Vista series · full-view spinner',
        description:
          'Gunmetal Vista-series indicator with a full-circumference window and a coloured spinner that rotates with flow. The wide viewing area makes flow easy to see from any angle, ideal for plant rooms and skid-mounted equipment.',
        image: `${FLOW_IMG}/gunmetal-vista-spinner-flow-indicator.jpg`,
        imageAlt: 'Gunmetal Vista-series spinner flow indicator',
        principle: 'Rotating spinner',
        specs: [
          { label: 'Body', value: 'Gunmetal' },
          { label: 'Element', value: 'Coloured spinner' },
          { label: 'View', value: 'Full-circumference window' },
          { label: 'Connection', value: 'Screwed BSP' },
          { label: 'Media', value: 'Clean liquids' },
        ],
        applications: ['Plant rooms', 'Skid packages', 'Building services', 'OEM equipment'],
      },
      {
        id: 'carbon-steel-flap-flow-indicator',
        name: 'Carbon Steel Flap-Type Flow Indicator',
        tagline: 'Style F · higher-pressure duty',
        description:
          'Carbon steel flap indicator for higher-pressure industrial lines. The robust body suits general process and utility service while the hinged flap behind the sight window confirms flow and direction.',
        image: `${FLOW_IMG}/carbon-steel-flap-flow-indicator.jpg`,
        imageAlt: 'Carbon steel flap-type sight flow indicator',
        principle: 'Hinged flap / vane',
        specs: [
          { label: 'Body', value: 'Carbon steel' },
          { label: 'Element', value: 'Hinged flap' },
          { label: 'Indication', value: 'Flow presence & direction' },
          { label: 'Connection', value: 'Screwed / flanged' },
          { label: 'Media', value: 'Process & utility liquids' },
        ],
        applications: ['Process plant', 'Utility lines', 'Compressed-air condensate', 'Oil lines'],
      },
      {
        id: 'carbon-steel-straight-through-flow-indicator',
        name: 'Carbon Steel Straight-Through Flow Indicator',
        tagline: 'Style P · unobstructed bore',
        description:
          'Carbon steel straight-through (Style P) indicator with a clear bore and opposed sight windows. With no element in the flow path it offers minimal pressure loss while allowing direct visual inspection of the medium.',
        image: `${FLOW_IMG}/carbon-steel-straight-through-flow-indicator.jpg`,
        imageAlt: 'Carbon steel straight-through sight flow indicator',
        principle: 'Straight-through sight window',
        specs: [
          { label: 'Body', value: 'Carbon steel' },
          { label: 'Bore', value: 'Unobstructed' },
          { label: 'View', value: 'Opposed windows' },
          { label: 'Pressure loss', value: 'Minimal' },
          { label: 'Media', value: 'Liquids & gases' },
        ],
        applications: ['Process plant', 'Pipelines', 'Condensate', 'Inspection points'],
      },
      {
        id: 'carbon-steel-paddlewheel-flow-indicator',
        name: 'Carbon Steel Paddlewheel Flow Indicator',
        tagline: 'Style S · paddlewheel motion',
        description:
          'Carbon steel paddlewheel (Style S) indicator in which a paddle rotates in proportion to flow velocity. Clearly visible motion confirms flow and gives a relative rate indication in opaque or dark process fluids.',
        image: `${FLOW_IMG}/carbon-steel-paddlewheel-flow-indicator.jpg`,
        imageAlt: 'Carbon steel paddlewheel sight flow indicator',
        principle: 'Rotating paddlewheel',
        specs: [
          { label: 'Body', value: 'Carbon steel' },
          { label: 'Element', value: 'Paddlewheel' },
          { label: 'Indication', value: 'Flow & relative rate' },
          { label: 'Connection', value: 'Screwed / flanged' },
          { label: 'Media', value: 'Opaque process liquids' },
        ],
        applications: ['Process lines', 'Coolant systems', 'Oil circulation', 'Return headers'],
      },
      {
        id: 'stainless-flap-flow-indicator',
        name: 'Stainless Steel Flap-Type Flow Indicator',
        tagline: 'Style F · corrosion-resistant',
        description:
          'Stainless steel flap indicator for corrosive, hygienic and high-purity duties. The hinged flap gives clear flow and direction indication while the stainless body resists aggressive media and frequent wash-down.',
        image: `${FLOW_IMG}/stainless-flap-flow-indicator.jpg`,
        imageAlt: 'Stainless steel flap-type sight flow indicator',
        principle: 'Hinged flap / vane',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Element', value: 'Hinged flap' },
          { label: 'Indication', value: 'Flow presence & direction' },
          { label: 'Connection', value: 'Screwed / flanged' },
          { label: 'Media', value: 'Corrosive & hygienic liquids' },
        ],
        applications: ['Chemical plant', 'Food & beverage', 'Water treatment', 'Pharma'],
      },
      {
        id: 'stainless-straight-through-flow-indicator',
        name: 'Stainless Steel Straight-Through Flow Indicator',
        tagline: 'Style P · clear-bore inspection',
        description:
          'Stainless steel straight-through (Style P) indicator with opposed sight windows and an unobstructed bore. Combines corrosion resistance with low pressure loss for direct visual inspection of demanding media.',
        image: `${FLOW_IMG}/stainless-straight-through-flow-indicator.jpg`,
        imageAlt: 'Stainless steel straight-through sight flow indicator',
        principle: 'Straight-through sight window',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Bore', value: 'Unobstructed' },
          { label: 'View', value: 'Opposed windows' },
          { label: 'Pressure loss', value: 'Minimal' },
          { label: 'Media', value: 'Corrosive liquids & gases' },
        ],
        applications: ['Chemical lines', 'CIP/SIP systems', 'Water treatment', 'Inspection points'],
      },
      {
        id: 'stainless-paddlewheel-flow-indicator',
        name: 'Stainless Steel Paddlewheel Flow Indicator',
        tagline: 'Style S · corrosion-resistant rate',
        description:
          'Stainless steel paddlewheel (Style S) indicator giving visible rotary motion proportional to flow velocity. Suited to corrosive and opaque process fluids where flap or window inspection alone is insufficient.',
        image: `${FLOW_IMG}/stainless-paddlewheel-flow-indicator.jpg`,
        imageAlt: 'Stainless steel paddlewheel sight flow indicator',
        principle: 'Rotating paddlewheel',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Element', value: 'Paddlewheel' },
          { label: 'Indication', value: 'Flow & relative rate' },
          { label: 'Connection', value: 'Screwed / flanged' },
          { label: 'Media', value: 'Corrosive, opaque liquids' },
        ],
        applications: ['Chemical dosing', 'Process coolant', 'Effluent lines', 'Recirculation'],
      },
      {
        id: 'stainless-steam-flow-indicator',
        name: 'Stainless Steel Flow Indicator for Steam',
        tagline: 'Style P · steam & condensate',
        description:
          'Stainless steel straight-through indicator rated for steam and condensate service. High-temperature sight windows and a clear bore allow operators to verify flow and trap discharge on steam and hot-water systems.',
        image: `${FLOW_IMG}/stainless-steam-flow-indicator.webp`,
        imageAlt: 'Stainless steel straight-through flow indicator for steam',
        principle: 'Straight-through sight window',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Service', value: 'Steam & condensate' },
          { label: 'Windows', value: 'High-temperature' },
          { label: 'Bore', value: 'Unobstructed' },
          { label: 'Function', value: 'Flow & trap-discharge check' },
        ],
        applications: ['Steam mains', 'Condensate return', 'Trap monitoring', 'Heat exchangers'],
      },
      {
        id: 'stainless-vista-spinner-flow-indicator',
        name: 'Stainless Steel Vista Spinner Flow Indicator',
        tagline: 'Vista series · full-view spinner',
        description:
          'Stainless steel Vista-series indicator with a full-view window and rotating spinner. Corrosion-resistant construction with a wide viewing area for hygienic and chemical plant where flow must be seen at a glance.',
        image: `${FLOW_IMG}/stainless-vista-spinner-flow-indicator.webp`,
        imageAlt: 'Stainless steel Vista-series spinner flow indicator',
        principle: 'Rotating spinner',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Element', value: 'Coloured spinner' },
          { label: 'View', value: 'Full-circumference window' },
          { label: 'Connection', value: 'Screwed / flanged' },
          { label: 'Media', value: 'Corrosive & hygienic liquids' },
        ],
        applications: ['Food & beverage', 'Chemical plant', 'Water treatment', 'Skid packages'],
      },
    ],
  },
  {
    id: 'sight-glasses',
    name: 'Sight Glasses',
    description:
      'Robust window assemblies for direct visual inspection of media inside a pipeline. Single- and double-window designs in gunmetal and stainless steel, with screwed and flanged connections rated for water, chemical and steam service.',
    instruments: [
      {
        id: 'single-window-sight-glass',
        name: 'Single Window Sight Glass',
        tagline: 'Compact in-line inspection',
        description:
          'Compact single-window sight glass for direct observation of the medium in smaller-bore lines. A toughened glass window in a sealed body allows operators to confirm presence, colour and clarity of the process fluid.',
        image: `${FLOW_IMG}/single-window-sight-glass.png`,
        imageAlt: 'Single window in-line sight glass',
        principle: 'Single-window inspection',
        specs: [
          { label: 'Windows', value: 'Single' },
          { label: 'Window', value: 'Toughened glass' },
          { label: 'Connection', value: 'Screwed' },
          { label: 'Function', value: 'Visual inspection' },
          { label: 'Media', value: 'Liquids & gases' },
        ],
        applications: ['Sampling points', 'Small-bore lines', 'Dosing skids', 'Laboratories'],
      },
      {
        id: 'gunmetal-sight-glass',
        name: 'Gunmetal Sight Glass',
        tagline: 'General-purpose visual check',
        description:
          'Gunmetal-bodied sight glass for general water and utility service. The corrosion-resistant gunmetal body and clear window provide a durable, economical inspection point on plumbing and plant pipework.',
        image: `${FLOW_IMG}/gunmetal-sight-glass.png`,
        imageAlt: 'Gunmetal in-line sight glass',
        principle: 'Window inspection',
        specs: [
          { label: 'Body', value: 'Gunmetal' },
          { label: 'Window', value: 'Toughened glass' },
          { label: 'Connection', value: 'Screwed BSP' },
          { label: 'Function', value: 'Visual inspection' },
          { label: 'Media', value: 'Water & utilities' },
        ],
        applications: ['Building services', 'Cooling water', 'Utility lines', 'Pump rooms'],
      },
      {
        id: 'screwed-bsp-double-window-sight-glass',
        name: 'Screwed BSP Double Window Sight Glass',
        tagline: 'Stainless · see-through view',
        description:
          'Stainless steel double-window sight glass with opposed windows for a true see-through view of the flow. Screwed BSP connections make it a straightforward, economical inspection point on stainless and chemical lines.',
        image: `${FLOW_IMG}/screwed-bsp-double-window-sight-glass.webp`,
        imageAlt: 'Screwed BSP stainless steel double window sight glass',
        principle: 'Double-window inspection',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Windows', value: 'Double, opposed' },
          { label: 'Connection', value: 'Screwed BSP' },
          { label: 'View', value: 'See-through' },
          { label: 'Media', value: 'Corrosive liquids' },
        ],
        applications: ['Chemical lines', 'Process water', 'Dosing systems', 'Sampling'],
      },
      {
        id: 'flanged-pn16-double-window-sight-glass',
        name: 'Flanged PN16 Double Window Sight Glass',
        tagline: 'Stainless · PN16 flanged',
        description:
          'Stainless steel double-window sight glass with PN16 flanged connections for metric pipework. Opposed windows give a clear see-through view, with flanges for secure, leak-tight installation on process lines.',
        image: `${FLOW_IMG}/flanged-pn16-double-window-sight-glass.webp`,
        imageAlt: 'Flanged PN16 stainless steel double window sight glass',
        principle: 'Double-window inspection',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Windows', value: 'Double, opposed' },
          { label: 'Connection', value: 'Flanged PN16' },
          { label: 'View', value: 'See-through' },
          { label: 'Media', value: 'Process liquids' },
        ],
        applications: ['Process plant', 'Water treatment', 'Chemical dosing', 'Pipelines'],
      },
      {
        id: 'flanged-ansi150-double-window-sight-glass',
        name: 'Flanged ANSI 150 Double Window Sight Glass',
        tagline: 'Stainless · ANSI 150 flanged',
        description:
          'Stainless steel double-window sight glass with ANSI 150 flanged connections for imperial pipework. Provides a robust, see-through inspection point on process and utility lines built to ANSI standards.',
        image: `${FLOW_IMG}/flanged-ansi150-double-window-sight-glass.webp`,
        imageAlt: 'Flanged ANSI 150 stainless steel double window sight glass',
        principle: 'Double-window inspection',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Windows', value: 'Double, opposed' },
          { label: 'Connection', value: 'Flanged ANSI 150' },
          { label: 'View', value: 'See-through' },
          { label: 'Media', value: 'Process liquids' },
        ],
        applications: ['Process plant', 'Oil & gas', 'Water treatment', 'Pipelines'],
      },
      {
        id: 'flanged-ansi150-steam-sight-glass',
        name: 'Flanged ANSI 150 Steam Sight Glass',
        tagline: 'Type P · steam service',
        description:
          'Stainless steel flanged sight glass (Type P) rated for steam and high-temperature service. High-temperature windows and ANSI 150 flanges allow operators to verify flow and condensate on steam systems.',
        image: `${FLOW_IMG}/flanged-ansi150-steam-sight-glass.webp`,
        imageAlt: 'Type P stainless steel flanged ANSI 150 steam sight glass',
        principle: 'Window inspection, steam-rated',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Service', value: 'Steam & high temperature' },
          { label: 'Connection', value: 'Flanged ANSI 150' },
          { label: 'Windows', value: 'High-temperature' },
          { label: 'Function', value: 'Visual inspection' },
        ],
        applications: ['Steam mains', 'Condensate return', 'Heat exchangers', 'Boiler houses'],
      },
    ],
  },
  {
    id: 'needle-valves',
    name: 'Needle Valves',
    description:
      'Precision regulating valves for fine flow control, instrument isolation and sampling. Stainless steel construction for clean, accurate throttling on gauges, transmitters and small-bore process lines.',
    instruments: [
      {
        id: 'compression-316-needle-valve',
        name: 'Compression-Ended 316 Stainless Needle Valve',
        tagline: '6000 psi · instrument duty',
        description:
          'Compression-ended needle valve in 316 stainless steel rated to 6000 psi for high-pressure instrument and hydraulic service. The tapered needle gives fine, repeatable flow regulation and tight shut-off for gauges, transmitters and sampling points.',
        image: `${FLOW_IMG}/compression-316-needle-valve.webp`,
        imageAlt: 'Compression-ended 316 stainless steel needle valve rated 6000 psi',
        principle: 'Tapered-needle throttling',
        specs: [
          { label: 'Body', value: '316 stainless steel' },
          { label: 'Pressure', value: 'Up to 6000 psi' },
          { label: 'Ends', value: 'Compression' },
          { label: 'Function', value: 'Fine regulation & isolation' },
          { label: 'Service', value: 'Instrument & hydraulic' },
        ],
        applications: ['Gauge isolation', 'Instrument lines', 'Sampling', 'Hydraulic systems'],
        featured: true,
      },
      {
        id: 'economy-stainless-needle-valve',
        name: 'Economy Stainless Steel Needle Valve',
        tagline: 'Cost-effective fine control',
        description:
          'Economy stainless steel needle valve for general fine-flow regulation and isolation on instrument and small-bore lines. A cost-effective option where precise throttling is needed without high-pressure duty.',
        image: `${FLOW_IMG}/economy-stainless-needle-valve.webp`,
        imageAlt: 'Economy stainless steel needle valve',
        principle: 'Tapered-needle throttling',
        specs: [
          { label: 'Body', value: 'Stainless steel' },
          { label: 'Ends', value: 'Screwed BSP' },
          { label: 'Function', value: 'Fine regulation & isolation' },
          { label: 'Service', value: 'Instrument & general' },
          { label: 'Bore', value: 'Small-bore' },
        ],
        applications: ['Gauge isolation', 'Dosing trim', 'Sampling', 'Air & gas lines'],
      },
    ],
  },
  {
    id: 'flow-control',
    name: 'Flow Control Systems',
    description:
      'Packaged systems that move beyond indication to actively manage and limit flow, supplied ready for installation in water and process applications.',
    instruments: [
      {
        id: 'cs4000-water-flow-control-system',
        name: 'CS4000 Water Flow Control System',
        tagline: 'Standard packaged flow control',
        description:
          'Standard CS4000 packaged water flow control system for managing and limiting flow in distribution and process water applications. Supplied as a complete, ready-to-install assembly to maintain a controlled flow rate without continuous operator attention.',
        image: `${FLOW_IMG}/cs4000-water-flow-control-system.webp`,
        imageAlt: 'CS4000 standard water flow control system',
        principle: 'Packaged flow control',
        specs: [
          { label: 'Type', value: 'Packaged system' },
          { label: 'Function', value: 'Flow control & limiting' },
          { label: 'Media', value: 'Water' },
          { label: 'Supply', value: 'Ready to install' },
          { label: 'Service', value: 'Distribution & process' },
        ],
        applications: ['Water distribution', 'Process water', 'Flow limiting', 'Plant utilities'],
        featured: true,
      },
    ],
  },
]

export const flowProductCount = flowCategories.reduce((n, c) => n + c.instruments.length, 0)
