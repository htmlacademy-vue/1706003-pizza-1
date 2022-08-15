import doughValues from "@/common/enums/doughValues";
import sizeValues from "@/common/enums/sizeValues";
import saucesValues from "@/common/enums/saucesValues";
import ingredientsValues from "@/common/enums/ingredientsValues";

export function formatCurrency(value, currency = "RUB") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
  }).format(value);
}

export function normalizeUser(user) {
  const avatarURL = user.avatar.split(".")[0];
  return {
    ...user,
    avatar: {
      jpg: avatarURL + ".jpg",
      jpg2x: avatarURL + "@2x.jpg",
      webp: avatarURL + ".webp",
      webp2x: avatarURL + "@2x.webp",
    },
  };
}

export function normalizePizza(pizza) {
  return {
    ...pizza,
    dough: pizza.dough.map((item) => ({
      ...item,
      value: doughValues[item.name],
    })),
    sizes: pizza.sizes.map((item) => ({
      ...item,
      value: sizeValues[item.name],
    })),
    sauces: pizza.sauces.map((item) => ({
      ...item,
      value: saucesValues[item.name],
    })),
    ingredients: pizza.ingredients.map((item) => ({
      ...item,
      value: ingredientsValues[item.name],
    })),
  };
}
