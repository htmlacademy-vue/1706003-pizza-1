<template>
  <div>
    <div class="layout__title">
      <AppTitle :modifier="['big']">
        Мои данные
      </AppTitle>
    </div>

    <ProfileUser />

    <div class="layout__address">
      <ProfileAddressContainer
        v-for="address in addresses"
        :key="address.addressId"
        :title="address.name"
        :address-id="address.addressId"
      />
    </div>

    <div
      v-if="isAddingNewAddress"
      class="layout__address"
    >
      <ProfileAddressForm
        :new-address="true"
        title="Новый адрес"
        @setAddressInfo="setNewAddress"
      />
    </div>

    <div class="layout__button">
      <AppButton
        type="button"
        class="button"
        :modifier="['secondary']"
        @click="addNewAddress"
      >
        Добавить новый адрес
      </AppButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ProfileUser from "@/modules/profile/ProfileUser.vue";
import ProfileAddressForm from "@/modules/profile/ProfileAddressForm.vue";
import ProfileAddressContainer from "@/modules/profile/ProfileAddressContainer.vue";

import AppButton from "@/common/components/AppButton.vue";
import AppTitle from "@/common/components/AppTitle.vue";

export default {
  name: "Profile",
  components: {
    ProfileUser,
    ProfileAddressForm,
    ProfileAddressContainer,
    AppButton,
    AppTitle 
  },
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

  .button {
    padding: 12px 23px;
  }
}
</style>
