import{j as o,V as s}from"./VisualizerFrame.D7rTKhW5.js";import{r as p}from"./index.CdJzaNS0.js";const l=[{id:"o1",label:"O(1)",notation:"O(1)",height:15,tier:"optimal",description:"Constant time — always takes the same regardless of input size",example:"Array index access, hash table lookup"},{id:"ologn",label:"O(log n)",notation:"O(log n)",height:30,tier:"good",description:"Logarithmic time — doubling input adds one step",example:"Binary search, balanced tree traversal"},{id:"on",label:"O(n)",notation:"O(n)",height:50,tier:"fair",description:"Linear time — grows proportionally with input",example:"Linear search, single loop, linked list traversal"},{id:"onlogn",label:"O(n log n)",notation:"O(n log n)",height:65,tier:"moderate",description:"Linearithmic time — common for efficient sorting",example:"Merge sort, heap sort, quicksort average"},{id:"on2",label:"O(n²)",notation:"O(n²)",height:80,tier:"costly",description:"Quadratic time — nested loops over same input",example:"Bubble sort, insertion sort, naive duplicate check"},{id:"o2n",label:"O(2ⁿ)",notation:"O(2ⁿ)",height:100,tier:"expensive",description:"Exponential time — each input doubles work",example:"Naive Fibonacci, power set generation"}];function x(){const[i,a]=p.useState(["o1","on","on2"]),c=e=>{a(t=>t.includes(e)?t.filter(n=>n!==e):[...t,e])},r=l.filter(e=>i.includes(e.id));return o.jsxs(s,{title:"Complexity Growth Comparison",description:"Select complexity classes to compare how they scale as input size increases.",controls:o.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:l.map(e=>o.jsx("button",{onClick:()=>c(e.id),className:`complexity-btn ${i.includes(e.id)?"active":""} tier-${e.tier}`,children:e.label},e.id))}),isEmpty:r.length===0,emptyMessage:"Select at least one complexity class to visualize",children:[o.jsx("div",{className:"complexity-chart",children:r.map(e=>o.jsxs("div",{className:"complexity-bar-wrapper",children:[o.jsx("div",{className:`complexity-bar tier-${e.tier}`,style:{height:`${e.height}%`}}),o.jsx("span",{className:"complexity-label",children:e.label})]},e.id))}),o.jsx("style",{children:`
        .complexity-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.8125rem;
          font-family: var(--font-mono);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .complexity-btn:hover {
          border-color: var(--color-primary);
        }

        .complexity-btn.active.tier-optimal { background: var(--color-complexity-optimal); border-color: var(--color-complexity-optimal); color: white; }
        .complexity-btn.active.tier-good { background: var(--color-complexity-good); border-color: var(--color-complexity-good); color: white; }
        .complexity-btn.active.tier-fair { background: var(--color-complexity-fair); border-color: var(--color-complexity-fair); color: white; }
        .complexity-btn.active.tier-moderate { background: var(--color-complexity-moderate); border-color: var(--color-complexity-moderate); color: white; }
        .complexity-btn.active.tier-costly { background: var(--color-complexity-costly); border-color: var(--color-complexity-costly); color: white; }
        .complexity-btn.active.tier-expensive { background: var(--color-complexity-expensive); border-color: var(--color-complexity-expensive); color: white; }

        .complexity-chart {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 16px;
          height: 180px;
          width: 100%;
          padding: 16px 0;
        }

        .complexity-bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .complexity-bar {
          width: 48px;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }

        .complexity-bar.tier-optimal { background: var(--color-complexity-optimal); }
        .complexity-bar.tier-good { background: var(--color-complexity-good); }
        .complexity-bar.tier-fair { background: var(--color-complexity-fair); }
        .complexity-bar.tier-moderate { background: var(--color-complexity-moderate); }
        .complexity-bar.tier-costly { background: var(--color-complexity-costly); }
        .complexity-bar.tier-expensive { background: var(--color-complexity-expensive); }

.complexity-label {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--color-text-muted);
        }
      `})]})}export{x as TimeComplexityVisualizer,x as default};
