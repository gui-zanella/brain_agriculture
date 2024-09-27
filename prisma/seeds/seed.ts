import { readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const seedsDir = join(__dirname);
const seedFiles = readdirSync(seedsDir).filter(file => file.endsWith('_seeds.ts'));

seedFiles.forEach(file => {
    const filePath = join(seedsDir, file);
    console.log(`Running seed file: ${filePath}`);
    execSync(`ts-node ${filePath}`, { stdio: 'inherit' });
});