import ExpoWidgets from '@bittingz/expo-widgets';

ExpoWidgets.extend(
  'setWidgetDataWithRetry',
  () =>
    async (
      nativeModule: any,
      json: string,
      packageName?: string,
      retries: number = 3
    ) => {
      for (let i = 0; i < retries; i++) {
        try {
          if (packageName) {
            return nativeModule.setWidgetData(json, packageName);
          }
          return nativeModule.setWidgetData(json);
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
);

ExpoWidgets.extend('clearAllWidgetData', () => (nativeModule: any) => {
  console.log('Clearing all widget data...');
  // Access to native module if needed
  // nativeModule.someMethod();
});

ExpoWidgets.extend('deleteWidgetData', () => (nativeModule: any) => {
  console.log('Deleting widget data...');
  // Use native module directly
  // nativeModule.deleteData();
});

// Example of a more complex function
ExpoWidgets.extend(
  'batchSetWidgetData',
  () =>
    async (
      nativeModule: any,
      dataArray: Array<{ json: string; packageName?: string }>
    ) => {
      console.log(`Setting ${dataArray.length} widget data items...`);
      const results = [];
      for (const { json, packageName } of dataArray) {
        try {
          const result = packageName
            ? nativeModule.setWidgetData(json, packageName)
            : nativeModule.setWidgetData(json);
          results.push({ success: true, result });
        } catch (error) {
          results.push({ success: false, error });
        }
      }
      return results;
    }
);

// example usage in the codebase elsewhere:
// ExpoWidgets.fns.setWidgetDataWithRetry('{"data": "value"}', undefined, 3);
// ExpoWidgets.fns.clearAllWidgetData();
// ExpoWidgets.fns.deleteWidgetData();
// ExpoWidgets.fns.batchSetWidgetData([
//   { json: '{"id": 1}' },
//   { json: '{"id": 2}', packageName: 'com.example.app' },
// ]);
