import { requireNativeModule } from 'expo';

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
const NativeExpoWidgets = requireNativeModule('ExpoWidgets');

export interface ExpoWidgetsConfig {
  enableLogging?: boolean;
  errorHandler?: (error: Error) => void;
}

// Type helper to extract function signature from factory (excluding nativeModule and config)
type ExtractFnSignature<T> = T extends () => (
  nativeModule: any,
  config: any,
  ...args: infer Args
) => infer Return
  ? (...args: Args) => Return
  : never;

// Type helper to transform extension object to function signatures
type ExtendedFunctions<T> = {
  [K in keyof T]: ExtractFnSignature<T[K]>;
};

class ExpoWidgetsModule {
  public config: ExpoWidgetsConfig = {};

  configure(config: ExpoWidgetsConfig) {
    this.config = { ...this.config, ...config };
  }

  setWidgetData(json: string, packageName?: string) {
    try {
      // Log if enabled
      if (this.config.enableLogging) {
        console.log('Setting widget data:', json);
      }

      // Call native method
      if (packageName) {
        return NativeExpoWidgets.setWidgetData(json, packageName);
      }
      return NativeExpoWidgets.setWidgetData(json);
    } catch (error) {
      // Handle errors if configured
      if (this.config.errorHandler) {
        this.config.errorHandler(error as Error);
      } else {
        throw error;
      }
    }
  }

  // Object-based extend method with full TypeScript inference
  extendWith<
    T extends Record<
      string,
      () => (
        nativeModule: typeof NativeExpoWidgets,
        config: ExpoWidgetsConfig,
        ...args: any[]
      ) => any
    >,
  >(
    extensions: T
  ): Omit<
    ExpoWidgetsModule & ExtendedFunctions<T>,
    'extendWith' | 'configure'
  > {
    // Create a proxy that provides access to both original methods and extended functions
    const config = this.config;
    const extendedModule = new Proxy(this, {
      get(target, prop) {
        if (typeof prop === 'string' && prop in extensions) {
          // Create the function on first access
          const fnFactory = extensions[prop];
          const fn = fnFactory();
          return (...args: any[]) => fn(NativeExpoWidgets, config, ...args);
        }
        return (target as any)[prop];
      },
    });

    return extendedModule as ExpoWidgetsModule & ExtendedFunctions<T>;
  }
}

export default new ExpoWidgetsModule();
