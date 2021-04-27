<!--
 * @Author: zhouxs
 * @Date: 2021-04-25 17:14:13
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-04-26 18:15:26
 * @Description: 大文件上传
-->
<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>
<script>
// 切片大小
const SIZE = 10 * 1024 * 1024
export default {
  data: () => ({
    container: {
      file: null,
    },
    data: [],
  }),
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return
      Object.assign(this.$data, this.$options.data())
      this.container.file = file
    },
    // 生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = []
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) })
        cur += size
      }
      return fileChunkList
    },
    // 上传切片
    async uploadChunks() {
      const requestList = this.data
        .map(({ chunk, hash }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('filename', this.container.file.name)
          return { formData }
        })
        .map(async ({ formData }) => {
          this.request({
            url: 'http://localhost:3000/upload',
            data: formData,
          })
        })
      // 并发切片
      await Promise.all(requestList)
      // 合并切片
      await this.mergeRequest()
    },
    async mergeRequest() {
      await this.request({
        url: 'http://localhost:3000/upload/merge',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          filename: this.container.file.name,
        }),
      })
    },
    async handleUpload() {
      if (!this.container.file) return
      const fileChunkList = this.createFileChunk(this.container.file)
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        hash: this.container.file.name + '-' + index,
      }))
      await this.uploadChunks()
    },
    // 用原生 XMLHttpRequest 做一层简单的请求封装
    request({ url, method = 'post', data, headers = {} }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
        xhr.send(data)
        xhr.onload = e => {
          resolve({
            data: e.target.response,
          })
        }
      })
    },
  },
}
</script>
