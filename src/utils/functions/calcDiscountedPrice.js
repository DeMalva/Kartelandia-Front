// Funcion para calcular el descuento de las ofertas en los posters

export function calcDiscountedPrice(price, discount) {
  if (!discount) return price;

  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;

  return finalPrice;
}
