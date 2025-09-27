'use client';
import { useEffect, useRef } from 'react';

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Skip if already loaded
        if (container.dataset.loaded) return;

        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                new window.TradingView.Widget({
                    container,
                    ...config,
                    height,
                    width: '100%',
                });
                container.dataset.loaded = 'true';
            } else {
                console.error('TradingView library not loaded');
            }
        };

        document.body.appendChild(script);

        // Cleanup
        return () => {
            if (container) {
                container.innerHTML = ''; // Clear widget content
                delete container.dataset.loaded;
            }
            const scripts = document.getElementsByTagName('script');
            for (let i = scripts.length - 1; i >= 0; i--) {
                if (scripts[i].src === scriptUrl) {
                    document.body.removeChild(scripts[i]);
                    break;
                }
            }
        };
    }, [scriptUrl, config, height]);

    return containerRef;
};

export default useTradingViewWidget;