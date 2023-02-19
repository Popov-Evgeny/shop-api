const mongoose = require('mongoose');
const config = require("./config");
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");
const {randomUUID} = require('crypto');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, user2] = await User.create({
    email: 'test@john.com',
    password: '123',
    name: 'John Doe',
    token: randomUUID()
  }, {
    email: 'test@jack.com',
    password: '123',
    name: 'Jack Doe',
    token: randomUUID()
  });

  const [watches, laptops, headphones, monitors] = await Category.create({
    title: 'Watches',
    image: 'watches.png',
  },{
    title: 'Headphones',
    image: 'sony-audio.jpeg',
  },{
    title: 'Laptops',
    image: 'laptop.png',
  }, {
    title: 'Monitors',
    image: 'monitors.png',
  });

  await Product.create({
    category: laptops,
    title: 'MSI GL66 Gaming Laptop',
    price: 1300,
    description: '15.6" 144Hz FHD 1080p Display, Intel Core i7-11800H, NVIDIA GeForce RTX 3070, 16GB, 512GB SSD, Win10, Black (11UGK-001)',
    image: 'laptop.png',
    user: user
  }, {
    category: headphones,
    title: 'Беспроводные наушники Sony WH-1000XM4',
    price: 200,
    description: 'Диапазон частот: 4 - 40000 Гц. Диаметр мембраны: 40 мм. Длина кабеля: 1.2 м. Время работы в режиме прослушивания: до 38 ч. Время полного заряда: около 3 ч. Интерфейсы: Bluetooth 5.0, NFC Проводное соединение: AUX 3,5 мм, USB-C Кодеки: AAC, LDAC, SBC',
    image: 'sony-audio.jpeg',
    user: user2
  }, {
    category: monitors,
    title: 'Best Buy Samsung - T55 Series 27" LED 1000R Curved FHD FreeSync Monitor',
    price: 500,
    description: 'Shop Samsung T55 Series 27" LED 1000R Curved FHD FreeSync Monitor (DisplayPort, HDMI, VGA) at Best Buy. Find low everyday prices and buy online.',
    image: 'monitors.png',
    user: user
  }, {
    category: watches,
    title: 'Ultra-Low watches',
    price: 1000,
    description: 'Built for the ultimate gaming experience, the TH685 is supercharged with low input lag(8.3ms) for real-time video game thrills. Stunning 1080p HDR graphics and 3500 ANSI Lumens of high brightness deliver intense action, even in daylight. The awe-inspiring sound immerses you in epic gameplay like nothing you’ve seen before.',
    image: 'watches.png',
    user: user2
  },{
    category: laptops,
    title: 'Lenovo Gaming 3',
    price: 1000,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque delectus doloribus est maxime praesentium suscipit temporibus. Ducimus maxime modi nisi numquam obcaecati quos saepe totam? ',
    image: null,
    user: user
  }, {
    category: headphones,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 120,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque delectus doloribus est maxime praesentium suscipit temporibus. Ducimus maxime modi nisi numquam obcaecati quos saepe totam?',
    image: null,
    user: user2
  }, {
    category: monitors,
    title: 'Best Buy Samsung - Monitor',
    price: 350,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque delectus doloribus est maxime praesentium suscipit temporibus. Ducimus maxime modi nisi numquam obcaecati quos saepe totam?',
    image: null,
    user: user
  }, {
    category: watches,
    title: 'Ultra-Low watches',
    price: 850,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque delectus doloribus est maxime praesentium suscipit temporibus. Ducimus maxime modi nisi numquam obcaecati quos saepe totam?',
    image: null,
    user: user2
  });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));