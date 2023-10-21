# Cloud




<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <style type="text/css">
        .el-tabs--border-card {background : #fff0}
        .el-tabs--border-card>.el-tabs__content{height:500px}
        el-container{
            width:50px;
            height:100px
        }
    </style>
</head>
<body>
<div id="app">

<el-tabs type="border-card">
<el-tab-pane label="学习">
   fail to load
</el-tab-pane>
<el-tab-pane label="软件">fail to load</el-tab-pane>
<el-tab-pane label="资料">fail to load</el-tab-pane>
<el-tab-pane label="分区1">fail to load</el-tab-pane>
<el-tab-pane label="课程">fail to load</el-tab-pane>
<el-tab-pane label="说明">fail to load</el-tab-pane>
</el-tabs>
</div>
</body>

<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->

<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<script>
    var Main = {
        data() {
            return {
            }
        }
    }
    var Ctor = Vue.extend(Main)
    new Ctor().$mount('#app')


​    

</script>







</html>
