<template>
  <div class="container py-5">
    <h1>404</h1>
    <p>抱歉， 你搜尋的頁面路徑: <code>{{ $route.params.notFound }}</code> 不存在</p>
    <router-link :to="{ name: 'tasks' }">回到我的任務清單</router-link>
  </div>
</template>