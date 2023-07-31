<template>
  <div class="user-management">
    <h1>管理员信息管理</h1>
    <div class="search-form">
      <input type="text" v-model="searchKeyword" placeholder="输入关键词搜索">
      <button @click="searchUser">搜索</button>
    </div>
    <form class="user-form" @submit.prevent="addUser">
      <h2>添加管理员</h2>
      <div class="form-group">
        <label for="name">姓名：</label>
        <input type="text" id="name" v-model="newUser.name" required>
      </div>
      <div class="form-group">
        <label for="gender">性别：</label>
        <select id="gender" v-model="newUser.gender" required>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      <div class="form-group">
        <label for="age">年龄：</label>
        <input type="number" id="age" v-model="newUser.age" required>
      </div>
      <div class="form-group">
        <label for="address">地址：</label>
        <input type="text" id="address" v-model="newUser.address" required>
      </div>
      <button type="submit">添加</button>
    </form>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.address }}</td>
          <td class="operation">
            <!-- <button @click="viewUser(user)">查看</button> -->
            <button @click="editUser(user)">编辑</button>
            <button @click="deleteUser(user)" class="delete-btn">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal" v-if="selectedUserData">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>管理员详情</h2>
        <p>ID: {{ selectedUserData.id }}</p>
        <p>姓名: {{ selectedUserData.name }}</p>
        <p>性别: {{ selectedUserData.gender }}</p>
        <p>年龄: {{ selectedUserData.age }}</p>
        <p>地址: {{ selectedUserData.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userList: [],
      selectedUserData: null,
      newUser: {
        name: '',
        gender: '',
        age: '',
        address: '',
      },
      searchKeyword: '',
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:3000/admin')
        .then(response => {
          this.userList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addUser() {
      axios.post('http://localhost:3000/admin', this.newUser)
        .then(response => {
          console.log(response.data);
          this.fetchUsers();
          this.resetForm();
        })
        .catch(error => {
          console.error(error);
        });
    },
    editUser(user) {
      const updatedName = prompt('请输入新的姓名', user.name);
      if (updatedName) {
        const updatedUser = { ...user, name: updatedName };
        axios.put(`http://localhost:3000/admin/${user.id}`, updatedUser)
          .then(response => {
            console.log(response.data);
            this.fetchUsers();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    deleteUser(user) {
      if (confirm(`确定要删除管理员 ${user.name} 吗？`)) {
        axios.delete(`http://localhost:3000/admin/${user.id}`)
          .then(response => {
            console.log(response.data);
            this.fetchUsers();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    closeModal() {
      this.selectedUserData = null
    },
    resetForm() {
      this.newUser = {
        name: '',
        gender: '',
        age: '',
        address: '',
      };
    },
    searchUser() {
      axios.get(`http://localhost:3000/admin?q=${this.searchKeyword}`)
        .then(response => {
          this.userList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
}
</script>

<style scoped>
.user-management {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.search-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-form input {
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

.search-form button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #42b983;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
}

.user-form {
  margin-bottom: 30px;
}

.user-form h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  width: 80px;
  font-size: 16px;
}

.form-group input, .form-group select {
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

button[type="submit"] {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #42b983;
  color: #fff;
  cursor: pointer;
}

.user-table {
  border-collapse: collapse;
  width: 100%;
}

.user-table th {
  font-size: 16px;
  text-align: center;
  padding: 18px 8px;
  color: #fff;
  background-color: #42b983;
  border: none;
}

.user-table td {
  font-size: 14px;
  padding: 10px 8px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.user-table .operation {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-table button {
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}

.user-table .delete-btn {
  background-color: #f44336;
  color: #fff;
  margin-left: 6px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin-top: 10%;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  margin: auto;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.close:hover {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>