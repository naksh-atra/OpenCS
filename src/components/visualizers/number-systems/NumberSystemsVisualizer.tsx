import React, { useState, useCallback } from 'react';
import { VisualizerFrame } from '../VisualizerFrame';
import type { NumberPreset, NumberBase } from './types';
import { NUMBER_PRESETS, AVAILABLE_BASES } from './presets';
import {
  convertNumber,
  ieee754Encode,
  isValidForBase,
  type ConversionState,
} from '../../../engines/theory/number-systems-ops';
import './number-systems-visualizer.css';

export function NumberSystemsVisualizer() {
  const [inputValue, setInputValue] = useState('');
  const [inputBase, setInputBase] = useState<NumberBase>(10);
  const [outputBase, setOutputBase] = useState<NumberBase>(2);
  const [conversion, setConversion] = useState<ConversionState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showIEEE754, setShowIEEE754] = useState(false);
  const [ieeeState, setIeeeState] = useState<ReturnType<typeof ieee754Encode> | null>(null);

  const handleConvert = useCallback(() => {
    setError(null);
    setShowIEEE754(false);
    setIeeeState(null);

    if (!inputValue.trim()) {
      setError('Enter a value to convert');
      return;
    }

    if (!isValidForBase(inputValue, inputBase)) {
      setError(`Invalid input for base ${inputBase}`);
      return;
    }

    const { result, steps } = convertNumber(inputValue, inputBase, outputBase);
    setConversion({
      inputValue,
      inputBase,
      outputBase,
      outputValue: result,
      steps,
      currentStep: steps.length - 1,
      message: result.startsWith('Invalid') ? result : `${inputValue} (base ${inputBase}) = ${result} (base ${outputBase})`,
    });
  }, [inputValue, inputBase, outputBase]);

  const handlePreset = useCallback((preset: NumberPreset) => {
    if (preset.label.includes('IEEE754')) {
      const val = parseFloat(preset.value);
      if (!isNaN(val)) {
        setIeeeState(ieee754Encode(val));
        setShowIEEE754(true);
        setConversion(null);
        setInputValue(preset.value);
        setInputBase(10);
      }
      return;
    }
    setInputValue(preset.value);
    setInputBase(preset.fromBase as NumberBase);
    setOutputBase(preset.toBase as NumberBase);
    setShowIEEE754(false);
    setIeeeState(null);

    const { result, steps } = convertNumber(preset.value, preset.fromBase, preset.toBase);
    setConversion({
      inputValue: preset.value,
      inputBase: preset.fromBase,
      outputBase: preset.toBase,
      outputValue: result,
      steps,
      currentStep: steps.length - 1,
      message: `${preset.value} (base ${preset.fromBase}) = ${result} (base ${preset.toBase})`,
    });
    setError(null);
  }, []);

  const handleSwapBases = useCallback(() => {
    const newInputBase = outputBase;
    const newOutputBase = inputBase;
    setInputBase(newInputBase);
    setOutputBase(newOutputBase);

    // Auto-convert with swapped bases if there's an input value
    if (inputValue.trim()) {
      if (!isValidForBase(inputValue, newInputBase)) {
        setError(`Invalid input for base ${newInputBase}`);
        setConversion(null);
        return;
      }
      const { result, steps } = convertNumber(inputValue, newInputBase, newOutputBase);
      setConversion({
        inputValue,
        inputBase: newInputBase,
        outputBase: newOutputBase,
        outputValue: result,
        steps,
        currentStep: steps.length - 1,
        message: result.startsWith('Invalid') ? result : `${inputValue} (base ${newInputBase}) = ${result} (base ${newOutputBase})`,
      });
      setShowIEEE754(false);
      setIeeeState(null);
      setError(null);
    }
  }, [inputBase, outputBase]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConvert();
  }, [handleConvert]);

  // Render IEEE 754 bit layout
  const renderBitLayout = () => {
    if (!ieeeState) return null;
    const bits = ieeeState.binary32;
    return (
      <div className="ns-bit-layout">
        <div className="ns-bit-group bits-sign">
          <div className="ns-bit-cells">
            {[...bits.slice(0, 1)].map((b, i) => (
              <span key={i} className="ns-bit">{b}</span>
            ))}
          </div>
          <span className="ns-bit-label">Sign</span>
          <span className="ns-bit-range">Bit 31</span>
        </div>
        <div className="ns-bit-group bits-exponent">
          <div className="ns-bit-cells">
            {[...bits.slice(1, 9)].map((b, i) => (
              <span key={i} className="ns-bit">{b}</span>
            ))}
          </div>
          <span className="ns-bit-label">Exponent</span>
          <span className="ns-bit-range">Bits 30-23</span>
        </div>
        <div className="ns-bit-group bits-fraction">
          <div className="ns-bit-cells">
            {[...bits.slice(9)].map((b, i) => (
              <span key={i} className="ns-bit">{b}</span>
            ))}
          </div>
          <span className="ns-bit-label">Fraction</span>
          <span className="ns-bit-range">Bits 22-0</span>
        </div>
      </div>
    );
  };

  const isEmpty = !conversion && !showIEEE754;

  return (
    <VisualizerFrame
      title="Number Systems & Conversions"
      description="Convert between binary, octal, decimal, and hexadecimal. View IEEE 754 floating-point representation."
      controls={
        <>
          <div className="ns-presets" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {NUMBER_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p)}
                className="ns-toggle-btn"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      isEmpty={isEmpty}
      emptyMessage="Select a preset or enter a value and click Convert"
    >
      <div className="ns-container" data-testid="ns-container">
        <div className="ns-input-row" data-testid="ns-input-row">
          <div className="ns-field">
            <label htmlFor="ns-input">Input Value</label>
            <input
              id="ns-input"
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 255, 11111111, FF"
              className="ns-value-input"
              data-testid="ns-value-input"
            />
          </div>
          <div className="ns-field">
            <label htmlFor="ns-from-base">From Base</label>
            <select
              id="ns-from-base"
              value={inputBase}
              onChange={e => setInputBase(Number(e.target.value) as NumberBase)}
              className="ns-base-select"
              data-testid="ns-from-base-select"
            >
              {AVAILABLE_BASES.map(b => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
          <button onClick={handleSwapBases} className="ns-swap-btn" title="Swap bases">⇄</button>
          <div className="ns-field">
            <label htmlFor="ns-to-base">To Base</label>
            <select
              id="ns-to-base"
              value={outputBase}
              onChange={e => setOutputBase(Number(e.target.value) as NumberBase)}
              className="ns-base-select"
              data-testid="ns-to-base-select"
            >
              {AVAILABLE_BASES.map(b => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleConvert}
            className="ns-toggle-btn active"
            style={{ alignSelf: 'flex-end' }}
          >
            Convert
          </button>
          {conversion && !conversion.outputValue.startsWith('Invalid') && inputBase === 10 && (
            <button
              onClick={() => {
                setShowIEEE754(true);
                const val = parseFloat(inputValue);
                if (!isNaN(val)) setIeeeState(ieee754Encode(val));
              }}
              className="ns-toggle-btn"
              style={{ alignSelf: 'flex-end' }}
            >
              IEEE 754
            </button>
          )}
        </div>

        {error && <div className="ns-error">{error}</div>}

        {/* Conversion Result */}
        {conversion && !error && (
          <div className="ns-conversion-area" data-testid="ns-conversion-area">
            <div className="ns-result-box">
              <span className="ns-result-value">{conversion.message}</span>
            </div>
            {conversion.steps.length > 0 && (
              <div className="ns-steps">
                {conversion.steps.map((step, i) => (
                  <div key={i} className="ns-step">
                    <span className="ns-step-description">{step.description}</span>
                    {step.intermediate && (
                      <span className="ns-step-intermediate">{step.intermediate}</span>
                    )}
                    <span className="ns-step-highlight">{step.highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* IEEE 754 Display */}
        {showIEEE754 && ieeeState && (
            <div className="ns-ieee754-area" data-testid="ns-ieee754-area">
            <h4 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text)' }}>
              IEEE 754 Single Precision — {ieeeState.value}
            </h4>
            {renderBitLayout()}
            <div className="ns-ieee-steps">
              {ieeeState.steps.map((step, i) => (
                <div key={i} className="ns-ieee-step">{step}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </VisualizerFrame>
  );
}

export default NumberSystemsVisualizer;
