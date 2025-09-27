declare global {
    interface Window {
        TradingView: {
            Widget: new (options: {
                container: HTMLElement;
                [key: string]: any;
            }) => void;
        };
    }
}

export {};