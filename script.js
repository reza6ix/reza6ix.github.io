class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        window.addEventListener('resize', () => this.init());
        
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        for(let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    draw() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, '#0f0');
            gradient.addColorStop(0.5, '#0f0');
            gradient.addColorStop(1, '#003300');

            this.ctx.fillStyle = gradient;
            this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
            
            for(let i = 0; i < this.drops.length; i++) {
                const char = this.characters[Math.floor(Math.random() * this.characters.length)];
                
                const opacity = Math.random() * 0.5 + 0.5;
                this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                
                this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

                if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }
                
                this.drops[i]++;
            }
        } else {
            this.ctx.fillStyle = 'rgba(248, 250, 252, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
            this.ctx.font = `${this.fontSize}px monospace`;

            for(let i = 0; i < this.drops.length; i++) {
                const char = this.characters[Math.floor(Math.random() * this.characters.length)];
                this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

                if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }

                this.drops[i]++;
            }
        }

        requestAnimationFrame(() => this.draw());
    }

    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    const matrix = new MatrixEffect();
    matrix.draw();
}); 