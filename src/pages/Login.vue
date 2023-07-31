<template>
  <div id="app" class="my-component">
    <div class="container">
      <img src="../assets/bg.jpg" alt="">
      <div class="panel">
        <div class="content login">
          <div class="switch">
            <span :class="{active: active === 'login'}" @click="go('login')">登录</span>
            <span>/</span>
            <span :class="{active: active === 'register'}" @click="go('register')">注册</span>
          </div>
          <div class="form" id="fromLogin">
            <template v-if="active === 'register'">
              <div class="input">
                <input :class="{hasValue : registerForm.Username}" v-model="registerForm.Username" type="text" name="Username" id="Username"/>
                <label for="email"> 账号</label>
              </div>
              <div class="input">
                <input :class="{hasValue : registerForm.Password}" v-model="registerForm.Password" type="password" name="Password" id="Password"/>
                <label for="email">密码</label>
              </div>
              <div class="input">
                <input :class="{hasValue : registerForm.repeat}" v-model="registerForm.repeat" type="password" name="repeat" id="repeat"/>
                <label for="repeat">确认密码</label>
              </div>
              <button type="submit" @click="submit('register')">注册</button>
            </template>
            <template v-else>
              <div class="input">
                <input :class="{hasValue : loginForm.Username}" v-model="loginForm.Username" type="text" name="Username" id="Username"/>
                <label for="email"> 账号</label>
              </div>
              <div class="input">
                <input :class="{hasValue : loginForm.Password}" v-model="loginForm.Password" type="password" name="Password" id="Password"/>
                <label for="email">密码</label>
              </div>
              <button type="submit" @click="submit('login')">登录</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      active: "login",
      registerForm: {
        email: "",
        Username: "",
        Password: "",
        repeat: "",
      },
      loginForm: {
        Username: "",
        Password: "",
      },
    };
  },
  methods: {
    go(type) {
      this.active = type;
    },
    login() {
      let username = this.loginForm.Username;
      let password = this.loginForm.Password;
      axios
        .post("http://localhost:4000/api/login", { username, password })
        .then((response) => {
          if (response.data.code === 0) {
            Message.success("账号密码正确，可以进入了");
            this.$router.push("/content");
          } else {
            Message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          Message.error("登录失败，请稍后再试");
        });
    },
    register() {
      let username = this.registerForm.Username;
      let password = this.registerForm.Password;
      let repeat = this.registerForm.repeat;
      axios
        .post("http://localhost:4000/api/register", { username, password, repeat })
        .then((response) => {
          if (response.data.code === 0) {
            Message.success("注册成功！");
            this.go("login");
          } else {
            Message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          Message.error("注册失败，请稍后再试！");
        });
    },
    submit(type) {
      if (type === "login") {
        console.log("login", this.loginForm);
        this.login();
      } else {
        console.log("register", this.registerForm);
        if (this.registerForm.Password !== this.registerForm.repeat) {
          Message.error("两次输入的密码不一致！");
          return;
        }
        this.register();
      }
    },
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      const loggedIn = localStorage.getItem('token');
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!loggedIn) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        } else {
          next();
        }
      } else {
        next();
      }
    });
  },
  components: {
    Message,
  },
};
</script>

<style scoped> 



.container{
    /* 相对定位 */
    position: relative;
    width: 70rem;
    height: 100%; /* 设置高度为100% */
    display: flex; /* 水平 + 垂直居中 */
    justify-content: center;
    align-items: center;
}

.container img{
    width: 70rem;
}

.switch span{
    color: #ccc;
    font-size: 1.4rem;
    /* 鼠标放上变小手 */
    cursor: pointer;
}
.switch span.active{
    color: rgb(181,154,254);
}

.panel{
    width: 30%;
    margin: 10rem 0 0;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
}

.form{
    width: 12rem;
    margin: 3rem 0 0;
}

.form .input{
    position: relative;
    opacity: 1;
    height: 2rem;
    width: 100%;
    margin: 2rem 0;
    transition: 0.4s;
}

.form input{
    outline: none;
    width: 100%;
    border: none;
    border-bottom: .1rem solid rgb(181,154,254);
    position: relative;
    line-height: 35px;
    background-color: transparent;
    z-index: 1;
}

.form label{
    position: absolute;
    left: 0;
    top: 20%;
    font-size: 1.2rem;
    color: rgb(129,101,207);
    transition: 0.3s;
}

.hasValue ~ label,input:focus ~ label{
    top: -50%;
    font-size: 0.9rem;
}

.form span{
    display: block;
    color: rgb(110,89,167);
    font-size: 0.8rem;
    cursor: pointer;
}

.form button{
    border: none;
    outline: none;
    margin: 2.5rem 0 0;
    width: 100%;
    height: 3rem;
    border-radius: 3rem;
    background:linear-gradient(45deg,rgb(181,154,254),rgb(245,189,253)) ;
    box-shadow: 0 0 8px rgb(181,154,254);
    cursor: pointer;
    color: white;
    font-family: miaowu;
}

#live2dcanvas{
    border: 0 !important;
}
</style>```