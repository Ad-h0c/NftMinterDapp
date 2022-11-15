import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();

const uuidToInteger = (uuid) => {
  const hex = uuid.replace(/-/g, "");
  return parseInt(hex, 16);
};

const arr = [];
while (arr.length < 10) {
  const newId = uuidv4();
  if (!arr.includes(newId)) {
    arr.push(newId);
  }
}

// convert uuid to integer

console.log(uuidToInteger(uuid));
