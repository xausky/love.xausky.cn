void main() {
    if(gl_PointCoord.y > sqrt(0.5 - pow(abs(gl_PointCoord.x - 0.5), 2.0))) {
        discard;
    }

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}