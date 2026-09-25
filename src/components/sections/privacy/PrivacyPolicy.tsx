import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

export default function PrivacyPolicy() {

  return (
    <>
      {/* HERO */}
      <Section id="privacy-hero" narrow className="relative isolate overflow-hidden text-center">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute top-1/2 left-1/2 h-[560px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(24,143,139,0.06),transparent_70%)]" />
        </div>
        <Reveal>
          <h1 className="mx-auto max-w-[720px] font-display text-[34px] leading-[1.15] tracking-[-0.5px] text-black md:text-[52px]">
            Privacy policy
          </h1>
          <p className="mx-auto mt-[20px] max-w-[560px] text-[15px] leading-[1.6] tracking-[-0.14px] text-[#848484] md:text-[17px]">
            How CarbonSynq Earth collects, protects, and uses data &mdash;
            explained plainly, with no fine print you have to hunt for.
          </p>
          <p className="mt-[16px] text-[13px] tracking-[-0.14px] text-[#848484]/70">
            Version 5.1.2
          </p>
        </Reveal>
      </Section>

      {/* MISSION */}
      <Section id="mission" narrow className="relative isolate">
        <Reveal>
          <div className="mx-auto max-w-[720px]">
            <div className="flex items-baseline gap-[14px]">
              <span className="font-display text-[13px] text-[#188f8b]">01</span>
              <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                Our approach to privacy
              </h2>
            </div>
            <div className="mt-[14px] space-y-[12px] pl-[27px]">
              <p className="max-w-[620px] text-[15px] leading-[1.7] tracking-[-0.14px] text-[#4a4a4a]">
                Privacy isn&rsquo;t a feature we bolted on &mdash; it&rsquo;s how the platform is built.
                CarbonSynqEarth acts as a secure vault for your ESG data, not a
                shared warehouse.
              </p>
              <div className="mt-[24px] grid grid-cols-1 gap-[16px] md:grid-cols-2">
                <div className="rounded-[16px] border border-black/[0.06] p-[24px]">
                  <h4 className="font-display text-[16px] text-black">Data sovereignty</h4>
                  <p className="mt-[8px] text-[14px] leading-[1.6] tracking-[-0.14px] text-[#848484]">
                    You retain full ownership of your data. We provide the
                    infrastructure to process it &mdash; we never claim rights
                    to your raw information.
                  </p>
                </div>
                <div className="rounded-[16px] border border-black/[0.06] p-[24px]">
                  <h4 className="font-display text-[16px] text-black">Mathematical privacy</h4>
                  <p className="mt-[8px] text-[14px] leading-[1.6] tracking-[-0.14px] text-[#848484]">
                    Differential privacy techniques keep industry benchmarks
                    useful without ever tracing back to a specific user.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* BODY SECTIONS */}
      <Section id="policy-body" narrow className="relative isolate">
        <Reveal>
          <div className="mx-auto max-w-[720px] divide-y divide-black/[0.06]">

            {/* AI GOVERNANCE */}
            <div id="ai-governance" className="scroll-mt-[100px] py-[36px] first:pt-0">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">02</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  AI governance
                </h2>
              </div>
              <div className="mt-[14px] space-y-[12px] pl-[27px]">
                <p className="max-w-[620px] text-[15px] leading-[1.7] tracking-[-0.14px] text-[#4a4a4a]">
                  Our AI engine, CarbonPulse, follows a strict set of rules
                  before any automated insight reaches you:
                </p>
                <ul className="space-y-[10px] pt-[4px]">
                  {[
                    ["Isolated compute", "Each calculation runs in a temporary container that's destroyed once the task completes."],
                    ["Human-verified logic", "Every automated decarbonization strategy is reviewed by an ESG specialist before publication."],
                    ["No-recall training", "Our base models are never fine-tuned on user-specific data or supply chain identifiers."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex items-start gap-[10px] text-[14px] leading-[1.6] tracking-[-0.14px] text-[#4a4a4a]">
                      <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#188f8b]" />
                      <span>
                        <span className="font-medium text-black">{t}.</span> {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLLECTION */}
            <div id="collection" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">03</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  What we collect
                </h2>
              </div>
              <div className="mt-[14px] grid grid-cols-1 gap-[20px] pl-[27px] md:grid-cols-2">
                <div>
                  <p className="text-[13px] font-medium tracking-[-0.14px] text-[#848484]">Primary inputs</p>
                  <ul className="mt-[10px] space-y-[8px]">
                    {["Direct manual entries", "IoT telemetry streams", "Utility API integrations"].map((item) => (
                      <li key={item} className="flex items-start gap-[10px] text-[14px] leading-[1.5] tracking-[-0.14px] text-[#4a4a4a]">
                        <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#188f8b]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="max-w-[620px] rounded-[14px] bg-[#188f8b]/[0.06] px-[16px] py-[12px] text-[14px] leading-[1.6] tracking-[-0.14px] text-[#166b68]">
                  Unlike a shared multi-tenant database, each customer&rsquo;s
                  environmental records sit in a dedicated, encrypted
                  partition.
                </p>
              </div>
            </div>

            {/* BIOMETRICS */}
            <div id="biometrics" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">04</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  Biometric login
                </h2>
              </div>
              <div className="mt-[14px] space-y-[12px] pl-[27px]">
                <p className="max-w-[620px] text-[15px] leading-[1.7] tracking-[-0.14px] text-[#4a4a4a]">
                  When you use Face ID or a fingerprint to sign in, we never
                  store the biometric itself. We store a mathematical hash
                  generated by your device&rsquo;s secure enclave &mdash; we
                  can&rsquo;t reconstruct your biometrics from it, and your
                  identity stays on your hardware.
                </p>
              </div>
            </div>

            {/* USAGE */}
            <div id="usage" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">05</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  How we use it
                </h2>
              </div>
              <div className="mt-[14px] grid grid-cols-1 gap-[16px] pl-[27px] md:grid-cols-2">
                <div className="rounded-[16px] border border-black/[0.06] p-[20px]">
                  <h4 className="font-display text-[15px] text-black">ESG analytics</h4>
                  <p className="mt-[8px] text-[13px] leading-[1.6] tracking-[-0.14px] text-[#848484]">
                    Raw energy data becomes CO2e figures, using global
                    warming potential factors from the IPCC Sixth Assessment
                    Report.
                  </p>
                </div>
                <div className="rounded-[16px] border border-black/[0.06] p-[20px]">
                  <h4 className="font-display text-[15px] text-black">Internal benchmarking</h4>
                  <p className="mt-[8px] text-[13px] leading-[1.6] tracking-[-0.14px] text-[#848484]">
                    Comparing departments or sites to flag high-emission
                    clusters and suggest efficiency upgrades.
                  </p>
                </div>
              </div>
            </div>

            {/* SUPPLY CHAIN */}
            <div id="supply-chain" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">06</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  Supply chain data
                </h2>
              </div>
              <div className="mt-[14px] space-y-[16px] pl-[27px]">
                <p className="max-w-[620px] text-[15px] leading-[1.7] tracking-[-0.14px] text-[#4a4a4a]">
                  Managing Scope 3 emissions without compromising a
                  supplier&rsquo;s own privacy:
                </p>
                <ul className="space-y-[12px]">
                  {[
                    ["Vendor anonymization", "When a vendor shares data with you, we strip anything that could identify their specific facilities, leaving only carbon intensity scores."],
                    ["Explicit consent only", "Vendors approve each data request individually. There's no automated pulling of supplier data without verified consent."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex items-start gap-[10px] text-[14px] leading-[1.6] tracking-[-0.14px] text-[#4a4a4a]">
                      <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#188f8b]" />
                      <span>
                        <span className="font-medium text-black">{t}.</span> {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COOKIES */}
            <div id="cookies" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">07</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  Cookies & tracking
                </h2>
              </div>
              <div className="mt-[14px] overflow-x-auto pl-[27px]">
                <table className="w-full max-w-[620px] text-left">
                  <thead>
                    <tr className="border-b border-black/[0.08]">
                      {["Class", "Name", "Purpose", "Duration"].map((h) => (
                        <th key={h} className="pb-[10px] pr-[16px] text-[12px] font-medium tracking-[-0.1px] text-[#848484]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Essential", "cs_sec_sid", "Anti-abuse token", "Persistent"],
                      ["Functional", "cs_loc_locale", "Currency & language", "1 year"],
                      ["Analytics", "_ga_sync", "Engagement metrics", "2 years"],
                      ["Marketing", "\u2014", "We don't run marketing trackers", "\u2014"],
                    ].map((row) => (
                      <tr key={row[1]} className="border-b border-black/[0.04] last:border-0">
                        {row.map((cell, i) => (
                          <td
                            key={i}
                            className={`py-[12px] pr-[16px] text-[13px] tracking-[-0.14px] ${
                              i === 0 ? "font-medium text-black" : "text-[#4a4a4a]"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHTS */}
            <div id="rights" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">08</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  Your rights
                </h2>
              </div>
              <div className="mt-[14px] grid grid-cols-1 gap-[16px] pl-[27px] md:grid-cols-2">
                <div className="rounded-[16px] border border-black/[0.06] p-[20px]">
                  <p className="text-[12px] font-medium tracking-[-0.1px] text-[#848484]">European Union &mdash; GDPR</p>
                  <ul className="mt-[10px] space-y-[8px]">
                    {["Right to portability (JSON / CSV)", "Right to erasure", "Right to restrict processing"].map((r) => (
                      <li key={r} className="flex items-start gap-[10px] text-[13px] leading-[1.5] tracking-[-0.14px] text-[#4a4a4a]">
                        <span className="mt-[6px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#188f8b]" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[16px] border border-black/[0.06] p-[20px]">
                  <p className="text-[12px] font-medium tracking-[-0.1px] text-[#848484]">United States &mdash; CCPA / CPRA</p>
                  <ul className="mt-[10px] space-y-[8px]">
                    {["Right to opt out of sale", "Right to correction", "Right to limit sensitive use"].map((r) => (
                      <li key={r} className="flex items-start gap-[10px] text-[13px] leading-[1.5] tracking-[-0.14px] text-[#4a4a4a]">
                        <span className="mt-[6px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#188f8b]" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* HISTORY */}
            <div id="history" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">09</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  Policy history
                </h2>
              </div>
              <div className="mt-[14px] space-y-[16px] pl-[27px]">
                {[
                  ["v5.1.2", "May 3, 2026", "Enhanced biometric security framework and supply chain sync."],
                  ["v5.0.0", "March 1, 2026", "Platform-wide update for AI ethics and DPDP compliance."],
                  ["v4.8.0", "Dec 15, 2025", "Added standard contractual clauses for international data nodes."],
                ].map(([v, d, c]) => (
                  <div key={v} className="flex flex-col gap-[4px] border-b border-black/[0.05] pb-[16px] last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-[16px]">
                    <span className="w-[64px] shrink-0 font-display text-[14px] text-black">{v}</span>
                    <span className="w-[100px] shrink-0 text-[13px] text-[#848484]">{d}</span>
                    <p className="text-[13px] leading-[1.5] tracking-[-0.14px] text-[#4a4a4a]">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LEGAL */}
            <div id="legal" className="scroll-mt-[100px] py-[36px]">
              <div className="flex items-baseline gap-[14px]">
                <span className="font-display text-[13px] text-[#188f8b]">10</span>
                <h2 className="font-display text-[20px] tracking-[-0.3px] text-black md:text-[22px]">
                  Arbitration & governance
                </h2>
              </div>
              <div className="mt-[14px] space-y-[16px] pl-[27px]">
                <p className="max-w-[620px] text-[15px] leading-[1.7] tracking-[-0.14px] text-[#4a4a4a]">
                  Disputes about this policy that can&rsquo;t be settled
                  directly go to binding arbitration under the rules of the
                  International Chamber of Commerce.
                </p>
                <div className="flex gap-[32px] text-[13px]">
                  <div>
                    <p className="text-[#848484]">Jurisdiction</p>
                    <p className="mt-[4px] font-medium text-black">Noida, Uttar Pradesh</p>
                  </div>
                  <div>
                    <p className="text-[#848484]">Language</p>
                    <p className="mt-[4px] font-medium text-black">English / Hindi</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Reveal>
      </Section>
      
    </>
  );
}