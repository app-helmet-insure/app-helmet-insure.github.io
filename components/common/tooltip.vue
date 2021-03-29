<template>
  <div class="tooltip">
    <div class="name">{{ name }}</div>
    <div class="hint-box">
      <i class="hint-icon">
        <svg
          t="1617039040708"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1287"
          width="16"
          height="16"
        >
          <path
            d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
            p-id="1288"
          ></path>
        </svg>
      </i>
      <div class="hint" :style="widthStyle">{{ hint }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'p-tooltip',
  props: {
    hint: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default: '',
    },
    width: {
      type: String,
      default: '200px',
    },
  },
  computed: {
    widthStyle() {
      return {
        width: this.width,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/base.scss';
.icon {
  width: 20px;
  height: 20px;
}
.tooltip {
  display: flex;
  align-items: center;
  .hint-box {
    position: relative;
    font-size: 0px;
    .hint-icon {
      cursor: help;
      margin-left: 4px;
      svg {
        fill: rgba(164, 162, 178, 1);
      }
      &:hover {
        svg {
          fill: #fd8a2b;
        }
        & + .hint {
          display: block;
        }
      }
    }
    .hint {
      display: none;
      position: absolute;
      min-width: 200px;
      padding: 10px;
      border-radius: 4px;
      color: $text-g;
      background: $border;
      left: 50%;
      top: 24px;
      transform: translate(-50%, 0%);
      font-size: 12px;
      &::after {
        content: '';
        width: 0px;
        height: 0px;
        border: 6px solid transparent;
        border-bottom: 6px solid $border;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0%);
        top: -10px;
      }
    }
  }
}
</style>
