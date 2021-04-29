<template>
  <div class="modal" tabindex="-1" :class="{ show }" @blur="handleBlur()">
    <div class="modal-header">
      <div class="modal-header__title">
        <slot name="header" />
      </div>
      <button class="icon" @click="closeModal()">
        <img src="@/assets/close.svg" alt="close modal" />
      </button>
    </div>
    <div class="modal-body"><slot /></div>
    <div class="modal-footer"><slot name="footer" /></div>
  </div>
</template>

<script>
export default {
  name: 'base-modal',
  props: {
    show: Boolean
  },
  computed: {
    showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      }
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    handleBlur() {
      setTimeout(() => {
        this.closeModal();
      }, 200);
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          document.querySelector('.modal').focus();
        }, 50);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  width: 80vw;
  // min-width: 100%;
  max-width: 420px;
  height: 380px;
  border-radius: 16px;
  padding: 0.5rem 0.5rem 0;
  background-color: white;
  box-shadow: 0px 8px 24px 0px #0000001f, 0px 4px 8px 0px #00000014;
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  &.show {
    display: flex;
  }
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
