const fs = require("fs");

// ------------------------------
// 🎨 1. НАСТРОЙКИ ВНЕШНЕГО ВИДА
// ------------------------------
const STYLE = {
  radius: 6,
  fontSize: 6,
  levelGap: 25,
  strokeWidth: 1,
  nodeColor: "#f1f7f6ff",
  textColor: "black"
};

// ------------------------------
// 🌲 2. ДАННЫЕ ДЕРЕВА
// ------------------------------
const tree = {
  value: 11,
  left: {
    value: 5,
    left: { value: 2, left: { value: 1 }, right: null },
    right: { value: 6, left: null, right: { value: 8 } }
  },
  right: {
    value: 17,
    left: { value: 15, left: { value: 13 }, right: null },
    right: { value: 19, right: { value: 21 } }
  }
};

// ------------------------------
// ⚙️ 3. РАСЧЁТ КООРДИНАТ (УЛУЧШЕННЫЙ)
// ------------------------------
function calculatePositions(node, depth, pos, positions) {
  if (!node) return;
  
  if (node.left) {
    calculatePositions(node.left, depth + 1, pos - Math.pow(2, 5 - depth), positions);
  }
  
  positions.push({ node, x: pos, y: depth * STYLE.levelGap + 50 });
  
  if (node.right) {
    calculatePositions(node.right, depth + 1, pos + Math.pow(2, 5 - depth), positions);
  }
}

// ------------------------------
// 🧩 4. ГЕНЕРАЦИЯ SVG
// ------------------------------
function generateSVG(positions) {
  let elements = [];
  
  // Сначала рисуем линии
  positions.forEach(item => {
    const node = item.node;
    if (node.left) {
      const leftPos = positions.find(p => p.node === node.left);
      if (leftPos) {
        elements.push(
          `<line x1="${item.x}" y1="${item.y}" x2="${leftPos.x}" y2="${leftPos.y}" stroke="black" stroke-width="${STYLE.strokeWidth}" />`
        );
      }
    }
    if (node.right) {
      const rightPos = positions.find(p => p.node === node.right);
      if (rightPos) {
        elements.push(
          `<line x1="${item.x}" y1="${item.y}" x2="${rightPos.x}" y2="${rightPos.y}" stroke="black" stroke-width="${STYLE.strokeWidth}" />`
        );
      }
    }
  });
  
  // Затем рисуем узлы поверх линий
  positions.forEach(item => {
    elements.push(
      `<circle cx="${item.x}" cy="${item.y}" r="${STYLE.radius}" fill="${STYLE.nodeColor}" stroke="black" stroke-width="1" />`
    );
    elements.push(
      `<text x="${item.x}" y="${item.y + STYLE.fontSize / 3}" text-anchor="middle" fill="${STYLE.textColor}" font-size="${STYLE.fontSize}" font-family="Arial">${item.node.value}</text>`
    );
  });

  // Находим границы для установки правильных размеров SVG
  const xs = positions.map(p => p.x);
  const ys = positions.map(p => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  
  const padding = 50;
  const width = maxX - minX + 2 * padding;
  const height = maxY - minY + 2 * padding;
  
  // Смещаем все элементы
  const transformedElements = elements.map(element => 
    element.replace(/(x1|x2|cx|x)="([^"]*)"/g, (match, attr, value) => 
      `${attr}="${parseFloat(value) - minX + padding}"`)
      .replace(/(y1|y2|cy|y)="([^"]*)"/g, (match, attr, value) => 
        `${attr}="${parseFloat(value) - minY + padding}"`)
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="background:#f8f9fa">
${transformedElements.join("\n")}
</svg>`;
}

// ------------------------------
// 🚀 5. ВЫПОЛНЕНИЕ
// ------------------------------
const positions = [];
calculatePositions(tree, 0, 0, positions);
const svg = generateSVG(positions);
fs.writeFileSync("tree.svg", svg);
console.log("✅ Файл tree.svg успешно создан!");