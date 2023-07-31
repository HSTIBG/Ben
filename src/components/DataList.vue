<template>
    <div>
      <ul>
        <li v-for="item in dataList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dataList: [],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:3000/api/data')
          .then((response) => {
            this.dataList = response.data;
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      },
    },
  };
  </script>
  