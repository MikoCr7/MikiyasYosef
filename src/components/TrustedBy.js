import React from 'react';

const TrustedBy = () => {
  const clients = [
    {
      id: 1,
      name: 'DreamLight',
      label: 'DREAMLIGHT',
      logo: '/img/Campanies/dreamlight.webp',
      description: 'Creative Agency'
    },
    {
      id: 2,
      name: 'Prime',
      label: 'PRIME',
      logo: '/img/Campanies/prime.webp',
      description: 'Business Solutions'
    },
    {
      id: 3,
      name: 'Arif Studio',
      label: 'ARIF STUDIO',
      logo: '/img/Campanies/arif studio.webp',
      description: 'Design Studio'
    },
    {
      id: 4,
      name: 'Falcon Plc',
      label: 'FALCON PLC',
      logo: '/img/Campanies/Falcon PLC.webp',
      description: 'Technology Company'
    },
    {
      id: 5,
      name: 'Nigus Market',
      label: 'NIGUS MARKET',
      logo: '/img/Campanies/Nigus Market.webp',
      description: 'E-commerce Platform'
    },
    {
      id: 6,
      name: 'Habesha Gaming',
      label: 'HABESHA GAMING',
      logo: '/img/Campanies/habesha gaming.webp',
      description: 'Gaming Platform'
    },
    {
      id: 7,
      name: 'ZoraBet',
      label: 'ZORABET',
      logo: '/img/Campanies/zorabet.webp',
      description: 'Betting Platform'
    },
    {
      id: 8,
      name: 'Havana',
      label: 'HAVANA',
      logo: '/img/Campanies/havana.webp',
      description: 'Brand Identity'
    },
    {
      id: 9,
      name: 'FinixBet',
      label: 'FINIXBET',
      logo: '/img/Campanies/Finixbet.webp',
      description: 'Betting & Gaming'
    },
    {
      id: 10,
      name: 'TeleGames TG',
      label: 'TELEGAMES TG',
      logo: '/img/Campanies/telegames.webp',
      description: 'Gaming Platform'
    },
    {
      id: 11,
      name: 'SeeScore',
      label: 'SEESCORE',
      logo: '/img/Campanies/seescore.webp',
      description: 'Scoring Platform'
    }
  ];

  return (
    <section id="trusted-by" className="trusted-by" aria-labelledby="trusted-by-title">
      <div className="container">
        <div className="section-header">
          <h2 id="trusted-by-title" className="section-title">Trusted By</h2>
          <p className="section-subtitle">Companies and brands that trust our work</p>
        </div>
      </div>
      
      <div className="clients-logos-wrapper">
          <div className="clients-logos-scroll">
            <div className="clients-logos-grid">
              {/* First set of logos */}
              {clients.map((client) => (
                <div key={client.id} className="client-logo-item">
                  <div className="client-logo-circle">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="client-logo-img"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="client-logo-placeholder" style={{ display: 'none' }}>
                      <span>{client.label.charAt(0)}</span>
                    </div>
                  </div>
                  <p className="client-logo-label">{client.label}</p>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {clients.map((client) => (
                <div key={`duplicate-${client.id}`} className="client-logo-item">
                  <div className="client-logo-circle">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="client-logo-img"
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="client-logo-placeholder" style={{ display: 'none' }}>
                      <span>{client.label.charAt(0)}</span>
                    </div>
                  </div>
                  <p className="client-logo-label">{client.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default TrustedBy;

