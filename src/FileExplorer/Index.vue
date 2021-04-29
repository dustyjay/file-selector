<template>
  <div>
    <div class="text-center">
      <button type="button">Select Files</button>
    </div>
    <br />
    <div class="selected-files">
      <h4><strong>Files selected</strong></h4>
      <p v-for="(name, index) in selectedFileNames" :key="index">{{ name }}</p>
    </div>
    <BaseModal>
      <template slot="header">
        <button @click="handelBackButton" class="icon" v-if="!isRootFolder">
          <img src="@/assets/back-button.svg" alt="go back" />
        </button>
        <h3>{{ modalTitle }}</h3>
      </template>
      <template slot="footer">
        <button type="button" disabled>Select Files</button>
      </template>
      <ul>
        <li
          class="item"
          v-for="({ type, image, name, children }, id) in activeFileStructure"
          :key="id"
          @click="handleClick({ type, image, name, children, id })"
        >
          <svg
            v-if="!image"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H24C26.2091 0 28 1.79086 28 4V24C28 26.2091 26.2091 28 24 28H4C1.79086 28 0 26.2091 0 24V4Z"
              fill="black"
              fill-opacity="0.04"
            />
            <path
              d="M20.5717 10.1835H14.161L12.0664 8.17997C12.0397 8.15502 12.0046 8.141 11.9681 8.14069H7.42885C7.11278 8.14069 6.85742 8.39604 6.85742 8.71211V19.2835C6.85742 19.5996 7.11278 19.855 7.42885 19.855H20.5717C20.8878 19.855 21.1431 19.5996 21.1431 19.2835V10.755C21.1431 10.4389 20.8878 10.1835 20.5717 10.1835ZM19.8574 18.5693H8.14314V9.4264H11.5092L13.6449 11.4693H19.8574V18.5693Z"
              fill="#767676"
            />
          </svg>

          <img class="item__image" :alt="type" v-else :src="image" />
          <span class="item__name">
            {{ name }}
          </span>
          <img
            v-if="children"
            src="@/assets/arrow-forward.svg"
            alt="view folder"
          />
          <img v-if="hasTick(id) > -1" src="@/assets/tick.svg" alt="check" />
        </li>
      </ul>
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from '../components/BaseModal.vue';
import { fetchFolders } from '../helpers';
export default {
  components: { BaseModal },
  name: 'file-explorer',
  data() {
    return {
      fileStructure: {},
      selectedFiles: [],
      activeFolderId: '',
      innerIndex: 0
    };
  },
  computed: {
    selectedFileNames() {
      return this.selectedFiles.map(({ name }) => name);
    },
    modalTitle() {
      return this.isRootFolder
        ? 'Torstraße 145, 39481 Nürnberg'
        : this.fileStructure[this.activeFolderId]['name'];
    },
    activeFileStructure() {
      if (this.isRootFolder) return this.fileStructure;
      return this.fileStructure[this.activeFolderId]['children'];
    },
    isRootFolder() {
      return this.innerIndex === 0;
    }
  },
  methods: {
    handleClick({ id, name, children }) {
      if (!children) {
        this.handleFileClick({ id, name });
        return;
      }
      this.innerIndex += 1;
      this.activeFolderId = id;
    },
    handleFileClick({ id, name }) {
      const index = this.hasTick(id);
      if (index === -1) {
        this.selectedFiles.push({ id, name });
      } else {
        this.selectedFiles = this.selectedFiles.filter(
          ({ id: fileId }) => fileId !== id
        );
      }
    },
    handelBackButton() {
      this.innerIndex -= 1;
    },
    hasTick(id) {
      const index = this.selectedFiles.findIndex(
        ({ id: fileId }) => fileId === id
      );
      return index;
    }
  },
  async created() {
    this.fileStructure = await fetchFolders();
  }
};
</script>

<style lang="scss" scoped>
.selected-files {
  max-width: 400px;
  width: 100%;
  padding: 1rem 0.75rem;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0.625rem;
  }
}
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
    text-transform: capitalize;
  }
  &__image {
    border-radius: 8px;
    width: 28px;
    height: 28px;
    object-fit: cover;
  }
}
</style>
