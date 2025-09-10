import { faker } from "@faker-js/faker";
import fs from "fs";

const NUM_BRANDS = 20;
const NUM_PRODUCTS = 100;

// Generate brands
const brands = Array.from({ length: NUM_BRANDS }, (_, i) => ({
  id: i + 1,
  name: faker.company.name(),
  country: faker.location.country(),
  founded: faker.date.past({ years: 50 }).getFullYear(),
  description: faker.company.catchPhrase(),
  logo: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
}));

// Generate products
const products = Array.from({ length: NUM_PRODUCTS }, (_, i) => {
  const brandId = faker.number.int({ min: 1, max: NUM_BRANDS });
  const price = parseFloat(faker.commerce.price());
  const onSale = faker.datatype.boolean(); // 50% chance
  const discountedPrice = onSale
    ? parseFloat(
        (price * (1 - faker.number.int({ min: 5, max: 50 }) / 100)).toFixed(2),
      )
    : undefined;

  return {
    id: i + 1,
    brandId,
    name: faker.commerce.productName(),
    price,
    discountedPrice, // optional
    onSale,
    category: faker.commerce.department(),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    image: faker.image.urlPicsumPhotos({ width: 150, height: 150 }),
    details: {
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 0, max: 200 }),
      weight: `${faker.number.int({ min: 50, max: 500 })}g`,
      dimensions: `${faker.number.int({ min: 5, max: 20 })}x${faker.number.int({ min: 5, max: 20 })}x${faker.number.int({ min: 2, max: 10 })} cm`,
      warranty: `${faker.number.int({ min: 6, max: 36 })} months`,
    },
  };
});

const db = { brands, products };

fs.writeFileSync("./mock-server/db.json", JSON.stringify(db, null, 2));
console.log(
  `db.json generated with ${NUM_BRANDS} brands and ${NUM_PRODUCTS} products`,
);
