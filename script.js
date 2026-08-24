/* ============================================================
   PROJECT DATA
   Single source of truth — cards and detail views are both
   rendered from this array so they can never drift apart.

   TODO markers show exactly what still needs real content:
   - swap placeholder GitHub links for real repo URLs
   - drop in real result figures where figure.placeholder = true
   - fill in pending metrics where noted
   ============================================================ */
const PROJECTS = [
  {
    slug: 'storm-surge',
    num: '01',
    tags: ['PyTorch', 'ERA5', 'GESLA-3', 'Deep Learning'],
    title: 'Storm Surge Global Prediction',
    status: 'in-progress',
    cardDesc: 'M.Sc. thesis — a transferable deep learning framework for global storm surge prediction, combining dynamic ERA5 meteorological forcing with static bathymetry and coastline geometry.',
    cardMetrics: [],
    detail: {
      eyebrow: 'M.Sc. Thesis — In Progress · Expected Dec 2026',
      summary: 'Most storm surge models are calibrated per-region and don\u2019t transfer to ungauged coastlines. This thesis asks whether a single model, conditioned on static coastal geometry, can generalize globally instead.',
      links: [
        { label: 'Repository — available after submission', url: null }
      ],
      sections: [
        {
          title: 'Problem',
          type: 'text',
          html: `<p>Storm surge — the abnormal rise in sea level during a storm — is typically forecast with models calibrated to a single gauge or region. That approach doesn't transfer: a model tuned for the Gulf of Mexico tells you nothing about an ungauged stretch of coastline in Southeast Asia.</p>
                 <p>The thesis tests whether a <strong>single global model</strong>, conditioned on static coastal geometry rather than retrained per site, can generalize across coastlines it has never seen.</p>`
        },
        {
          title: 'Approach',
          type: 'text',
          html: `<p>The architecture has two branches: a sequence encoder over <strong>dynamic ERA5 forcing</strong> (wind, pressure fields) and a static-feature branch over <strong>bathymetry and coastline shape</strong>. Both feed a shared prediction head.</p>
                 <p>Training is <strong>multi-site</strong> — the model sees many <strong>GESLA-3</strong> tide gauge records simultaneously, rather than one model per gauge, so it has to learn a representation that transfers.</p>`
        },
        {
          title: 'Results',
          type: 'pending',
          text: 'Thesis in progress. The data pipeline (ERA5 + GESLA-3 + bathymetry) and baseline architecture are built and training; global validation numbers will be added here after submission.'
        },
        {
          title: 'Limitations',
          type: 'limitations',
          items: [
            'GESLA-3 gauge coverage is sparse in the Global South — global generalization claims will need to be qualified by where the training data actually comes from.',
            'Bathymetry data resolution varies by region, which may bias what the static branch can learn near poorly-surveyed coastlines.',
            'Extreme surge events are rare by definition — class imbalance in the training distribution is an open problem, not yet solved.'
          ]
        }
      ]
    }
  },
  {
    slug: 'transformer-nmt',
    num: '02',
    tags: ['PyTorch', 'Transformer', 'NLP'],
    title: 'Transformer NMT — English to Italian',
    cardDesc: 'Full encoder-decoder Transformer (Vaswani et al., 2017), implemented from scratch — no HuggingFace abstractions.',
    cardMetrics: [
      { val: '+39%', label: 'Corpus BLEU, beam (k=2) vs. greedy decoding' }
    ],
    detail: {
      eyebrow: 'Personal Project',
      summary: 'The full Vaswani et al. (2017) encoder-decoder Transformer, built from raw PyTorch to understand exactly what attention, positional encoding, and the training schedule are doing — not just call them through a library.',
      links: [
        { label: 'GitHub — add repo link', url: null }
      ],
      sections: [
        {
          title: 'Problem',
          type: 'text',
          html: `<p>It's easy to fine-tune a pretrained Transformer without understanding what's happening inside it. The goal here was the opposite: implement every component — multi-head attention, positional encoding, the training schedule — from scratch, to build real intuition for why each piece exists.</p>`
        },
        {
          title: 'Approach',
          type: 'text',
          html: `<p>Multi-head attention, sinusoidal positional encoding, and Pre-LN normalization, trained with a <strong>warmup + inverse-square-root learning rate schedule</strong> and FP16 mixed precision. Tokenization uses a <strong>shared BPE vocabulary</strong> (SentencePiece, 15k tokens) trained on the combined English-Italian corpora.</p>
                 <p>At inference time, <strong>beam search (k=2)</strong> is compared against greedy decoding, and cross-attention heads are visualized and interpreted layer-by-layer to check what each head is actually attending to.</p>`
        },
        {
          title: 'Results',
          type: 'figure',
          placeholder: true,
          caption: 'Cross-attention heatmap across decoder layers — add rendered figure here.'
        },
        {
          title: '',
          type: 'results',
          stats: [
            { val: '+39%', label: 'Corpus BLEU improvement, beam (k=2) vs. greedy' }
          ]
        },
        {
          title: '',
          type: 'pending',
          text: 'Absolute corpus BLEU score not yet published on this page — the figure above is the relative gain from beam search alone. Add the absolute number once finalized.'
        },
        {
          title: 'Limitations',
          type: 'limitations',
          items: [
            'Trained on combined corpora without domain filtering — performance likely varies significantly by text domain (news vs. conversational vs. technical).',
            'No back-translation or monolingual data augmentation used, which is standard practice for boosting low-resource MT quality.',
            'Beam width capped at k=2 due to compute budget — wider beams were not evaluated, so the ceiling on beam search gains is unknown.',
            'Evaluated on a single language pair; nothing here demonstrates the architecture generalizes to other pairs.'
          ]
        }
      ]
    }
  },
  {
    slug: 'gnn-air-quality',
    num: '03',
    tags: ['GNN', 'GAT', 'LSTM', 'PyTorch Geometric'],
    title: 'Spatio-Temporal GNN for Air Quality',
    cardDesc: 'A spatio-temporal graph neural network (LSTM + GAT) forecasting PM2.5 across a sensor network, treating each monitoring station as a graph node.',
    cardMetrics: [],
    detail: {
      eyebrow: 'Personal Project · Published on GitHub',
      summary: 'Air quality sensors in a city aren\u2019t independent — pollution at one station is correlated with its neighbors. This project models that structure directly with a graph neural network instead of forecasting each sensor in isolation.',
      links: [
        { label: 'GitHub — add repo link', url: null }
      ],
      sections: [
        {
          title: 'Problem',
          type: 'text',
          html: `<p>Standard time-series forecasting treats each air quality sensor independently, discarding the spatial correlation between nearby stations — information that should improve forecasts, especially for sensors with gappy data.</p>`
        },
        {
          title: 'Approach',
          type: 'text',
          html: `<p>Each sensor is a node in a graph. A per-node <strong>LSTM</strong> encodes that sensor's own history; <strong>GAT (Graph Attention)</strong> layers then pass messages between spatially and statistically correlated sensors, so each node's forecast is informed by its neighbors, weighted by learned attention rather than fixed distance.</p>`
        },
        {
          title: 'Results',
          type: 'figure',
          placeholder: true,
          caption: 'Sensor network graph with attention weights — add rendered figure here.'
        },
        {
          title: '',
          type: 'pending',
          text: 'Add validation metrics here — RMSE/MAE against an LSTM-only baseline and a naive persistence baseline, so the graph structure\u2019s contribution is actually demonstrated, not just implied.'
        },
        {
          title: 'Limitations',
          type: 'limitations',
          items: [
            'The graph edges are defined by a static distance/correlation threshold rather than learned — an ablation against a fully learned adjacency would clarify how much the fixed structure is helping vs. limiting.',
            'Performance on sensors with long missing-data gaps has not been separately evaluated, and that\u2019s exactly the case where a graph model should earn its keep.'
          ]
        }
      ]
    }
  },
  {
    slug: 'rutor-glacier',
    num: '04',
    tags: ['CNN', 'Random Forest', 'MLP', 'GEE'],
    title: 'Rutor Glacier Temporal Classification',
    cardDesc: 'An automated Google Earth Engine pipeline extracting 1,178 ten-band spectral signatures from 40 years of Landsat imagery to track glacier dynamics.',
    cardMetrics: [
      { val: '99.1%', label: 'classification accuracy' },
      { val: '~50%', label: 'glacier volume loss quantified' },
      { val: '\u22121.05 km\u00b2/yr', label: 'measured retreat rate' }
    ],
    detail: {
      eyebrow: 'Personal Project',
      summary: 'Quantifying multi-decadal glacier retreat where field surveys are sparse and expensive, using an automated Earth Engine pipeline over four decades of Landsat imagery.',
      links: [
        { label: 'GitHub — add repo link', url: null }
      ],
      sections: [
        {
          title: 'Problem',
          type: 'text',
          html: `<p>Direct field surveys of glacier extent are expensive and infrequent. Landsat's 40+ year archive makes it possible to reconstruct glacier change over time — if the pipeline can handle severe class imbalance and decades of sensor changes.</p>`
        },
        {
          title: 'Approach',
          type: 'text',
          html: `<p>An automated GEE pipeline extracts <strong>1,178 ten-band spectral signatures</strong> from 40 years of Landsat imagery. Three architectures — <strong>1D-CNN, MLP, and Random Forest</strong> — are compared on the resulting 5-class, severely imbalanced classification task, specifically to understand when a classical method outperforms deep learning on structured spectral inputs rather than assuming deep learning wins by default.</p>`
        },
        {
          title: 'Results',
          type: 'figure',
          placeholder: true,
          caption: 'Glacier extent time series / retreat map — add rendered figure here.'
        },
        {
          title: '',
          type: 'results',
          stats: [
            { val: '99.1%', label: 'classification accuracy (5-class, imbalanced)' },
            { val: '~50%', label: 'glacier volume loss, 40-year span' },
            { val: '\u22121.05 km\u00b2/yr', label: 'peak measured retreat rate' }
          ]
        },
        {
          title: 'Limitations',
          type: 'limitations',
          items: [
            'No cross-sensor radiometric calibration was applied across the 40-year Landsat record — spectral drift between Landsat missions is a plausible confound the accuracy number doesn\u2019t account for.',
            'This is a single-glacier case study. Nothing here demonstrates the pipeline generalizes to debris-covered or maritime glaciers, which behave very differently spectrally.',
            'Class imbalance was addressed by comparing architectures, not by resampling or reweighting — a direct comparison with a resampling approach would strengthen the result.'
          ]
        }
      ]
    }
  },
  {
    slug: 'foundation-model-ft',
    num: '05',
    tags: ['PyTorch', 'Vision Transformer', 'HLS', 'Fine-tuning'],
    title: 'Fine-Tuning Geospatial Foundation Models',
    cardDesc: 'Fine-tuned the 300M-parameter Prithvi Vision Transformer (and TerraMind) for a 10-class land cover task using only 100 training samples.',
    cardMetrics: [
      { val: '300M', label: 'parameter model' },
      { val: '100', label: 'training samples only' },
      { val: '40%', label: 'accuracy — low-data regime' }
    ],
    detail: {
      eyebrow: 'Personal Project',
      summary: 'Land-cover mapping in data-scarce regions, where collecting hundreds of labeled multispectral samples is often not realistic — tested here with a deliberately extreme 100-sample budget.',
      links: [
        { label: 'GitHub — add repo link', url: null }
      ],
      sections: [
        {
          title: 'Problem',
          type: 'text',
          html: `<p>Foundation models promise good performance with little labeled data, but that claim is rarely stress-tested at the low end. This project fine-tunes a 300M-parameter geospatial foundation model with only <strong>100 training samples</strong> to see what the low-data regime actually looks like.</p>`
        },
        {
          title: 'Approach',
          type: 'text',
          html: `<p>Fine-tuned the <strong>Prithvi Vision Transformer</strong> (and TerraMind) for 10-class land cover segmentation. Prithvi's embeddings are pretrained on RGB — this required <strong>dynamically adapting the input embeddings</strong> to ingest 7-band multispectral HLS satellite chips instead.</p>`
        },
        {
          title: 'Results',
          type: 'figure',
          placeholder: true,
          caption: 'Predicted land cover map vs. ground truth — add rendered figure here.'
        },
        {
          title: '',
          type: 'results',
          stats: [
            { val: '40%', label: '10-class accuracy, 100-sample budget (random baseline: ~10%)' }
          ]
        },
        {
          title: 'Limitations',
          type: 'limitations',
          items: [
            '40% is well above the ~10% random baseline for 10 classes, but is not close to production-grade — this demonstrates the low-data regime\u2019s difficulty more than it demonstrates a deployable model.',
            'The band-adaptation strategy for going from RGB to 7-band input is heuristic, not learned end-to-end — an ablation isolating its contribution is missing.',
            'No comparison against a from-scratch CNN trained on the same 100-sample budget, so it\u2019s not yet demonstrated that the foundation model pretraining is actually what\u2019s helping.'
          ]
        }
      ]
    }
  },
  {
    slug: 'air-quality-dashboard',
    num: '06',
    tags: ['Flask', 'Dash', 'System Design'],
    title: 'Lombardia Air Quality Dashboard',
    cardDesc: 'A modular full-stack application and dashboard for PM10, PM2.5, and NO\u2082 analysis — built with formal requirements and architecture documentation (RASD, SRD, Design Document).',
    cardMetrics: [],
    detail: {
      eyebrow: 'Personal Project · Software Engineering',
      summary: 'Most ML portfolios stop at a notebook. This project builds the full stack around the analysis instead — database backend, modular UI, and requirements/architecture documentation written before implementation, not after.',
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/astroedo/lombardia_air_quality_analysis' }
      ],
      sections: [
        {
          title: 'Problem',
          type: 'text',
          html: `<p>An air quality dashboard is only as useful as the pipeline and architecture behind it. The goal was to practice real software engineering discipline around an ML/data project — requirements, architecture, and a maintainable modular structure — not just produce a chart.</p>`
        },
        {
          title: 'Approach',
          type: 'text',
          html: `<p>A dedicated database backend and modular UI components (<code>map_component.py</code> and others) sit behind a <strong>Flask/Dash</strong> serving layer. Formal requirements and architecture documents — <strong>RASD, SRD, and a Design Document</strong> — were written before implementation, following standard software engineering practice rather than building the structure ad hoc.</p>`
        },
        {
          title: 'Results',
          type: 'figure',
          placeholder: true,
          caption: 'Dashboard screenshot — add rendered figure here.'
        },
        {
          title: 'Limitations',
          type: 'limitations',
          items: [
            'The project currently uses German air quality baseline datasets for modeling and testing, not real Lombardy sensor data — swapping in the actual regional data is the immediate next step, not a finished result.',
            'No hosted demo yet — running it currently requires cloning the repo and setting up the backend locally.'
          ]
        }
      ]
    }
  },
  {
    slug: 'cloud-removal-gan',
    num: '07',
    tags: ['PyTorch', 'GAN', 'pix2pix', 'Sentinel-2'],
    title: 'Cloud Removal with GANs',
    cardDesc: 'Reconstructing terrain hidden beneath clouds in optical Sentinel-2 imagery using the pix2pix conditional-GAN recipe.',
    cardMetrics: [],
    detail: {
      eyebrow: 'Personal Project',
      summary: 'Optical satellite imagery is often unusable exactly when it matters most — cloud cover doesn\u2019t respect a monitoring schedule. This project tests whether a conditional GAN can plausibly reconstruct what\u2019s underneath.',
      links: [
        { label: 'GitHub — add repo link', url: null }
      ],
      sections: [
        {
          title: 'Problem',
          type: 'text',
          html: `<p>Cloud cover is one of the most common practical obstacles in optical Earth Observation — a cloudy pass can silently gap a time series exactly during the event you wanted to observe (a flood, a fire, a harvest). The goal was to reconstruct the occluded terrain rather than simply discard the tile.</p>`
        },
        {
          title: 'Approach',
          type: 'text',
          html: `<p>Applied the <strong>pix2pix</strong> conditional-GAN recipe — a U-Net generator paired with a PatchGAN discriminator — treating cloud removal as an image-to-image translation problem: cloudy Sentinel-2 tile in, cloud-free reconstruction out.</p>`
        },
        {
          title: 'Results',
          type: 'figure',
          placeholder: true,
          caption: 'Cloudy input / reconstructed / ground-truth triptych — add rendered figure here.'
        },
        {
          title: '',
          type: 'pending',
          text: 'Add quantitative reconstruction quality here — e.g. SSIM/PSNR against the cloud-free ground truth on a held-out tile set — so the figure above isn\u2019t the only evidence of how well this works.'
        },
        {
          title: 'Limitations',
          type: 'limitations',
          items: [
            'GAN-reconstructed pixels are plausible, not verified — the model can hallucinate texture under thick, persistent cloud cover where the true surface has no nearby cloud-free reference to learn from.',
            'No comparison yet against simpler baselines (temporal compositing, interpolation) that are standard practice and much cheaper to run.',
            'Reconstruction quality has not been evaluated separately for thin vs. thick cloud, which likely behave very differently.'
          ]
        }
      ]
    }
  }
];

/* ============================================================
   CARD RENDERING
   ============================================================ */
function renderCards() {
  const list = document.getElementById('projectsList');
  list.innerHTML = PROJECTS.map(p => `
    <button class="project-card" data-slug="${p.slug}" aria-label="Open case study: ${p.title}">
      <div class="project-header">
        <div class="project-num">${p.num}</div>
        <div class="project-tags-row">
          ${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
        </div>
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.cardDesc}</p>
      ${p.cardMetrics.length ? `
        <ul class="project-metrics">
          ${p.cardMetrics.map(m => `<li><span class="metric-val">${m.val}</span>${m.label}</li>`).join('')}
        </ul>
      ` : `<div class="project-metrics"></div>`}
      <div class="project-footer">
        <span class="project-link">View case study \u2192</span>
        ${p.status === 'in-progress' ? `<span class="status-badge in-progress">In progress</span>` : ''}
      </div>
    </button>
  `).join('');

  list.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `#/project/${card.dataset.slug}`;
    });
  });
}

/* ============================================================
   DETAIL VIEW RENDERING
   ============================================================ */
function renderSection(sec) {
  let inner = '';
  if (sec.type === 'text') {
    inner = `<div class="body-text">${sec.html}</div>`;
  } else if (sec.type === 'figure') {
    inner = `
      <div class="figure-box">
        <span class="figure-placeholder-label">[ Figure placeholder \u2014 add image ]</span>
      </div>
      <p class="figure-caption">${sec.caption || ''}</p>`;
  } else if (sec.type === 'results') {
    inner = `
      <div class="results-grid">
        ${sec.stats.map(s => `
          <div class="result-stat">
            <span class="val">${s.val}</span>
            <span class="label">${s.label}</span>
          </div>`).join('')}
      </div>`;
  } else if (sec.type === 'pending') {
    inner = `<div class="pending-box">${sec.text}</div>`;
  } else if (sec.type === 'limitations') {
    inner = `<ul class="limitations-list">${sec.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  }
  return `
    <div class="detail-section" id="sec-${slugify(sec.title || sec.type)}" data-rail-label="${sec.title || ''}">
      ${sec.title ? `<h2>${sec.title}</h2>` : ''}
      ${inner}
    </div>`;
}

function slugify(s) {
  return (s || 'section').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'section';
}

function renderDetail(project) {
  const scroll = document.getElementById('detailScroll');
  const namedSections = project.detail.sections.filter(s => s.title);

  scroll.innerHTML = `
    <button class="detail-close" id="detailCloseBtn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="5" x2="5" y2="19"/><line x1="5" y1="5" x2="19" y2="19"/></svg>
      Close
    </button>

    <div class="detail-eyebrow">${project.detail.eyebrow}</div>
    <h1 class="detail-title">${project.title}</h1>
    <div class="detail-tags">
      ${project.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
    </div>
    <p class="detail-summary">${project.detail.summary}</p>
    <div class="detail-links">
      ${project.detail.links.map(l => l.url
        ? `<a class="detail-link-btn" href="${l.url}" target="_blank" rel="noopener">${l.label} \u2197</a>`
        : `<span class="detail-link-btn disabled">${l.label}</span>`
      ).join('')}
    </div>

    <div class="detail-body">
      <nav class="detail-rail" id="detailRail">
        <div class="rail-line"></div>
        ${namedSections.map(s => `
          <div class="rail-item" data-target="sec-${slugify(s.title)}">
            <span class="dot"></span>${s.title}
          </div>`).join('')}
      </nav>
      <div class="detail-sections">
        ${project.detail.sections.map(renderSection).join('')}
      </div>
    </div>
  `;

  document.getElementById('detailCloseBtn').addEventListener('click', closeDetail);

  // scroll-spy for the rail
  const railItems = scroll.querySelectorAll('.rail-item');
  const targets = namedSections.map(s => document.getElementById(`sec-${slugify(s.title)}`)).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          railItems.forEach(r => r.classList.remove('active'));
          const match = [...railItems].find(r => r.dataset.target === entry.target.id);
          if (match) match.classList.add('active');
        }
      });
    }, { root: document.getElementById('detailView'), threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });
    targets.forEach(t => observer.observe(t));
  }

  railItems.forEach(item => {
    item.addEventListener('click', () => {
      document.getElementById(item.dataset.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   HASH ROUTER
   ============================================================ */
function openDetail(slug) {
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) { closeDetail(); return; }
  renderDetail(project);
  document.getElementById('detailView').classList.add('open');
  document.getElementById('detailView').setAttribute('aria-hidden', 'false');
  document.getElementById('detailView').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  document.getElementById('detailView').classList.remove('open');
  document.getElementById('detailView').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (window.location.hash.startsWith('#/project/')) {
    window.location.hash = '#projects';
  }
}

function route() {
  const hash = window.location.hash;
  const match = hash.match(/^#\/project\/([a-z0-9-]+)/);
  if (match) {
    openDetail(match[1]);
  } else {
    closeDetail();
  }
}

window.addEventListener('hashchange', route);

/* ============================================================
   STARFIELD CANVAS (hero + astro panel)
   ============================================================ */
function initStarfield(canvasId, density) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const count = Math.floor((rect.width * rect.height) / density);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 * devicePixelRatio + 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      speed: Math.random() * 0.15 + 0.02
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#5b9dff';
    stars.forEach(s => {
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) s.y = 0;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  } else {
    ctx.fillStyle = '#5b9dff';
    stars.forEach(s => { ctx.globalAlpha = s.alpha; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); });
    ctx.globalAlpha = 1;
  }
}

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  initStarfield('starfield', 9000);
  initStarfield('astroCanvas', 3500);
  initNavToggle();
  route();
});