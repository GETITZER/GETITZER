import { usePageMeta } from '../hooks/usePageMeta'

export default function Terms() {
  usePageMeta({
    title: 'Terms & Conditions — ISA Valve Solutions',
    description: 'ISA Valve Solutions terms and conditions of sale, warranty policy, and general trading conditions for the supply of industrial valves and process equipment.',
    canonical: 'https://www.isavalvesolutions.com/terms',
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-isa-600 mb-3">Legal</p>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: June 2026</p>

        <div className="prose-guide space-y-8">

          <section>
            <h2>1. Parties and agreement</h2>
            <p>These Terms and Conditions ("Terms") govern all sales of products and services by ISA Valve Solutions &amp; Industrial Supplies ("ISA", "the Seller") to the purchasing party ("the Buyer"). By placing an order or accepting a quotation, the Buyer agrees to be bound by these Terms.</p>
          </section>

          <section>
            <h2>2. Quotations and orders</h2>
            <ul>
              <li>All quotations are valid for 30 days from the date of issue, unless otherwise stated.</li>
              <li>Quotations are subject to product availability and currency fluctuations.</li>
              <li>Orders are accepted upon written confirmation from ISA. Verbal commitments are not binding.</li>
              <li>ISA reserves the right to decline any order at its sole discretion.</li>
              <li>Order cancellations are subject to a restocking fee of up to 25% of the order value, depending on manufacturing stage.</li>
            </ul>
          </section>

          <section>
            <h2>3. Pricing and payment</h2>
            <ul>
              <li>All prices are quoted in South African Rand (ZAR) excluding VAT, unless otherwise stated.</li>
              <li>VAT will be charged at the prevailing rate in accordance with South African law.</li>
              <li>Payment terms are 30 days from date of invoice for approved credit accounts.</li>
              <li>New accounts require payment before delivery or COD.</li>
              <li>ISA reserves the right to charge interest on overdue accounts at 2% per month above prime lending rate.</li>
              <li>Import/custom orders may require a 50% deposit on order placement.</li>
            </ul>
          </section>

          <section>
            <h2>4. Delivery and lead times</h2>
            <ul>
              <li>Standard stock items: 2–5 business days from order confirmation.</li>
              <li>Non-stock and custom items: 4–12 weeks, depending on specification and origin.</li>
              <li>Delivery dates are estimates and not guaranteed. ISA is not liable for delays caused by manufacturing, shipping, or force majeure.</li>
              <li>Risk transfers to the Buyer upon delivery to the agreed delivery address.</li>
              <li>The Buyer is responsible for inspecting goods on delivery and reporting any visible damage within 48 hours.</li>
            </ul>
          </section>

          <section>
            <h2>5. Warranty</h2>
            <p>ISA warrants its products against manufacturing defects for a period of <strong>12 months from the date of delivery</strong>, subject to the following conditions:</p>
            <ul>
              <li>The product has been installed, operated, and maintained in accordance with ISA's installation and operation manuals.</li>
              <li>The product has not been subjected to conditions (pressure, temperature, media) outside its rated specifications.</li>
              <li>The product has not been modified, repaired, or tampered with by unauthorised parties.</li>
              <li>Warranty claims must be submitted in writing within the warranty period with supporting documentation.</li>
            </ul>
            <p>The warranty covers repair or replacement of defective components at ISA's discretion. The warranty does not cover normal wear parts (seals, seats, sleeves) subject to erosion or corrosion from process media.</p>
          </section>

          <section>
            <h2>6. Returns and exchanges</h2>
            <ul>
              <li>Returns are only accepted within 30 days of delivery and require prior written authorisation from ISA.</li>
              <li>Goods must be returned in original condition and packaging.</li>
              <li>Custom, imported, and special-order items are non-returnable.</li>
              <li>A restocking fee of 15–25% applies to all approved returns.</li>
            </ul>
          </section>

          <section>
            <h2>7. Limitation of liability</h2>
            <p>ISA's liability shall not exceed the purchase price of the specific goods giving rise to the claim. ISA is not liable for indirect, consequential, or special damages, including loss of production, revenue, or profits, arising from product failure or delay in delivery, regardless of whether ISA was advised of the possibility of such damages.</p>
          </section>

          <section>
            <h2>8. Intellectual property</h2>
            <p>All technical drawings, data sheets, catalogs, and digital content produced by ISA remain the intellectual property of ISA Valve Solutions. Reproduction or distribution without written consent is prohibited.</p>
          </section>

          <section>
            <h2>9. Governing law</h2>
            <p>These Terms are governed by the laws of the Republic of South Africa. Any disputes shall be subject to the exclusive jurisdiction of the South African courts.</p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>For any queries regarding these Terms, contact us at isa-valve@outlook.com or +27 060 688 5648.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
