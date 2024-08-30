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
    <span v-if="item.type===1">
            {{ item.from_user_id_label }} >>>>>>> {{ item.content.text }} >>>>>>>>>  {{ item.created_at }}
    </span>
    <span v-else-if="item.data.type===1">
      {{ item.data.from_user_id_label }} >>>>>>> {{ item.data.content.text }} >>>>>>>>>  {{ item.data.created_at }}
    </span>
    <span v-else>
      {{ item }}
    </span>

  </li>
</template>

<style scoped>

</style>