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

const values = {
  dough: doughValues,
  ingredients: ingredientsValues,
  sauces: saucesValues,
  sizes: sizeValues,
};

export function normalize(array, name) {
  return array.map((item) => ({
    ...item,
    value: values[name][item.name],
  }));
}
