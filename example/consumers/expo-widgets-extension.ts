import { ExpoWidgetsConfig, extendWith } from '@bittingz/expo-widgets';

export const ExtendedExpoWidgets = extendWith({
  setWidgetDataWithRetry:
    () =>
    async (
      nativeModule: any,
      config: ExpoWidgetsConfig,
      json: string,
      packageName?: string,
      retries: number = 3
    ): Promise<boolean> => {
      for (let i = 0; i < retries; i++) {
        try {
          if (packageName) {
            await nativeModule.setWidgetData(json, packageName);
          } else {
            await nativeModule.setWidgetData(json);
          }
          return true;
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      return false;
    },

  clearAllWidgetData: () => (nativeModule: any) => {
    console.log('Clearing all widget data...');
    // Access to native module if needed
  },
});
