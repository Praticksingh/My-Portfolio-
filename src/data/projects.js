export const projects = [
  {
    id: '01',
    title: 'AutoHeal AI',
    subtitle: 'Autonomous CI/CD Diagnostics Platform',
    description: 'Built a full-stack platform for repository analysis, CI/CD failure detection and automated fix workflows, pinpointing affected files and lines via the GitHub API.',
    details: 'Implemented real-time progress tracking, from repository cloning to pipeline completion, with React, TypeScript, Express.js, Socket.IO and MongoDB. Configured Vercel and Docker/Railway deployment with shared types and environment-based configuration.',
    tech: ['React', 'TypeScript', 'Express.js', 'Socket.IO', 'MongoDB', 'GitHub API', 'Docker', 'Vercel', 'Railway'],
    capabilities: [
      'Repository analysis & CI/CD failure detection',
      'File & line-level error pinpointing via GitHub API',
      'Real-time progress tracking from clone to completion',
      'Shared types with environment-based configuration'
    ],
    github: 'https://github.com/Praticksingh',
    live: 'https://autoheal-ai-main-b5lsqdqsh-praticksinghs-projects.vercel.app/',
    architecture: {
      type: 'Event-Driven Real-Time CI/CD Microservice',
      pipeline: [
        'GitHub Webhook / Repo Ingestion → Clone Worker Sandbox',
        'Log Parser & AST Static Analysis Engine → Diagnostic Pinpointer',
        'Automated Patch Synthesizer (LLM Grounding) → Unit Verification',
        'Socket.IO Broadcast Event Bus → Reactive React Frontend'
      ],
      decisions: [
        'Used Socket.IO WebSockets instead of HTTP polling to broadcast real-time clone & diagnostic stages with sub-50ms latency.',
        'Structured shared TypeScript contracts between frontend and worker daemons to guarantee type safety across API boundaries.',
        'Dockerized runtime sandbox to isolate third-party repository execution and prevent privilege escalation.'
      ]
    }
  },
  {
    id: '02',
    title: 'OPDFlow AI',
    subtitle: 'Government Hospital OPD Queue Command Center',
    description: 'Built an OPD queue platform for government hospitals with AI-assisted triage, priority-aware queues, digital QR passes and real-time congestion management.',
    details: 'Implemented offline-first sync, multilingual accessibility, live display broadcast, wait-time forecasting, and Code Blue workflows. Designed patient and staff workflows with staff allocation and audit reporting.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    capabilities: [
      'AI-assisted triage & priority-aware queues',
      'Digital QR passes & real-time congestion management',
      'Offline-first synchronization & multilingual accessibility',
      'Live display broadcast, wait-time forecasting & Code Blue workflows',
      'Staff allocation workflows & audit reporting'
    ],
    github: 'https://github.com/Praticksingh/SmartMedAI',
    live: 'https://smart-med-ai-beryl.vercel.app/',
    architecture: {
      type: 'Offline-First Real-Time Queue & Triage Architecture',
      pipeline: [
        'Patient Kiosk / Mobile Check-In → Dynamic QR Token Generation',
        'Symptom Rule Engine & NLP Triage → Urgency Priority Queue Indexing',
        'PostgreSQL Realtime Subscriptions → Doctor OPD Command Console',
        'Automated Department Balancer → Public Display Broadcast Screens'
      ],
      decisions: [
        'Adopted IndexedDB offline caching with optimistic updates so rural hospitals maintain full intake speed during network drops.',
        'Leveraged Supabase Realtime (PostgreSQL WAL changes) to synchronize queue tokens across 20+ OPD rooms without server bottlenecks.',
        'Designed high-contrast, multi-lingual accessibility layouts for varied literacy levels in regional public healthcare.'
      ]
    }
  },
  {
    id: '03',
    title: 'TRINETRA: Severe Weather Nowcasting',
    subtitle: 'Spatiotemporal Deep Learning Nowcasting System',
    description: 'TRINETRA is an AI-powered severe weather nowcasting system that uses real-time weather data, satellite/NWP observations, terrain information, and a Conv3D spatiotemporal deep-learning model to predict threats such as thunderstorms, cloudbursts, and flash floods 2–6 hours in advance.',
    details: 'It provides location-based risk levels, explanations of the major risk drivers, and map-based alerts to support faster disaster preparedness and response.',
    tech: ['Next.js', 'FastAPI', 'PyTorch', 'Conv3D', 'Supabase', 'PostGIS', 'MapLibre', 'Leaflet', 'Vercel'],
    capabilities: [
      'Conv3D spatiotemporal deep-learning prediction model',
      '2–6 hour lead-time forecasts for thunderstorms & flash floods',
      'Location-based risk levels & major risk driver explanations',
      'Map-based interactive spatial alerts with MapLibre & Leaflet'
    ],
    github: 'https://github.com/Praticksingh/TRINETRA',
    live: 'https://trinetra-web-nu.vercel.app/',
    architecture: {
      type: 'Spatiotemporal Conv3D Deep Learning & Spatial Alerting Pipeline',
      pipeline: [
        'Satellite Radar & NWP Grid Ingestion → Geotiff / NetCDF Preprocessing',
        'Elevation & Topographic Gradient Fusion → 4D Spatial Tensor Formation',
        'Conv3D Neural Model (PyTorch) → 2–6 Hour Threat Probability Mapping',
        'PostGIS Spatial Intersection Query → GeoJSON Tile Serving to MapLibre'
      ],
      decisions: [
        'Engineered Conv3D architecture over standard 2D CNN + LSTM to jointly capture temporal convection velocity and vertical cloud-mass gradients.',
        'Integrated PostGIS spatial indexes to compute affected administrative boundaries in milliseconds for rapid alert dispatch.',
        'Implemented vector map tile streaming via MapLibre GL for smooth 60fps pan/zoom across pan-India radar grids.'
      ]
    }
  },
  {
    id: '04',
    title: 'Anamnesis AI',
    subtitle: 'Multi-Agent Decision-Intelligence Platform',
    description: 'Built a multi-agent application that simulates alternate histories and future scenarios across economy, society, governance, sustainability, and technology.',
    details: 'Designed orchestrator, domain and critic agents with LangGraph, grounding reasoning in real-world datasets through retrieval. Evaluates risk and feasibility while producing structured impact reports.',
    tech: ['Next.js', 'FastAPI', 'LangGraph', 'Chart.js', 'D3.js', 'Docker'],
    capabilities: [
      'Orchestrator, domain & critic multi-agent system',
      'Simulations across economy, society, governance, sustainability, tech',
      'Retrieval-grounded reasoning from real-world datasets',
      'Risk & feasibility evaluation with structured impact reports'
    ],
    github: 'https://github.com/Praticksingh/Anamnesis-AI',
    live: 'https://anamnesis-8hztziosu-praticksinghs-projects.vercel.app/',
    architecture: {
      type: 'Stateful Multi-Agent Cyclic Graph Architecture',
      pipeline: [
        'Hypothesis Parameter Prompt → Orchestrator Agent State Inception',
        'Specialized Domain Agents (Macro-Econ, Policy, Climate) Parallel Execution',
        'Adversarial Critic Loop (LangGraph State Graph) → Sanity & Feasibility Check',
        'Deterministic Impact Synthesizer → D3.js Multi-Branch Scenario Tree'
      ],
      decisions: [
        'Utilized LangGraph cyclic state graphs rather than linear chains to allow critic agents to bounce flawed assumptions back for recalibration.',
        'Grounded agent reasoning with RAG embeddings against verified historical datasets to strictly prevent unconstrained LLM hallucination.',
        'Designed interactive D3 force-directed tree graphs allowing users to fork simulations at any historical inflection point.'
      ]
    }
  },
  {
    id: '05',
    title: 'Cyber Fraud Detection Platform',
    subtitle: 'Full-Stack ML System',
    description: 'Built an end-to-end machine-learning platform for phone-number and behavioral risk analysis.',
    details: 'Built a secure React frontend for real-time investigation with FastAPI backend, SQLAlchemy ORM, and cloud deployment across Render and Vercel.',
    tech: ['FastAPI', 'Machine Learning', 'SQLAlchemy', 'React', 'Render', 'Vercel'],
    capabilities: [
      'Phone-number & behavioral fraud risk scoring',
      'Secure React frontend for real-time investigation',
      'FastAPI microservice backend with SQLAlchemy',
      'Cloud production deployment on Render & Vercel'
    ],
    github: 'https://github.com/Praticksingh',
    live: 'https://cyber-fraud-detection-platform.vercel.app/login',
    architecture: {
      type: 'Real-Time Feature Store & Scoring Microservice',
      pipeline: [
        'User Phone & Transaction Telemetry → Secure API Gateway',
        'Feature Extraction Pipeline (Velocity, Anomaly Scoring, Geolocation)',
        'Gradient Boosted Decision Forest Classifier → Risk Probability Engine',
        'Audit Logging & Analyst Review Console with SQLAlchemy ORM'
      ],
      decisions: [
        'Configured asynchronous FastAPI endpoints with Pydantic type validation for sub-80ms transaction risk evaluation.',
        'Implemented JWT authentication with role-based access control (RBAC) to ensure strict investigator privacy and compliance.',
        'Separated compute-heavy scoring from transactional database writes using connection pooling in SQLAlchemy.'
      ]
    }
  }
];
