const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const categories = ['mugs', 't-shirts', 'shoes'];
const names = [
    "Cool Mug",
    "Graphic T-Shirt",
    "Running Shoes",
    "Travel Mug",
    "Vintage T-Shirt",
    "Casual Sneakers"
];
const descriptions = [
    "A stylish mug for your coffee.",
    "Comfortable t-shirt with a cool design.",
    "High-performance running shoes for athletes.",
    "Keep your drinks hot or cold on the go.",
    "Retro style t-shirt with a vintage print.",
    "Comfortable sneakers for everyday wear."
];
const imageUrl = "https://via.placeholder.com/150";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate() {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - getRandomInt(0, 365));
    return past.toISOString().split('T')[0];
}

let items = [];

for (let i = 0; i < 300; i++) {
    let item = {
        id: uuidv4(),
        name: names[getRandomInt(0, names.length - 1)],
        description: descriptions[getRandomInt(0, descriptions.length - 1)],
        image_url: imageUrl,
        category: categories[getRandomInt(0, categories.length - 1)],
        price_in_cents: getRandomInt(1000, 6000),
        created_at: getRandomDate()
    };
    items.push(item);
}

const jsonOutput = JSON.stringify(items, null, 4);

fs.writeFile('items.json', jsonOutput, (err) => {
    if (err) throw err;
    console.log('JSON file has been saved.');
});