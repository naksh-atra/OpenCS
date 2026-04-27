import { useState, useRef, useEffect } from 'react';
import { VisualizerFrame } from './VisualizerFrame';
import { PRESETS, LAYOUT, CAPTIONS, getActualTreeDepth, getCanvasHeight, buildFactorialTree, buildFibonacciTree, buildBinarySearchTree } from './recursionTree/builders';
import { computeLayout, renderLayout } from './recursionTree/render';
import '../../styles/recursion-tree.css';

function RecursionTreeVisualizer() {
  const [algorithm, setAlgorithm] = useState<'factorial' | 'fibonacci' | 'binary-search'>('fibonacci');
  const [renderDepth, setRenderDepth] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const preset = PRESETS[algorithm];
  const layoutConfig = LAYOUT[algorithm];
  const caption = CAPTIONS[algorithm];
  const { label, complexity, rangeSize } = preset;

  const buildTree = () => {
    if (algorithm === 'factorial') return buildFactorialTree(renderDepth, 0, renderDepth);
    if (algorithm === 'fibonacci') return buildFibonacciTree(renderDepth, 0, renderDepth);
    return buildBinarySearchTree(0, (rangeSize || 16) - 1, 0, renderDepth);
  };

  const tree = buildTree();
  const canvasHeight = getCanvasHeight(getActualTreeDepth(tree), layoutConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 560;
    canvas.style.height = `${canvasHeight}px`;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = canvasHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, canvasHeight);
    if (tree) {
      const spread = algorithm === 'fibonacci' ? w / 2.4 : w / 2.3;
      renderLayout(computeLayout(tree, w / 2, 30, spread, layoutConfig, w), layoutConfig, ctx);
    }
  }, [algorithm, renderDepth, tree, canvasHeight, layoutConfig]);

  const handleAlgorithmChange = (newAlg: keyof typeof PRESETS) => {
    setAlgorithm(newAlg);
    setRenderDepth(Math.min(3, PRESETS[newAlg].maxRenderDepth));
  };

  return (
    <VisualizerFrame
      title="Recursion Tree Visualizer"
      description={`${label} · levels ${renderDepth} · ${complexity}`}
      controls={
        <div className="rtv-controls-wrapper">
          <div className="rtv-tabs">
            {Object.entries(PRESETS).map(([id, p]) => (
              <button key={id} onClick={() => handleAlgorithmChange(id as keyof typeof PRESETS)} className={`rtv-tab ${algorithm === id ? 'active' : ''}`}>
                <span className="rtv-tab-label">{p.label}</span>
                <span className="rtv-tab-complexity">{p.complexity}</span>
              </button>
            ))}
          </div>
          <div className="rtv-slider">
            <label>Levels</label>
            <input type="range" min={1} max={preset.maxRenderDepth} value={renderDepth} onChange={e => setRenderDepth(Number(e.target.value))} />
            <span className="rtv-depth-value">{renderDepth}</span>
          </div>
        </div>
      }
      isEmpty={false}
    >
      <div className="rtv-body">
        <div className="rtv-canvas-wrapper">
          <canvas ref={canvasRef} className="rtv-canvas" width={560} height={canvasHeight} />
        </div>
        <div className="rtv-caption">{caption}</div>
        <div className="rtv-hint">
          <div className="rtv-hint-actions">
            <button className="rtv-hint-btn" onClick={() => setRenderDepth(r => Math.max(1, r - 1))} disabled={renderDepth <= 1}>Fewer</button>
            <button className="rtv-hint-btn" onClick={() => setRenderDepth(r => Math.min(preset.maxRenderDepth, r + 1))} disabled={renderDepth >= preset.maxRenderDepth}>More</button>
          </div>
        </div>
      </div>
    </VisualizerFrame>
  );
}

export default RecursionTreeVisualizer;