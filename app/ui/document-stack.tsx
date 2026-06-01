import { DOCUMENT_STACK } from "../lib/content";

export function DocumentStack() {
  return (
    <section className="section build-section section-textured" id="document-stack">
      <div className="build-copy">
        <p className="eyebrow">{DOCUMENT_STACK.eyebrow}</p>
        <h2>{DOCUMENT_STACK.title}</h2>
        <p>{DOCUMENT_STACK.subtitle}</p>
        <p>{DOCUMENT_STACK.intro}</p>
      </div>
      <div className="workflow-rail">
        {DOCUMENT_STACK.cards.map((card) => (
          <article className="workflow-step" key={card.step}>
            <span>{card.step}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
