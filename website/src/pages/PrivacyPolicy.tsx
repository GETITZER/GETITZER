import { usePageMeta } from '../hooks/usePageMeta'

export default function PrivacyPolicy() {
  usePageMeta({
    title: 'Privacy Policy — ISA Valve Solutions',
    description: 'ISA Valve Solutions privacy policy. How we collect, use, and protect your personal information in accordance with POPIA (Protection of Personal Information Act).',
    canonical: 'https://www.isavalvesolutions.com/privacy-policy',
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-isa-600 mb-3">Legal</p>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: June 2026</p>

        <div className="prose-guide space-y-8">

          <section>
            <h2>1. Who we are</h2>
            <p>ISA Valve Solutions &amp; Industrial Supplies ("ISA", "we", "us", "our") is an industrial valve supplier registered and operating in South Africa. We are committed to protecting your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and applicable data protection laws.</p>
            <p><strong>Contact:</strong> isa-valve@outlook.com | +27 060 688 5648</p>
          </section>

          <section>
            <h2>2. Information we collect</h2>
            <p>We collect the following types of personal information:</p>
            <ul>
              <li><strong>Contact information:</strong> Name, company name, email address, phone number — provided when you submit a quote request, contact form, or datasheet request.</li>
              <li><strong>Technical inquiry data:</strong> Application details, valve type, pipe size, and process parameters provided in quote requests — used solely to prepare your quotation.</li>
              <li><strong>Usage data:</strong> IP address, browser type, pages visited, and session duration — collected automatically via server logs and analytics tools.</li>
              <li><strong>Communication records:</strong> Emails, WhatsApp messages, and chat transcripts related to your inquiries.</li>
            </ul>
          </section>

          <section>
            <h2>3. How we use your information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Process and respond to quote requests, technical inquiries, and orders</li>
              <li>Send requested product data sheets, catalogs, and technical documentation</li>
              <li>Communicate about your orders, deliveries, and after-sales support</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with legal obligations under South African law</li>
              <li>Send relevant technical updates or new product notifications (with your consent)</li>
            </ul>
            <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2>4. Legal basis for processing (POPIA)</h2>
            <p>We process your personal information on the following grounds under POPIA:</p>
            <ul>
              <li><strong>Contractual necessity:</strong> Processing required to prepare quotations and fulfill orders</li>
              <li><strong>Legitimate interests:</strong> Business communications and website improvement</li>
              <li><strong>Consent:</strong> Marketing communications — you may withdraw consent at any time</li>
              <li><strong>Legal obligation:</strong> Compliance with South African tax, commercial, and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2>5. Data retention</h2>
            <p>We retain personal information for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Quote and order records are retained for a minimum of 5 years for accounting and legal compliance. You may request deletion of your data subject to legal retention requirements.</p>
          </section>

          <section>
            <h2>6. Data security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. Our website is served over HTTPS (TLS encryption) and access to customer data is restricted to authorised personnel only.</p>
          </section>

          <section>
            <h2>7. Your rights under POPIA</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to personal information we hold about you</li>
              <li>Request correction of inaccurate personal information</li>
              <li>Request deletion of your personal information (subject to legal retention requirements)</li>
              <li>Object to processing of your personal information</li>
              <li>Lodge a complaint with the Information Regulator of South Africa</li>
            </ul>
            <p>To exercise any of these rights, contact us at isa-valve@outlook.com.</p>
          </section>

          <section>
            <h2>8. Cookies and analytics</h2>
            <p>Our website uses cookies and similar technologies to enhance your browsing experience and analyse site usage. You may disable cookies in your browser settings; however, some functionality may be affected.</p>
          </section>

          <section>
            <h2>9. Third-party services</h2>
            <p>Our website may link to third-party sites (manufacturers, certification bodies, etc.). We are not responsible for the privacy practices of these sites. We recommend you review their privacy policies independently.</p>
          </section>

          <section>
            <h2>10. Changes to this policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated date. We recommend reviewing this policy periodically.</p>
          </section>

          <section>
            <h2>11. Contact us</h2>
            <p>For any privacy-related queries or to exercise your POPIA rights, contact our Information Officer:</p>
            <ul>
              <li>Email: isa-valve@outlook.com</li>
              <li>Phone: +27 060 688 5648</li>
              <li>WhatsApp: +27 060 688 5648</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  )
}
