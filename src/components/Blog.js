import React from 'react';

const Blog = () => {
  const posts = [
    { title: 'Animating with accessibility in mind', date: '2024-10-15', url: '#', tags: ['a11y', 'motion'] },
    { title: 'From CLS to WOW: image strategies', date: '2024-08-02', url: '#', tags: ['performance', 'images'] },
    { title: 'Building case studies that convert', date: '2024-06-20', url: '#', tags: ['content', 'ux'] }
  ];

  return (
    <section id="blog" className="blog" aria-labelledby="blog-title">
      <div className="container">
        <div className="section-header">
          <h2 id="blog-title" className="section-title">Blog</h2>
          <p className="section-subtitle">Notes on design, code, and motion</p>
        </div>

        <div className="posts-grid">
          {posts.map((p, i) => (
            <article key={i} className="post-card">
              <header>
                <h3><a href={p.url}>{p.title}</a></h3>
                <time dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
              </header>
              <div className="post-tags">
                {p.tags.map((t, idx) => (<span key={idx} className="tag">{t}</span>))}
              </div>
              <footer>
                <a className="btn-secondary" href={p.url}><span>Read</span></a>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;


