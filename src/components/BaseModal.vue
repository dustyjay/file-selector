<template>
  <div class="modal">
    <div class="modal-header">
      <div class="modal-header__title">
        <slot name="header" />
      </div>
      <button class="icon">
        <img src="@/assets/close.svg" alt="close modal" />
      </button>
    </div>
    <div class="modal-body"><slot /></div>
    <div class="modal-footer"><slot name="footer" /></div>
  </div>
</template>

<script>
export default {
  name: 'base-modal'
};
</script>

<style lang="scss" scoped>
.modal {
  width: 80%;
  max-width: 420px;
  height: 380px;
  border-radius: 16px;
  padding: 0.5rem 0.5rem 0;
  background-color: white;
  box-shadow: 0px 8px 24px 0px #0000001f, 0px 4px 8px 0px #00000014;
  display: flex;
  flex-direction: column;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__title {
      display: inline-flex;
      align-items: center;
      button {
        margin-right: 5px;
      }
    }
  }

  &-body {
    flex-grow: 1;
    max-height: 256px;
    overflow-y: auto;
    padding: 0.5rem;
  }

  &-footer {
    padding: 1rem;
    text-align: right;
  }
}
</style>
