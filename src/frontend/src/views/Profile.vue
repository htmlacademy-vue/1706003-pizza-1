<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <ProfileUser />

    <div class="layout__address">
      <ProfileAddressContainer
        v-for="address in addresses"
        :key="address.id"
        :title="address.name"
        :addressId="address.id"
      />
    </div>

    <div class="layout__address" v-if="isAddingNewAddress">
      <ProfileAddressForm
        :newAddress="true"
        title="Новый адрес"
        @setAddressInfo="setNewAddress"
      />
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="addNewAddress"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ProfileUser from "@/modules/profile/ProfileUser.vue";
import ProfileAddressForm from "@/modules/profile/ProfileAddressForm.vue";
import ProfileAddressContainer from "@/modules/profile/ProfileAddressContainer.vue";

export default {
  name: "Profile",
  components: { ProfileUser, ProfileAddressForm, ProfileAddressContainer },
  data() {
    return {
      isAddingNewAddress: false,
    };
  },
  computed: {
    ...mapState("Auth", ["addresses"]),
  },
  methods: {
    ...mapActions("Auth", ["setAddress", "getAddresses"]),
    addNewAddress() {
      this.isAddingNewAddress = true;
    },
    setNewAddress(address) {
      this.setAddress({ ...address });
      this.isAddingNewAddress = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout__title {
  margin-bottom: 27px;
}
.layout__address {
  margin-top: 16px;
}
.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}
</style>
