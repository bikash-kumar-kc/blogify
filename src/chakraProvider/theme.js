import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

// ----------------------
// 1. THEME CONFIG
// ----------------------
export const theme = defineConfig({
  theme: {
    
  },
});

// ----------------------
// 2. MERGE WITH DEFAULT CONFIG
// ----------------------
const mergedConfig = mergeConfigs(defaultConfig, theme);

// ----------------------
// 3. CREATE SYSTEM
// ----------------------
const system = createSystem(mergedConfig);

export default system;
