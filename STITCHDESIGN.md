<!-- Homepage (Light Mode) -->

<!DOCTYPE html>



<html class="light" lang="en"><head>

<meta charset="utf-8"/>

<meta content="width=device-width, initial-scale=1.0" name="viewport"/>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700\&amp;family=Georgia:wght@600;700\&amp;family=JetBrains+Mono\&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900\&amp;display=swap" rel="stylesheet"/>

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<script id="tailwind-config">

&#x20;     tailwind.config = {

&#x20;       darkMode: "class",

&#x20;       theme: {

&#x20;         extend: {

&#x20;           "colors": {

&#x20;                   "surface-bright": "#faf8ff",

&#x20;                   "primary-container": "#2563eb",

&#x20;                   "surface-container-highest": "#e1e2ed",

&#x20;                   "secondary-fixed-dim": "#c8c6c6",

&#x20;                   "text-muted": "#8A8A8A",

&#x20;                   "tertiary-fixed": "#ffdbcd",

&#x20;                   "surface": "#faf8ff",

&#x20;                   "surface-dim": "#d9d9e5",

&#x20;                   "on-surface": "#191b23",

&#x20;                   "text-heading": "#1A1A1A",

&#x20;                   "surface-container": "#ededf9",

&#x20;                   "success-check": "#059669",

&#x20;                   "surface-tint": "#0053db",

&#x20;                   "on-primary-container": "#eeefff",

&#x20;                   "on-tertiary-fixed-variant": "#7d2d00",

&#x20;                   "on-secondary-fixed-variant": "#474747",

&#x20;                   "secondary": "#5e5e5e",

&#x20;                   "on-secondary-container": "#646464",

&#x20;                   "on-tertiary-fixed": "#360f00",

&#x20;                   "surface-container-low": "#f3f3fe",

&#x20;                   "surface-container-high": "#e7e7f3",

&#x20;                   "on-surface-variant": "#434655",

&#x20;                   "error": "#ba1a1a",

&#x20;                   "tertiary-fixed-dim": "#ffb596",

&#x20;                   "on-error-container": "#93000a",

&#x20;                   "background": "#faf8ff",

&#x20;                   "outline-variant": "#c3c6d7",

&#x20;                   "error-container": "#ffdad6",

&#x20;                   "on-background": "#191b23",

&#x20;                   "error-reserve": "#DC2626",

&#x20;                   "on-primary-fixed": "#00174b",

&#x20;                   "highlight-amber": "#F59E0B",

&#x20;                   "on-secondary-fixed": "#1b1c1c",

&#x20;                   "secondary-fixed": "#e4e2e2",

&#x20;                   "surface-variant": "#e1e2ed",

&#x20;                   "background-ivory": "#FAF9F6",

&#x20;                   "secondary-container": "#e4e2e2",

&#x20;                   "primary-fixed-dim": "#b4c5ff",

&#x20;                   "on-secondary": "#ffffff",

&#x20;                   "on-primary": "#ffffff",

&#x20;                   "inverse-on-surface": "#f0f0fb",

&#x20;                   "tertiary": "#943700",

&#x20;                   "surface-controls": "#F5F5F5",

&#x20;                   "primary-fixed": "#dbe1ff",

&#x20;                   "outline": "#737686",

&#x20;                   "on-tertiary": "#ffffff",

&#x20;                   "on-tertiary-container": "#ffede6",

&#x20;                   "on-error": "#ffffff",

&#x20;                   "inverse-surface": "#2e3039",

&#x20;                   "surface-container-lowest": "#ffffff",

&#x20;                   "tertiary-container": "#bc4800",

&#x20;                   "inverse-primary": "#b4c5ff",

&#x20;                   "surface-canvas": "#FEFEFE",

&#x20;                   "on-primary-fixed-variant": "#003ea8",

&#x20;                   "border-graphite": "#E8E6E1",

&#x20;                   "primary": "#004ac6"

&#x20;           },

&#x20;           "borderRadius": {

&#x20;                   "DEFAULT": "0.25rem",

&#x20;                   "lg": "0.5rem",

&#x20;                   "xl": "0.75rem",

&#x20;                   "full": "9999px"

&#x20;           },

&#x20;           "spacing": {

&#x20;                   "unit-related": "8px",

&#x20;                   "unit-paragraph": "16px",

&#x20;                   "unit-inline": "4px",

&#x20;                   "visualizer-max-width": "896px",

&#x20;                   "content-max-width": "768px",

&#x20;                   "unit-section": "32px",

&#x20;                   "unit-block": "24px",

&#x20;                   "unit-page": "48px",

&#x20;                   "margin-mobile": "20px"

&#x20;           },

&#x20;           "fontFamily": {

&#x20;                   "headline-xl": \["Georgia"],

&#x20;                   "headline-xl-mobile": \["Georgia"],

&#x20;                   "body-md": \["Inter"],

&#x20;                   "label-sm": \["Inter"],

&#x20;                   "label-md": \["Inter"],

&#x20;                   "headline-md": \["Georgia"],

&#x20;                   "headline-lg-mobile": \["Georgia"],

&#x20;                   "headline-lg": \["Georgia"],

&#x20;                   "code-sm": \["JetBrains Mono"]

&#x20;           },

&#x20;           "fontSize": {

&#x20;                   "headline-xl": \["2.5rem", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],

&#x20;                   "headline-xl-mobile": \["1.75rem", {"lineHeight": "1.2", "fontWeight": "700"}],

&#x20;                   "body-md": \["1rem", {"lineHeight": "1.75", "fontWeight": "400"}],

&#x20;                   "label-sm": \["0.8125rem", {"lineHeight": "1.4", "fontWeight": "400"}],

&#x20;                   "label-md": \["0.9375rem", {"lineHeight": "1.4", "fontWeight": "500"}],

&#x20;                   "headline-md": \["1.25rem", {"lineHeight": "1.4", "fontWeight": "600"}],

&#x20;                   "headline-lg-mobile": \["1.375rem", {"lineHeight": "1.3", "fontWeight": "600"}],

&#x20;                   "headline-lg": \["1.75rem", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],

&#x20;                   "code-sm": \["0.9em", {"lineHeight": "1.5", "fontWeight": "400"}]

&#x20;           }

&#x20;         },

&#x20;       },

&#x20;     }

&#x20;   </script>

<style>

&#x20;       body {

&#x20;           background-color: #FAF9F6;

&#x20;           color: #1A1A1A;

&#x20;           -webkit-font-smoothing: antialiased;

&#x20;       }

&#x20;       .material-symbols-outlined {

&#x20;           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

&#x20;       }

&#x20;       .graphite-border {

&#x20;           border: 1px solid #E8E6E1;

&#x20;       }

&#x20;       .bar-visualizer-item {

&#x20;           transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);

&#x20;       }

&#x20;   </style>

<style>

&#x20;   body {

&#x20;     min-height: max(884px, 100dvh);

&#x20;   }

&#x20; </style>

&#x20; </head>

<body class="font-body-md text-body-md">

<!-- TopAppBar -->

<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-16 bg-surface border-b border-outline-variant">

<div class="flex items-center gap-4">

<span class="material-symbols-outlined text-primary cursor-pointer" data-icon="menu" onclick="toggleDrawer()">menu</span>

<span class="font-code-sm text-label-md text-primary uppercase tracking-widest font-bold">OpenCS</span>

</div>

<div class="flex items-center gap-4">

<span class="material-symbols-outlined text-on-surface-variant" data-icon="search">search</span>

</div>

</header>

<!-- NavigationDrawer (Mobile Overlay) -->

<div class="fixed inset-0 z-\[60] hidden" id="drawer">

<div class="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" onclick="toggleDrawer()"></div>

<nav class="absolute inset-y-0 left-0 w-80 bg-surface-container p-6 flex flex-col border-r border-outline-variant">

<div class="flex justify-between items-center mb-8">

<span class="font-headline-md text-headline-md text-primary">OpenCS Index</span>

<span class="material-symbols-outlined cursor-pointer" data-icon="close" onclick="toggleDrawer()">close</span>

</div>

<div class="space-y-2">

<a class="flex items-center gap-4 p-3 bg-secondary-container text-on-secondary-container font-bold rounded-sm" href="#">

<span class="material-symbols-outlined" data-icon="home">home</span>

<span class="font-label-md text-label-md">Home</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="library\_books">library\_books</span>

<span class="font-label-md text-label-md">Topics</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="history\_edu">history\_edu</span>

<span class="font-label-md text-label-md">Archive</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="terminal">terminal</span>

<span class="font-label-md text-label-md">Reference</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="settings">settings</span>

<span class="font-label-md text-label-md">Settings</span>

</a>

</div>

</nav>

</div>

<main class="pt-24 pb-20 px-5 max-w-content-max-width mx-auto">

<!-- Hero Section -->

<section class="mb-unit-page">

<h1 class="font-headline-xl-mobile text-headline-xl-mobile text-text-heading mb-4">

&#x20;               Computer Science, Visualized

&#x20;           </h1>

<p class="text-on-surface-variant mb-8 max-w-\[90%]">

&#x20;               Master the fundamental abstractions of computing through interactive visualizers and rigorous, academic-grade distillations.

&#x20;           </p>

<div class="flex flex-col gap-3 mb-10">

<button class="bg-primary text-on-primary py-3 px-6 font-bold rounded-\[2px] text-center transition-colors hover:bg-primary-container">

&#x20;                   Explore Topics

&#x20;               </button>

<button class="border border-outline-variant text-primary py-3 px-6 font-bold rounded-\[2px] text-center transition-colors hover:border-primary">

&#x20;                   Contribute

&#x20;               </button>

</div>

<!-- Abstract Bar Visualization -->

<div class="h-32 w-full flex items-end justify-between gap-1 px-2 border border-border-graphite bg-surface-canvas p-4">

<div class="bar-visualizer-item w-full bg-primary/20 h-\[40%]"></div>

<div class="bar-visualizer-item w-full bg-primary/40 h-\[65%]"></div>

<div class="bar-visualizer-item w-full bg-primary/60 h-\[50%]"></div>

<div class="bar-visualizer-item w-full bg-primary/80 h-\[90%]"></div>

<div class="bar-visualizer-item w-full bg-primary h-\[75%]"></div>

<div class="bar-visualizer-item w-full bg-primary/80 h-\[60%]"></div>

<div class="bar-visualizer-item w-full bg-primary/60 h-\[45%]"></div>

<div class="bar-visualizer-item w-full bg-primary/40 h-\[80%]"></div>

<div class="bar-visualizer-item w-full bg-primary/20 h-\[30%]"></div>

</div>

<div class="mt-2 text-right">

<span class="font-code-sm text-\[10px] uppercase text-text-muted tracking-widest">Fig 1.1: Sorting Algorithm Trace</span>

</div>

</section>

<!-- Feature Grid (2x2) -->

<section class="mb-unit-page grid grid-cols-2 gap-4">

<div class="graphite-border bg-surface-canvas p-4 flex flex-col items-center text-center">

<span class="material-symbols-outlined text-primary mb-2 text-3xl" data-icon="schema">schema</span>

<span class="font-headline-md text-label-md text-text-heading">Logic Gates</span>

</div>

<div class="graphite-border bg-surface-canvas p-4 flex flex-col items-center text-center">

<span class="material-symbols-outlined text-primary mb-2 text-3xl" data-icon="account\_tree">account\_tree</span>

<span class="font-headline-md text-label-md text-text-heading">Data Structures</span>

</div>

<div class="graphite-border bg-surface-canvas p-4 flex flex-col items-center text-center">

<span class="material-symbols-outlined text-primary mb-2 text-3xl" data-icon="memory">memory</span>

<span class="font-headline-md text-label-md text-text-heading">CPU Arch</span>

</div>

<div class="graphite-border bg-surface-canvas p-4 flex flex-col items-center text-center">

<span class="material-symbols-outlined text-primary mb-2 text-3xl" data-icon="rebase\_edit">rebase\_edit</span>

<span class="font-headline-md text-label-md text-text-heading">Algorithms</span>

</div>

</section>

<!-- Available Topics (1-column grid) -->

<section class="mb-unit-page">

<div class="flex justify-between items-end mb-6">

<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-text-heading">Curriculum</h2>

<a class="text-primary font-bold text-label-sm border-b border-primary" href="#">View all topics</a>

</div>

<div class="grid grid-cols-1 gap-4">

<!-- Topic Card 1 -->

<div class="graphite-border bg-surface-canvas p-5 hover:border-primary transition-all hover:-translate-y-\[1px]">

<div class="flex justify-between items-start mb-3">

<span class="font-code-sm text-\[10px] text-text-muted">CS-101</span>

<span class="material-symbols-outlined text-text-muted text-sm" data-icon="star">star</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Computational Complexity</h3>

<p class="text-on-surface-variant text-sm mb-4">An exploration of Big O notation and the fundamental limits of algorithmic efficiency.</p>

<a class="text-primary font-bold text-label-sm flex items-center gap-1" href="#">

&#x20;                       View Topic <span class="material-symbols-outlined text-xs" data-icon="arrow\_forward">arrow\_forward</span>

</a>

</div>

<!-- Topic Card 2 -->

<div class="graphite-border bg-surface-canvas p-5 hover:border-primary transition-all hover:-translate-y-\[1px]">

<div class="flex justify-between items-start mb-3">

<span class="font-code-sm text-\[10px] text-text-muted">CS-204</span>

<span class="material-symbols-outlined text-text-muted text-sm" data-icon="star">star</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Memory Hierarchies</h3>

<p class="text-on-surface-variant text-sm mb-4">Visualizing cache hits, misses, and the physical architecture of modern memory systems.</p>

<a class="text-primary font-bold text-label-sm flex items-center gap-1" href="#">

&#x20;                       View Topic <span class="material-symbols-outlined text-xs" data-icon="arrow\_forward">arrow\_forward</span>

</a>

</div>

<!-- Topic Card 3 -->

<div class="graphite-border bg-surface-canvas p-5 hover:border-primary transition-all hover:-translate-y-\[1px]">

<div class="flex justify-between items-start mb-3">

<span class="font-code-sm text-\[10px] text-text-muted">CS-302</span>

<span class="material-symbols-outlined text-text-muted text-sm" data-icon="star">star</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Finite Automata</h3>

<p class="text-on-surface-variant text-sm mb-4">Designing and testing state machines for pattern matching and lexical analysis.</p>

<a class="text-primary font-bold text-label-sm flex items-center gap-1" href="#">

&#x20;                       View Topic <span class="material-symbols-outlined text-xs" data-icon="arrow\_forward">arrow\_forward</span>

</a>

</div>

<!-- Topic Card 4 -->

<div class="graphite-border bg-surface-canvas p-5 hover:border-primary transition-all hover:-translate-y-\[1px]">

<div class="flex justify-between items-start mb-3">

<span class="font-code-sm text-\[10px] text-text-muted">CS-102</span>

<span class="material-symbols-outlined text-text-muted text-sm" data-icon="star">star</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Graph Theory Basics</h3>

<p class="text-on-surface-variant text-sm mb-4">Nodes, edges, and traversals. BFS and DFS visualized in real-time step-throughs.</p>

<a class="text-primary font-bold text-label-sm flex items-center gap-1" href="#">

&#x20;                       View Topic <span class="material-symbols-outlined text-xs" data-icon="arrow\_forward">arrow\_forward</span>

</a>

</div>

<!-- Topic Card 5 -->

<div class="graphite-border bg-surface-canvas p-5 hover:border-primary transition-all hover:-translate-y-\[1px]">

<div class="flex justify-between items-start mb-3">

<span class="font-code-sm text-\[10px] text-text-muted">CS-401</span>

<span class="material-symbols-outlined text-text-muted text-sm" data-icon="star">star</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Distributed Systems</h3>

<p class="text-on-surface-variant text-sm mb-4">Paxos and Raft consensus algorithms explained through interactive network nodes.</p>

<a class="text-primary font-bold text-label-sm flex items-center gap-1" href="#">

&#x20;                       View Topic <span class="material-symbols-outlined text-xs" data-icon="arrow\_forward">arrow\_forward</span>

</a>

</div>

<!-- Topic Card 6 -->

<div class="graphite-border bg-surface-canvas p-5 hover:border-primary transition-all hover:-translate-y-\[1px]">

<div class="flex justify-between items-start mb-3">

<span class="font-code-sm text-\[10px] text-text-muted">CS-201</span>

<span class="material-symbols-outlined text-text-muted text-sm" data-icon="star">star</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Concurrency \&amp; Locks</h3>

<p class="text-on-surface-variant text-sm mb-4">Deadlocks, semaphores, and race conditions in a safe, visual sandbox environment.</p>

<a class="text-primary font-bold text-label-sm flex items-center gap-1" href="#">

&#x20;                       View Topic <span class="material-symbols-outlined text-xs" data-icon="arrow\_forward">arrow\_forward</span>

</a>

</div>

</div>

</section>

<!-- Newsletter / Footer-ish Section -->

<section class="border-t border-border-graphite pt-unit-page pb-12">

<div class="bg-surface-controls p-6 graphite-border">

<h4 class="font-headline-md text-headline-md mb-2">Deepen Your Cognition</h4>

<p class="text-sm text-on-surface-variant mb-4">Join 40,000+ students and researchers receiving weekly distillations on system design.</p>

<div class="flex flex-col gap-2">

<input class="w-full px-4 py-2 graphite-border bg-surface-canvas focus:ring-1 focus:ring-primary focus:outline-none text-sm" placeholder="edu\_email@university.edu" type="email"/>

<button class="bg-primary text-on-primary py-2 font-bold text-sm">Subscribe</button>

</div>

</div>

</section>

</main>

<!-- BottomNavBar -->

<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-14 bg-surface border-t border-outline-variant px-4">

<a class="flex flex-col items-center justify-center text-primary" href="#">

<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="grid\_view">grid\_view</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="bookmarks">bookmarks</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="person">person</span>

</a>

</nav>

<script>

&#x20;       function toggleDrawer() {

&#x20;           const drawer = document.getElementById('drawer');

&#x20;           drawer.classList.toggle('hidden');

&#x20;       }



&#x20;       // Micro-interaction: Randomize bar heights occasionally for "life"

&#x20;       setInterval(() => {

&#x20;           const bars = document.querySelectorAll('.bar-visualizer-item');

&#x20;           bars.forEach(bar => {

&#x20;               const randomHeight = Math.floor(Math.random() \* 80) + 15;

&#x20;               bar.style.height = `${randomHeight}%`;

&#x20;           });

&#x20;       }, 3000);

&#x20;   </script>

</body></html>



<!-- Homepage (Dark Mode) -->

<!DOCTYPE html>



<html class="dark" lang="en"><head>

<meta charset="utf-8"/>

<meta content="width=device-width, initial-scale=1.0" name="viewport"/>

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<link href="https://fonts.googleapis.com/css2?family=Literata:wght@400;600;700\&amp;family=Inter:wght@400;500\&amp;family=JetBrains+Mono:wght@400;500\&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900\&amp;family=JetBrains+Mono:wght@100..900\&amp;family=Literata:wght@100..900\&amp;display=swap" rel="stylesheet"/>

<style>

&#x20;       .material-symbols-outlined {

&#x20;           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

&#x20;       }

&#x20;       /\* Grid-dot background implementation \*/

&#x20;       .bg-grid-dots {

&#x20;           background-image: radial-gradient(#1E1E1E 1px, transparent 1px);

&#x20;           background-size: 16px 16px;

&#x20;       }

&#x20;   </style>

<script id="tailwind-config">

&#x20;       tailwind.config = {

&#x20;           darkMode: "class",

&#x20;           theme: {

&#x20;               extend: {

&#x20;                   "colors": {

&#x20;                       "on-surface": "#e5e2e1",

&#x20;                       "inverse-on-surface": "#313030",

&#x20;                       "secondary-container": "#39485a",

&#x20;                       "surface-dim": "#131313",

&#x20;                       "primary-fixed-dim": "#a4c9ff",

&#x20;                       "on-secondary": "#233143",

&#x20;                       "on-primary": "#00315d",

&#x20;                       "surface-container": "#201f1f",

&#x20;                       "surface-tint": "#a4c9ff",

&#x20;                       "on-primary-container": "#003a6b",

&#x20;                       "tertiary": "#c8c6c6",

&#x20;                       "on-tertiary-fixed-variant": "#474747",

&#x20;                       "surface-container-highest": "#353534",

&#x20;                       "surface-bright": "#393939",

&#x20;                       "primary-container": "#60a5fa",

&#x20;                       "error-container": "#93000a",

&#x20;                       "on-background": "#e5e2e1",

&#x20;                       "on-secondary-fixed": "#0d1c2d",

&#x20;                       "secondary-fixed": "#d4e4fa",

&#x20;                       "surface-variant": "#353534",

&#x20;                       "surface": "#131313",

&#x20;                       "secondary-fixed-dim": "#b9c8de",

&#x20;                       "on-primary-fixed": "#001c39",

&#x20;                       "tertiary-fixed": "#e4e2e1",

&#x20;                       "on-primary-fixed-variant": "#004883",

&#x20;                       "error": "#ffb4ab",

&#x20;                       "tertiary-fixed-dim": "#c8c6c6",

&#x20;                       "on-error-container": "#ffdad6",

&#x20;                       "background": "#131313",

&#x20;                       "surface-container-low": "#1c1b1b",

&#x20;                       "tertiary-container": "#a4a2a2",

&#x20;                       "surface-container-high": "#2a2a2a",

&#x20;                       "on-surface-variant": "#c1c7d3",

&#x20;                       "inverse-primary": "#0060ac",

&#x20;                       "outline-variant": "#414751",

&#x20;                       "primary": "#a4c9ff",

&#x20;                       "outline": "#8b919d",

&#x20;                       "on-tertiary": "#303030",

&#x20;                       "on-secondary-fixed-variant": "#39485a",

&#x20;                       "primary-fixed": "#d4e3ff",

&#x20;                       "secondary": "#b9c8de",

&#x20;                       "inverse-surface": "#e5e2e1",

&#x20;                       "surface-container-lowest": "#0e0e0e",

&#x20;                       "on-secondary-container": "#a7b6cc",

&#x20;                       "on-tertiary-fixed": "#1b1c1c",

&#x20;                       "on-tertiary-container": "#393939",

&#x20;                       "on-error": "#690005"

&#x20;                   },

&#x20;                   "borderRadius": {

&#x20;                       "DEFAULT": "0rem",

&#x20;                       "lg": "0rem",

&#x20;                       "xl": "0rem",

&#x20;                       "full": "9999px"

&#x20;                   },

&#x20;                   "spacing": {

&#x20;                       "margin-mobile": "16px",

&#x20;                       "gutter": "24px",

&#x20;                       "margin-desktop": "40px",

&#x20;                       "container-max": "1200px",

&#x20;                       "base": "8px"

&#x20;                   },

&#x20;                   "fontFamily": {

&#x20;                       "body-lg": \["Inter"],

&#x20;                       "body-md": \["Inter"],

&#x20;                       "label-md": \["JetBrains Mono"],

&#x20;                       "display-lg": \["Literata"],

&#x20;                       "label-sm": \["JetBrains Mono"],

&#x20;                       "headline-md": \["Literata"],

&#x20;                       "headline-lg-mobile": \["Literata"],

&#x20;                       "headline-lg": \["Literata"]

&#x20;                   },

&#x20;                   "fontSize": {

&#x20;                       "body-lg": \["18px", {"lineHeight": "28px", "fontWeight": "400"}],

&#x20;                       "body-md": \["16px", {"lineHeight": "24px", "fontWeight": "400"}],

&#x20;                       "label-md": \["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500"}],

&#x20;                       "display-lg": \["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],

&#x20;                       "label-sm": \["12px", {"lineHeight": "16px", "fontWeight": "500"}],

&#x20;                       "headline-md": \["24px", {"lineHeight": "32px", "fontWeight": "600"}],

&#x20;                       "headline-lg-mobile": \["28px", {"lineHeight": "36px", "fontWeight": "600"}],

&#x20;                       "headline-lg": \["32px", {"lineHeight": "40px", "fontWeight": "600"}]

&#x20;                   }

&#x20;               },

&#x20;           },

&#x20;       }

&#x20;   </script>

<style>

&#x20;   body {

&#x20;     min-height: max(884px, 100dvh);

&#x20;   }

&#x20; </style>

&#x20; </head>

<body class="bg-surface text-on-surface font-body-md bg-grid-dots min-h-screen pb-20">

<!-- TopAppBar -->

<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface border-b border-outline-variant">

<div class="flex items-center gap-4">

<button class="text-primary active:scale-95 transition-transform" id="menu-trigger">

<span class="material-symbols-outlined" data-icon="menu">menu</span>

</button>

<span class="font-label-md text-label-md text-primary uppercase tracking-widest">OpenCS</span>

</div>

<div class="flex items-center">

<button class="text-primary">

<span class="material-symbols-outlined" data-icon="search">search</span>

</button>

</div>

</header>

<!-- Navigation Drawer (Hidden by default) -->

<div class="fixed inset-0 bg-black/50 z-\[55] hidden opacity-0 transition-opacity duration-300" id="drawer-overlay"></div>

<aside class="fixed inset-y-0 left-0 z-\[60] flex flex-col p-6 bg-surface-container border-r border-outline-variant w-80 -translate-x-full transition-transform duration-300" id="nav-drawer">

<div class="mb-8">

<h2 class="font-headline-md text-headline-md text-on-surface">OpenCS Index</h2>

</div>

<nav class="flex flex-col gap-2">

<!-- Home is Active -->

<a class="flex items-center gap-4 p-3 bg-secondary-container text-on-secondary-container font-bold transition-all duration-150" href="#">

<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>

<span class="font-label-md text-label-md">Home</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-150" href="#">

<span class="material-symbols-outlined" data-icon="library\_books">library\_books</span>

<span class="font-label-md text-label-md">Topics</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-150" href="#">

<span class="material-symbols-outlined" data-icon="history\_edu">history\_edu</span>

<span class="font-label-md text-label-md">Archive</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-150" href="#">

<span class="material-symbols-outlined" data-icon="terminal">terminal</span>

<span class="font-label-md text-label-md">Reference</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-150 mt-auto border-t border-outline-variant pt-6" href="#">

<span class="material-symbols-outlined" data-icon="settings">settings</span>

<span class="font-label-md text-label-md">Settings</span>

</a>

</nav>

</aside>

<main class="mt-16 px-margin-mobile">

<!-- Hero Section -->

<section class="py-12 flex flex-col gap-6">

<div class="space-y-2">

<span class="font-label-sm text-label-sm text-primary tracking-\[0.2em] uppercase">Academic precision</span>

<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface leading-tight">

&#x20;                   Computer Science,<br/>Visualized

&#x20;               </h1>

<p class="font-body-md text-on-surface-variant max-w-\[300px]">

&#x20;                   An open-source index of fundamental concepts, from silicon logic to high-level abstractions.

&#x20;               </p>

</div>

<div class="flex flex-col gap-3">

<button class="bg-primary-container text-on-primary py-4 px-8 font-label-md text-label-md active:scale-\[0.98] transition-transform flex items-center justify-center gap-2">

&#x20;                   Explore Topics

&#x20;                   <span class="material-symbols-outlined text-\[18px]" data-icon="arrow\_forward">arrow\_forward</span>

</button>

<button class="bg-surface border border-outline-variant text-on-surface py-4 px-8 font-label-md text-label-md active:scale-\[0.98] transition-transform">

&#x20;                   Contribute

&#x20;               </button>

</div>

</section>

<!-- Topic Section -->

<section class="pb-12">

<div class="flex items-center justify-between mb-6">

<h2 class="font-headline-md text-headline-md text-on-surface">Core Disciplines</h2>

<span class="font-label-sm text-label-sm text-primary">06 / 12</span>

</div>

<div class="grid grid-cols-1 gap-4">

<!-- Topic Card 1 -->

<div class="bg-surface-container border border-outline-variant p-5 group hover:border-primary transition-colors">

<div class="flex justify-between items-start mb-8">

<span class="font-label-sm text-label-sm text-outline">#001</span>

<span class="material-symbols-outlined text-primary" data-icon="memory">memory</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Architecture</h3>

<p class="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase">CPU • Registers • Cache</p>

<div class="w-full h-\[120px] bg-surface-container-low border border-outline-variant overflow-hidden">

<img class="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" data-alt="A highly detailed close-up of a modern semiconductor microchip circuit board under a cool blue laboratory light. The visual style is clinical and precise, emphasizing the intricate patterns of copper traces and silicon architecture in a dark, scholarly environment. The mood is focused and technical, using a palette of deep charcoals and electric blue highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ96mJA1MTqbdiM4bkfdMIDcEgbBOD82XuvvAIqZvfaM5doMKYcU6DVotJSvcPzHq2ZzKdKI1KzaDslrzPxSGTwkCSzlr2qXlT7Kw9AHDYH-Ai0Uj3AyXX4tygxIsVVRJsSC0TrTxBOXJ8QYpMEyH9w9cqreGtgiLkyqAX7AyhHPAQqxUMyMyvmO4zkKxfWs-0\_fcKTa5M2BwpoGb-uCS4cmFHKpU1-X9fin\_IzFArIj6s8t6nimxzWhUPEaB7Zu-TIEceRA0ENGNB"/>

</div>

</div>

<!-- Topic Card 2 -->

<div class="bg-surface-container border border-outline-variant p-5 group hover:border-primary transition-colors">

<div class="flex justify-between items-start mb-8">

<span class="font-label-sm text-label-sm text-outline">#002</span>

<span class="material-symbols-outlined text-primary" data-icon="account\_tree">account\_tree</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Algorithms</h3>

<p class="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase">O(n) • Sort • Graphs</p>

<div class="w-full h-\[120px] bg-surface-container-low border border-outline-variant overflow-hidden">

<img class="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" data-alt="An abstract visualization of complex mathematical graphs and nodes connecting in a dark digital space. The nodes are glowing subtly in sky blue, linked by thin, razor-sharp lines against a matte black background with a faint grid-dot texture. The lighting is low-key and professional, evoking a sense of deep algorithmic processing and academic research." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-7YL5-x9GVpK4CZ0I1rnUASyrRNsMuSgvxQ9gJZOF8EGo8yGKHLiQlqeqgrVeYICiD8XquT1da8L3VxlUuQ5tDOYgpfBuWD16ImyL26k1NlWiM3K\_urP\_MGcLmnq93mu6SgW4KIM5lxX-RvvcU2oXWhqx2WsXD44Gk1YLms-Xw2IDoZRA\_c47APtQ5e5Vbgx5c94WumuFENnBsI8uIbNdusOU3ihTwUSiqacNqcEDyyFYiIGpWbHNX4LuIR-Ca8rjG5GXaOSDjjTu"/>

</div>

</div>

<!-- Topic Card 3 -->

<div class="bg-surface-container border border-outline-variant p-5 group hover:border-primary transition-colors">

<div class="flex justify-between items-start mb-8">

<span class="font-label-sm text-label-sm text-outline">#003</span>

<span class="material-symbols-outlined text-primary" data-icon="lan">lan</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Networking</h3>

<p class="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase">TCP/IP • DNS • Routing</p>

<div class="w-full h-\[120px] bg-surface-container-low border border-outline-variant overflow-hidden">

<img class="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" data-alt="A clean, minimalist view of glowing fiber optic cables and server indicators in a cold, dark server room. The perspective is from a low angle, emphasizing the orderly, systematic arrangement of network hardware. The color palette is dominated by dark greys and sky blue indicator lights, capturing a quiet university library atmosphere for high-end technology." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjseqoaw9SbPdw7ZSN4ASqdA33wGs9fMHsYVA8BTAFCil\_2pQOx8lUgAcofrpRG\_q9HZC3q-QVQV6CMFTpUR5XNwwxqlqHdCnPofDU\_dTh9KUZ7NA91LlrPuqj4gCZwCQ5FWaKKmVW-ds-sWYTcjQ1mqhXm2QZg1Bo2FFIyDEG9ya0rwQwcgJDgXfg0TCPy7p7V-kZHlfs5b8GYM9lXBR\_nFb7OmvXFVWbzXA8VnP7mTQgGnltKhj0GbiT078OivW6v27IsVSMVgrk"/>

</div>

</div>

<!-- Topic Card 4 -->

<div class="bg-surface-container border border-outline-variant p-5 group hover:border-primary transition-colors">

<div class="flex justify-between items-start mb-8">

<span class="font-label-sm text-label-sm text-outline">#004</span>

<span class="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Systems</h3>

<p class="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase">Kernel • Shell • POSIX</p>

<div class="w-full h-\[120px] bg-surface-container-low border border-outline-variant overflow-hidden">

<img class="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" data-alt="A macro shot of a monochrome computer terminal screen showing clean, monospaced lines of code and system logs. The green glow typical of old monitors is replaced by a crisp, modern sky blue text on a deep charcoal background. The mood is one of quiet, late-night academic study and rigorous programming, with no decorative elements." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkz0K5yU9fzosU\_70qMA2Nvx\_LTMSneqBhOqFVx1xdv36wmgjboxTud73M9px8\_8qEVVOCt4viiCd6Av-iGf5QPxX\_01Io4k\_pvgYY11EduNU9Ayn7OS6ha8QsyrAtUcfhATf02ly\_TPF5RiAgSB5q035ElfSWAXlpJN8O1j6Fu9KvnEAHeaKApLUmReLyKlK050ZisuKjd4HGH2MTknSP2nsqlBX\_ZqthK0KN7UxxHmxwEG7AFgnGemOHZkCK2lC7EVJmRJWttovp"/>

</div>

</div>

<!-- Topic Card 5 -->

<div class="bg-surface-container border border-outline-variant p-5 group hover:border-primary transition-colors">

<div class="flex justify-between items-start mb-8">

<span class="font-label-sm text-label-sm text-outline">#005</span>

<span class="material-symbols-outlined text-primary" data-icon="security">security</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Cryptography</h3>

<p class="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase">RSA • Hash • Ciphers</p>

<div class="w-full h-\[120px] bg-surface-container-low border border-outline-variant overflow-hidden">

<img class="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" data-alt="An abstract representation of data encryption, featuring overlapping layers of numeric characters and geometric locks in a dark, cinematic space. The visual style uses high contrast between matte black surfaces and sharp, sky blue highlights. The atmosphere is intellectual and secure, reflecting the scholarly precision of modern cybersecurity research." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrC9CHDetpTrdDYqY6w\_qrcpQ-S5e\_yKtXkf145TsLjjLMWAvsnGtjZfIodGyzWA3b-q\_P\_PqSrKU97P4IML7Xjhd5y47g-WFY6R51awxY0TvdTiePDNw7O0cW3b5qVBknfqZ6HTLgFOdRVoDzBJ9j4q371U9cHfsbruQkdPOVt233UtemGST\_\_vvodbOSyIaew76wcLrR8ZenWKLO1DwO\_-hQNWPRol4baI4\_1WFNDStyIjVAis3VKaPIEj79DQtxNpgAYtLUWuih"/>

</div>

</div>

<!-- Topic Card 6 -->

<div class="bg-surface-container border border-outline-variant p-5 group hover:border-primary transition-colors">

<div class="flex justify-between items-start mb-8">

<span class="font-label-sm text-label-sm text-outline">#006</span>

<span class="material-symbols-outlined text-primary" data-icon="database">database</span>

</div>

<h3 class="font-headline-md text-headline-md mb-2">Data Structures</h3>

<p class="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase">Heaps • Lists • Trees</p>

<div class="w-full h-\[120px] bg-surface-container-low border border-outline-variant overflow-hidden">

<img class="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" data-alt="A systematic 3D grid layout of cubes and nodes representing an organized database structure. The lighting is uniform and soft, casting minimal shadows to maintain a flat aesthetic. The colors are muted charcoal and graphite, with the focal points picked out in a vibrant sky blue, embodying the systematic order of information science." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsT8Y2wzqSwqUd3zHe6Yga69AzCg1r8qJCzXOl80UUyMbg0Sq8ODh1cWGRODSARszw\_XCaFy4MdK8eUN-6vXoEbIHYnPyirDE3YTOCBKXP22z772IALeaxvRp-cFo33I2RyssEo9Txk2bqSPcAQGsWT77XlbLWPJIMDmkhnWrbgjMSOmVmwDXrAJz6y4aG3bV8IzcvQQ2fbyle\_jowFuVIVSsAETsGg4VDGwhfLVNCnCmnPHEcooGgw4DZK\_H8ocBqDV0dlZaBtEcU"/>

</div>

</div>

</div>

</section>

<!-- Newsletter/Footer Section -->

<section class="py-12 border-t border-outline-variant mb-8">

<div class="bg-surface-container border border-outline-variant p-6">

<h3 class="font-headline-md text-headline-md mb-4 text-on-surface">Weekly Reference</h3>

<p class="font-body-md text-on-surface-variant mb-6">

&#x20;                   Deep dives into fundamental papers and system design patterns, delivered every Friday.

&#x20;               </p>

<div class="flex flex-col gap-4">

<input class="bg-surface border border-outline-variant p-4 font-label-md text-label-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-0" placeholder="UNIVERSITY EMAIL" type="email"/>

<button class="bg-primary text-on-primary py-4 px-8 font-label-md text-label-md">

&#x20;                       Subscribe

&#x20;                   </button>

</div>

</div>

<div class="mt-8 flex flex-col gap-4 items-center opacity-40">

<span class="font-label-sm text-label-sm">GITHUB • DOCUMENTATION • API</span>

<span class="font-label-sm text-label-sm">© 2024 OPENCS FOUNDATION</span>

</div>

</section>

</main>

<!-- BottomNavBar -->

<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-14 bg-surface px-4 border-t border-outline-variant">

<!-- Home is active -->

<a class="flex flex-col items-center justify-center text-primary active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="grid\_view">grid\_view</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="bookmarks">bookmarks</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="person">person</span>

</a>

</nav>

<!-- Mobile Navigation Drawer Interaction -->

<script>

&#x20;       const menuBtn = document.getElementById('menu-trigger');

&#x20;       const drawer = document.getElementById('nav-drawer');

&#x20;       const overlay = document.getElementById('drawer-overlay');



&#x20;       function toggleDrawer() {

&#x20;           const isOpen = drawer.classList.contains('translate-x-0');

&#x20;           if (isOpen) {

&#x20;               drawer.classList.remove('translate-x-0');

&#x20;               drawer.classList.add('-translate-x-full');

&#x20;               overlay.classList.add('hidden');

&#x20;               overlay.classList.remove('opacity-100');

&#x20;           } else {

&#x20;               drawer.classList.remove('-translate-x-full');

&#x20;               drawer.classList.add('translate-x-0');

&#x20;               overlay.classList.remove('hidden');

&#x20;               setTimeout(() => overlay.classList.add('opacity-100'), 10);

&#x20;           }

&#x20;       }



&#x20;       menuBtn.addEventListener('click', toggleDrawer);

&#x20;       overlay.addEventListener('click', toggleDrawer);



&#x20;       // Simple haptic feedback simulation

&#x20;       document.querySelectorAll('button, a').forEach(el => {

&#x20;           el.addEventListener('click', () => {

&#x20;               if (window.navigator.vibrate) {

&#x20;                   window.navigator.vibrate(5);

&#x20;               }

&#x20;           });

&#x20;       });

&#x20;   </script>

</body></html>



<!-- Topics Index (Light Mode) -->

<!DOCTYPE html>



<html class="light" lang="en"><head>

<meta charset="utf-8"/>

<meta content="width=device-width, initial-scale=1.0" name="viewport"/>

<title>OpenCS Topics Index</title>

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700\&amp;family=Georgia:wght@400;600;700\&amp;family=JetBrains+Mono:wght@400\&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900\&amp;display=swap" rel="stylesheet"/>

<script id="tailwind-config">

&#x20;       tailwind.config = {

&#x20;           darkMode: "class",

&#x20;           theme: {

&#x20;               extend: {

&#x20;                   "colors": {

&#x20;                       "surface-bright": "#faf8ff",

&#x20;                       "primary-container": "#2563eb",

&#x20;                       "surface-container-highest": "#e1e2ed",

&#x20;                       "secondary-fixed-dim": "#c8c6c6",

&#x20;                       "text-muted": "#8A8A8A",

&#x20;                       "tertiary-fixed": "#ffdbcd",

&#x20;                       "surface": "#faf8ff",

&#x20;                       "surface-dim": "#d9d9e5",

&#x20;                       "on-surface": "#191b23",

&#x20;                       "text-heading": "#1A1A1A",

&#x20;                       "surface-container": "#ededf9",

&#x20;                       "success-check": "#059669",

&#x20;                       "surface-tint": "#0053db",

&#x20;                       "on-primary-container": "#eeefff",

&#x20;                       "on-tertiary-fixed-variant": "#7d2d00",

&#x20;                       "on-secondary-fixed-variant": "#474747",

&#x20;                       "secondary": "#5e5e5e",

&#x20;                       "on-secondary-container": "#646464",

&#x20;                       "on-tertiary-fixed": "#360f00",

&#x20;                       "surface-container-low": "#f3f3fe",

&#x20;                       "surface-container-high": "#e7e7f3",

&#x20;                       "on-surface-variant": "#434655",

&#x20;                       "error": "#ba1a1a",

&#x20;                       "tertiary-fixed-dim": "#ffb596",

&#x20;                       "on-error-container": "#93000a",

&#x20;                       "background": "#faf8ff",

&#x20;                       "outline-variant": "#c3c6d7",

&#x20;                       "error-container": "#ffdad6",

&#x20;                       "on-background": "#191b23",

&#x20;                       "error-reserve": "#DC2626",

&#x20;                       "on-primary-fixed": "#00174b",

&#x20;                       "highlight-amber": "#F59E0B",

&#x20;                       "on-secondary-fixed": "#1b1c1c",

&#x20;                       "secondary-fixed": "#e4e2e2",

&#x20;                       "surface-variant": "#e1e2ed",

&#x20;                       "background-ivory": "#FAF9F6",

&#x20;                       "secondary-container": "#e4e2e2",

&#x20;                       "primary-fixed-dim": "#b4c5ff",

&#x20;                       "on-secondary": "#ffffff",

&#x20;                       "on-primary": "#ffffff",

&#x20;                       "inverse-on-surface": "#f0f0fb",

&#x20;                       "tertiary": "#943700",

&#x20;                       "surface-controls": "#F5F5F5",

&#x20;                       "primary-fixed": "#dbe1ff",

&#x20;                       "outline": "#737686",

&#x20;                       "on-tertiary": "#ffffff",

&#x20;                       "on-tertiary-container": "#ffede6",

&#x20;                       "on-error": "#ffffff",

&#x20;                       "inverse-surface": "#2e3039",

&#x20;                       "surface-container-lowest": "#ffffff",

&#x20;                       "tertiary-container": "#bc4800",

&#x20;                       "inverse-primary": "#b4c5ff",

&#x20;                       "surface-canvas": "#FEFEFE",

&#x20;                       "on-primary-fixed-variant": "#003ea8",

&#x20;                       "border-graphite": "#E8E6E1",

&#x20;                       "primary": "#004ac6"

&#x20;                   },

&#x20;                   "borderRadius": {

&#x20;                       "DEFAULT": "0.25rem",

&#x20;                       "lg": "0.5rem",

&#x20;                       "xl": "0.75rem",

&#x20;                       "full": "9999px"

&#x20;                   },

&#x20;                   "spacing": {

&#x20;                       "unit-related": "8px",

&#x20;                       "unit-paragraph": "16px",

&#x20;                       "unit-inline": "4px",

&#x20;                       "visualizer-max-width": "896px",

&#x20;                       "content-max-width": "768px",

&#x20;                       "unit-section": "32px",

&#x20;                       "unit-block": "24px",

&#x20;                       "unit-page": "48px",

&#x20;                       "margin-mobile": "16px"

&#x20;                   },

&#x20;                   "fontFamily": {

&#x20;                       "headline-xl": \["Georgia"],

&#x20;                       "headline-xl-mobile": \["Georgia"],

&#x20;                       "body-md": \["Inter"],

&#x20;                       "label-sm": \["Inter"],

&#x20;                       "headline-md": \["Georgia"],

&#x20;                       "headline-lg-mobile": \["Georgia"],

&#x20;                       "headline-lg": \["Georgia"],

&#x20;                       "code-sm": \["JetBrains Mono"]

&#x20;                   },

&#x20;                   "fontSize": {

&#x20;                       "headline-xl": \["2.5rem", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],

&#x20;                       "headline-xl-mobile": \["1.75rem", {"lineHeight": "1.2", "fontWeight": "700"}],

&#x20;                       "body-md": \["1rem", {"lineHeight": "1.75", "fontWeight": "400"}],

&#x20;                       "label-sm": \["0.8125rem", {"lineHeight": "1.4", "fontWeight": "400"}],

&#x20;                       "headline-md": \["1.25rem", {"lineHeight": "1.4", "fontWeight": "600"}],

&#x20;                       "headline-lg-mobile": \["1.375rem", {"lineHeight": "1.3", "fontWeight": "600"}],

&#x20;                       "headline-lg": \["1.75rem", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],

&#x20;                       "code-sm": \["0.9em", {"lineHeight": "1.5", "fontWeight": "400"}]

&#x20;                   }

&#x20;               },

&#x20;           },

&#x20;       }

&#x20;   </script>

<style>

&#x20;       .material-symbols-outlined {

&#x20;           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

&#x20;       }

&#x20;       body {

&#x20;           background-color: #FAF9F6; /\* background-ivory \*/

&#x20;           color: #191b23; /\* on-surface \*/

&#x20;       }

&#x20;       .hide-scrollbar::-webkit-scrollbar {

&#x20;           display: none;

&#x20;       }

&#x20;       .hide-scrollbar {

&#x20;           -ms-overflow-style: none;

&#x20;           scrollbar-width: none;

&#x20;       }

&#x20;   </style>

<style>

&#x20;   body {

&#x20;     min-height: max(884px, 100dvh);

&#x20;   }

&#x20; </style>

&#x20; </head>

<body class="font-body-md text-body-md antialiased">

<!-- TopAppBar Shell -->

<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface border-b border-outline-variant">

<div class="flex items-center gap-4">

<button class="flex items-center justify-center p-2 text-primary">

<span class="material-symbols-outlined" data-icon="menu">menu</span>

</button>

<span class="font-label-md text-label-md text-primary uppercase tracking-widest font-bold">OpenCS</span>

</div>

<div class="flex items-center">

<button class="flex items-center justify-center p-2 text-primary">

<span class="material-symbols-outlined" data-icon="search">search</span>

</button>

</div>

</header>

<!-- Main Canvas -->

<main class="pt-24 pb-20 px-margin-mobile max-w-content-max-width mx-auto">

<!-- Document Header -->

<section class="mb-unit-section">

<h1 class="font-headline-xl-mobile text-headline-xl-mobile text-text-heading mb-2">Topics</h1>

<p class="text-on-surface-variant font-body-md">Explore the core principles of computer science through our curated index of architectural patterns and systems.</p>

</section>

<!-- Filter Row (Horizontal Scroll) -->

<section class="mb-unit-block">

<div class="flex gap-2 overflow-x-auto hide-scrollbar pb-2">

<button class="flex-none px-4 py-1.5 bg-primary-container text-on-primary-container border border-primary-container font-label-sm text-label-sm rounded-\[2px] transition-colors">All Topics</button>

<button class="flex-none px-4 py-1.5 bg-surface-canvas text-on-surface border border-border-graphite font-label-sm text-label-sm rounded-\[2px] hover:border-primary transition-colors">Algorithms</button>

<button class="flex-none px-4 py-1.5 bg-surface-canvas text-on-surface border border-border-graphite font-label-sm text-label-sm rounded-\[2px] hover:border-primary transition-colors">Distributed Systems</button>

<button class="flex-none px-4 py-1.5 bg-surface-canvas text-on-surface border border-border-graphite font-label-sm text-label-sm rounded-\[2px] hover:border-primary transition-colors">Compilers</button>

<button class="flex-none px-4 py-1.5 bg-surface-canvas text-on-surface border border-border-graphite font-label-sm text-label-sm rounded-\[2px] hover:border-primary transition-colors">Operating Systems</button>

</div>

</section>

<!-- Topic Card Grid -->

<div class="space-y-4">

<!-- Card 1 -->

<article class="bg-surface-canvas border border-border-graphite p-4 group transition-colors hover:border-primary">

<div class="flex justify-between items-start mb-2">

<span class="font-code-sm text-code-sm text-primary uppercase tracking-wider">ALGORITHMS</span>

<span class="material-symbols-outlined text-text-muted text-\[20px]" data-icon="bookmark">bookmark</span>

</div>

<h3 class="font-headline-lg-mobile text-headline-lg-mobile text-text-heading mb-2 group-hover:text-primary transition-colors">B-Trees \&amp; Database Indexing</h3>

<p class="text-on-surface-variant font-body-md line-clamp-2 mb-4">An exploration of multi-way search trees and their fundamental role in modern storage engines and file systems.</p>

<div class="flex items-center gap-4 mb-4 text-text-muted font-label-sm text-label-sm">

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="bolt">bolt</span>

<span>Advanced</span>

</div>

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="schedule">schedule</span>

<span>12 min read</span>

</div>

</div>

<div class="flex flex-wrap gap-2">

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">Storage</span>

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">Optimization</span>

</div>

</article>

<!-- Card 2 -->

<article class="bg-surface-canvas border border-border-graphite p-4 group transition-colors hover:border-primary">

<div class="flex justify-between items-start mb-2">

<span class="font-code-sm text-code-sm text-primary uppercase tracking-wider">DISTRIBUTED SYSTEMS</span>

<span class="material-symbols-outlined text-text-muted text-\[20px]" data-icon="bookmark">bookmark</span>

</div>

<h3 class="font-headline-lg-mobile text-headline-lg-mobile text-text-heading mb-2 group-hover:text-primary transition-colors">The Raft Consensus Algorithm</h3>

<p class="text-on-surface-variant font-body-md line-clamp-2 mb-4">Understanding how distributed nodes agree on a single source of truth in the presence of network failures.</p>

<div class="flex items-center gap-4 mb-4 text-text-muted font-label-sm text-label-sm">

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="bolt">bolt</span>

<span>Expert</span>

</div>

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="schedule">schedule</span>

<span>25 min read</span>

</div>

</div>

<div class="flex flex-wrap gap-2">

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">Consistency</span>

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">Fault Tolerance</span>

</div>

</article>

<!-- Card 3 -->

<article class="bg-surface-canvas border border-border-graphite p-4 group transition-colors hover:border-primary">

<div class="flex justify-between items-start mb-2">

<span class="font-code-sm text-code-sm text-primary uppercase tracking-wider">COMPILERS</span>

<span class="material-symbols-outlined text-text-muted text-\[20px]" data-icon="bookmark">bookmark</span>

</div>

<h3 class="font-headline-lg-mobile text-headline-lg-mobile text-text-heading mb-2 group-hover:text-primary transition-colors">Abstract Syntax Trees</h3>

<p class="text-on-surface-variant font-body-md line-clamp-2 mb-4">From source code to structure: How compilers represent language tokens as hierarchical logical relationships.</p>

<div class="flex items-center gap-4 mb-4 text-text-muted font-label-sm text-label-sm">

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="bolt">bolt</span>

<span>Intermediate</span>

</div>

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="schedule">schedule</span>

<span>8 min read</span>

</div>

</div>

<div class="flex flex-wrap gap-2">

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">Lexing</span>

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">Parsing</span>

</div>

</article>

<!-- Card 4 (Visualizer Preview Style) -->

<article class="bg-surface-canvas border border-border-graphite p-4 group transition-colors hover:border-primary">

<div class="flex justify-between items-start mb-2">

<span class="font-code-sm text-code-sm text-primary uppercase tracking-wider">OPERATING SYSTEMS</span>

<span class="material-symbols-outlined text-text-muted text-\[20px]" data-icon="bookmark">bookmark</span>

</div>

<h3 class="font-headline-lg-mobile text-headline-lg-mobile text-text-heading mb-2 group-hover:text-primary transition-colors">Virtual Memory \&amp; Paging</h3>

<p class="text-on-surface-variant font-body-md line-clamp-2 mb-4">An interactive guide to the hardware-software abstraction layer that manages physical memory allocation.</p>

<div class="flex items-center gap-4 mb-4 text-text-muted font-label-sm text-label-sm">

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="bolt">bolt</span>

<span>Intermediate</span>

</div>

<div class="flex items-center gap-1">

<span class="material-symbols-outlined text-\[16px]" data-icon="schedule">schedule</span>

<span>15 min read</span>

</div>

</div>

<!-- Abstract Visualizer Hint -->

<div class="w-full h-16 bg-surface-controls border border-border-graphite mb-4 flex items-center justify-center">

<div class="flex gap-1">

<div class="w-6 h-6 border border-outline bg-surface-canvas"></div>

<div class="w-6 h-6 border border-outline bg-primary"></div>

<div class="w-6 h-6 border border-outline bg-surface-canvas"></div>

<div class="w-6 h-6 border border-outline bg-surface-canvas"></div>

<div class="w-6 h-6 border border-outline bg-surface-canvas"></div>

</div>

</div>

<div class="flex flex-wrap gap-2">

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">Hardware</span>

<span class="px-2 py-0.5 bg-surface-controls border border-border-graphite text-on-surface-variant font-label-sm text-\[0.75rem] rounded-\[2px]">MMU</span>

</div>

</article>

</div>

<!-- Pagination / Load More -->

<div class="mt-unit-section pb-12 flex justify-center">

<button class="px-6 py-2 border border-border-graphite text-primary font-label-sm text-label-sm rounded-\[2px] hover:bg-surface-controls transition-colors">Load More Topics</button>

</div>

</main>

<!-- BottomNavBar Shell -->

<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-14 bg-surface px-4 border-t border-outline-variant">

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="home">home</span>

</a>

<a class="flex flex-col items-center justify-center text-primary active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="grid\_view" style="font-variation-settings: 'FILL' 1;">grid\_view</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="bookmarks">bookmarks</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="person">person</span>

</a>

</nav>

<!-- Micro-interaction Script -->

<script>

&#x20;       // Simple filter active state toggle

&#x20;       const filterButtons = document.querySelectorAll('button.flex-none');

&#x20;       filterButtons.forEach(btn => {

&#x20;           btn.addEventListener('click', () => {

&#x20;               filterButtons.forEach(b => {

&#x20;                   b.classList.remove('bg-primary-container', 'text-on-primary-container', 'border-primary-container');

&#x20;                   b.classList.add('bg-surface-canvas', 'text-on-surface', 'border-border-graphite');

&#x20;               });

&#x20;               btn.classList.add('bg-primary-container', 'text-on-primary-container', 'border-primary-container');

&#x20;               btn.classList.remove('bg-surface-canvas', 'text-on-surface', 'border-border-graphite');

&#x20;           });

&#x20;       });

&#x20;   </script>

</body></html>



<!-- Topics Index (Dark Mode) -->

<!DOCTYPE html>



<html class="dark" lang="en"><head>

<meta charset="utf-8"/>

<meta content="width=device-width, initial-scale=1.0" name="viewport"/>

<title>OpenCS Topics Index</title>

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600\&amp;family=Literata:ital,wght@0,600;0,700;1,600\&amp;family=JetBrains+Mono:wght@500\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1\&amp;display=swap" rel="stylesheet"/>

<script id="tailwind-config">

&#x20;       tailwind.config = {

&#x20;           darkMode: "class",

&#x20;           theme: {

&#x20;               extend: {

&#x20;                   "colors": {

&#x20;                       "on-surface": "#e5e2e1",

&#x20;                       "inverse-on-surface": "#313030",

&#x20;                       "secondary-container": "#39485a",

&#x20;                       "surface-dim": "#131313",

&#x20;                       "primary-fixed-dim": "#a4c9ff",

&#x20;                       "on-secondary": "#233143",

&#x20;                       "on-primary": "#00315d",

&#x20;                       "surface-container": "#201f1f",

&#x20;                       "surface-tint": "#a4c9ff",

&#x20;                       "on-primary-container": "#003a6b",

&#x20;                       "tertiary": "#c8c6c6",

&#x20;                       "on-tertiary-fixed-variant": "#474747",

&#x20;                       "surface-container-highest": "#353534",

&#x20;                       "surface-bright": "#393939",

&#x20;                       "primary-container": "#60a5fa",

&#x20;                       "error-container": "#93000a",

&#x20;                       "on-background": "#e5e2e1",

&#x20;                       "on-secondary-fixed": "#0d1c2d",

&#x20;                       "secondary-fixed": "#d4e4fa",

&#x20;                       "surface-variant": "#353534",

&#x20;                       "surface": "#131313",

&#x20;                       "secondary-fixed-dim": "#b9c8de",

&#x20;                       "on-primary-fixed": "#001c39",

&#x20;                       "tertiary-fixed": "#e4e2e1",

&#x20;                       "on-primary-fixed-variant": "#004883",

&#x20;                       "error": "#ffb4ab",

&#x20;                       "tertiary-fixed-dim": "#c8c6c6",

&#x20;                       "on-error-container": "#ffdad6",

&#x20;                       "background": "#131313",

&#x20;                       "surface-container-low": "#1c1b1b",

&#x20;                       "tertiary-container": "#a4a2a2",

&#x20;                       "surface-container-high": "#2a2a2a",

&#x20;                       "on-surface-variant": "#c1c7d3",

&#x20;                       "inverse-primary": "#0060ac",

&#x20;                       "outline-variant": "#414751",

&#x20;                       "primary": "#a4c9ff",

&#x20;                       "outline": "#8b919d",

&#x20;                       "on-tertiary": "#303030",

&#x20;                       "on-secondary-fixed-variant": "#39485a",

&#x20;                       "primary-fixed": "#d4e3ff",

&#x20;                       "secondary": "#b9c8de",

&#x20;                       "inverse-surface": "#e5e2e1",

&#x20;                       "surface-container-lowest": "#0e0e0e",

&#x20;                       "on-secondary-container": "#a7b6cc",

&#x20;                       "on-tertiary-fixed": "#1b1c1c",

&#x20;                       "on-tertiary-container": "#393939",

&#x20;                       "on-error": "#690005"

&#x20;                   },

&#x20;                   "borderRadius": {

&#x20;                       "DEFAULT": "0.125rem",

&#x20;                       "lg": "0.25rem",

&#x20;                       "xl": "0.5rem",

&#x20;                       "full": "0.75rem"

&#x20;                   },

&#x20;                   "spacing": {

&#x20;                       "margin-mobile": "16px",

&#x20;                       "gutter": "24px",

&#x20;                       "margin-desktop": "40px",

&#x20;                       "container-max": "1200px",

&#x20;                       "base": "8px"

&#x20;                   },

&#x20;                   "fontFamily": {

&#x20;                       "body-lg": \["Inter"],

&#x20;                       "body-md": \["Inter"],

&#x20;                       "label-md": \["JetBrains Mono"],

&#x20;                       "display-lg": \["Literata"],

&#x20;                       "label-sm": \["JetBrains Mono"],

&#x20;                       "headline-md": \["Literata"],

&#x20;                       "headline-lg-mobile": \["Literata"],

&#x20;                       "headline-lg": \["Literata"]

&#x20;                   },

&#x20;                   "fontSize": {

&#x20;                       "body-lg": \["18px", {"lineHeight": "28px", "fontWeight": "400"}],

&#x20;                       "body-md": \["16px", {"lineHeight": "24px", "fontWeight": "400"}],

&#x20;                       "label-md": \["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500"}],

&#x20;                       "display-lg": \["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],

&#x20;                       "label-sm": \["12px", {"lineHeight": "16px", "fontWeight": "500"}],

&#x20;                       "headline-md": \["24px", {"lineHeight": "32px", "fontWeight": "600"}],

&#x20;                       "headline-lg-mobile": \["28px", {"lineHeight": "36px", "fontWeight": "600"}],

&#x20;                       "headline-lg": \["32px", {"lineHeight": "40px", "fontWeight": "600"}]

&#x20;                   }

&#x20;               },

&#x20;           },

&#x20;       }

&#x20;   </script>

<style>

&#x20;       body {

&#x20;           background-color: #121212;

&#x20;           background-image: radial-gradient(#1E1E1E 1px, transparent 0);

&#x20;           background-size: 16px 16px;

&#x20;       }

&#x20;       .no-scrollbar::-webkit-scrollbar { display: none; }

&#x20;       .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

&#x20;       .material-symbols-outlined {

&#x20;           font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

&#x20;       }

&#x20;   </style>

<style>

&#x20;   body {

&#x20;     min-height: max(884px, 100dvh);

&#x20;   }

&#x20; </style>

&#x20; </head>

<body class="bg-background text-on-surface min-h-screen pb-20">

<!-- TopAppBar -->

<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface border-b border-outline-variant">

<div class="flex items-center gap-4">

<button class="text-primary active:scale-95 transition-transform">

<span class="material-symbols-outlined" data-icon="menu">menu</span>

</button>

<span class="font-label-md text-label-md text-primary uppercase tracking-widest">OpenCS</span>

</div>

<div class="flex items-center">

<button class="text-primary active:scale-95 transition-transform">

<span class="material-symbols-outlined" data-icon="search">search</span>

</button>

</div>

</header>

<!-- Main Content Canvas -->

<main class="pt-24 px-margin-mobile">

<!-- Header Section -->

<section class="mb-8">

<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">Topics</h1>

<p class="font-body-md text-body-md text-on-surface-variant">Systematic categorization of computational science resources.</p>

</section>

<!-- Filter Section: Horizontal Scrollable Pills -->

<section class="mb-8 -mx-margin-mobile px-margin-mobile overflow-x-auto no-scrollbar flex flex-nowrap gap-3 items-center">

<button class="flex-shrink-0 px-4 py-2 bg-secondary-container text-on-secondary-container font-label-md text-label-md border border-outline-variant">

&#x20;               All Topics

&#x20;           </button>

<button class="flex-shrink-0 px-4 py-2 bg-surface text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:border-primary transition-colors">

&#x20;               Architecture

&#x20;           </button>

<button class="flex-shrink-0 px-4 py-2 bg-surface text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:border-primary transition-colors">

&#x20;               Algorithms

&#x20;           </button>

<button class="flex-shrink-0 px-4 py-2 bg-surface text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:border-primary transition-colors">

&#x20;               Compilers

&#x20;           </button>

<button class="flex-shrink-0 px-4 py-2 bg-surface text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:border-primary transition-colors">

&#x20;               Networking

&#x20;           </button>

</section>

<!-- Topic Card Grid (1 Column Mobile) -->

<section class="grid grid-cols-1 gap-gutter mb-8">

<!-- Card 1 -->

<article class="bg-surface-container border border-outline-variant aspect-square flex flex-col p-6 group transition-all hover:border-primary">

<div class="flex justify-between items-start mb-4">

<span class="font-label-sm text-label-sm text-primary uppercase">CS.ARCH.01</span>

<span class="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>

</div>

<h2 class="font-headline-md text-headline-md text-on-surface mb-2 mt-auto">Computer Architecture</h2>

<div class="flex flex-wrap gap-2 mb-4">

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">RISC-V</span>

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">Pipelines</span>

</div>

<div class="pt-4 border-t border-outline-variant flex items-center justify-between">

<span class="font-label-sm text-label-sm text-on-surface-variant">14 Modules</span>

<button class="text-primary">

<span class="material-symbols-outlined" data-icon="arrow\_forward">arrow\_forward</span>

</button>

</div>

</article>

<!-- Card 2 -->

<article class="bg-surface-container border border-outline-variant aspect-square flex flex-col p-6 group transition-all hover:border-primary">

<div class="flex justify-between items-start mb-4">

<span class="font-label-sm text-label-sm text-primary uppercase">CS.ALGO.04</span>

<span class="material-symbols-outlined text-primary" data-icon="grid\_view">grid\_view</span>

</div>

<h2 class="font-headline-md text-headline-md text-on-surface mb-2 mt-auto">Advanced Algorithms</h2>

<div class="flex flex-wrap gap-2 mb-4">

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">Complexity</span>

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">Graphs</span>

</div>

<div class="pt-4 border-t border-outline-variant flex items-center justify-between">

<span class="font-label-sm text-label-sm text-on-surface-variant">22 Modules</span>

<button class="text-primary">

<span class="material-symbols-outlined" data-icon="arrow\_forward">arrow\_forward</span>

</button>

</div>

</article>

<!-- Card 3 -->

<article class="bg-surface-container border border-outline-variant aspect-square flex flex-col p-6 group transition-all hover:border-primary">

<div class="flex justify-between items-start mb-4">

<span class="font-label-sm text-label-sm text-primary uppercase">CS.LANG.02</span>

<span class="material-symbols-outlined text-primary" data-icon="history\_edu">history\_edu</span>

</div>

<h2 class="font-headline-md text-headline-md text-on-surface mb-2 mt-auto">Theory of Computation</h2>

<div class="flex flex-wrap gap-2 mb-4">

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">Automata</span>

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">P vs NP</span>

</div>

<div class="pt-4 border-t border-outline-variant flex items-center justify-between">

<span class="font-label-sm text-label-sm text-on-surface-variant">08 Modules</span>

<button class="text-primary">

<span class="material-symbols-outlined" data-icon="arrow\_forward">arrow\_forward</span>

</button>

</div>

</article>

<!-- Card 4 -->

<article class="bg-surface-container border border-outline-variant aspect-square flex flex-col p-6 group transition-all hover:border-primary">

<div class="flex justify-between items-start mb-4">

<span class="font-label-sm text-label-sm text-primary uppercase">CS.OS.03</span>

<span class="material-symbols-outlined text-primary" data-icon="library\_books">library\_books</span>

</div>

<h2 class="font-headline-md text-headline-md text-on-surface mb-2 mt-auto">Operating Systems</h2>

<div class="flex flex-wrap gap-2 mb-4">

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">Kernels</span>

<span class="px-2 py-0.5 bg-surface-container-low border border-outline-variant font-label-sm text-label-sm text-on-surface-variant">Memory</span>

</div>

<div class="pt-4 border-t border-outline-variant flex items-center justify-between">

<span class="font-label-sm text-label-sm text-on-surface-variant">19 Modules</span>

<button class="text-primary">

<span class="material-symbols-outlined" data-icon="arrow\_forward">arrow\_forward</span>

</button>

</div>

</article>

</section>

<!-- Stats Footer Section (Minimalist Academic) -->

<section class="py-8 border-t border-outline-variant">

<div class="grid grid-cols-2 gap-4">

<div class="p-4 bg-surface-container-low border border-outline-variant">

<span class="font-label-sm text-label-sm text-on-surface-variant block mb-1">TOTAL TOPICS</span>

<span class="font-headline-md text-headline-md text-primary">128</span>

</div>

<div class="p-4 bg-surface-container-low border border-outline-variant">

<span class="font-label-sm text-label-sm text-on-surface-variant block mb-1">CURATED PAPERS</span>

<span class="font-headline-md text-headline-md text-primary">1,402</span>

</div>

</div>

</section>

</main>

<!-- NavigationDrawer (Mobile Hidden Overlay Logic handled by state) -->

<nav class="fixed inset-y-0 left-0 z-\[60] flex flex-col p-6 bg-surface-container border-r border-outline-variant h-full w-80 transform -translate-x-full transition-transform duration-300 ease-in-out" id="mobile-drawer">

<div class="mb-8">

<span class="font-headline-md text-headline-md text-primary">OpenCS Index</span>

</div>

<div class="flex flex-col gap-2 flex-grow">

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="home">home</span>

<span class="font-label-md text-label-md">Home</span>

</a>

<a class="flex items-center gap-4 p-3 bg-secondary-container text-on-secondary-container font-bold transition-all" href="#">

<span class="material-symbols-outlined" data-icon="library\_books">library\_books</span>

<span class="font-label-md text-label-md">Topics</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="history\_edu">history\_edu</span>

<span class="font-label-md text-label-md">Archive</span>

</a>

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="terminal">terminal</span>

<span class="font-label-md text-label-md">Reference</span>

</a>

</div>

<div class="pt-6 border-t border-outline-variant">

<a class="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">

<span class="material-symbols-outlined" data-icon="settings">settings</span>

<span class="font-label-md text-label-md">Settings</span>

</a>

</div>

</nav>

<!-- Overlay for Drawer -->

<div class="fixed inset-0 bg-black/50 z-\[55] hidden opacity-0 transition-opacity duration-300" id="drawer-overlay"></div>

<!-- BottomNavBar -->

<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-14 bg-surface border-t border-outline-variant px-4">

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="home">home</span>

</a>

<a class="flex flex-col items-center justify-center text-primary active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="grid\_view" style="font-variation-settings: 'FILL' 1;">grid\_view</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="bookmarks">bookmarks</span>

</a>

<a class="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform" href="#">

<span class="material-symbols-outlined" data-icon="person">person</span>

</a>

</nav>

<script>

&#x20;       // Simple Interaction Logic for Mobile Drawer

&#x20;       const menuBtn = document.querySelector('header button');

&#x20;       const drawer = document.getElementById('mobile-drawer');

&#x20;       const overlay = document.getElementById('drawer-overlay');



&#x20;       function toggleDrawer() {

&#x20;           const isOpen = drawer.classList.contains('translate-x-0');

&#x20;           if (isOpen) {

&#x20;               drawer.classList.remove('translate-x-0');

&#x20;               drawer.classList.add('-translate-x-full');

&#x20;               overlay.classList.add('hidden');

&#x20;               overlay.classList.remove('opacity-100');

&#x20;           } else {

&#x20;               drawer.classList.add('translate-x-0');

&#x20;               drawer.classList.remove('-translate-x-full');

&#x20;               overlay.classList.remove('hidden');

&#x20;               setTimeout(() => overlay.classList.add('opacity-100'), 10);

&#x20;           }

&#x20;       }



&#x20;       menuBtn.addEventListener('click', toggleDrawer);

&#x20;       overlay.addEventListener('click', toggleDrawer);



&#x20;       // Micro-interactions for cards

&#x20;       document.querySelectorAll('article').forEach(card => {

&#x20;           card.addEventListener('click', () => {

&#x20;               card.style.transform = 'scale(0.98)';

&#x20;               setTimeout(() => card.style.transform = 'scale(1)', 100);

&#x20;           });

&#x20;       });

&#x20;   </script>

</body></html>

