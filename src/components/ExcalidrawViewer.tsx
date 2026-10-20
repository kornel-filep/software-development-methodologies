import { useEffect, useRef, useState } from 'react';
import { exportToSvg } from '@excalidraw/excalidraw';

interface Props {
  url: string;
}

type Scene = {
  elements: readonly any[];
  appState?: Record<string, any>;
  files?: Record<string, any>;
};

const darkQuery = '(prefers-color-scheme: dark)';

// Renders an .excalidraw file as a responsive SVG that follows the page's light/dark theme.
export default function ExcalidrawViewer({ url }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [dark, setDark] = useState(() => window.matchMedia(darkQuery).matches);

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
    if (!scene || !container.current) return;
    let cancelled = false;
    exportToSvg({
      elements: scene.elements,
      appState: { ...scene.appState, exportWithDarkMode: dark, exportBackground: false },
      files: scene.files ?? null,
      exportPadding: 16,
    }).then((svg) => {
      if (cancelled || !container.current) return;
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.style.width = '100%';
      svg.style.height = 'auto';
      container.current.replaceChildren(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [scene, dark]);

  return <div ref={container} />;
}
