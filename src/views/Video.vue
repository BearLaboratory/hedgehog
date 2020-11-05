<template>
  <el-container>
    <el-main>
      <div class="video-box">
        <iframe src="//player.bilibili.com/player.html?aid=795922919&bvid=BV1FC4y1a72Q&cid=199229032&page=1"
                class="iframe-style"></iframe>
      </div>
      <div class="video-message-box">
        <span>万能有线键盘转无线键盘转换器</span>
        <div class="message-detail">
          <span>10000次观看.2020年10月10日</span>
          <div class="detail-like">
            <i class="el-icon-star-on" style="color: red">1000</i>
            <i class="el-icon-edit">100</i>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <div class="comment-box">
        <span>评论</span>
      </div>
    </el-main>
    <el-aside width="400px">
      <el-card shadow="always">
        <div class="list-header">
          <span>视频列表</span>
        </div>
        <div class="video-item" v-for="video in videoList" :key="video.id">
          <el-image
            style="width: 80px; height: 80px"
            :src="video.headPic"
            fit="fit">
          </el-image>
          <div class="video-desc-box">
            <div>{{video.title}}</div>
            <div class="desc-time">{{video.createTime}}</div>
          </div>
        </div>

        <div class="pagination-box">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-card>

    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
      videoList: [
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    .el-main {
      display: flex;
      flex-direction: column;
      align-items: center;

      .video-box {
        width: 100%;
        height: 500px;

        .iframe-style {
          width: 100%;
          height: 500px;
        }
      }

      .video-message-box {
        width: 100%;
        margin-top: 20px;
        height: 100px;
        font-size: 20px;
        font-weight: bold;

        .message-detail {
          margin-top: 10px;
          font-size: 15px;
          display: flex;
          justify-content: space-between;

          .detail-like {
            align-items: center;

            .i {
              padding-left: 10px;
            }
          }
        }
      }

      .comment-box {
        width: 100%;
        color: #999999;
        font-size: 20px;

      }
    }

    .el-aside {
      padding-top: 20px;
      display: flex;
      justify-content: center;

      .el-card {
        .list-header {
          font-size: 20px;
          font-weight: bold;
          color: #9E9E9E;
          margin-bottom: 20px;
        }

        .video-item {
          height: 80px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .video-desc-box {
            margin-left: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #757575;

            .desc-time {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
            }

          }

        }

        .pagination-box {
          width: 100%;
        }
      }

    }
  }

</style>
