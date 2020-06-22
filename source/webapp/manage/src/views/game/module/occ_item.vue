<template>
    <div class="item__warp">
        <el-image style="width: 200px; height: 200px" :src="value.url"></el-image>
        <p>身份名</p>
        <p>创建时间</p>
        <p>身份描述</p>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style lang="scss" scoped>
.item__warp {
    background-color: white;
    width: 230px;
    padding: 15px;
    box-sizing: border-box;
}
.el-image__error {
    width: 100%;
}
</style>