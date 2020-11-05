<template>
  <div>
    <el-row :gutter="10">
      <!--左侧-->
      <el-col :span="4" class="hidden-sm-and-down">
        <div style="height: 100px;"></div>
      </el-col>
      <!--主体-->
      <el-col :lg="16" :xl="16">
        <el-row>
          <el-col :span="24">
            <div class="index-search-box">
              <el-input v-model="keyword" placeholder="请输入内容" clearable @keyup.enter.native="doSearch"
                        class="local-input" ref="indexInput"></el-input>
              <el-button slot="append" type="primary" @click="doSearch">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--右侧-->
      <el-col :span="4" class="hidden-sm-and-down">
        <div style="height: 100px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { doSearchApi } from '@/api/search'

export default {
  name: 'Search',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    doSearch () {
      doSearchApi({ keyword: this.keyword }).then(res => {
        console.warn(res)
      })
    }
  },
  created () {
    if (JSON.stringify(this.$route.query) !== '{}') {
      this.keyword = this.$route.query.keyword
      // 如果keyword部位空就进行搜索
      if (this.keyword && this.keyword !== '') {
        this.doSearch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.index-search-box {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;

  .el-button {
    border-left: 0;
    width: 120px;
    border-radius: 0 5px 5px 0;
  }

}

</style>
