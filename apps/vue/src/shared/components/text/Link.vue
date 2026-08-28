<template>
  <a class="link"><slot></slot></a>
</template>

<style lang="scss" scoped>
.link {
  font-size: 14px;
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:visited {
    color: var(--color-primary);
  }
}
</style>
