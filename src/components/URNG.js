import { v4 as uuidv4 } from "uuid";

export default function uniqueId() {
  const uuidToInteger = (uuid) => {
    const hex = uuid.replace(/-/g, "");
    return parseInt(hex, 16);
  };

  const shortenNumber = (number) => {
    const newNumber = number.toString();
    if (newNumber.length > 16) {
      return newNumber.slice(0, 10);
    }
    return newNumber;
  };

  const generator = () => {
    const uuid = uuidv4();
    let uniqueNumber = uuidToInteger(uuid);

    let reducedNumber = shortenNumber(uniqueNumber);

    let tokenId = reducedNumber * 10 ** 10;
    return tokenId;
  };

  return generator;
}
