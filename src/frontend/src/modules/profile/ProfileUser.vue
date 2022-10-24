<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        :srcset="`${user.avatar.webp} 1x, ${user.avatar.webp2x} 2x`"
      />
      <img
        :src="user.avatar.jpg"
        :srcset="user.avatar.jpg2x"
        :alt="user.name"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileUser",
  computed: {
    ...mapGetters("Auth", { user: "normolizedUser" }),
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
