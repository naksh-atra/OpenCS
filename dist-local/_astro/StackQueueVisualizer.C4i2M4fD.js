import{j as a,V as S}from"./VisualizerFrame.D7rTKhW5.js";import{r as n}from"./index.CdJzaNS0.js";function d(e="stack",s=[3,7,1,8,2]){return{type:e,data:[...s],operations:[],highlightIndex:null,message:`${v(e)} initialized with [${s.join(", ")}]`}}function v(e){return e.charAt(0).toUpperCase()+e.slice(1)}function E(e,s){if(e.type==="queue")return h(e,s);const r=[...e.data,s];return{...e,type:"stack",data:r,operations:[...e.operations,{type:"push",value:s,result:s,timestamp:Date.now()}],highlightIndex:r.length-1,message:`Pushed ${s} to stack`}}function P(e){if(e.type==="queue")return x(e);if(e.data.length===0)return{...e,message:"Cannot pop from empty stack"};const s=e.data[e.data.length-1],r=e.data.slice(0,-1);return{...e,type:"stack",data:r,operations:[...e.operations,{type:"pop",result:s,timestamp:Date.now()}],highlightIndex:null,message:`Popped ${s} from stack`}}function h(e,s){const r=[...e.data,s];return{...e,type:"queue",data:r,operations:[...e.operations,{type:"enqueue",value:s,result:s,timestamp:Date.now()}],highlightIndex:r.length-1,message:`Enqueued ${s} to queue`}}function x(e){if(e.data.length===0)return{...e,message:"Cannot dequeue from empty queue"};const s=e.data[0],r=e.data.slice(1);return{...e,type:"queue",data:r,operations:[...e.operations,{type:"dequeue",result:s,timestamp:Date.now()}],highlightIndex:null,message:`Dequeued ${s} from queue`}}function I(e){if(e.data.length===0)return{...e,message:`${v(e.type)} is empty`};const s=e.type==="stack"?e.data[e.data.length-1]:e.data[0];return{...e,operations:[...e.operations,{type:"peek",result:s,timestamp:Date.now()}],highlightIndex:e.type==="stack"?e.data.length-1:0,message:`Peek: ${s}`}}function $(e=6,s=20){return Array.from({length:e},()=>Math.floor(Math.random()*s)+1)}const z=[{label:"Small",data:[3,7,1,8]},{label:"Ascending",data:[1,2,3,4,5]},{label:"Random",data:[5,2,8,1,9]}],F=[{label:"Small",data:[3,7,1,8]},{label:"Even",data:[2,4,6,8]},{label:"Sorted",data:[1,3,5,7]}];function M(){const[e,s]=n.useState(d("stack",[3,7,1,8])),[r,c]=n.useState(""),[l,q]=n.useState("stack"),p=n.useCallback(t=>{q(t),s(d(t)),c("")},[]),b=n.useCallback(t=>{s(d(l,t)),c("")},[l]),g=n.useCallback(()=>{s(d(l,$(6,20))),c("")},[l]),f=n.useCallback(()=>{s(d(l)),c("")},[l]),k=n.useCallback(()=>{const t=r?parseInt(r,10):Math.floor(Math.random()*20)+1;s(i=>E(i,t)),c("")},[r]),y=n.useCallback(()=>{s(t=>P(t))},[]),j=n.useCallback(()=>{const t=r?parseInt(r,10):Math.floor(Math.random()*20)+1;s(i=>h(i,t)),c("")},[r]),N=n.useCallback(()=>{s(t=>x(t))},[]),w=n.useCallback(()=>{s(t=>I(t))},[]),o=e.type==="stack",C=o?z:F,u=e.data.length>0;return a.jsxs(S,{title:`${o?"Stack":"Queue"} Visualizer`,description:`${o?"LIFO":"FIFO"} — ${e.message}`,controls:a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"sqv-mode-tabs",children:[a.jsx("button",{onClick:()=>p("stack"),className:`sqv-mode-tab ${l==="stack"?"active":""}`,children:"Stack (LIFO)"}),a.jsx("button",{onClick:()=>p("queue"),className:`sqv-mode-tab ${l==="queue"?"active":""}`,children:"Queue (FIFO)"})]}),a.jsxs("div",{className:"sqv-presets",children:[C.map(t=>a.jsx("button",{onClick:()=>b(t.data),className:"sqv-btn",children:t.label},t.label)),a.jsx("button",{onClick:g,className:"sqv-btn",children:"Random"}),a.jsx("button",{onClick:f,className:"sqv-btn sqv-btn-reset",children:"Reset"})]}),a.jsxs("div",{className:"sqv-ops",children:[a.jsxs("div",{className:"sqv-input-row",children:[a.jsx("input",{type:"number",placeholder:o?"Push value":"Enqueue value",value:r,onChange:t=>c(t.target.value),className:"sqv-input"}),o?a.jsxs(a.Fragment,{children:[a.jsx("button",{onClick:k,className:"sqv-btn sqv-btn-primary",children:"Push"}),a.jsx("button",{onClick:y,className:"sqv-btn sqv-btn-warn",disabled:!u,children:"Pop"})]}):a.jsxs(a.Fragment,{children:[a.jsx("button",{onClick:j,className:"sqv-btn sqv-btn-primary",children:"Enqueue"}),a.jsx("button",{onClick:N,className:"sqv-btn sqv-btn-warn",disabled:!u,children:"Dequeue"})]}),a.jsx("button",{onClick:w,className:"sqv-btn",disabled:!u,children:"Peek"})]}),a.jsx("div",{className:"sqv-hint",children:o?"Stack: push adds to top, pop removes from top":"Queue: enqueue adds to back, dequeue removes from front"})]})]}),isEmpty:e.data.length===0,emptyMessage:o?"Stack is empty":"Queue is empty",children:[a.jsx("div",{className:`sqv-container ${o?"sqv-stack":"sqv-queue"}`,children:a.jsx("div",{className:"sqv-structure",children:o?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"sqv-top-label",children:"TOP"}),a.jsxs("div",{className:"sqv-items sqv-stack-items",children:[[...e.data].reverse().map((t,i)=>{const m=e.data.length-1-i;return a.jsx("div",{className:`sqv-item ${e.highlightIndex===m?"sqv-item-highlight":""}`,children:a.jsx("span",{className:"sqv-item-value",children:t})},m)}),e.data.length===0&&a.jsx("div",{className:"sqv-empty-indicator",children:"Empty"})]}),a.jsx("div",{className:"sqv-bottom-label",children:"BOTTOM"})]}):a.jsxs("div",{className:"sqv-items sqv-queue-items",children:[a.jsx("div",{className:"sqv-front-label",children:"FRONT"}),a.jsxs("div",{className:"sqv-queue-row",children:[e.data.map((t,i)=>a.jsx("div",{className:`sqv-item sqv-queue-item ${e.highlightIndex===i?"sqv-item-highlight":""}`,children:a.jsx("span",{className:"sqv-item-value",children:t})},i)),e.data.length===0&&a.jsx("div",{className:"sqv-empty-indicator",children:"Empty"})]}),a.jsx("div",{className:"sqv-back-label",children:"BACK"})]})})}),a.jsx("style",{children:`
        .sqv-mode-tabs {
          display: flex;
          gap: 4px;
          background: var(--color-bg);
          padding: 4px;
          border-radius: var(--radius-md);
        }

        .sqv-mode-tab {
          padding: 6px 16px;
          border: none;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--color-text-muted);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .sqv-mode-tab.active {
          background: var(--color-surface);
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .sqv-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .sqv-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .sqv-btn:hover:not(:disabled) {
          border-color: var(--color-primary);
        }

        .sqv-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .sqv-btn-primary {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .sqv-btn-warn {
          color: #dc2626;
          border-color: #fca5a5;
        }

        .sqv-btn-reset {
          color: var(--color-text-muted);
        }

        .sqv-ops {
          width: 100%;
        }

        .sqv-input-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .sqv-input {
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          width: 100px;
        }

        .sqv-hint {
          margin-top: 8px;
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .sqv-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 16px 0;
        }

        .sqv-structure {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sqv-stack .sqv-items {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sqv-queue .sqv-items {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sqv-queue-row {
          display: flex;
          gap: 4px;
        }

        .sqv-item {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .sqv-item-highlight {
          border-color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 15%, transparent);
        }

        .sqv-item-value {
          font-family: var(--font-mono);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .sqv-top-label, .sqv-bottom-label {
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          padding: 2px 0;
        }

        .sqv-front-label, .sqv-back-label {
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          padding: 2px 0;
        }

        .sqv-empty-indicator {
          padding: 12px 24px;
          color: var(--color-text-muted);
          font-size: 0.875rem;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-sm);
        }
      `})]})}export{M as StackQueueVisualizer,M as default};
