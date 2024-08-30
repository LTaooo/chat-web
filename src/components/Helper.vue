<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import Message from "./Message.vue";
import Send from "./Send.vue";

const getToken = () => {
  axios.post('http://10.10.40.205:9500/api/user/random_helper_auth', {},{
    headers: {
      'Authorization': `Bearer 123`
    }}).then((response) => {
    token.value = response.data.data.token
    ws(response.data.data)
    getMessages(response.data.data)
  })
}

onMounted(() => {

  getToken()
})

const token = ref('')

const getMessages = (data) => {
  axios.get('http://10.10.40.205:9500/api/im/message/list?conversation_id=1&open_source_id=0&open_source_type=3&per_page=5', {
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  }).then((response) => {
    messages.value = response.data.data.data
  })
}

const ws = (data) => {
  // 创建 WebSocket 连接
  const socket = new WebSocket('ws://10.10.40.205:9583/?token=' + data.token);

// 连接成功事件
  socket.onopen = function (event) {
    console.log('WebSocket 连接已建立');

    // 设置心跳间隔时间，每 10 秒发送一次
    setInterval(() => {
      // 发送心跳包
      socket.send(JSON.stringify({type: "heartbeat", "data": "ping"}));
    }, 10000);
  };

// 接收消息事件
  socket.onmessage = function (event) {
    console.log('收到服务器消息：', event.data);
    const decodeData = JSON.parse(event.data);
    if (decodeData.type === 'new_message') {
      messages.value.push(JSON.parse(event.data))
    }
  };

// 连接错误事件
  socket.onerror = function (event) {
    console.error('WebSocket 连接错误：', event);
  };

// 连接关闭事件
  socket.onclose = function (event) {
    console.log('WebSocket 连接已关闭');
  };
}

const messages = ref([])

const sendCallback = (data) => {
  messages.value.push(data)
}

</script>

<template>
  <h3>客服</h3>
  <Message :massages="messages"></Message>
  <Send @send="sendCallback" :token="token"></Send>
</template>

<style scoped>

</style>