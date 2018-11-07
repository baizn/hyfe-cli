// window.onload = loadScene

const numLines = 10000
let canvas, // canvas 元素
  gl, // webGL 上下文
  ratio, // 宽高比
  vertices, // 顶点数组
  velocities, // 速度
  freqArr, // frequency 频率
  cw, // 可视区域的宽度
  ch, // 可视区域的高度
  thetaArr,
  velThetaArr,
  velRadArr,
  boldRateArr,
  drawType = 1 // 动画类型
const randomTargetXArr = []
const randomTargetYArr = []

// 顶点着色器
const VSHADER_SOURCE =
  `attribute vec3 vertexPosition;
   uniform mat4 modelViewMatrix;
   uniform mat4 perspectiveMatrix;

   void main(void) {
     gl_Position = perspectiveMatrix * modelViewMatrix * vec4(  vertexPosition, 1.0);
   }`

// 片元着色器
const FSHADER_SOURCE =
  `#ifdef GL_ES
     precision highp float;
  #endif
     void main(void) {
     gl_FragColor = vec4(0.2, 0.3, 0.4, 1.0);
  }`

/**
 * Initialises WebGL and creates the 3D scene.
 */
export default function loadScene() {
  //    Get the canvas element
  canvas = document.getElementById('hyshow-webgl-bg')
  //    Get the WebGL context
  gl = canvas.getContext('experimental-webgl')
  //    Check whether the WebGL context is available or not
  //    if it's not available exit
  if(!gl) {
    console.error('There\'s no WebGL context available.')
    return
  }
  //    Set the viewport to the canvas width and height
  cw = window.innerWidth
  ch = window.innerHeight
  canvas.width = cw
  canvas.height = ch
  gl.viewport(0, 0, canvas.width, canvas.height)

  //    Load the vertex shader that's defined in a separate script
  //    block at the top of this page.
  //    More info about shaders: http://en.wikipedia.org/wiki/Shader_Model
  //    More info about GLSL: http://en.wikipedia.org/wiki/GLSL
  //    More info about vertex shaders: http://en.wikipedia.org/wiki/Vertex_shader

  //    Grab the script element
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, VSHADER_SOURCE)
  gl.compileShader(vertexShader)
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Couldn\'t compile the vertex shader')
    gl.deleteShader(vertexShader)
    return
  }

  //    Load the fragment shader that's defined in a separate script
  //    More info about fragment shaders: http://en.wikipedia.org/wiki/Fragment_shader
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, FSHADER_SOURCE)
  gl.compileShader(fragmentShader)
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Couldn\'t compile the fragment shader')
    gl.deleteShader(fragmentShader)
    return
  }

  //    Create a shader program.
  gl.program = gl.createProgram()
  gl.attachShader(gl.program, vertexShader)
  gl.attachShader(gl.program, fragmentShader)
  gl.linkProgram(gl.program)
  if(!gl.getProgramParameter(gl.program, gl.LINK_STATUS)) {
    console.error('Unable to initialise shaders')
    gl.deleteProgram(gl.program)
    gl.deleteProgram(vertexShader)
    gl.deleteProgram(fragmentShader)
    return
  }
  //    Install the program as part of the current rendering state
  gl.useProgram(gl.program)
  //    Get the vertexPosition attribute from the linked shader program
  const vertexPosition = gl.getAttribLocation(gl.program, 'vertexPosition')
  //    Enable the vertexPosition vertex attribute array. If enabled, the array
  //    will be accessed an used for rendering when calls are made to commands like
  //    gl.drawArrays, gl.drawElements, etc.
  gl.enableVertexAttribArray(vertexPosition)

  //    Clear the color buffer (r, g, b, a) with the specified color
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  //    Clear the depth buffer. The value specified is clamped to the range [0,1].
  //    More info about depth buffers: http://en.wikipedia.org/wiki/Depth_buffer
  gl.clearDepth(1.0)
  //    Enable depth testing. This is a technique used for hidden surface removal.
  //    It assigns a value (z) to each pixel that represents the distance from this
  //    pixel to the viewer. When another pixel is drawn at the same location the z
  //    values are compared in order to determine which pixel should be drawn.
  //gl.enable(gl.DEPTH_TEST);

  gl.enable(gl.BLEND)
  gl.disable(gl.DEPTH_TEST)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

  //    Specify which function to use for depth buffer comparisons. It compares the
  //    value of the incoming pixel against the one stored in the depth buffer.
  //    Possible values are (from the OpenGL documentation):
  //    GL_NEVER - Never passes.
  //    GL_LESS - Passes if the incoming depth value is less than the stored depth value.
  //    GL_EQUAL - Passes if the incoming depth value is equal to the stored depth value.
  //    GL_LEQUAL - Passes if the incoming depth value is less than or equal to the stored depth value.
  //    GL_GREATER - Passes if the incoming depth value is greater than the stored depth value.
  //    GL_NOTEQUAL - Passes if the incoming depth value is not equal to the stored depth value.
  //    GL_GEQUAL - Passes if the incoming depth value is greater than or equal to the stored depth value.
  //    GL_ALWAYS - Always passes.
  //gl.depthFunc(gl.LEQUAL);

  //    Now create a shape.
  //    First create a vertex buffer in which we can store our data.
  const vertexBuffer = gl.createBuffer()
  //    Bind the buffer object to the ARRAY_BUFFER target.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  //    Specify the vertex positions (x, y, z)

  // ------------------

  setup()

  // ------------------

  vertices = new Float32Array(vertices)

  velocities = new Float32Array(velocities)

  thetaArr = new Float32Array(thetaArr)
  velThetaArr = new Float32Array(velThetaArr)
  velRadArr = new Float32Array(velRadArr)

  //    Creates a new data store for the vertices array which is bound to the ARRAY_BUFFER.
  //    The third paramater indicates the usage pattern of the data store. Possible values are
  //    (from the OpenGL documentation):
  //    The frequency of access may be one of these:
  //    STREAM - The data store contents will be modified once and used at most a few times.
  //    STATIC - The data store contents will be modified once and used many times.
  //    DYNAMIC - The data store contents will be modified repeatedly and used many times.
  //    The nature of access may be one of these:
  //    DRAW - The data store contents are modified by the application, and used as the source for
  //           GL drawing and image specification commands.
  //    READ - The data store contents are modified by reading data from the GL, and used to return
  //           that data when queried by the application.
  //    COPY - The data store contents are modified by reading data from the GL, and used as the source
  //           for GL drawing and image specification commands.
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)

  //    Clear the color buffer and the depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  //    Define the viewing frustum parameters
  //    More info: http://en.wikipedia.org/wiki/Viewing_frustum
  //    More info: https://knol.google.com/k/view-frustum
  const fieldOfView = 30.0
  const aspectRatio = canvas.width / canvas.height
  const nearPlane = 1.0
  const farPlane = 10000.0
  const top = nearPlane * Math.tan(fieldOfView * Math.PI / 360.0)
  const bottom = -top
  const right = top * aspectRatio
  const left = -right

  //     Create the perspective matrix. The OpenGL function that's normally used for this,
  //     glFrustum() is not included in the WebGL API. That's why we have to do it manually here.
  //     More info: http://www.cs.utk.edu/~vose/c-stuff/opengl/glFrustum.html
  const a = (right + left) / (right - left)
  const b = (top + bottom) / (top - bottom)
  const c = (farPlane + nearPlane) / (farPlane - nearPlane)
  const d = (2 * farPlane * nearPlane) / (farPlane - nearPlane)
  const x = (2 * nearPlane) / (right - left)
  const y = (2 * nearPlane) / (top - bottom)
  const perspectiveMatrix = [
    x, 0, a, 0,
    0, y, b, 0,
    0, 0, c, d,
    0, 0, -1, 0
  ]

  //     Create the modelview matrix
  //     More info about the modelview matrix: http://3dengine.org/Modelview_matrix
  //     More info about the identity matrix: http://en.wikipedia.org/wiki/Identity_matrix
  const modelViewMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  //     Get the vertex position attribute location from the shader program
  const vertexPosAttribLocation = gl.getAttribLocation(gl.program, 'vertexPosition')
  //				colorLoc = gl.getVaryingLocation(gl.program, "vColor");
  //				console.error("color loc : " + colorLoc );
  //     Specify the location and format of the vertex position attribute
  gl.vertexAttribPointer(vertexPosAttribLocation, 3.0, gl.FLOAT, false, 0, 0)
  //gl.vertexAttribPointer(colorLoc, 4.0, gl.FLOAT, false, 0, 0);
  //     Get the location of the "modelViewMatrix" uniform constiable from the
  //     shader program
  const uModelViewMatrix = gl.getUniformLocation(gl.program, 'modelViewMatrix')
  //     Get the location of the "perspectiveMatrix" uniform constiable from the
  //     shader program
  const uPerspectiveMatrix = gl.getUniformLocation(gl.program, 'perspectiveMatrix')
  //     Set the values
  gl.uniformMatrix4fv(uModelViewMatrix, false, new Float32Array(perspectiveMatrix))
  gl.uniformMatrix4fv(uPerspectiveMatrix, false, new Float32Array(modelViewMatrix))
  // 	gl.constyingVector4fv(
  //     Draw the triangles in the vertex buffer. The first parameter specifies what
  //     drawing mode to use. This can be GL_POINTS, GL_LINE_STRIP, GL_LINE_LOOP,
  //     GL_LINES, GL_TRIANGLE_STRIP, GL_TRIANGLE_FAN, GL_TRIANGLES, GL_QUAD_STRIP,
  //     GL_QUADS, and GL_POLYGON
  // gl.drawArrays( gl.LINES, 0, numLines );
  // gl.flush();

  // setInterval(drawScene, 1000 / 40)
  animate()
  // timer()
}

let count = 0
let cn = 0

function animate() {
  requestAnimationFrame(animate)
  drawScene()
}

function drawScene() {
  draw()

  gl.lineWidth(1)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // gl.drawArrays(gl.LINES_STRIP, 0, numLines)
  gl.drawArrays(gl.LINES, 0, numLines)
  // gl.drawArrays(gl.QUAD_STRIP, 0, numLines)

  gl.flush()
}

// ===================================
function setup() {
  setup2()
}

function draw() {
  switch(drawType) {
    // case 0:
    //   draw0()
    //   break
    // case 1:
    //   draw1()
    //   break
    // case 2:
    //   draw2()
    //   break
    case 0:
      draw1()
      break
    case 1:
      draw2()
      break
  }
}

// ===================================

function setup1() {

  vertices = []
  velThetaArr = []
  velRadArr = []
  ratio = cw / ch
  velocities = []

  // -------------------------------

  for(let i = 0; i < numLines; i++) {

    const rad = Math.random() * 2 + .5
    const theta = Math.random() * Math.PI * 2
    const velTheta = Math.random() * Math.PI * 2

    vertices.push(rad * Math.cos(theta), rad * Math.sin(theta), 1.83)//(Math.random() * 2 - 1)*ratio, Math.random() * 2 - 1, 1.83 );
    vertices.push(rad * Math.cos(theta), rad * Math.sin(theta), 1.83)

    velocities.push((Math.random() * 2 - 1) * .05, (Math.random() * 2 - 1) * .05, .93 + Math.random() * .02)
    velThetaArr.push(velTheta)
    velRadArr.push(rad)

  }

}

// -------------------------------

function setup2() {

  vertices = []
  velThetaArr = []
  velRadArr = []
  ratio = cw / ch
  velocities = []
  thetaArr = []
  freqArr = []
  boldRateArr = []

  // -------------------------------

  for(let ii = 0; ii < numLines; ii++) {
    const rad = (0.1 + .2 * Math.random())
    const theta = Math.random() * Math.PI * 2
    const velTheta = Math.random() * Math.PI * 2 / 30
    const freq = Math.random() * 0.12 + 0.03
    const boldRate = Math.random() * .04 + .01
    const randomPosX = (Math.random() * 2 - 1) * window.innerWidth / window.innerHeight
    const randomPosY = Math.random() * 2 - 1

    vertices.push(rad * Math.cos(theta), rad * Math.sin(theta), 1.83)
    vertices.push(rad * Math.cos(theta), rad * Math.sin(theta), 1.83)

    thetaArr.push(theta)
    velThetaArr.push(velTheta)
    velRadArr.push(rad)
    freqArr.push(freq)
    boldRateArr.push(boldRate)

    randomTargetXArr.push(randomPosX)
    randomTargetYArr.push(randomPosY)
  }

  freqArr = new Float32Array(freqArr)

}

// -------------------------------

// ===================================

function draw0() {

  let i,
    bp
  let px,
    py
  let num
  let targetX,
    targetY

  for(i = 0; i < numLines * 2; i += 2) {
    count += .3
    bp = i * 3

    vertices[bp] = vertices[bp + 3]
    vertices[bp + 1] = vertices[bp + 4]

    num = parseInt(i / 2)
    targetX = randomTargetXArr[num]
    targetY = randomTargetYArr[num]

    px = vertices[bp + 3]
    px += (targetX - px) * (Math.random() * .04 + .06)
    vertices[bp + 3] = px

    //py = (Math.sin(cn) + 1) * .2 * (Math.random() * .5 - .25);
    py = vertices[bp + 4]
    py += (targetY - py) * (Math.random() * .04 + .06)
    vertices[bp + 4] = py

  }
}

// -------------------------------

function draw1() {

  let i,
    bp
  let px,
    py
  let pTheta
  let rad
  let num
  let targetX,
    targetY

  for(i = 0; i < numLines * 2; i += 2) {
    count += .3
    bp = i * 3

    vertices[bp] = vertices[bp + 3]
    vertices[bp + 1] = vertices[bp + 4]

    num = parseInt(i / 2)
    pTheta = thetaArr[num]
    rad = velRadArr[num]

    pTheta = pTheta + velThetaArr[num]
    thetaArr[num] = pTheta

    targetX = rad * Math.cos(pTheta)
    targetY = rad * Math.sin(pTheta)

    px = vertices[bp + 3]
    px += (targetX - px) * (Math.random() * .1 + .1)
    vertices[bp + 3] = px

    //py = (Math.sin(cn) + 1) * .2 * (Math.random() * .5 - .25);
    py = vertices[bp + 4]
    py += (targetY - py) * (Math.random() * .1 + .1)
    vertices[bp + 4] = py
  }
}

// -------------------------------

function draw2() {
  cn += .1

  let i,
    bp
  let px,
    py
  let pTheta
  let rad
  let num

  for(i = 0; i < numLines * 2; i += 2) {
    count += .3
    bp = i * 3
    // copy old positions

    vertices[bp] = vertices[bp + 3]
    vertices[bp + 1] = vertices[bp + 4]

    num = parseInt(i / 2)
    pTheta = thetaArr[num]

    rad = velRadArr[num]// + Math.cos(pTheta + i * freqArr[i]) *  boldRateArr[num];

    pTheta = pTheta + velThetaArr[num]
    thetaArr[num] = pTheta

    px = vertices[bp + 3]
    px = rad * Math.cos(pTheta) * 0.1 + px
    vertices[bp + 3] = px

    //py = (Math.sin(cn) + 1) * .2 * (Math.random() * .5 - .25);
    py = vertices[bp + 4]

    py = py + rad * Math.sin(pTheta) * 0.1
    //p *= ( Math.random() -.5);
    vertices[bp + 4] = py
  }
}

// -------------------------------

function timer() {
  // drawType = (drawType + 1) % 2
  drawType = 1

  setTimeout(timer, 1500)
}
