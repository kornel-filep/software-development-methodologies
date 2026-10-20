import { useEffect, useRef, useState } from 'react';
import { exportToSvg } from '@excalidraw/excalidraw';

export interface ViewerLabels {
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  fullscreen: string;
  exitFullscreen: string;
}

interface Props {
  url: string;
  labels: ViewerLabels;
}

type Scene = {
  elements: readonly any[];
  appState?: Record<string, any>;
  files?: Record<string, any>;
};

const darkQuery = '(prefers-color-scheme: dark)';
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

// Renders an .excalidraw file as a responsive SVG that follows the page's light/dark theme,
// with zoom controls and a fullscreen mode.
export default function ExcalidrawViewer({ url, labels }: Props) {
  const canvas = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [dark, setDark] = useState(() => window.matchMedia(darkQuery).matches);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [fullscreen, setFullscreen] = useState(false);
  // Width divided by height, used to fit the whole diagram on screen in fullscreen mode.
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(setScene)
      .catch((error) => console.error(`Failed to load diagram ${url}`, error));
  }, [url]);

  useEffect(() => {
    const media = window.matchMedia(darkQuery);
    const onChange = () => setDark(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!scene || !canvas.current) return;
    let cancelled = false;
    exportToSvg({
      elements: scene.elements,
      appState: { ...scene.appState, exportWithDarkMode: dark, exportBackground: false },
      files: scene.files ?? null,
      exportPadding: 16,
    }).then((svg) => {
      if (cancelled || !canvas.current) return;
      const width = Number(svg.getAttribute('width'));
      const height = Number(svg.getAttribute('height'));
      if (width && height) setAspect(width / height);
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      canvas.current.replaceChildren(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [scene, dark]);

  // Fullscreen is an overlay instead of the Fullscreen API, which iPhones do not support for elements.
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setFullscreen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [fullscreen]);

  const changeZoom = (delta: number) =>
    setZoom((value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value + delta)));

  const toggleFullscreen = () => {
    setFullscreen((value) => !value);
    setZoom(MIN_ZOOM);
  };

  const svgWidth = fullscreen
    ? `min(${zoom * 100}%, calc((100vh - 4rem) * ${aspect * zoom}))`
    : `${zoom * 100}%`;

  return (
    <div className={`diagram-viewer${fullscreen ? ' is-fullscreen' : ''}`}>
      <div className="diagram-toolbar">
        <button type="button" onClick={() => changeZoom(-ZOOM_STEP)} disabled={zoom <= MIN_ZOOM}
          aria-label={labels.zoomOut} title={labels.zoomOut}>−</button>
        <button type="button" onClick={() => setZoom(MIN_ZOOM)} disabled={zoom === MIN_ZOOM}
          aria-label={labels.zoomReset} title={labels.zoomReset}>{Math.round(zoom * 100)}%</button>
        <button type="button" onClick={() => changeZoom(ZOOM_STEP)} disabled={zoom >= MAX_ZOOM}
          aria-label={labels.zoomIn} title={labels.zoomIn}>+</button>
        <button type="button" onClick={toggleFullscreen}
          aria-label={fullscreen ? labels.exitFullscreen : labels.fullscreen}
          title={fullscreen ? labels.exitFullscreen : labels.fullscreen}>{fullscreen ? '✕' : '⛶'}</button>
      </div>
      <div className="diagram-scroll">
        <div ref={canvas} className="diagram-svg" style={{ width: svgWidth }} />
      </div>
    </div>
  );
}
