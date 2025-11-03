import React from 'react';

const CaseStudies = () => {
  const cases = [
    {
      title: 'E-commerce Redesign',
      problem: 'High bounce rates and slow checkout conversions',
      solution: 'Rebuilt UI with clearer IA, optimized images, streamlined checkout flow',
      impact: 'Bounce rate -28%, Conversion +22%, CLS < 0.05',
      link: '#'
    },
    {
      title: 'SaaS Marketing Site',
      problem: 'Poor SEO visibility and low trial signups',
      solution: 'Content-focused architecture, structured data, performance tuning',
      impact: 'Organic traffic +65%, Trials +30%',
      link: '#'
    }
  ];

  return (
    <section id="case-studies" className="case-studies" aria-labelledby="case-studies-title">
      <div className="container">
        <div className="section-header">
          <h2 id="case-studies-title" className="section-title">Case Studies</h2>
          <p className="section-subtitle">Problem → Solution → Impact</p>
        </div>

        <div className="cases-grid">
          {cases.map((c, i) => (
            <article key={i} className="case-card">
              <header className="case-header"><h3>{c.title}</h3></header>
              <div className="case-body">
                <div className="case-row"><strong>Problem</strong><p>{c.problem}</p></div>
                <div className="case-row"><strong>Solution</strong><p>{c.solution}</p></div>
                <div className="case-row"><strong>Impact</strong><p>{c.impact}</p></div>
              </div>
              <footer className="case-footer">
                <a href={c.link} className="btn-secondary"><span>Read More</span></a>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;


