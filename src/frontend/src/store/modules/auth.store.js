import user from "@/static/user.json";

export default {
  namespaced: true,
  state: {
    user,
    addresses: [
      {
        id: 3,
        name: "Дом",
        street: "Льва Толстого",
        building: "16",
        flat: "4",
        userId: "uuid",
      },
    ],
  },
};
