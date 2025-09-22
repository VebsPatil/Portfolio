import React, { useEffect, useRef } from "react";

export default function Skills({ skills = {} }) {
  const rootRef = useRef(null);

  // heuristic % by index (first = highest)
  const percentFor = (idx, len) => {
    if (len <= 1) return 92;
    const max = 92;
    const min = 48;
    return Math.round(max - (idx * (max - min) / Math.max(len - 1, 1)));
  };

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const animProgress = (container) => {
      const bars = container.querySelectorAll(".skill-progress");
      bars.forEach(b => {
        const target = b.getAttribute("data-percent") || "60";
        // small timeout to allow CSS transitions
        requestAnimationFrame(() => (b.style.width = target + "%"));
      });
    };

    // Animate when section enters viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            animProgress(en.target);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section className="skills" ref={rootRef}>
      <div className="section-header">
        <h2>Skills & Technologies</h2>
        <p className="section-subtitle">Tools and technologies I use regularly</p>
      </div>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div className="skill-category" key={category}>
            <div className="skill-header">
              <h3>{category}</h3>
              <div className="skill-count">{items.length}</div>
            </div>

            <div className="skill-items">
              {items.map((name, i) => {
                const pct = percentFor(i, items.length);
                return (
                  <div className="skill-item" key={name}>
                    <div className="skill-name">{name}</div>
                    <div className="skill-bar" aria-hidden>
                      <div
                        className="skill-progress"
                        data-percent={pct}
                        style={{ width: "0%" }}
                        aria-valuenow={pct}
                        role="progressbar"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}