<script setup>
import {loadScript} from "@paypal/paypal-js";
import {onMounted, ref} from "vue";
import http from "../utils/http.js";
import axios from "axios";

const payButtonRef = ref(null);

onMounted(async () => {
  await render()
});

const orderId = ref('')

const createOrder = async () => {
  const data = await axios.post('http://localhost:9584/paypal/create_order')
  return data.data.data.order_id
}
const render = async () => {
  try {
    const paypal = await loadScript({clientId: "Ac_Rvw7AvBzsr4prWWgxbDwSsNK6sbr9wmowlxP-i3AKo8wuDfcoRADvFg5jO628oYIf0iQDqcWTRusI"});

    try {
      await paypal.Buttons({
        createOrder: async function () {
          orderId.value = await createOrder()
          return orderId.value
        },
        onApprove: function (data) {
          console.log(data)
          // 向后端请求捕获支付
          return fetch('http://localhost:9584/paypal/capture_order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order_id: orderId.value
            })
          }).then(res => res.json()).then(details => {
                alert('Transaction completed by ' + details.payer.name.given_name);
              });
        },
        onError: function (err) {
          console.error(err);
        }
      }).render(payButtonRef.value);
    } catch (error) {
      console.error("failed to render the PayPal Buttons", error);
    }

  } catch (error) {
    console.error("failed to load the PayPal JS SDK script", error);
  }
}

</script>

<template>
  <div ref="payButtonRef"></div> <!-- 更新了 ref 名称 -->
</template>

<style scoped>
</style>
