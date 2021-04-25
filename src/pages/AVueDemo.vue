<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="box"
      v-dialogdrag
      :class="{ 'avue-dialog': type === 0 }"
      width="40%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="box = false">取消</el-button>
        <el-button type="primary" @click="openBox(0)">确定</el-button>
      </span>
    </el-dialog>
    <el-button @click="openBox(1)">原生el样式弹窗</el-button>
    <el-button type="primary" @click="openBox(0)">avue样式弹窗</el-button>

    <el-row :span="24">
      <el-col :span="6">
        值： {{ JSON.stringify(form) }}
        <avue-input v-model="form.input" placeholder="请输入内容"></avue-input>
        <avue-input-tree
          default-expand-all
          v-model="form.inputTree"
          placeholder="请选择内容"
          type="tree"
          :dic="dic"
        ></avue-input-tree>
      </el-col>
    </el-row>
    <avue-form :option="option" v-model="formObj" @submit="submit" @error="error"></avue-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: '',
      box: false,
      form: {
        input: 'text',
        inputTree: '',
      },
      formObj: {},
      dic: [
        {
          label: '选项1',
          value: 0,
          children: [
            {
              label: '选项3',
              value: 2,
            },
            {
              label: '选项4',
              value: 3,
            },
          ],
        },
        {
          label: '选项2',
          value: 1,
        },
      ],
      option: {
        column: [
          {
            label: 'name',
            prop: 'name',
            rules: [
              {
                required: true,
                message: '请输入姓名',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '性别',
            prop: 'sex',
            rules: [
              {
                required: true,
                message: '请输入性别',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
    }
  },
  mounted() {},
  methods: {
    openBox(type) {
      this.type = type
      this.box = true
    },
    submit(form, done) {
      this.$message.success(JSON.stringify(form))
      done()
    },
    error(err) {
      this.$message.success('请查看控制台')
      console.log(err)
    },
  },
}
</script>
