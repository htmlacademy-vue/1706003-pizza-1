import doughValues from "@/common/enums/doughValues";
import sizeValues from "@/common/enums/sizeValues";
import saucesValues from "@/common/enums/saucesValues";
import ingredientsValues from "@/common/enums/ingredientsValues";
import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api.service";

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

export function pizzaPrice({ elId, elDescription }) {
  let mainCost;
  let addedCost;
  let ingredientsPrice = {};
  const sauce = elDescription.normolizedSauces.find(
    (sauce) => sauce.sauceId === elId.sauceId
  );
  const dough = elDescription.normolizedDought.find(
    (dough) => dough.doughId === elId.doughId
  );
  const size = elDescription.normolizedSizes.find(
    (size) => size.sizeId === elId.sizeId
  );

  mainCost = dough.price + sauce.price;

  elDescription.normolizedIngredients.forEach(
    (ingredient) =>
      (ingredientsPrice[ingredient.ingredientId] = { price: ingredient.price })
  );
  elId.ingredients.forEach(
    (ingredient) =>
      (ingredientsPrice[ingredient.ingredientId].quantity = ingredient.quantity)
  );

  addedCost = Object.values(ingredientsPrice).reduce(
    (cost, ingredient) => ingredient.price * ingredient.quantity + cost,
    0
  );
  return (mainCost + addedCost) * size.multiplier;
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

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH),
    [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};
