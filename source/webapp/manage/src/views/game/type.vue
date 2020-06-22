<template>
    <div class="container">
        <el-table
            :data="data"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
            <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="类型名" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template>
                    <el-button type="text" icon="el-icon-edit">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :currentPage="page.pageNo+1" :pageSize="page.pageSize" :total="page.total" />
    </div>
</template>

<script>
export default {
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
</style>