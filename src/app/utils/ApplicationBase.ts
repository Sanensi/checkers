export abstract class ApplicationBase {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;

    constructor(c: HTMLCanvasElement) {
        this.canvas = c;
        this.ctx = c.getContext("2d");
    }

    protected start() {};

    protected update(ts: number) {};

    protected draw() {};

    protected resize(w: number, h: number) {}

    protected clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public init() {
        const animate = (ts) => {
            this.update(ts);
            this.draw();

            requestAnimationFrame(animate);
        }

        const resize = () => {
            const w = this.canvas.clientWidth;
            const h = this.canvas.clientHeight;
        
            this.canvas.width = w;
            this.canvas.height = h;
        
            this.resize(w, h);
            this.draw();
        }

        window.addEventListener('resize', resize);

        this.start(); 
        resize();
        animate(0);
    }
}