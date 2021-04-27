<!--
 * @Author: zhouxs
 * @Date: 2021-04-27 11:40:56
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-04-27 11:53:19
 * @Description: file content
-->
<template>
  <div id="user-list">
      <div class="media" v-for="user in users" :key="user">
              <h4 class="media-heading" v-text="user.name"></h4>
      </div>
  </div>
</template>

<script>
var ws = new WebSocket('ws://localhost:3000/ws/chat');

ws.onmessage = function(event) {
    var data = event.data;
    console.log(data);
    var msg = JSON.parse(data);
    if (msg.type === 'list') {
        vmUserList.users = msg.data;
    } else if (msg.type === 'join') {
        addToUserList(vmUserList.users, msg.user);
        addMessage(vmMessageList.messages, msg);
    } else if (msg.type === 'left') {
        removeFromUserList(vmUserList.users, msg.user);
        addMessage(vmMessageList.messages, msg);
    } else if (msg.type === 'chat') {
        addMessage(vmMessageList.messages, msg);
    }
};
export default {
  data: () => {
    return {
      users: []
    }
  }
}
</script>