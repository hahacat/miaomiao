<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<style>
#main {
  height: 100%;
  position: relative;
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
