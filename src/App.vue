<template>
  <div id="app">
    <FileExplorer />
  </div>
</template>

<script>
import FileExplorer from './FileExplorer/Index.vue';
export default {
  name: 'App',
  components: { FileExplorer }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 7.75rem;
}

button {
  background-color: #1890ff;
  color: white;
  border: 1px solid #1890ff;
  padding: 0.3rem 1rem;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  transition: 200ms linear;

  &[disabled] {
    border-color: #d9d9d9;
    background-color: #f5f5f5;
    color: #bfbfbf;
  }

  &.icon {
    padding: 0.75rem;
    background-color: transparent;
    border-color: transparent;

    &:hover {
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
