type Params = Promise<{ slug: string }>;

export default async function VideoPage({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <div className="flex-1 bg-paper text-ink flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-5">
          Video · {slug}
        </div>
        <h1 className="font-display font-black text-5xl tracking-[-0.045em] leading-[0.9] mb-6">
          Video viewer coming soon.
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          This route resolves the slug to a Firestore video doc, runs the
          server-side subscription check, then renders the unlisted YouTube
          embed plus toolkit PDF download via signed URL.
        </p>
      </div>
    </div>
  );
}
