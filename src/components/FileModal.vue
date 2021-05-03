<template>
  <BaseModal :show.sync="showModal">
    <template slot="header">
      <button
        @click="handelBackButton"
        type="button"
        class="icon"
        :class="{ 'd-none': isRootFolder }"
      >
        <img src="@/assets/back-button.svg" alt="go back" />
      </button>
      <h3 class="title" :class="{ 'ml-3': isRootFolder }">
        {{ modalTitle }}
      </h3>
    </template>
    <template slot="footer">
      <button type="button" :disabled="isDisabled" @click="handleSelectFiles">
        {{ buttonText }}
      </button>
    </template>
    <ul>
      <li
        class="item"
        v-for="({ type, image, name, children }, id) in currentFileStructure"
        :key="id"
        @click="handleClick({ type, image, name, children, id })"
      >
        <FolderSvg v-if="!image" />
        <DocSvg v-else-if="type === 'doc'" />
        <img
          class="item__image"
          :alt="type"
          v-else
          :src="image"
          @error="handleImageError"
        />
        <span class="item__name first-letter">
          {{ name }}
        </span>
        <img
          v-if="children"
          src="@/assets/arrow-forward.svg"
          alt="view folder"
        />
        <img v-if="hasTick(id)" src="@/assets/tick.svg" alt="check" />
      </li>
    </ul>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import DocSvg from './DocSvg.vue';
import FolderSvg from './FolderSvg.vue';
export default {
  components: { BaseModal, DocSvg, FolderSvg },
  props: {
    fileStructure: Object,
    selectedFiles: Object,
    show: Boolean
  },
  name: 'file-modal',
  data() {
    return {
      breadcrumbs: [
        {
          name: 'Torstraße 145, 39481 Nürnberg',
          children: this.fileStructure
        }
      ],
      activeIndex: 0,
      localSelectedFiles: {}
    };
  },
  computed: {
    showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      }
    },
    modalTitle() {
      return this.breadcrumbs[this.activeIndex]['name'];
    },
    currentFileStructure() {
      return this.breadcrumbs[this.activeIndex]['children'];
    },
    isRootFolder() {
      return this.breadcrumbs.length === 1;
    },
    isDisabled() {
      return Object.keys(this.localSelectedFiles).length === 0;
    },
    buttonText() {
      const { length } = Object.keys(this.localSelectedFiles);
      if (length === 0) return 'Select files';
      let suffix = 'file';
      if (length > 1) suffix = 'files';
      return `Select ${length} ${suffix}`;
    }
  },
  methods: {
    handleClick({ id, name, children }) {
      if (!children) {
        this.handleFileClick({ id, name });
        return;
      }
      this.breadcrumbs.push({ id, name, children });
      this.activeIndex += 1;
    },
    handleFileClick({ id, name }) {
      if (!this.hasTick(id)) {
        this.$set(this.localSelectedFiles, id, name);
      } else {
        this.$delete(this.localSelectedFiles, id);
      }
    },
    handelBackButton() {
      this.breadcrumbs.pop();
      this.activeIndex -= 1;
    },
    handleSelectFiles() {
      this.$emit('update:selectedFiles', this.localSelectedFiles);
      this.showModal = false;
    },
    hasTick(id) {
      return !!this.localSelectedFiles[id];
    },
    resetModal() {
      this.activeIndex = 0;
      this.breadcrumbs = [
        {
          name: 'Torstraße 145, 39481 Nürnberg',
          children: this.fileStructure
        }
      ];
      this.localSelectedFiles = {};
    },
    handleImageError(e) {
      e.target.src = 'https://img.icons8.com/ios/452/no-image.png';
    }
  },
  watch: {
    show(newVal) {
      this.resetModal();
      if (newVal) {
        this.localSelectedFiles = { ...this.selectedFiles };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  transition: 300ms linear;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
    path:first-child {
      fill-opacity: 0.08;
    }
  }
  &__name {
    flex: 1 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
    margin-left: 0.75rem;
    transform: translateY(3px);
  }
  &__image {
    border-radius: 8px;
    width: 28px;
    height: 28px;
    object-fit: cover;
  }
}
.ml-3 {
  margin-left: 1rem;
}
.d-none {
  z-index: -1;
  width: 0;
  opacity: 0;
  padding: 0;
}
.title {
  text-transform: capitalize;
}
</style>
