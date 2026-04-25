import{j as a,V as T}from"./VisualizerFrame.D7rTKhW5.js";import{r as b}from"./index.CdJzaNS0.js";function y(i,t,l){if(t>l)return null;const o={value:t,children:[]};return S(i,t).times.forEach(()=>{const c=y(i,t+1,l);c&&o.children.push(c)}),o}function S(i,t){switch(i){case"factorial":return{times:1,label:`T(${t}) → T(${t}-1)`};case"fibonacci":return{times:2,label:`T(${t}) → 2 calls`};case"binary-search":return{times:1,label:`T(${t}) → T(${t/2})`};default:return{times:1,label:`T(${t})`}}}function x(i,t,l,o,e,c){if(!i)return 0;const n=t,s=l,d=l+70;return i.children.forEach((f,u)=>{const r=t-o+o*2/i.children.length*(u+.5);e.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-border").trim()||"#e5e7eb",e.lineWidth=1.5,e.beginPath(),e.moveTo(n,s+12),e.lineTo(r,d-12),e.stroke(),x(f,r,d,o/1.5,e)}),e.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-surface").trim()||"#ffffff",e.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim()||"#2563eb",e.lineWidth=2,e.beginPath(),e.arc(n,s,16,0,Math.PI*2),e.fill(),e.stroke(),e.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-text").trim()||"#1f2937",e.font="bold 12px system-ui, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(String(i.value),n,s),n}function C(){const[i,t]=b.useState("fibonacci"),[l,o]=b.useState(4),[e,c]=b.useState(0),n=[{id:"factorial",label:"Factorial",maxDepth:6,description:"Single recursive call"},{id:"fibonacci",label:"Fibonacci",maxDepth:6,description:"Two recursive calls (exponential)"},{id:"binary-search",label:"Binary Search",maxDepth:5,description:"One call on half the input"}],s=n.find(r=>r.id===i),d=s.maxDepth,f=r=>{if(!r)return;const m=r.getContext("2d");if(!m)return;const p=window.devicePixelRatio||1,h=r.offsetWidth,v=r.offsetHeight;r.width=h*p,r.height=v*p,m.scale(p,p),m.clearRect(0,0,h,v);const g=y(i,0,Math.min(l,d));if(g){const w=Math.min(h/3,120*Math.pow(1.8,l));x(g,h/2,30,w,m)}},u=()=>{c(r=>r+1)};return a.jsxs(T,{title:"Recursion Tree Visualizer",description:`Visualize ${s.label} call patterns. See how recursion branches at each level.`,controls:a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"rtv-presets",children:n.map(r=>a.jsx("button",{onClick:()=>{t(r.id),setTimeout(u,0)},className:`rtv-preset-btn ${i===r.id?"active":""}`,children:r.label},r.id))}),a.jsxs("div",{className:"rtv-slider",children:[a.jsxs("label",{children:["Depth: ",l]}),a.jsx("input",{type:"range",min:1,max:d,value:l,onChange:r=>{o(Number(r.target.value)),setTimeout(u,0)}})]})]}),isEmpty:!1,children:[a.jsx("div",{className:"rtv-canvas-wrapper",children:a.jsx("canvas",{ref:f,className:"rtv-canvas",width:560,height:280},e)}),a.jsx("style",{children:`
        .rtv-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .rtv-preset-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .rtv-preset-btn:hover {
          border-color: var(--color-primary);
        }

        .rtv-preset-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .rtv-slider {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        .rtv-slider input[type="range"] {
          width: 120px;
          accent-color: var(--color-primary);
        }

        .rtv-canvas-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .rtv-canvas {
          width: 100%;
          max-width: 560px;
          height: 280px;
          border-radius: var(--radius-md);
          background: var(--color-bg);
        }
      `})]})}export{C as RecursionTreeVisualizer,C as default};
