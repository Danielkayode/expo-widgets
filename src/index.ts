import ExpoWidgetsModule, { ExpoWidgetsConfig } from './ExpoWidgetsModule';

export function setWidgetData(json: string, packageName?: string) {
  return ExpoWidgetsModule.setWidgetData(json, packageName);
}

// Object-based extend with full TypeScript inference
export function extendWith<
  T extends Record<
    string,
    () => (nativeModule: any, config: ExpoWidgetsConfig, ...args: any[]) => any
  >,
>(extensions: T) {
  return ExpoWidgetsModule.extendWith(extensions);
}

export { default, ExpoWidgetsConfig } from './ExpoWidgetsModule';
