// ASCII Art Generator

// ASCII patterns for different styles
const ASCII_PATTERNS = {
  standard: {
    A: "   _   \n  /_\\  \n / _ \\ \n/_/ \\_\\",
    B: " ___ \n| _ )\n| _ \\\n|___/",
    // Add more characters as needed
  },
  shadow: {
    A: "   ██╗  \n  ████╗ \n ██╔██║ \n██║ ██║\n╚═╝ ╚═╝",
    B: "██████╗ \n██╔══██╗\n██████╔╝\n██╔══██╗\n██████╔╝",
    // Add more characters as needed
  },
  block: {
    A: "█████\n█   █\n█████\n█   █\n█   █",
    B: "████ \n█   █\n████ \n█   █\n████ ",
    // Add more characters as needed
  },
  mini: {
    A: " _ \n/_\\\n| |",
    B: "_ \n|_)\n|_)",
    // Add more characters as needed
  }
};

// Banner font system
class BannerFont {
  constructor() {
    this.charHeight = 6;
    this.defaultChar = this.createEmptyChar();
  }

  createEmptyChar() {
    return Array(this.charHeight).fill(' '.repeat(6));
  }

  getChar(char) {
    // Implement banner font character generation
    // This is a simplified version
    const c = char.toUpperCase();
    if (!/[A-Z0-9]/.test(c)) return this.defaultChar;

    const patterns = {
      A: [
        '  ##  ',
        ' #### ',
        '##  ##',
        '######',
        '##  ##',
        '##  ##'
      ],
      // Add more characters as needed
    };

    return patterns[c] || this.defaultChar;
  }
}

class AsciiArtGenerator {
  constructor() {
    this.bannerFont = new BannerFont();
    this.textInput = document.getElementById('text-input');
    this.styleSelect = document.getElementById('style-select');
    this.generateBtn = document.getElementById('generate-btn');
    this.copyBtn = document.getElementById('copy-btn');
    this.output = document.getElementById('ascii-output');

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.generateBtn.addEventListener('click', () => this.generateArt());
    this.copyBtn.addEventListener('click', () => this.copyToClipboard());

    // Generate on Enter key
    this.textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.generateArt();
      }
    });
  }

  generateArt() {
    const text = this.textInput.value.trim().toUpperCase();
    const style = this.styleSelect.value;

    if (!text) {
      this.output.textContent = 'Please enter some text!';
      return;
    }

    let result = '';
    switch (style) {
      case 'standard':
        result = this.generateStandard(text);
        break;
      case 'shadow':
        result = this.generateShadow(text);
        break;
      case 'thinkertoy':
        result = this.generateThinkertoyStyle(text);
        break;
      case 'block':
        result = this.generateBlock(text);
        break;
      case 'banner':
        result = this.generateBanner(text);
        break;
      case 'mini':
        result = this.generateMini(text);
        break;
      default:
        result = this.generateStandard(text);
    }

    this.output.textContent = result;
  }

  generateStandard(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.standard[char] || char;
    }).join(' ');
  }

  generateShadow(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.shadow[char] || char;
    }).join(' ');
  }

  generateBlock(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.block[char] || char;
    }).join(' ');
  }

  generateMini(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.mini[char] || char;
    }).join(' ');
  }

  generateBanner(text) {
    const chars = text.split('').map(c => this.bannerFont.getChar(c));
    let result = '';
    for (let i = 0; i < this.bannerFont.charHeight; i++) {
      result += chars.map(char => char[i]).join(' ') + '\n';
    }
    return result;
  }

  generateThinkertoyStyle(text) {
    // Implement thinkertoy style logic here
    return text.split('').map(char => {
      return `o-${char}-o`;
    }).join(' ');
  }

  async copyToClipboard() {
    const text = this.output.textContent;
    try {
      await navigator.clipboard.writeText(text);
      this.copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        this.copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      this.copyBtn.textContent = 'Copy Failed!';
      setTimeout(() => {
        this.copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    }
  }
}

// Initialize the generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AsciiArtGenerator();
});