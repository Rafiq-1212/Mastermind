// Small abstract SVG illustrations used inside the Features section's visual
// panels, standing in for real product screenshots. Rendered in the accent
// color at low opacity so they read as ambient detail, not decoration.

export function NodesIllustration() {
  return (
    <svg viewBox="0 0 220 140" fill="none" width="100%" height="100%" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.5">
        <line x1="42" y1="38" x2="110" y2="70" />
        <line x1="110" y1="70" x2="178" y2="34" />
        <line x1="110" y1="70" x2="110" y2="108" />
        <line x1="110" y1="108" x2="60" y2="118" />
        <line x1="110" y1="108" x2="164" y2="112" />
      </g>
      <g fill="currentColor">
        <circle cx="42" cy="38" r="7" opacity="0.8" />
        <circle cx="178" cy="34" r="7" opacity="0.5" />
        <circle cx="110" cy="70" r="10" opacity="0.9" />
        <circle cx="110" cy="108" r="7" opacity="0.6" />
        <circle cx="60" cy="118" r="5" opacity="0.4" />
        <circle cx="164" cy="112" r="5" opacity="0.4" />
      </g>
    </svg>
  );
}

export function ChartIllustration() {
  return (
    <svg viewBox="0 0 220 140" fill="none" width="100%" height="100%" aria-hidden="true">
      <polyline
        points="16,110 58,92 96,100 134,58 172,66 204,24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <g fill="currentColor">
        <circle cx="16" cy="110" r="4" opacity="0.4" />
        <circle cx="96" cy="100" r="4" opacity="0.5" />
        <circle cx="134" cy="58" r="4" opacity="0.6" />
        <circle cx="204" cy="24" r="5" opacity="0.9" />
      </g>
      <line x1="16" y1="122" x2="204" y2="122" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

export function TeamIllustration() {
  return (
    <svg viewBox="0 0 220 140" fill="none" width="100%" height="100%" aria-hidden="true">
      <g fill="currentColor">
        <circle cx="80" cy="66" r="26" opacity="0.18" />
        <circle cx="80" cy="66" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <circle cx="130" cy="66" r="26" opacity="0.28" />
        <circle cx="130" cy="66" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <circle cx="105" cy="36" r="20" opacity="0.5" />
      </g>
    </svg>
  );
}

export function RoadmapIllustration() {
  return (
    <svg viewBox="0 0 220 140" fill="none" width="100%" height="100%" aria-hidden="true">
      <line x1="20" y1="70" x2="200" y2="70" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <g fill="currentColor">
        <circle cx="20" cy="70" r="6" opacity="0.9" />
        <circle cx="80" cy="70" r="6" opacity="0.65" />
        <circle cx="140" cy="70" r="6" opacity="0.45" />
        <circle cx="200" cy="70" r="6" opacity="0.3" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.35">
        <line x1="20" y1="70" x2="20" y2="46" />
        <line x1="80" y1="70" x2="80" y2="94" />
        <line x1="140" y1="70" x2="140" y2="46" />
      </g>
    </svg>
  );
}
