import{j as r,V as w}from"./VisualizerFrame.D7rTKhW5.js";import{r as c}from"./index.CdJzaNS0.js";function m(a=[3,7,1,8,2,5,9,4]){return{data:[...a],operations:[],currentIndex:null,highlightIndices:[],message:"Initial array state"}}function $(a,e,t){if(e<0||e>a.data.length)return{...a,message:"Index out of bounds"};const o=[...a.data];return o.splice(e,0,t),{...a,data:o,operations:[...a.operations,{type:"insert",index:e,value:t,result:e,timestamp:Date.now()}],highlightIndices:[e],currentIndex:e,message:`Inserted ${t} at index ${e}`}}function N(a,e){if(e<0||e>=a.data.length)return{...a,message:"Index out of bounds"};const t=a.data[e],o=[...a.data];return o.splice(e,1),{...a,data:o,operations:[...a.operations,{type:"delete",index:e,result:t,timestamp:Date.now()}],highlightIndices:[],currentIndex:null,message:`Deleted ${t} from index ${e}`}}function k(a,e){const t=a.data.indexOf(e),o=t!==-1;return{...a,operations:[...a.operations,{type:"search",value:e,result:o?t:-1,timestamp:Date.now()}],highlightIndices:o?[t]:[],currentIndex:o?t:null,message:o?`Found ${e} at index ${t}`:`${e} not found in array`}}function S(a,e){if(e<0||e>=a.data.length)return{...a,message:"Index out of bounds"};const t=a.data[e];return{...a,operations:[...a.operations,{type:"access",index:e,result:t,timestamp:Date.now()}],highlightIndices:[e],currentIndex:e,message:`Accessed index ${e}: value is ${t}`}}function C(a,e,t){if(e<0||e>=a.data.length)return{...a,message:"Index out of bounds"};const o=a.data[e],p=[...a.data];return p[e]=t,{...a,data:p,operations:[...a.operations,{type:"update",index:e,value:t,result:o,timestamp:Date.now()}],highlightIndices:[e],currentIndex:e,message:`Updated index ${e}: ${o} → ${t}`}}function A(a=8,e=99){return Array.from({length:a},()=>Math.floor(Math.random()*e)+1)}const V=[{label:"Small",data:[3,7,1,8,2]},{label:"Even",data:[2,4,6,8,10]},{label:"Sorted",data:[1,3,5,7,9]}];function E(){const[a,e]=c.useState(m()),[t,o]=c.useState(""),[p,u]=c.useState(""),[h,x]=c.useState("access"),g=c.useCallback(n=>{e(m(n)),o(""),u("")},[]),b=c.useCallback(()=>{e(m(A(8,50))),o(""),u("")},[]),f=c.useCallback(()=>{e(m()),o(""),u("")},[]),y=c.useCallback((n,i,v)=>{const d=i?parseInt(i,10):void 0,l=v?parseInt(v,10):void 0;e(s=>{switch(n){case"insert":return l!==void 0&&d!==void 0?$(s,l,d):s;case"delete":return l!==void 0?N(s,l):s;case"search":return d!==void 0?k(s,d):s;case"access":return l!==void 0?S(s,l):s;case"update":return l!==void 0&&d!==void 0?C(s,l,d):s;default:return s}})},[]),I=["insert","search","update"],j=["insert","delete","access","update"];return r.jsxs(w,{title:"Array Operations Visualizer",description:`Array: [${a.data.join(", ")}] — ${a.message}`,controls:r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"av-presets",children:[V.map(n=>r.jsx("button",{onClick:()=>g(n.data),className:"av-btn",children:n.label},n.label)),r.jsx("button",{onClick:b,className:"av-btn",children:"Random"}),r.jsx("button",{onClick:f,className:"av-btn av-btn-reset",children:"Reset"})]}),r.jsx("div",{className:"av-ops",children:r.jsxs("div",{className:"av-op-row",children:[r.jsxs("select",{value:h,onChange:n=>x(n.target.value),className:"av-select",children:[r.jsx("option",{value:"access",children:"Access"}),r.jsx("option",{value:"insert",children:"Insert"}),r.jsx("option",{value:"delete",children:"Delete"}),r.jsx("option",{value:"search",children:"Search"}),r.jsx("option",{value:"update",children:"Update"})]}),j.includes(h)&&r.jsx("input",{type:"number",placeholder:"Index",value:p,onChange:n=>u(n.target.value),className:"av-input"}),I.includes(h)&&r.jsx("input",{type:"number",placeholder:"Value",value:t,onChange:n=>o(n.target.value),className:"av-input"}),r.jsx("button",{onClick:()=>y(h,t,p),className:"av-btn av-btn-primary",children:"Execute"})]})})]}),isEmpty:!1,children:[r.jsx("div",{className:"av-chart",children:a.data.map((n,i)=>r.jsxs("div",{className:"av-cell-wrapper",children:[r.jsx("div",{className:`av-cell ${a.highlightIndices.includes(i)?"av-cell-highlight":""} ${a.currentIndex===i?"av-cell-current":""}`,children:r.jsx("span",{className:"av-cell-value",children:n})}),r.jsx("span",{className:"av-cell-index",children:i})]},i))}),r.jsx("style",{children:`
        .av-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .av-ops {
          width: 100%;
        }

        .av-op-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .av-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .av-btn:hover {
          border-color: var(--color-primary);
        }

        .av-btn-primary {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .av-btn-reset {
          color: var(--color-text-muted);
        }

        .av-select {
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
        }

        .av-input {
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          width: 80px;
        }

        .av-chart {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 16px 0;
          width: 100%;
        }

        .av-cell-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .av-cell {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .av-cell-highlight {
          border-color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 15%, transparent);
        }

        .av-cell-current {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 30%, transparent);
        }

        .av-cell-value {
          font-family: var(--font-mono);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .av-cell-index {
          font-size: 0.6875rem;
          color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
      `})]})}export{E as ArrayVisualizer,E as default};
