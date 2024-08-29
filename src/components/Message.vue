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
    <span v-if="item.content.type === 'text'">
      {{item.from_user_id_label}} >>>>>>> {{item.content.text}} >>>>>>>>>               {{item.created_at}}
    </span>
    <span v-else>
        {{item.content}}
    </span>

  </li>
</template>

<style scoped>

</style>