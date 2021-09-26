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
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageList: [1, 2, 3, 4],
    };
  },
  computed: {
    pageMax() {
      return Math.ceil(this.total / this.limit);
    },
  },
  created() {
    this.initData();
  },
  watch: {
    page(val) {
      if (val <= 3) {
        this.pageList = [];
        var i = 1;
        do {
          this.pageList.push(i);
          i++;
        } while (i <= this.pageMax);
        this.pageList.length > 4 && (this.pageList = this.pageList.slice(0, 4)); 
      } else if (val === this.pageMax) {
        this.pageList = [val - 3, val - 2, val - 1, val];
      } else if (val === this.pageMax - 1) {
        this.pageList = [val - 2, val - 1, val, val + 1];
      } else {
        this.pageList = [val - 1, val, val + 1];
      }
    },
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
    initData() {
      this.pageList = []; 
      var i = 1;
      do {
        this.pageList.push(i);
        i++;
      } while (i <= this.pageMax);
      this.pageList.length > 4 && (this.pageList = this.pageList.slice(0, 4)); 
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "~/assets/css/themes.scss";
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
    background: transparent;
    font-weight: 500;
    cursor: pointer;
    @include themeify {
      color: themed("color-17173a");
    }
  }
  .page_active {
    @include themeify {
      background: themed("color-e8e8eb") !important;
    }
    border-radius: 3px;
  }
  &_com {
    display: inline-block;
    font-weight: 600;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    margin: 0 5px;
    color: #17173a;
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
        fill: #17173a !important;
      }
    }
  }
}
</style>
