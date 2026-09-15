const meshCanvas = document.getElementById("mesh-canvas");
const meshCtx = meshCanvas.getContext("2d");

let meshWidth, meshHeight;

const meshParticles = [];
const MESH_PARTICLE_COUNT = 56;
const MESH_COLORS = ["#e8f0f8", "#2dd1bd", "#11b6a4"];
const MESH_CONNECTION_DISTANCE = 250;

function resizeMeshCanvas() {
  const rect = meshCanvas.getBoundingClientRect();
  meshWidth = rect.width;
  meshHeight = rect.height;
  meshCanvas.width = meshWidth;
  meshCanvas.height = meshHeight;
}
window.addEventListener("resize", resizeMeshCanvas);
resizeMeshCanvas();

for (let i = 0; i < MESH_PARTICLE_COUNT; i++) {
  meshParticles.push({
    x: Math.random() * meshWidth,
    y: Math.random() * meshHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 3 + 1.5,
    color: MESH_COLORS[Math.floor(Math.random() * MESH_COLORS.length)],
    alpha: (Math.random() * 0.5 + 0.3) * 0.7,
  });
}

function animateMesh() {
  meshCtx.clearRect(0, 0, meshWidth, meshHeight);

  meshParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = meshWidth;
    if (p.x > meshWidth) p.x = 0;
    if (p.y < 0) p.y = meshHeight;
    if (p.y > meshHeight) p.y = 0;

    const alphaHex = Math.floor(p.alpha * 255)
      .toString(16)
      .padStart(2, "0");

    meshCtx.beginPath();
    meshCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    meshCtx.fillStyle = p.color + alphaHex;
    meshCtx.fill();
  });

  for (let i = 0; i < meshParticles.length; i++) {
    for (let j = i + 1; j < meshParticles.length; j++) {
      const dx = meshParticles[i].x - meshParticles[j].x;
      const dy = meshParticles[i].y - meshParticles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MESH_CONNECTION_DISTANCE) {
        const opacity = 0.1 * (1 - distance / MESH_CONNECTION_DISTANCE);

        meshCtx.beginPath();
        meshCtx.moveTo(meshParticles[i].x, meshParticles[i].y);
        meshCtx.lineTo(meshParticles[j].x, meshParticles[j].y);
        meshCtx.strokeStyle = `rgba(232, 240, 248, ${opacity})`;
        meshCtx.lineWidth = 2;
        meshCtx.stroke();
      }
    }
  }

  requestAnimationFrame(animateMesh);
}

animateMesh();
