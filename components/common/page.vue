<template>
  <div class="page">
    <span
      class="page_side"
      @click="prevChange()"
      style="transform: rotate(180deg)"
    >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-right"></use>
      </svg>
    </span>
    <span v-if="pageList[2] - 2 > 1" class="page_com">···</span>
    <span
      v-for="pageNum in pageList"
      :key="pageNum"
      class="page_item"
      @click="pageChange(pageNum)"
      :class="page == pageNum ? 'page_active' : ''"
      >{{ pageNum }}</span
    >
    <span v-if="pageMax > 4 && pageMax - page > 1" class="page_com">···</span>
    <span class="page_side" @click="nextChange()">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-right"></use>
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // 内容总数
    total: {
      type: Number,
      default: 0,
    },
    // 每页数量
    limit: {
      type: Number,
      default: 10,
    },
    // 当前页码
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageList: [1, 2, 3, 4], // 页码列表
    };
  },
  computed: {
    // 最大页数
    pageMax() {
      return Math.ceil(this.total / this.limit);
    },
  },
  created() {
    // 我的框架是mpvue，vue用created
    this.initData();
  },
  watch: {
    // 监听页码变化 -> 页码列表更新
    page(val) {
      if (val <= 3) {
        this.pageList = [];
        var i = 1;
        do {
          this.pageList.push(i);
          i++;
        } while (i <= this.pageMax);
        this.pageList.length > 4 && (this.pageList = this.pageList.slice(0, 4)); // 最多显示5页
      } else if (val === this.pageMax) {
        this.pageList = [val - 3, val - 2, val - 1, val];
      } else if (val === this.pageMax - 1) {
        this.pageList = [val - 2, val - 1, val, val + 1];
      } else {
        this.pageList = [val - 1, val, val + 1];
      }
    },
    // 监听页码变化 -> 总数更新
    total(val) {
      this.initData();
    },
  },
  methods: {
    prevChange() {
      if (this.page - 1 < 1) {
        this.pageChange(1);
      } else {
        this.pageChange(this.page - 1);
      }
    },
    nextChange() {
      if (this.page + 1 > this.pageMax) {
        this.pageChange(this.pageMax);
      } else {
        this.pageChange(this.page + 1);
      }
    },
    pageChange(page) {
      this.$emit("page-change", page);
    },
    // 生成pageList页码列表
    initData() {
      this.pageList = []; // 清空页码
      var i = 1;
      do {
        this.pageList.push(i);
        i++;
      } while (i <= this.pageMax);
      this.pageList.length > 4 && (this.pageList = this.pageList.slice(0, 4)); // 最多显示5页
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page {
  display: flex;
  height: 30px;
  align-items: center;
  &_item {
    display: inline-block;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    color: #121212;
    font-weight: 500;
    cursor: pointer;
    .page_active {
      background: #ededf0;
      border-radius: 3px;
    }
  }
  &_com {
    display: inline-block;
    font-weight: 600;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    margin: 0 5px;
    color: #121212;
    justify-content: center;
    font-size: 12px;
  }
  &_side {
    width: 32px;
    height: 28px;
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      width: 20px;
      height: 20px;
      &:hover {
        fill: #121212 !important;
      }
    }
  }
}
</style>
