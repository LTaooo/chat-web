<script setup>
import {ref} from "vue";
import axios from "axios";

const text = ref('');

const props = defineProps({
  token: {
    type: String,
  }
})

const emit = defineEmits(['send'])

function handleSubmit(event) {

  event.preventDefault(); // 阻止表单默认提交行为

  axios.post('http://127.0.0.1:9500/api/im/message/send_text_message', { content: text.value, conversation_id: 1 }, {
    headers: {
      'Authorization': `Bearer ${props.token}`
    }
  })
      .then(response => {
        emit('send', response.data.data)
        // 在这里处理成功的响应
      })
      .catch(error => {
        console.error('Error:', error);
        // 在这里处理错误
      });
}
</script>

<template>
  <form @submit="handleSubmit">
    <textarea v-model="text" name="text" rows="3" cols="50"></textarea>
    <br>
    <button>发送</button>
  </form>
</template>

<style scoped>

</style>