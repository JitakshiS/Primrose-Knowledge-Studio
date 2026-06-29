type Params = Promise<{ pillar: string }>;

export default async function PillarPage({ params }: { params: Params }) {
  const { pillar } = await params;
  return (
    <div className="flex-1 bg-paper text-ink flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-5">
          Pillar · {pillar}
        </div>
        <h1 className="font-display font-black text-5xl tracking-[-0.045em] leading-[0.9] mb-6">
          Pillar library coming soon.
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          This route lists every published video in the &quot;{pillar}&quot;
          pillar. Gated behind active Stripe subscription via server-side check
          before rendering any video metadata.
        </p>
      </div>
    </div>
  );
}
