<template>
    <div class="pagination">
        <div class="block">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizeOptions"
                :page-size.sync="pageSize"
                layout="prev, pager, next, total, sizes, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        currentPage: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            pageSizeOptions: [10, 20, 30]
        };
    },
    methods: {
        // 分页每页条数改变事件
        async handleSizeChange(val) {
            try {
                await this.$listeners.target('change', {
                    pageNo: this.currentPage - 1,
                    pageSize: val
                });
                // 翻页 要把表格滚动条回到顶部
                this.tableScrolltop(this.$listeners.target('getTable'));
            } catch (error) {
                console.error(error);
            }
        },
        // 分页选择第几页
        async handleCurrentChange(val) {
            try {
                await this.$listeners.target('change', {
                    pageNo: val - 1,
                    pageSize: this.pageSize
                });
                this.tableScrolltop(this.$listeners.target('getTable'));
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * element表格滚动条回到顶部 一般在表格翻页使用
         * @param {string}} tableRef 表格ref值
         */
        tableScrolltop(tableRef) {
            this.$nextTick(() => {
                tableRef.bodyWrapper.scrollTop = 0;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.pagination {
    margin-top: 10px;
    .el-pagination {
        padding: 0;
        text-align: right;
    }
}
</style>