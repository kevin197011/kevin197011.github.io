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
  graffiti: {
    A: "    /\\    \n   /  \\   \n  / /\\ \\  \n / ____ \\ \n/_/    \\_\\",
    B: " ____  \n|  _ \\ \n| |_) |\n|  _ < \n|_| \\_\\",
    // Add more characters as needed
  },
  slant: {
    A: "   _____ \n  /    /\n  \\    \\\n   \\    \\\n    \\___\\",
    B: " _____ \n/    /\n\\    \\\n/    /\n\\____\\",
    // Add more characters as needed
  },
  cyber: {
    A: " ┌─┐ \n├─┤ \n┴ ┴ ",
    B: "┌┐ \n├┴┐\n└─┘",
    // Add more characters as needed
  },
  digital: {
    A: " __ _ \n/ _` |\n\\__,_|",
    B: " ___ \n| _ )\n|_|_\\",
    // Add more characters as needed
  },
  mini: {
    A: " _ \n/_\\\n| |",
    B: "_ \n|_)\n|_)",
    // Add more characters as needed
  }
};

// Update the style selector options in the HTML
const styleSelect = document.getElementById('style-select');
styleSelect.innerHTML = `
  <option value="standard">Standard</option>
  <option value="shadow">Shadow</option>
  <option value="block">Block</option>
  <option value="graffiti">Graffiti</option>
  <option value="slant">Slant</option>
  <option value="cyber">Cyber</option>
  <option value="digital">Digital</option>
  <option value="mini">Mini</option>
`;

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
      case 'block':
        result = this.generateBlock(text);
        break;
      case 'graffiti':
        result = this.generateGraffiti(text);
        break;
      case 'slant':
        result = this.generateSlant(text);
        break;
      case 'cyber':
        result = this.generateCyber(text);
        break;
      case 'digital':
        result = this.generateDigital(text);
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

  generateGraffiti(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.graffiti[char] || char;
    }).join(' ');
  }

  generateSlant(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.slant[char] || char;
    }).join(' ');
  }

  generateCyber(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.cyber[char] || char;
    }).join(' ');
  }

  generateDigital(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.digital[char] || char;
    }).join(' ');
  }

  generateMini(text) {
    return text.split('').map(char => {
      return ASCII_PATTERNS.mini[char] || char;
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