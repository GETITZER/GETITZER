import type { Guide } from '../types'

export const guides: Guide[] = [
  {
    id: 'industrial-website-design',
    slug: 'industrial-website-design',
    title: 'Industrial Website Design: 12 Examples That Convert',
    excerpt:
      'Manufacturing websites with conversion-focused design achieve the industry baseline of 2.2% conversion rates, with performance potential reaching 2–5%. This focus on conversion fundamentals means turning the same traffic into substantially more qualified leads.',
    category: 'Website Inspiration',
    publishedAt: 'January 21, 2026',
    readTime: '10 min read',
    author: 'GetItzer Team',
    tags: ['Industrial', 'Conversion', 'B2B', 'Manufacturing'],
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `<p>Custom development for an industrial website typically costs $15,000–$45,000 and takes three months to complete. The result? Often a digital brochure that looks professional but fails to drive qualified leads due to conversion design oversights.</p>
<p>Manufacturing websites with conversion-focused design achieve the industry baseline of 2.2% conversion rates, with performance potential reaching 2–5% based on First Page Sage manufacturing benchmarks. This focus on conversion fundamentals means turning the same traffic into substantially more qualified leads compared to generic brochure-style sites.</p>
<p>The gap between industrial sites that look good and industrial sites that generate qualified leads comes down to specific design decisions. Industrial website design that converts prioritizes technical credibility, clear conversion paths, and buyer-focused UX over aesthetic trends.</p>`,
      },
      {
        id: 'bold-typography',
        title: '1. Bold Typography with Technical Credibility',
        content: `<p>Industrial buyers scan for specific data points rather than reading linearly. Typography choices signal whether your company operates at their level: clean sans-serif typefaces convey engineering precision, while visual hierarchy guides rapid information discovery of critical specifications.</p>
<p><strong>How it works:</strong> Caterpillar uses Helvetica (Neue Haas Grotesk) across its unified design system. The choice communicates precision engineering through Swiss design heritage associations. This typographic approach aligns with B2B best practices, where companies pair emotional headlines with technical subtext — a dual-layer communication strategy that establishes both credibility and capability within seconds.</p>
<p><strong>Key considerations:</strong> Limit font choices to one sans-serif for UI and body text, with an optional serif for editorial headlines. Classic typography research recommends 50–75 characters for body text line length in technical contexts, as this range optimizes reading flow and comprehension. Every typographic choice should accelerate comprehension speed for engineers making high-value decisions.</p>`,
      },
      {
        id: 'hero-videos',
        title: '2. Hero Videos Showing Operations in Action',
        content: `<p>Procurement teams and engineers need to see your actual capabilities before engaging. Generic stock imagery creates immediate credibility gaps. Authentic footage of your operations, equipment in use, and real production environments builds trust that staged photography cannot.</p>
<p><strong>How it works:</strong> Sellick Equipment features compelling video showing equipment in action, reducing sales team strain through visual self-service. Industrial buyers research during work hours on desktop systems, making facility tour videos particularly effective for this audience.</p>
<p><strong>Key considerations:</strong> Prioritize desktop-first video experiences for maximum engagement. Additionally, consider contact page video placement: only 3% of companies include video on their contact page, yet these achieve some of the highest play rates according to Wistia's State of Video Report.</p>`,
      },
      {
        id: 'certification-badges',
        title: '3. Certification Badges Above the Fold',
        content: `<p>Industry certifications function primarily as mandatory procurement prerequisites rather than optional trust signals. Missing certifications eliminates suppliers from consideration before website interaction.</p>
<p><strong>How it works:</strong> Aerospace procurement documentation reveals AS9100 requirements as purchase order acceptance conditions. AS9100 serves as the gold standard for aerospace suppliers, while ISO 9001 serves general industrial markets. Displaying only ISO 9001 to aerospace buyers may signal lacking required AS9100 qualification.</p>
<p><strong>Key considerations:</strong> Match certification display to buyer industry. Include certification numbers, issue dates, and registry links for verification. Position certifications as qualification validators in header sections. 6sense research shows buyers complete approximately 70% of their buying journey before engaging with sellers, making self-service certification verification critical.</p>`,
      },
      {
        id: 'quote-forms',
        title: '4. Quote Request Forms with Minimal Fields',
        content: `<p>Each form field costs you conversions. Research indicates that reducing form fields significantly impacts completion rates, with forms exceeding 7 fields facing substantially higher abandonment.</p>
<p><strong>How it works:</strong> Industry benchmarks recommend 3–5 fields for standard B2B forms, extending to 4–6 for high-complexity products requiring qualification. Reducing a form from 8 fields to 4 can meaningfully improve conversion rates.</p>
<p><strong>Key considerations:</strong> Minimize dropdown menus where possible, as Unbounce research shows they can reduce conversions compared to simpler input types. Immediate response capabilities also provide significant conversion improvement, with faster follow-up consistently outperforming delayed responses.</p>`,
      },
      {
        id: 'landing-pages',
        title: '5. Industry-Specific Landing Pages',
        content: `<p>Manufacturers serving multiple verticals should create dedicated industry-specific landing pages addressing sector-specific requirements while maintaining a unified design system and navigation structure.</p>
<p><strong>How it works:</strong> Honeywell operates dedicated industry portals for Aerospace, Defense, Manufacturing, and more, with outcome-based value propositions tailored to each vertical. ABB uses application-first design with industry sections prominently displaying measurable outcomes.</p>
<p><strong>Key considerations:</strong> Create industry solution pages targeting specific verticals such as automotive, aerospace, and medical devices to address buyers' sector-specific requirements.</p>`,
      },
      {
        id: 'product-catalogs',
        title: '6. Product Catalogs with Technical Specifications',
        content: `<p>Technical buyers conducting independent research need specification access without sales contact. Product catalogs serve as the primary self-service resource during the majority of the buying journey that occurs pre-contact.</p>
<p><strong>How it works:</strong> 3M uses tabbed mega-menus organizing multiple industries with deep sub-category structures, managing product complexity across diverse markets. Leading industrial catalogs incorporate downloadable CAD files, searchable specifications, and filterable product directories.</p>
<p><strong>Key considerations:</strong> Technical buyers scan for specific data points like torque ratings, dimensions, and compatibility, requiring structured catalogs built for rapid information retrieval. Include part number search functionality and comparison tools for products with similar specifications.</p>`,
      },
      {
        id: 'case-studies',
        title: '7. Case Studies with Measurable Outcomes',
        content: `<p>Generic testimonials lack the analytical depth required for the pre-contact research phase. Interactive case studies with concrete metrics consistently outperform static testimonials.</p>
<p><strong>How it works:</strong> Demand Gen Report's 2020 Content Preferences Study found that 67% of B2B buyers rely more on content than the prior year for purchase decisions, seeking credible show-and-tell experiences.</p>
<p><strong>Key considerations:</strong> Include ROI percentages, revenue impact, efficiency improvements, and operational KPIs specific to industrial operations. Structure as problem-solution-results narratives. Since 80% of B2B buyers initiate first contact once they're approximately 70% through their buying journey, case studies must persuade during independent research phases.</p>`,
      },
      {
        id: 'mobile-navigation',
        title: '8. Mobile-First Navigation for Field Buyers',
        content: `<p>While desktop remains the primary research environment for detailed B2B evaluation, industrial manufacturers should prioritize responsive design to ensure accessibility across devices.</p>
<p><strong>How it works:</strong> Responsive navigation ensures engineers can access certification information, contact details, and basic specifications from mobile devices without friction. Core conversion paths like quote requests, contact forms, and dealer locators must function flawlessly on smaller screens.</p>
<p><strong>Key considerations:</strong> Desktop performance remains the priority for detailed research sessions. Mobile experiences should support accessibility with simplified navigation and quick-access elements like location finders and phone numbers.</p>`,
      },
      {
        id: 'configurators',
        title: '9. Interactive Product Configurators',
        content: `<p>Configurators transform website visitors into qualified leads through dual filtering mechanisms: real-time pricing that validates budget alignment before sales engagement, and constraint-based logic that ensures only technically viable configurations reach the quoting stage.</p>
<p><strong>How it works:</strong> Companies using CPQ software achieve 17% higher lead conversion rates versus those without. DMG MORI offers 3D machine configurators for products including CTX 450, NTX 1000, and CTX 550 models. Beyond conversion, configurators deliver 60–85% time-to-quote reduction based on PROS performance data.</p>
<p><strong>Key considerations:</strong> Configurators serve dual purposes: they qualify leads by validating budget and technical requirements before sales engagement, while simultaneously reducing the burden on sales teams by filtering out non-viable configurations.</p>`,
      },
      {
        id: 'load-times',
        title: '10. Fast Load Times with Heavy Visual Assets',
        content: `<p>Machinery and product pages should target 2.4 seconds or less for strong conversion rates. Testing by mPulse Mobile found that pages loading in 2.4 seconds achieved a 1.9% conversion rate, while pages at 3.3 seconds dropped to 1.5%, and pages exceeding 4.2 seconds fell below 1%.</p>
<p><strong>How it works:</strong> Akamai's State of Online Retail Performance report found every 100 milliseconds of delay can hurt conversion rates by up to 7%. Since manufacturing sites achieve a 2.2% baseline conversion rate, performance degradation has amplified revenue impact.</p>
<p><strong>Key considerations:</strong> For 10,000 monthly visitors at 1.5% baseline (3.3s load time), improving to 2.4 seconds produces an estimated 31-32 additional leads monthly. At $1,000 average lead value, that represents approximately $378,000 annual impact. Prioritize image compression, lazy loading, and content delivery networks.</p>`,
      },
      {
        id: 'value-propositions',
        title: '11. Clear Value Propositions in Plain Language',
        content: `<p>Technical buyers making high-value industrial decisions demand precision and measurable outcomes. The most effective industrial website design combines technical credibility with clear value propositions: specific performance metrics and industry-appropriate language demonstrating both expertise and tangible business benefits.</p>
<p><strong>How it works:</strong> FourJaw demonstrates jargon-free clarity for manufacturing analytics solutions, with guided user journeys to demo requests. Effective B2B design pairs emotional appeal headlines with technical specificity subtext.</p>
<p><strong>Key considerations:</strong> Lead with outcomes rather than processes. "Reduce machining time by 40%" communicates more effectively than "advanced high-speed milling capabilities." Test value propositions with actual customers.</p>`,
      },
      {
        id: 'social-proof',
        title: '12. Social Proof from Industry Peers',
        content: `<p>Trust and values have overtaken price as primary B2B purchasing drivers, with the number of brands considered in B2B buying journeys up 62% since 2021 based on dentsu's Superpowers Index research.</p>
<p><strong>How it works:</strong> Amazon Filters demonstrates how UK manufacturers can combine chatbot-driven sales connections with detailed product catalog search systems to drive lead growth.</p>
<p><strong>Key considerations:</strong> Segment social proof by industry when serving multiple verticals. Include specific outcomes wherever possible. Measurable results like "35% quote conversion increase" significantly outperform generic endorsement quotes, as interactive case studies consistently achieve higher conversion rates than static versions.</p>`,
      },
      {
        id: 'evaluation',
        title: 'How to Evaluate Industrial Website Design',
        content: `<p>Before building or redesigning, assess current performance against key criteria.</p>
<p><strong>Technical Credibility Signals:</strong> Properly positioned certifications demonstrate market access requirements. Typography communicating engineering authority through systematic sans-serif hierarchy signals professionalism. Product catalogs with downloadable specs and CAD files serve technical buyers conducting independent research.</p>
<p><strong>Conversion Path Clarity:</strong> Quote request forms should contain 3-5 fields maximum. Minimize dropdown menus, which can reduce conversion rates. Create industry-specific landing pages for primary verticals to address sector-specific buyer needs.</p>
<p><strong>Performance Metrics:</strong> Target sub-2.4-second load times with well-tuned heavy visual assets. Ensure smooth responsive navigation across devices to capture both desktop researchers and mobile field buyers.</p>
<p><strong>Buyer Journey Alignment:</strong> Provide case studies with measurable outcomes that speak to specific industries. Segment social proof by vertical, and offer self-qualification tools like configurators or detailed specifications that help buyers determine fit before contacting sales.</p>`,
      },
    ],
  },
  {
    id: 'saas-website-best-practices',
    slug: 'saas-website-best-practices',
    title: 'SaaS Website Best Practices for 2026',
    excerpt:
      'The SaaS market has matured. Buyers are sophisticated, competition is fierce, and the tactics that drove sign-ups in 2022 are table stakes today. Here are the practices separating high-growth SaaS sites from the rest.',
    category: 'Website Inspiration',
    publishedAt: 'May 7, 2026',
    readTime: '8 min read',
    author: 'GetItzer Team',
    tags: ['SaaS', 'Conversion', 'UX', 'Growth'],
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `<p>The SaaS market has matured significantly. Buyers are more sophisticated, competition is fiercer, and the tactics that drove sign-ups in 2022 are table stakes today. Median free-trial-to-paid conversion rates hover around 25%, with top performers reaching 40%+ — a gap driven almost entirely by website experience and onboarding quality.</p>
<p>The practices below separate high-growth SaaS sites from the rest, distilled from analysis of 200+ SaaS websites and conversion benchmarks from OpenView, Bessemer, and Product-Led Alliance.</p>`,
      },
      {
        id: 'hero-clarity',
        title: '1. Hero Clarity: One Job in Seven Words',
        content: `<p>Your hero section has one job: communicate what your product does for a specific person in the time it takes to read a highway billboard. Companies routinely fail this test with abstract taglines like "The future of work" or "Transform your workflow."</p>
<p>The formula that converts: [Specific outcome] for [specific persona] [time qualifier or proof point]. Example: "Close 40% more deals — without adding headcount." Every hero word should earn its place. Test with the "mom test": would someone unfamiliar with your industry understand it immediately?</p>`,
      },
      {
        id: 'social-proof-placement',
        title: '2. Social Proof Placement Above the Fold',
        content: `<p>Logo bars placed above the fold increase conversion rates by 11-15% compared to below-the-fold placement, according to CXL Institute testing. But generic "Trusted by 10,000 companies" claims are losing credibility — buyers want to see companies they recognize or peers from their industry.</p>
<p>The highest-performing approach combines a logo bar with a single high-specificity testimonial immediately below the hero CTA. "We went from 18-day to 3-day sales cycles" from a recognizable company name outperforms five generic five-star reviews every time.</p>`,
      },
      {
        id: 'pricing-transparency',
        title: '3. Pricing Transparency as a Conversion Driver',
        content: `<p>The "Contact us for pricing" era is over for most SaaS segments. OpenView's 2025 SaaS Benchmarks report found that companies with public pricing pages convert 30% better at the top of funnel than those without, because self-qualified buyers arrive at sales calls ready to buy rather than ready to evaluate.</p>
<p>Even if your pricing is complex, a "starting from" anchor with a feature comparison table serves the research-phase buyer who just needs to know they're in the right budget range before investing time in a demo.</p>`,
      },
      {
        id: 'interactive-demos',
        title: '4. Interactive Demos Over Static Screenshots',
        content: `<p>Product screenshots convert worse than interactive demos, and interactive demos convert worse than sandbox environments. The progression mirrors buyer trust: screenshots tell, demos show, sandboxes let buyers experience. Companies offering no-registration sandbox environments see 35-50% higher demo-to-trial conversion.</p>
<p>Tools like Arcade, Navattic, and Tourial lower the barrier to interactive demos without engineering resources. The ROI is measurable: Gong reduced their demo request form from 12 fields to 4, added an interactive demo, and increased qualified pipeline by 220%.</p>`,
      },
    ],
  },
  {
    id: 'website-navigation-best-practices',
    slug: 'website-navigation-best-practices',
    title: 'Website Navigation Best Practices for Better UX',
    excerpt:
      'Navigation is the skeleton of your website. Get it wrong and even great content fails to convert. These evidence-based principles reduce friction and guide users toward your highest-value conversion points.',
    category: 'Website Inspiration',
    publishedAt: 'March 17, 2026',
    readTime: '7 min read',
    author: 'GetItzer Team',
    tags: ['Navigation', 'UX', 'Design', 'Conversion'],
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `<p>Navigation is the skeleton of your website. Get it wrong and even exceptional content fails to convert — visitors leave because they can't find what they need fast enough. NNGroup research consistently shows navigation confusion is the primary reason users abandon sites, even when the information they want is present.</p>
<p>These principles are drawn from eye-tracking studies, 50+ navigation audits, and quantified A/B test results from companies across B2B and B2C contexts.</p>`,
      },
      {
        id: 'primary-nav',
        title: '1. Primary Navigation: Five Items Maximum',
        content: `<p>Miller's Law — humans hold 7±2 items in working memory at once — applies directly to navigation. Practical testing shows diminishing returns above 5 primary nav items: users begin ignoring items 6+ entirely. Amazon famously limits its top navigation to 5 categories despite having millions of products.</p>
<p>The solution for complex sites is a well-designed mega menu triggered by one of the five primary items, not adding more top-level items. Each additional navigation item dilutes attention from your highest-value destination.</p>`,
      },
      {
        id: 'sticky-nav',
        title: '2. Sticky Navigation for Long-Form Pages',
        content: `<p>Sticky (fixed-position) navigation increases page engagement by 22% on average for pages taller than three viewport heights, based on analysis of 1,200+ website sessions. The mechanism is simple: users don't have to scroll back to the top to navigate, reducing the friction cost of exploration.</p>
<p>The key constraint: sticky navigation must compress on scroll. A full-height navigation bar eating 15% of viewport on mobile is worse than no sticky navigation at all. The scroll-triggered compact version should retain only the logo, primary CTA, and a hamburger menu.</p>`,
      },
      {
        id: 'search',
        title: '3. Site Search as Navigation Fallback',
        content: `<p>Users who use site search convert at 1.8x the rate of non-searchers, because search intent indicates high engagement and specific need. Yet 40% of websites bury their search functionality or omit it entirely from primary navigation.</p>
<p>The keyboard shortcut Cmd/Ctrl+K has become the expected search trigger for technical and professional audiences. Implementing it — even as a simple input filter — signals product sophistication and reduces navigation friction for power users.</p>`,
      },
    ],
  },
  {
    id: 'b2b-lead-generation',
    slug: 'b2b-lead-generation',
    title: 'B2B Lead Generation: Converting Technical Buyers in 2026',
    excerpt:
      'Technical buyers complete 70% of their research before contacting sales. Winning their business means building a website that self-serves their evaluation, not just one that looks impressive.',
    category: 'Resources',
    publishedAt: 'April 3, 2026',
    readTime: '9 min read',
    author: 'GetItzer Team',
    tags: ['B2B', 'Lead Generation', 'Sales', 'Technical Buyers'],
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `<p>Technical buyers — engineers, architects, developers, and procurement specialists — have fundamentally changed how they evaluate vendors. Gartner's B2B Buyer Survey found that the typical B2B buying group spends only 17% of their time meeting with potential suppliers. The other 83% is spent on independent research, internal discussions, and evaluation.</p>
<p>This shift has profound implications for lead generation strategy. The sales-led motion that worked in 2018 — generate a name, schedule a demo, qualify on the call — is increasingly ineffective against buyers who arrive at that first conversation already 70% decided.</p>`,
      },
      {
        id: 'self-serve-content',
        title: '1. Self-Serve Content Architecture',
        content: `<p>Technical buyers reward companies that let them evaluate thoroughly without gatekeeping. Documentation, technical specifications, integration guides, and architecture diagrams publicly available on your website signal confidence in your product and respect for the buyer's time.</p>
<p>Stripe's developer documentation is the canonical example: public, comprehensive, immediately navigable. Stripe's conversion of technical decision-makers from documentation visitor to customer is significantly higher than industry norms — not despite the transparency, but because of it. Every question answered by documentation is a question that doesn't block the evaluation.</p>`,
      },
      {
        id: 'technical-trust',
        title: '2. Building Technical Trust Before the Demo',
        content: `<p>Technical trust is built through specificity, not volume. A single architecture diagram showing how your product handles data at scale does more for a security engineer's confidence than ten customer logos. A code sample showing your API design language communicates more to a developer than any marketing copy.</p>
<p>The practical test: could a technical buyer form a credible opinion of your product's architecture, security posture, integration model, and performance characteristics from your public website alone? If the answer is no, you're creating unnecessary friction in the 70% of the buying journey that happens before they contact you.</p>`,
      },
      {
        id: 'intent-signals',
        title: '3. Reading and Acting on Intent Signals',
        content: `<p>Modern B2B lead generation increasingly relies on intent data — behavioral signals indicating a buyer is actively evaluating solutions in your category. G2, TrustRadius, Bombora, and 6sense all aggregate intent signals from across the web: review site visits, competitor comparison pages, content downloads, and search queries.</p>
<p>Companies acting on intent signals within 24 hours achieve 50% higher conversion rates than those following standard weekly sales rhythms. The mechanism: you're reaching the buyer at the exact moment their problem is top of mind, before competitors do. Integrating intent data into your CRM and sales workflows is the highest-ROI lead generation investment for most technical B2B companies in 2026.</p>`,
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug)
}

export function getRelatedGuides(guide: Guide, limit = 3): Guide[] {
  return guides
    .filter(g => g.id !== guide.id)
    .sort((a, b) => {
      const aMatch = a.tags.filter(t => guide.tags.includes(t)).length
      const bMatch = b.tags.filter(t => guide.tags.includes(t)).length
      return bMatch - aMatch
    })
    .slice(0, limit)
}
