<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <canvas ref="salesChart"></canvas>
      </div>
      <div class="col-md-4">
        <canvas ref="revenueChart"></canvas>
      </div>
      <div class="col-md-4">
        <canvas ref="profitChart"></canvas>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6">
        <canvas ref="customerChart"></canvas>
      </div>
      <div class="col-md-6">
        <canvas ref="productChart"></canvas>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col text-center">
        <input type="checkbox" v-model="showTable" @click="toggleTable">显示表格数据</input>
      </div>
    </div>
    <div class="row mt-4" v-if="showTable">
      <div class="col-md-12">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">序号</th>
              <th scope="col">名称</th>
              <th scope="col">销售额</th>
              <th scope="col">收入</th>
              <th scope="col">利润</th>
              <th scope="col">客户数量</th>
              <th scope="col">销售量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.sales }}</td>
              <td>{{ item.revenue }}</td>
              <td>{{ item.profit }}</td>
              <td>{{ item.customers }}</td>
              <td>{{ item.products }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
 import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  data() {
    return {
      data: [
        { name: '产品 A', sales: 110, revenue: 132, profit: 54, customers: 25, products: 50 },
        { name: '产品 B', sales: 70, revenue: 98, profit: 32, customers: 15, products: 25 },
        { name: '产品 C', sales: 120, revenue: 154, profit: 63, customers: 20, products: 40 },
        { name: '产品 D', sales: 85, revenue: 104, profit: 38, customers: 18, products: 30 },
        { name: '产品 E', sales: 100, revenue: 132, profit: 50, customers: 22, products: 35 },
      ],
      showTable: false,
    };
  },
  mounted() {
    const salesCtx = this.$refs.salesChart.getContext('2d');
    const salesChart = new Chart(salesCtx, {
      type: 'bar',
      data: {
        labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        datasets: [
          {
            label: '销售额',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    const revenueCtx = this.$refs.revenueChart.getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
      type: 'pie',
      data: {
        labels: ['画册', '绿植', '画舫', '外景', '清新'],
        datasets: [
          {
            label: '收入',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });

    const profitCtx = this.$refs.profitChart.getContext('2d');
    const profitChart = new Chart(profitCtx, {
      type: 'line',
      data: {
        labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        datasets: [
          {
            label: '利润',
            data: [8, 12, 4, 2, 6, 5, 10],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    const customerCtx = this.$refs.customerChart.getContext('2d');
    const customerChart = new Chart(customerCtx, {
      type: 'bar',
      data: {
        labels: ['A客户', 'B客户', 'C客户', 'D客户', 'E客户'],
        datasets: [
          {
            label: '客户数量',
            data: [50, 30, 20, 40, 60],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    const productCtx = this.$refs.productChart.getContext('2d');
    const productChart = new Chart(productCtx, {
      type: 'bar',
      data: {
        labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
        datasets: [
          {
            label: '销售量',
            data: [100, 80, 120, 90, 110],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
  },
};
</script>