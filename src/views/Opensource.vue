<template>
  <div class="project-list-wrapper">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '10px' }" class="item-wrapper"
                 v-for="projObj in colum1Data"
                 :key="projObj.id"
                 @click.native="goToDetail(projObj.id)"
        >
          <img :src="projObj.headPic"
               style="width: 100%;height: 150px">
          <div class="proj-name-wrapper">
            <span>{{ projObj.projName }}</span>
          </div>
          <div class="proj-info-wrapper">
            <div>新建时间：{{ projObj.createTime }}</div>
            <div>更新时间：{{ projObj.updateTime }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '10px' }" class="item-wrapper"
                 v-for="projObj in colum2Data"
                 :key="projObj.id"
                 @click.native="goToDetail(projObj.id)"
        >
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
               style="width: 100%;height: 150px">
          <div class="proj-name-wrapper">
            <span>{{ projObj.projName }}</span>
          </div>
          <div class="proj-info-wrapper">
            <div>新建时间：{{ projObj.createTime }}</div>
            <div>更新时间：{{ projObj.updateTime }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '10px' }" class="item-wrapper"
                 v-for="projObj in colum3Data"
                 :key="projObj.id"
                 @click.native="goToDetail(projObj.id)"
        >
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
               style="width: 100%;height: 150px">
          <div class="proj-name-wrapper">
            <span>{{ projObj.projName }}</span>
          </div>
          <div class="proj-info-wrapper">
            <div>新建时间：{{ projObj.createTime }}</div>
            <div>更新时间：{{ projObj.updateTime }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--分页组件-->
    <div class="page-box-wrapper" v-if="pageResponseData>1">
      <el-pagination
        :page-size="pageParam.pageSize"
        background
        layout="prev, pager, next"
        :total="pageResponseData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { frontPageApi } from '@/api/opensource'

export default {
  name: 'Opensource',
  data () {
    return {
      pageResponseData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 12
      },
      colum1Data: [],
      colum2Data: [],
      colum3Data: []
    }
  },
  methods: {
    doPageQuery () {
      frontPageApi(this.pageParam).then(res => {
        if (res.status) {
          this.pageResponseData = res.data
          console.log(res.data)
          const dataArray = res.data.records
          for (let i = 0; i < Math.ceil(dataArray.length / 3); i++) {
            this.colum1Data.push(dataArray[i * 3])
            if (dataArray[i * 3 + 1] != null) {
              this.colum2Data.push(dataArray[i * 3 + 1])
            }
            if (dataArray[i * 3 + 2] != null) {
              this.colum3Data.push(dataArray[i * 3 + 2])
            }
          }
        }
      })
    },
    goToDetail (projId) {
      this.$router.push({
        name: 'ProjectDetail',
        params: {
          projId: projId
        }

      })
    }
  },
  created () {
    this.doPageQuery()
  }
}
</script>

<style lang="scss" scoped>
.project-list-wrapper {
  background-color: #F5F5F5;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;

  .item-wrapper {
    cursor: pointer;
    margin-bottom: 20px;

    .proj-name-wrapper {
      width: 100%;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
      font-weight: bold;
    }

    .proj-info-wrapper {
      display: flex;
      justify-content: space-between;
      color: #c8c9cc;
      font-size: 10px;
      margin-top: 10px;

      div {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-x: hidden;
      }
    }
  }

  .page-box-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

</style>
