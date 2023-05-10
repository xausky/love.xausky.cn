uniform float time;
uniform float viewportHeight;

void main() {
    float x = mod(position.x - time * viewportHeight * 0.1, viewportHeight) - viewportHeight * 0.5;
    float y = mod(position.y - time * viewportHeight * 0.1, viewportHeight) - viewportHeight * 0.5;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, position.z, 1.0);
	gl_PointSize = viewportHeight * projectionMatrix[1][1] * (2.0) / gl_Position.w;
}