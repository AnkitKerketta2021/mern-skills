export default function ComingSoonPage({ title = "Coming soon", eyebrow = "NEXT CHAPTER" }) {
  return (
    <section className="page-section centered-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="coming-soon-card glass-card reveal-in">
        <div className="coming-orbit"><span /><span /><span /></div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>This route is wired, protected and ready for the next design pass. The content layer will arrive in the next phase.</p>
        <div className="coming-meta">
          <span>ROUTED</span><span>SECURED</span><span>ANIMATED</span>
        </div>
      </div>
    </section>
  );
}
