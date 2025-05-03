import * as PIXI from "pixi.js";

let app;

async function scene(width, height, color) {
  app = new PIXI.Application({
    width: width,
    height: height,
    background: color,
    antialias: true,
  });
  document.body.appendChild(app.canvas);
}

const Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

const engine = Engine.create();
const world = engine.world;

function createRect(x, y, width, height, color = 0xff3333, isStatic = false) {
  const body = Bodies.rectangle(x, y, width, height, { isStatic });
  World.add(world, body);

  const graphics = new PIXI.Graphics();
  graphics.beginFill(color);
  graphics.drawRect(-width / 2, -height / 2, width, height);
  graphics.endFill();
  graphics.x = x;
  graphics.y = y;
  app.stage.addChild(graphics);

  return { body, graphics };
}

function createCircle(x, y, radius, color = 0x33aaff, isStatic = false) {
  const body = Bodies.circle(x, y, radius, { isStatic });
  World.add(world, body);

  const graphics = new PIXI.Graphics();
  graphics.beginFill(color);
  graphics.drawCircle(0, 0, radius);
  graphics.endFill();
  graphics.x = x;
  graphics.y = y;
  app.stage.addChild(graphics);

  return { body, graphics };
}

async function createImg(x, y, path, isStatic = true) {
  try {
    await PIXI.Assets.load(path);
    const texture = PIXI.Texture.from(path);
    const img = new PIXI.Sprite(texture);
    img.anchor.set(0.5);
    img.x = x;
    img.y = y;
    app.stage.addChild(img);

    const body = Bodies.rectangle(x, y, img.width, img.height, { isStatic });
    World.add(world, body);

    return { body, graphics: img };
  } catch (error) {
    console.error("Помилка завантаження зображення:", error);
    return null;
  }
}

async function initialize() {
  await scene(800, 600, "skyblue");

  if (engine.world.gravity.y === 0) {
    engine.world.gravity.y = 1;
    console.log("Гравітація була встановлена на стандартне значення (1).");
  } else {
    console.log("Гравітація:", engine.world.gravity);
  }

  const box = createRect(320, 50, 50, 50);
  const ground = createRect(320, 340, 640, 40, "lightgreen", true);
  const sun = createCircle(50, 50, 30, 0xffff00, true);
  const sky = await createImg(400, 100, "../img/cloud.png", true);

  const objects = [box, ground, sun, sky];

  app.ticker.add(() => {
    Engine.update(engine, app.ticker.deltaMS);

    for (const obj of objects) {
      if (obj && obj.body && obj.graphics) {
        obj.graphics.x = obj.body.position.x;
        obj.graphics.y = obj.body.position.y;
        obj.graphics.rotation = obj.body.angle;
      }
    }
  });
}

initialize();
