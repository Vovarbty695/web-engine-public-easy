let app;

async function scene(width, height, color) {
  app = new PIXI.Application();
  await app.init({ width: 640, height: 360 });

  document.body.appendChild(app.canvas);
}

function rect(x, y, width, height, color) {
  const rectangle = new PIXI.Graphics();
  rectangle.beginFill(color);
  rectangle.drawRect(x, y, width, height);
  rectangle.endFill();
  rectangle.x = x;
  rectangle.y = y;
  app.stage.addChild(rectangle);
}

function circle(x, y, radius, color) {
  const circle = new PIXI.Graphics();
  circle.beginFill(color);
  circle.drawCircle(x, y, radius);
  circle.endFill();
  circle.x = x;
  circle.y = y;
  app.stage.addChild(circle);
}

function text(x, y, text, fontFamily, fontSize, color) {
  const textObj = new PIXI.Text(text, { fontFamily, fontSize, color });
  textObj.x = x;
  textObj.y = y;
  app.stage.addChild(textObj);
}

scene(1280, 720, "black");
