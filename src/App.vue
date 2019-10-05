<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  height: 100%;
}
#content {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
