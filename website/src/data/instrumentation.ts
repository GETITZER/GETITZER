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
