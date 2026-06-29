export default function DashboardPage() {
  return (
    <div className="flex-1 bg-paper text-ink flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-5">
          Members · Fortress home
        </div>
        <h1 className="font-display font-black text-5xl tracking-[-0.045em] leading-[0.9] mb-6">
          Dashboard coming soon.
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          This route renders the member dashboard — five-pillar navigation, the
          Newest Addition feature slot, and resume-where-you-left-off. Gated
          behind Firebase Auth + active Stripe subscription.
        </p>
      </div>
    </div>
  );
}
