"use client";

import { useEffect, useState } from "react";

type ThemeColor = {
  key: "color-1" | "color-2" | "color-3";
  label: string;
  value: string;
};

const defaults: ThemeColor[] = [
  { key: "color-1", label: "Color 1", value: "#104F8D" },
  { key: "color-2", label: "Color 2", value: "#F4B942" },
  { key: "color-3", label: "Color 3", value: "#19A974" },
];

const isHex = (value: string) => /^#[0-9A-Fa-f]{6}$/.test(value);

export default function ThemePalette() {
  // Keep initial render deterministic to avoid hydration mismatch.
  const [colors, setColors] = useState<ThemeColor[]>(defaults);

  useEffect(() => {
    const fromStorage = localStorage.getItem("eclipse-theme-colors");

    if (!fromStorage) {
      return;
    }

    try {
      const parsed = JSON.parse(fromStorage) as ThemeColor[];
      const restored = defaults.map((item) => {
        const found = parsed.find((p) => p.key === item.key);
        return found && isHex(found.value) ? { ...item, value: found.value.toUpperCase() } : item;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColors(restored);
    } catch {
      // Ignore invalid localStorage payload and keep defaults.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("eclipse-theme-colors", JSON.stringify(colors));
    colors.forEach((item) => {
      document.documentElement.style.setProperty(`--${item.key}`, item.value);
    });
  }, [colors]);

  const persistAndApply = (next: ThemeColor[]) => {
    setColors(next);
  };

  const updateColor = (key: ThemeColor["key"], value: string) => {
    const normalized = value.toUpperCase();
    const next = colors.map((item) => (item.key === key ? { ...item, value: normalized } : item));
    persistAndApply(next);
  };

  const applyCode = (key: ThemeColor["key"]) => {
    const selected = colors.find((item) => item.key === key);

    if (!selected || !isHex(selected.value)) {
      return;
    }

    updateColor(key, selected.value);
  };

  const updateDraftCode = (key: ThemeColor["key"], value: string) => {
    const next = colors.map((item) => (item.key === key ? { ...item, value } : item));
    setColors(next);
  };

  const reset = () => {
    persistAndApply(defaults);
  };

  return (
    <section className="trans-strip palette" aria-label="Theme color palette">
      <h2>Theme Palette Tester</h2>
      <p>
        This website uses only 3 core colors. Pick a color or type a hex code like
        <code> #1A73E8</code> and apply.
      </p>
      {colors.map((color) => (
        <div className="palette-row" key={color.key}>
          <label htmlFor={color.key}>{color.label}</label>
          <input
            id={color.key}
            type="color"
            value={isHex(color.value) ? color.value : "#000000"}
            onChange={(event) => updateColor(color.key, event.target.value)}
          />
          <input
            type="text"
            value={color.value}
            onChange={(event) => updateDraftCode(color.key, event.target.value)}
            placeholder="#RRGGBB"
          />
          <button type="button" onClick={() => applyCode(color.key)}>
            Apply
          </button>
        </div>
      ))}
      <div className="pill-row">
        {colors.map((item) => (
          <span className="pill" key={`${item.key}-preview`}>
            {item.label}: {item.value.toUpperCase()}
          </span>
        ))}
        <button type="button" className="ghost-button" onClick={reset}>
          Reset Colors
        </button>
      </div>
    </section>
  );
}
