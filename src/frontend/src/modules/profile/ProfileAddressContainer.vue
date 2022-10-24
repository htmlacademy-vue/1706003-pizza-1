<template>
  <div>
    <ProfileAddressForm
      v-if="isChanging"
      :newAddress="false"
      :title="title"
      :address="address"
      @setAddressInfo="changeAddressInfo({ ...$event, id: address.id })"
      @delAddressInfo="deleteAddress({ id: address.id })"
    />
    <ProfileAddress
      v-else
      :title="title"
      @changeAddress="changeAddress"
      :address="addressStr"
      :comment="comment ? comment : 'Комментарий отсутствует'"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ProfileAddressForm from "@/modules/profile/ProfileAddressForm.vue";
import ProfileAddress from "@/modules/profile/ProfileAddress.vue";

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
      return this.addresses.find((address) => address.id === this.addressId);
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
