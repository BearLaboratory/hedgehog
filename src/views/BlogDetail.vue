<template>
  <div>
    <el-row>
      <el-col :span="4" class="hidden-sm-and-down">
        <div style="height: 100px"></div>
      </el-col>
      <!--文章主体-->
      <el-col :lg="16" :xl="16" style="box-shadow: #9E9E9E">
        <div class="backTop">
          <el-backtop target=".backTop " style="background-color: #FF8C00;box-shadow: 0 0 5px #888888;">
            <i class="el-icon-caret-top" style="color: #ffffff"></i>
          </el-backtop>
          <!--主图盒子-->
          <div style="margin-top: 0px">
            <el-image :src="blogData.headPic" fit="contain"></el-image>
          </div>
          <!--头部盒子-->
          <div class="head-box">
            <div class="title-box">{{ blogData.title }}</div>
            <div class="info-box">
              <!--更新时间-->
              <div>
                <i class="el-icon-alarm-clock" style="margin-right: 2px"></i>
                更新时间: {{ blogData.updateTime }}
              </div>
              <div style="margin-left: 40px">
                <i class="el-icon-view" style="margin-right: 2px"></i>
                {{ blogData.viewCount }}
                <i :class="isLike?'el-icon-star-on':'el-icon-star-off'"
                   :style="isLike?'margin-right: 2px;margin-left: 10px;color: darkorange;cursor: pointer;font-size: 15px':'margin-right: 2px;margin-left: 10px;color: #c8c9cc;cursor: pointer;font-size: 15px'"
                   @click="doLikeBlog"></i>
                {{ blogData.likeCount }}
              </div>
            </div>
          </div>
          <!--描述盒子-->
          <div class="description-box">
            <span>{{ blogData.description }}</span>
          </div>
          <!--内容盒子-->
          <div class="blog-content-box">
            <div v-html="blogData.content"></div>
          </div>
          <!--评论盒子-->
          <div class="comment-box">
            <div class="comment-header-box">{{ blogData.allowComment ? '精彩评论' : '未开启评论' }}</div>
            <!--评论体-->
            <comment
              :canComment="showComment"
              :comments="commentList"
              v-if="blogData.allowComment"
              @commitComment="doCommitComment"
              @commentTriggered="triggered"
            ></comment>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="hidden-sm-and-down">
        <div style="height: 100px"></div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { getById, getIsLikeApi, likeBlog } from '@/api/blog'
import 'element-ui/lib/theme-chalk/display.css'
import comment from '../components/Comment'
import { addComment, commentList } from '@/api/comment'
import { mapState } from 'vuex'

export default {
  name: 'BlogDetail',
  data () {
    return {
      blogData: {},
      blogId: '',
      commentList: [],
      showComment: false,
      isLike: false
    }
  },
  computed: {
    ...mapState(['token'])
  },
  components: { comment },
  methods: {
    /**
     * 查询用户是否是否喜欢文章
     */
    doGetIsLike () {
      // 如果token存在才去查询
      if (this.token && this.token !== '') {
        getIsLikeApi({ blogId: this.blogData.id }).then(res => {
          if (res.status) {
            this.isLike = res.data
          }
        })
      }
    },
    /**
     * 查询文章详情
     */
    doGetDetail () {
      getById({ blogId: this.$route.params.blogId }).then(res => {
        this.blogData = res.data
        this.doGetComments(res.data.id)
        this.doGetIsLike()
      })
    },
    /**
     * 喜欢博客，必须判断用户是否登录
     */
    doLikeBlog () {
      // 判断是否登录
      if (!this.token || this.token === '') {
        this.$confirm('次操作需要登录', '提示', {
          confirmButtonText: '前往登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 去登录页
          this.$router.push({
            name: 'Login',
            params: {
              fromPath: 'blogDetail/' + this.blogData.id
            }
          })
        })
      } else {
        this.isLike = !this.isLike
        likeBlog({
          blogId: this.blogData.id,
          status: this.isLike
        }).then(res => {
          if (res.status) {
            if (this.isLike) {
              this.blogData.likeCount = this.blogData.likeCount + 1
            } else {
              this.blogData.likeCount = this.blogData.likeCount - 1
            }
          }
        })
      }
    },
    /**
     * 查询博客的评论列表
     * @param bId 博客id
     */
    doGetComments (bId) {
      commentList({ blogId: bId }).then(res => {
        if (res.status) {
          this.commentList = res.data
          console.warn('所有评论:', res.data)
        }
      })
    },
    /**
     * 添加评论
     * @param args
     */
    doCommitComment (args) {
      const commentObj = {}
      commentObj.blogId = this.blogData.id
      commentObj.content = args.content
      commentObj.parentId = args.parentId
      commentObj.toUserId = args.toUserId
      addComment(commentObj).then(res => {
        if (res.status) {
          // 新增成功后 重新加载
          this.doGetComments(this.blogData.id)
        }
      })
    },
    triggered () {
      console.log('评论触发')
      if (!this.token || this.token === '') {
        this.$confirm('次操作需要登录', '提示', {
          confirmButtonText: '前往登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 去登录页
          this.$router.push({
            name: 'Login',
            params: {
              fromPath: 'blogDetail/' + this.blogData.id
            }
          })
        })
      } else {
        this.showComment = true
      }
    }
  },
  created () {
    this.doGetDetail()
  }
}
</script>

<style lang="scss" scoped>

.head-box {
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  color: #696969;

  .title-box {
    font-size: 30px;
  }

  .info-box {
    margin-top: 10px;
    font-size: 14px;
    font-weight: lighter;
    color: #D3D3D3;
    display: flex;
    justify-content: center;
  }
}

.description-box {
  background-color: #c8c9cc;
  padding: 10px;
  margin-top: 40px;
  font-weight: inherit;
  color: white;
  text-indent: 2em;
}

.blog-content-box {
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
  overflow-x: inherit;
}

.comment-box {
  margin-top: 30px;
  border-top: solid 1px #EEEEEE;
  padding-top: 10px;

  .comment-header-box {
    font-size: 15px;
    font-weight: bold;
    color: #9E9E9E;
    margin-bottom: 20px;

  }

}

.backTop {
  height: 90vh;
  overflow-y: scroll;
}

.blog-content-box img, p, span {
  width: 100%;
}
</style>
