<template>
  <el-container>
    <!--侧边-->
    <el-aside width="280px" class="hidden-sm-and-down">
      <div class="new-blog-box">
        <div class="new-blog-header-box">
          <span>最新文章</span>
        </div>
        <div class="new-blog-content-box" v-for=" newBlog in newBlogList" :key="newBlog.id"
             @click="goDetail(newBlog.id)">
          <div class="item-head">
            {{ newBlog.title }}
          </div>
          <div class="item-body">
            <div>
              <i class="el-icon-view" style="margin-right: 2px"></i>{{ newBlog.viewCount }}
            </div>
            <div>
              <i class="el-icon-time" style="margin-right: 2px"></i>{{ newBlog.createTime }}
            </div>
          </div>
        </div>
      </div>
      <div class="tag-clod-box">
        <div class="tag-clod-header-box">
          <span>标签云</span>
        </div>
        <!--        <easy-tag-cloud style="width: 250px;height: 250px" :config="tagCloudConfig" :tag-list="hotTag"-->
        <!--                        @clickTag="clickTagItem"></easy-tag-cloud>-->
      </div>
    </el-aside>
    <!--文章主体-->
    <el-main>
      <!--精选博客轮播图-->
      <div class="top-blogs-box hidden-sm-and-down">
        <div class="top-blogs-header">精选博客</div>
        <el-carousel :interval="8000" type="card" height="35vh">
          <el-carousel-item v-for="topBlog in topBlogs" :key="topBlog.id" @click.native="goDetail(topBlog.id)">
            <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 90%;">
              <div
                style="font-size: 25px;font-weight: bold;color: #FFFFFF;overflow-wrap: break-spaces;overflow-x: hidden;text-overflow: ellipsis">
                <span>{{ topBlog.title }}</span>
              </div>
              <div style="margin-top: 20px;font-size: 15px;color: #EEEEEE">
                <span>{{ topBlog.description }}</span>
              </div>
            </div>
            <el-image :src="topBlog.headPic" fit="contain" class="carousel-image"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--文章类型tabs-->
      <div style="color: #c8c9cc;margin-bottom: 5px;font-weight:bold">博客分类</div>
      <el-tabs @tab-click="handleTabsClick" v-model="pageParam.typeId">
        <el-tab-pane :label="blogType.typeName" :name="blogType.id" v-for="blogType in typeList" :key="blogType.id">
          <el-card :body-style="{ padding: '0px' }" shadow="always" style="margin-bottom: 10px;cursor: pointer"
                   v-for="blogItem in pageData.records" :key="blogItem.id" @click.native="goDetail(blogItem.id)">
            <div class="card-body">
              <div class="body-text-box">
                <div class="text-header">
                  <span>{{ blogItem.title }}</span>
                </div>
                <div class="text-body">
                  <span>{{ blogItem.description }}</span>
                </div>
                <!--                <div class="text-tag-box">-->
                <!--                  <el-tag type="success">spring</el-tag>-->
                <!--                </div>-->
              </div>
              <div class="body-img-box">
                <el-image :src="blogItem.headPic" fit="scale-down"></el-image>
                <!--                <img :src="blogItem.headPic"-->
                <!--                     style="height: 185px;width: 185px">-->
              </div>
            </div>
          </el-card>
          <div class="page-box">
            <el-pagination v-if="pageData.total>10"
                           @current-change="pageChange"
                           background
                           layout="prev, pager, next"
                           :total="pageData.total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import { typeList } from '@/api/blogType'
import { tagList } from '@/api/blogTag'
import { new10, page, top10 } from '@/api/blog'

export default {
  name: 'Blog',
  data () {
    return {
      windowHeight: 0,
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        typeId: ''
      },
      pageData: {},
      topArticle: {},
      newBlogList: [],
      topBlogs: [],
      typeList: [],
      hotTag: [],
      tagCloudConfig: {
        radius: 80,
        maxFont: 18,
        rotateAngleXbase: 500
      }
    }
  },
  methods: {
    doGetTagList () {
      tagList().then(res => {
        this.hotTag = res.data
      })
    },
    doGetNew10 () {
      new10().then(res => {
        if (res.status) {
          this.newBlogList = res.data
        }
      })
    },
    doGetTop () {
      top10().then(res => {
        if (res.status) {
          this.topBlogs = res.data
        }
      })
    },
    doGetTypeList () {
      typeList().then(res => {
        this.typeList = res.data
        this.pageParam.typeId = res.data[0].id
        this.doPage()
      })
    },
    doPage () {
      page(this.pageParam).then(res => {
        this.pageData = res.data
        console.log(res)
      })
    },
    pageChange (index) {
      this.pageParam.pageNumber = index
      this.doPage()
    },
    handleTabsClick (tabObj) {
      this.pageParam.typeId = tabObj.name
      this.doPage()
    },
    clickTagItem (tag) {
      console.log(tag)
    },
    goDetail (blogId) {
      this.$router.push({
        name: 'BlogDetail',
        params: {
          blogId: blogId
        }

      })
    }

  },
  created () {
    // 查询标签列表
    this.doGetTagList()
    //
    this.doGetNew10()
    this.doGetTop()
    // 查询博客类型集合
    this.doGetTypeList()
    this.windowHeight = window.innerHeight - 60
  }
}
</script>

<style lang="scss" scoped>

.carousel-image {
  z-index: -1;
  -webkit-filter: blur(5px); /* Chrome, Opera */
  -moz-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}

.el-container {
  width: 100%;

  .el-aside {
    width: 30%;
    padding: 10px;
    border-right: solid 1px #EEEEEE;

    .new-blog-box {
      margin-bottom: 20px;
      height: 50vh;
      overflow: hidden;

      .new-blog-header-box {
        font-size: 14px;
        font-weight: bold;
        color: #c8c9cc;
      }

      .new-blog-content-box {
        margin-top: 10px;
        font-size: 12px;
        margin-left: 5px;
        margin-right: 5px;
        color: black;
        cursor: pointer;

        .item-head {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .item-body {
          font-size: 10px;
          margin-top: 3px;
          display: flex;
          justify-content: space-between;
          color: #9E9E9E;
        }
      }
    }

    .tag-clod-box {
      .tag-clod-header-box {
        font-size: 14px;
        font-weight: bold;
        color: #c8c9cc;
      }
    }

  }

  .el-main {
    width: 70%;
    padding: 10px;

    .top-blogs-box {
      .top-blogs-header {
        color: #c8c9cc;
        font-weight: bold;
      }

    }

    .card-body {
      display: flex;
      flex-direction: row;

      .body-text-box {
        width: 70%;
        padding: 15px;

        .text-header {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .text-body {
          color: #9E9E9E;
        }

        .text-tag-box {
          margin-top: 5px;
        }
      }

      .body-img-box {
        width: 30%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }

    .page-box {
      margin-top: 20px;
      margin-bottom: 30px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>
