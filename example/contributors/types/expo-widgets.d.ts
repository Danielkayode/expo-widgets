import '@bittingz/expo-widgets';

declare module '@bittingz/expo-widgets' {
  interface ExpoWidgetsModule {
    fns: {
      setWidgetDataWithRetry: (
        json: string,
        packageName?: string,
        retries?: number
      ) => Promise<any>;
      clearAllWidgetData: () => void;
      deleteWidgetData: () => void;
      batchSetWidgetData: (
        dataArray: Array<{ json: string; packageName?: string }>
      ) => Promise<Array<{ success: boolean; result?: any; error?: any }>>;
    } & Record<string, Function>;
  }
}
