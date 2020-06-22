<template>
    <div>
        <div class="list__warp">
            <div class="item">
                <occItem />
            </div>
        </div>
        <pagination :currentPage="page.pageNo+1" :pageSize="page.pageSize" :total="page.total" />
    </div>
</template>

<script>
import occItem from './module/occ_item';
export default {
    components: {
        occItem
    },
    data() {
        return {
            page: {
                pageSize: 10,
                pageNo: 0,
                total: 100
            },
            data: []
        };
    }
};
</script>

<style lang="scss" scoped>
.list__warp {
    padding: 30px;
    box-sizing: border-box;
}
</style>