<template>
  <div class="welcome">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg">
      <!-- slot引用变量 -->
      <template #default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </HelloWorld>
    {{ title }}{{ count }}
    <my-input :label="input.label" :type="input.type" :value.sync="input.value"></my-input>
    <button @click="handleAdd">add</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HelloWorld from '../components/HelloWorld'
import Input from '../components/Input'
import { myMixin } from '../mixins/myMixin'

export default {
  name: 'Welcome',
  components: {
    HelloWorld,
    'my-input': Input,
  },
  mixins: [myMixin],
  data: function() {
    return {
      msg: 'Welcome',
      title: 'redux count:',
      input: {
        type: 'number',
        label: 'addition: ',
        value: 0,
      },
    }
  },
  computed: mapState({
    count: state => state.count,
  }),
  methods: {
    handleChange: function(newValue) {
      console.log('newValue:', newValue) //eslint-disable-line
      this.msg = newValue
    },
    handleAdd: function() {
      this.$store.dispatch('increment', this.input.value)
    },
  },
  beforeRouteLeave: (to, from, next) => {
    const answer = window.confirm('确认退出？')
    if (answer) {
      next()
    } else {
      next(false)
    }
  },
}
</script>

<style scoped>
.welcome {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
