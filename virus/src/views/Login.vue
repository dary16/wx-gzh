<template>
  <div class="login">
    <van-nav-bar
      title="个人基本信息填报"
      right-text="关闭"
    />
    <van-form
      validate-first
      @submit="onSubmit"
    >
      <van-field
        v-model="user.name"
        name="性名"
        label="性名"
        placeholder="请输入性名"
        :rules="nameRules"
      />
      <van-field
        name="radio"
        label="性别"
      >
        <template #input>
          <van-radio-group
            v-model="user.sex"
            direction="horizontal"
          >
            <van-radio name="n">男</van-radio>
            <van-radio name="v">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="user.nation"
        type="password"
        name="民族"
        label="民族"
        placeholder="民族"
        :rules="[{ required: true, message: '请填写民族' }]"
      />
      <van-field
        v-model="user.nativePlace"
        name="籍贯"
        label="籍贯"
        placeholder="籍贯"
        :rules="[{ required: true, message: '请填写籍贯' }]"
      />
      <van-field
        v-model="user.ID"
        name="身份证"
        label="身份证"
        placeholder="身份证"
        :rules="[{ required: true, message: '请填写身份证' }]"
      />
      <van-field
        v-model="user.phoneNum"
        type="number"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="user.address"
        name="住址"
        label="住址"
        placeholder="填写身份证上的住址"
        :rules="[{ required: true, message: '请填写住址' }]"
      />
      <van-field
        name="switch"
        label="现住址是否在高新区"
      >
        <template #input>
          <van-switch
            v-model="user.gaoxin"
            size="20"
          />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
    // 页面数据集合
    data() {
      this.nameRules = [
        { required: true, message: '请输入姓名' }
      ]
      return {
        user: {
          name: 'q',
          password: '',
          sex: '',
          nation: '',
          nativePlace: '',
          ID: '',
          phoneNum: '',
          address: '',
          gaoxin: false,
          nowAddress: '',
          firstName: ''
        }
      }
    },
    // 实例化之前触发事件
    beforeCreate() {

    },
    // 实例化之后触发事件
    created() { },
    // 实时监控data参数数据变化
    computed: {},
    // 执行方法
    methods: {
      onSubmit() {
        console.log(this.user);
      }
    },
    // 加载完毕后触发
    mounted() {
        // this.$get('/meituApi',{"page":1}).then(res=>{
        //     console.log(res);
        // })
     },
    // 路由退出时候调用
    beforeRouteLeave(to, from, next) { next() }
  }
</script>

<style scoped lang="less">
</style>

