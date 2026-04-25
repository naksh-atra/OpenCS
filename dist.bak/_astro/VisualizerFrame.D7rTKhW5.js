import"./index.CdJzaNS0.js";var c={exports:{}},t={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v;function x(){if(v)return t;v=1;var o=Symbol.for("react.transitional.element"),s=Symbol.for("react.fragment");function n(d,e,a){var i=null;if(a!==void 0&&(i=""+a),e.key!==void 0&&(i=""+e.key),"key"in e){a={};for(var l in e)l!=="key"&&(a[l]=e[l])}else a=e;return e=a.ref,{$$typeof:o,type:d,key:i,ref:e!==void 0?e:null,props:a}}return t.Fragment=s,t.jsx=n,t.jsxs=n,t}var p;function f(){return p||(p=1,c.exports=x()),c.exports}var r=f();function u({title:o,description:s,children:n,controls:d,isLoading:e=!1,isEmpty:a=!1,emptyMessage:i="No data to display"}){return e?r.jsxs("div",{className:"vf-container",children:[r.jsxs("div",{className:"vf-header",children:[r.jsx("h3",{className:"vf-title",children:o}),s&&r.jsx("p",{className:"vf-description","data-testid":"vf-description",children:s})]}),r.jsxs("div",{className:"vf-loading",children:[r.jsx("div",{className:"vf-spinner"}),r.jsx("span",{children:"Loading visualization..."})]})]}):r.jsxs("div",{className:"vf-container",children:[r.jsxs("div",{className:"vf-header",children:[r.jsx("h3",{className:"vf-title",children:o}),s&&r.jsx("p",{className:"vf-description","data-testid":"vf-description",children:s})]}),d&&r.jsx("div",{className:"vf-controls",children:d}),r.jsx("div",{className:"vf-canvas",children:a?r.jsxs("div",{className:"vf-empty",children:[r.jsx("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:r.jsx("path",{d:"M3 12h18M3 6h18M3 18h18",opacity:"0.3"})}),r.jsx("span",{children:i})]}):n}),r.jsx("style",{children:`
        .vf-container {
          margin: var(--space-6) 0;
          padding: var(--space-6);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }

        .vf-header {
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border);
        }

        .vf-title {
          font-size: var(--text-lg);
          font-weight: 600;
          margin: 0 0 var(--space-2) 0;
          color: var(--color-text);
        }

        .vf-description {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          margin: 0;
          line-height: 1.5;
        }

        .vf-controls {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          padding: var(--space-3);
          background: var(--color-bg);
          border-radius: var(--radius-md);
        }

        .vf-canvas {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vf-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-8);
          color: var(--color-text-muted);
        }

        .vf-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: vf-spin 1s linear infinite;
        }

        .vf-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-8);
          color: var(--color-text-muted);
          font-size: var(--text-sm);
        }

        .vf-empty svg {
          opacity: 0.5;
        }

        @keyframes vf-spin {
          to { transform: rotate(360deg); }
        }
      `})]})}export{u as V,r as j};
