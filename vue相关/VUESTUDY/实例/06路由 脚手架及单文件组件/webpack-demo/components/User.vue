<template>
    <div class="user">
        <h2>用户列表</h2>
        <ul>
            <li v-for="v in users">{{v}}</li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                users:['tom','jerry','szr','array']
            }
        }
    }
</script>

<style scoped>
/*scoped 表示该样式只在当前组件中有效,为了防止你的组件间样式冲突*/ 
    .user h2{
        color:blue;
    }
</style>