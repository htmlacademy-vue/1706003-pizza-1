<template>
  <div>
    <ProfileAddressForm
      v-if="isChanging"
      :new-address="false"
      :title="title"
      :address="address"
      data-test="profile-address-form"
      @setAddressInfo="changeAddressInfo({ ...$event, id: address.id })"
      @delAddressInfo="deleteAddress({ id: address.id })"
    />
    <ProfileAddress
      v-else
      :title="title"
      :address="addressStr"
      :comment="comment ? comment : 'Комментарий отсутствует'"
      data-test="profile-address"
      @changeAddress="changeAddress"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm.vue";
import ProfileAddress from "@/modules/profile/components/ProfileAddress.vue";

export default {
  name: "ProfileAddressContainer",
  components: { ProfileAddressForm, ProfileAddress },
  props: {
    title: {
      type: String,
      required: true,
    },
    addressId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isChanging: false,
    };
  },
  computed: {
    ...mapState("Auth", ["addresses"]),
    address() {
      return this.addresses.find((address) => address.addressId === this.addressId);
    },
    addressStr() {
      return `ул. ${this.address.street}, д. ${this.address.building}, кв. ${
        this.address.flat ? this.address.flat : "-"
      }`;
    },
    comment() {
      return this.address.comment;
    },
  },
  methods: {
    ...mapActions("Auth", ["updateAddress", "deleteAddress"]),
    changeAddress() {
      this.isChanging = true;
    },
    changeAddressInfo(addressInfo) {
      this.updateAddress(addressInfo);
      this.isChanging = false;
    },
  },
};
</script>
