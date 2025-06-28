---
layout: post
title: ASCII Art Generator
permalink: /tools/ascii-art/
description: Generate stylish ASCII art text with different fonts and styles
---

<div class="ascii-art-container">
  <h1 class="cyber-header">ASCII Art Generator</h1>

  <div class="input-section">
    <div class="input-group">
      <label for="text-input" class="cyber-label">Enter Text:</label>
      <input type="text" id="text-input" class="cyber-input" placeholder="Type your text here...">
    </div>

    <div class="input-group">
      <label for="style-select" class="cyber-label">Select Style:</label>
      <select id="style-select" class="cyber-select">
        <option value="standard">Standard</option>
        <option value="shadow">Shadow</option>
        <option value="thinkertoy">Thinkertoy</option>
        <option value="block">Block</option>
        <option value="banner">Banner</option>
        <option value="mini">Mini</option>
      </select>
    </div>

    <button id="generate-btn" class="cyber-button">Generate</button>
  </div>

  <div class="output-section">
    <div class="output-header">
      <h3 class="cyber-subheader">Output:</h3>
      <button id="copy-btn" class="cyber-button-small">Copy</button>
    </div>
    <pre id="output" class="cyber-output"></pre>
  </div>
</div>

<style>
.ascii-art-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.cyber-header {
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  margin-bottom: 2rem;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cyber-label {
  color: #0ff;
  font-size: 0.9rem;
}

.cyber-input, .cyber-select {
  background: #1a1a1a;
  border: 1px solid #0ff;
  color: #fff;
  padding: 0.5rem;
  font-family: monospace;
  border-radius: 4px;
}

.cyber-input:focus, .cyber-select:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.cyber-button {
  background: #1a1a1a;
  border: 1px solid #0ff;
  color: #0ff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-button:hover {
  background: #0ff;
  color: #1a1a1a;
}

.cyber-button-small {
  background: transparent;
  border: 1px solid #0ff;
  color: #0ff;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-button-small:hover {
  background: #0ff;
  color: #1a1a1a;
}

.output-section {
  background: #1a1a1a;
  border: 1px solid #0ff;
  border-radius: 4px;
  padding: 1rem;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cyber-subheader {
  color: #0ff;
  margin: 0;
}

.cyber-output {
  background: #000;
  color: #0ff;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
  min-height: 200px;
}
</style>

<script src="/assets/js/ascii-art.js"></script>