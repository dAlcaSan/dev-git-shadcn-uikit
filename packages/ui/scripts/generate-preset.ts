import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../dist/tailwind-preset.js');

// Ensure dist directory exists
mkdirSync(dirname(outputPath), { recursive: true });

const esmWrapper = `import preset from '../tailwind.preset.cjs';
export default preset;
`;

writeFileSync(outputPath, esmWrapper);

console.log('✓ Generated ESM wrapper for tailwind preset');
