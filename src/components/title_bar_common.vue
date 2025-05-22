<template>
    <div class="header">
      <div class="head_img">
        <img src="/icon.svg" alt="" width="40px">
        <div class="head_label">Jackett Helper</div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style scoped>
  .p-button:disabled{
    color: rgb(180, 180, 180) !important;
  }
  .menus{
    display: flex;
    align-items: center;
  }
  .signout_area{
    display: flex;
    width: 180px;
  }
  .signout{
    margin-right: 20px;
    margin-left: auto;
  }
  .head_label{
    margin-left: 15px;
    font-size: 18px;
  }
  .header{
    width: 100vw;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #f0f0f0;
    z-index: 10;
    justify-content: space-between;
    user-select: none;
    height: 60px;
    background-color: white;
  }
  .head_img{
    margin-left: 30px;
    width: 180px;
    display: flex;
    align-items: center;
  }
  </style>