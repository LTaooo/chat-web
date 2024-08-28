<script setup>
import {computed, ref, watch} from "vue";

  const props = defineProps({
    massages: {
      type: Array,
      default: []
    }
  });
</script>

<template>
  <li v-for="item in massages">
    {{item.from_user_id_label}} >>>>>>> {{item.content.text}} >>>>>>>>>               {{item.created_at}}
  </li>
</template>

<style scoped>

</style>