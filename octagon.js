const canvas = document.querySelector(`canvas`);
    const webgl = canvas.getContext(`webgl`);
    if(!webgl){throw new error ("webg is not available/not supported");}
    webgl.clearColor(0,1.0,0,1); //r=0 g=0 b=0 a=0 these are values of red gree blue alpha (transparency)
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    var r = 0.25; //radius
    const vertices = new Float32Array([
        
        0.0,0.0,
        r,0.0,
        r*Math.cos(Math.PI/4),r*Math.sin(Math.PI/4),
        r*Math.cos(2*Math.PI/4),r*Math.sin(2*Math.PI/4),
        r*Math.cos(3*Math.PI/4),r*Math.sin(3*Math.PI/4),
        r*Math.cos(4*Math.PI/4),r*Math.sin(4*Math.PI/4),
        r*Math.cos(5*Math.PI/4),r*Math.sin(5*Math.PI/4),
        r*Math.cos(6*Math.PI/4),r*Math.sin(6*Math.PI/4),
        r*Math.cos(7*Math.PI/4),r*Math.sin(7*Math.PI/4),
        r*Math.cos(8*Math.PI/4),r*Math.sin(8*Math.PI/4),
    ]); //This traingle is top bottom left bottom right.

    const buffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

    const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
    webgl.shaderSource(vertexShader,
        `attribute vec2 pos;
        void main() { gl_Position = vec4(pos, 0, 1); }` );
        webgl.compileShader(vertexShader);

    const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
        webgl.shaderSource(fragmentShader,
            `void main() {gl_FragColor = vec4(1.0,0,0,1.0);}`);
            webgl.compileShader(fragmentShader);

    const program = webgl.createProgram();
    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader);
    webgl.linkProgram(program);
    
    const positionLocation = webgl.getAttribLocation(program, `pos`);
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
    webgl.useProgram(program);
    webgl.drawArrays(webgl.TRIANGLE_FAN, 0, vertices.length/2);
