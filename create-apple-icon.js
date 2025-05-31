const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 180x180 canvas (standard size for apple-touch-icon)
const canvas = createCanvas(180, 180);
const ctx = canvas.getContext('2d');

// Draw background (matching the existing icons)
ctx.fillStyle = '#00ff88';
ctx.fillRect(0, 0, 180, 180);

// Draw text
ctx.fillStyle = '#0a0b0e';
ctx.font = 'bold 110px monospace';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('K', 90, 100);

// Save to file
const buffer = canvas.toBuffer('image/png');
const outputPath = 'assets/icons/apple-touch-icon.png';

fs.writeFileSync(outputPath, buffer);
console.log(`Icon created at: ${outputPath}`);
