<!--评论模块-->
<template>
  <div class="container">
    <!--评论头部-->
    <div class="header-box">
      <el-input
        v-model="commentContent"
        type="textarea"
        :rows="3"
        autofocus
        placeholder="写下你的评论"
        :maxlength="maxWords"
        show-word-limit
        @focus="headFocus"
      >
      </el-input>
      <div class="header-btn-transition-box">
        <transition name="el-fade-in">
          <div class="btn-group-box" v-show="focusFlag">
            <span @click="focusFlag=false">取消</span>
            <el-button type="success" @click="commitComment" size="small">确定</el-button>
          </div>
        </transition>
      </div>
    </div>
    <!--评论体-->
    <div class="comment" v-for="(item,index) in comments" :key="index">
      <div class="info">
        <img class="avatar" :src="item.fromUserAvatar" width="36" height="36" alt="用户头像"/>
        <div class="right">
          <div class="name">{{ item.fromUserName }}</div>
          <div class="date">{{ item.createTime }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <!--        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">-->
        <!--          <i class="iconfont icon-like"></i>-->
        <!--          <span class="like-num">{{ item.likeCount > 0 ? item.likeCount + '人赞' : '赞' }}</span>-->
        <!--        </span>-->
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="(subItem,index) in item.replies" :key="index">
          <div class="reply-content">
            <span class="from-name">{{ subItem.fromUserName }}</span><span>: </span>
            <span class="to-name">@{{ subItem.toUserName }}</span>
            <span>{{ subItem.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ subItem.date }}</span>
            <span class="reply-text" @click="showCommentInput(item, subItem)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
          <transition name="el-fade-in">
            <div class="input-wrapper" v-if="currentSubItemId===subItem.id && canComment && canCommentFlag">
              <el-input
                v-model="subCommentContent"
                type="textarea"
                :rows="3"
                autofocus
                :placeholder="replyPlaceHolder"
                :maxlength="maxWords"
                show-word-limit
              >
              </el-input>
              <div class="btn-group-box">
                <span @click="currentSubItemId=null">取消</span>
                <el-button type="success" @click="subCommitComment(subItem)" size="small">确定</el-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="el-fade-in">
        <div class="input-wrapper" v-if="currentSubItemId===item.id && canComment && canCommentFlag">
          <el-input
            v-model="subCommentContent"
            type="textarea"
            :rows="3"
            autofocus
            :placeholder="replyPlaceHolder"
            :maxlength="maxWords"
            show-word-limit
          >
          </el-input>
          <div class="btn-group-box">
            <span @click="currentSubItemId=null">取消</span>
            <el-button type="success" @click="subCommitComment(item)" size="small">确定</el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    comments: {
      type: Array,
      required: true
    },
    maxWords: {
      type: [Number, String],
      required: false,
      default: 200
    },
    canComment: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    canComment (newV, oldV) {
      this.canCommentFlag = newV
    }
  },
  components: {},
  data () {
    return {
      focusFlag: false,
      canCommentFlag: false,
      headerButtonShow: false,
      commentContent: '',
      subCommentContent: '',
      replyPlaceHolder: '',
      currentSubItemId: ''
    }
  },
  computed: {},
  methods: {
    /**
     * 头部输入框获取到焦点
     */
    headFocus () {
      this.focusFlag = true
      this.currentSubItemId = null
    },
    /**
     * 点赞
     */
    likeClick (item) {
      if (item.isLike === null) {
        Vue.$set(item, 'isLike', true)
        item.likeCount++
      } else {
        if (item.isLike) {
          item.likeCount--
        } else {
          item.likeCount++
        }
        item.isLike = !item.isLike
      }
    },
    /**
     * 提交评论
     */
    commitComment () {
      if (this.canCommentFlag) {
        this.$emit('commitComment', {
          content: this.commentContent,
          parentId: null,
          toUserId: null
        })
        this.commentContent = ''
        this.currentSubItemId = null
      } else {
        this.$emit('commentTriggered')
      }
    },
    /**
     *子评论提交
     *
     */
    subCommitComment (item) {
      this.$emit('commitComment', {
        content: this.subCommentContent,
        parentId: item.parentId ? item.parentId : item.id,
        toUserId: item.fromUserId
      })
      this.subCommentContent = ''
      this.currentSubItemId = null
    },

    /**
     * 点击评论按钮显示输入框
     * item: 一级评论
     * subItem: 二级评论
     */
    showCommentInput (item, subItem) {
      if (subItem) {
        if (this.canComment) {
          // 可以评论就显示评论框
          this.replyPlaceHolder = '回复 @' + subItem.fromUserName
          this.currentSubItemId = subItem.id
        } else {
          // 否则触发事件
          this.$emit('commentTriggered')
        }
      } else {
        if (this.canComment) {
          // 可以评论就显示评论框
          this.replyPlaceHolder = '回复 @' + item.fromUserName
          this.currentSubItemId = item.id
        } else {
          // 否则触发事件
          this.$emit('commentTriggered')
        }
      }
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">

@import "../../public/conment";

.btn-group-box {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    color: #9E9E9E;
    cursor: pointer;
  }

  .el-button {
    margin-left: 20px;
  }
}

.container {
  box-sizing: border-box;

  .header-box {
    margin-bottom: 5px;

    .header-btn-transition-box {

    }

    //.btn-group-box {
    //
    //  display: flex;
    //  justify-content: flex-end;
    //  align-items: center;
    //
    //  .cancel {
    //    font-size: 16px;
    //    color: $text-normal;
    //    margin-right: 20px;
    //    cursor: pointer;
    //
    //    &:hover {
    //      color: $text-333;
    //    }
    //  }
    //
    //  .confirm {
    //    font-size: 16px;
    //  }
    //}

  }

  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;

    .info {
      display: flex;
      align-items: center;

      .avatar {
        border-radius: 50%;
      }

      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }

    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }

    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;

      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;

        &.active, &:hover {
          color: $color-main;
        }

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }

      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: $text-333;
        }

        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }

    }

    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;

      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;

        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;

          .from-name {
            color: $color-main;
          }

          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }

        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;

          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }

            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }

      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;

        &:hover {
          color: $text-main;
        }

        .el-icon-edit {
          margin-right: 5px;
        }
      }

      .fade-enter-active, fade-leave-active {
        transition: opacity 0.5s;
      }

      .fade-enter, .fade-leave-to {
        opacity: 0;
      }

      .input-wrapper {
        padding: 10px;

        .gray-bg-input, .el-input__inner {
          /*background-color: #67C23A;*/
        }

        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;

          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }
          }

          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
