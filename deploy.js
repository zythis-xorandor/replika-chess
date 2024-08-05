import fs from 'fs';
import { execSync } from 'child_process';

// Paths
const viteConfigPath = './vite.config.js';
const repoName = 'replika-chess'; // replace with your GitHub repo name

// Backup current vite.config.js
const originalConfig = fs.readFileSync(viteConfigPath, 'utf-8');

// Update vite.config.js with GitHub Pages base
const updatedConfig = originalConfig.replace(
  /base: '.*',/,
  `base: '/${repoName}/',`
);

// Function to update the Vite config
const updateConfig = () => {
  fs.writeFileSync(viteConfigPath, updatedConfig, 'utf-8');
};

// Function to restore the original Vite config
const restoreConfig = () => {
  fs.writeFileSync(viteConfigPath, originalConfig, 'utf-8');
};

// Run the deployment process
(async () => {
  try {
    console.log('Updating Vite config for GitHub Pages...');
    updateConfig();

    console.log('Building the project...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('Deploying to GitHub Pages...');
    // Run your deployment command here. For example, using gh-pages:
    execSync('npm run deploy_gh', { stdio: 'inherit' });

    console.log('Deployment successful!');
  } catch (error) {
    console.error('An error occurred during deployment:', error);
  } finally {
    console.log('Restoring original Vite config...');
    restoreConfig();
  }
})();
