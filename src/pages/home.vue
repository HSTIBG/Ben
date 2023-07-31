<template>
  <div class="product-list">
    <div class="add-product">
      <h3>添加新商品</h3>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="商品名称">
              <el-input v-model="newProduct.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="价格">
              <el-input v-model="newProduct.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库存">
              <el-input v-model="newProduct.stock"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分类">
              <el-input v-model="newProduct.category"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" @click="addProduct">添加</el-button>
      </el-form>
    </div>
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="stock" label="库存"></el-table-column>
      <el-table-column prop="category" label="分类"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="isEditDialogVisible" @close="closeEditDialog">
      <h3 v-if="editProduct.id">编辑商品</h3>
      <h3 v-else>添加商品</h3>
      <el-form>
        <el-form-item label="商品名称">
          <el-input v-model="editProduct.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editProduct.price"></el-input>
        </el-form-item>
        <el-form-item label="库存" v-if="editProduct.id">
          <el-input v-model="editProduct.stock"></el-input>
        </el-form-item>
        <el-form-item label="分类" v-if="editProduct.id">
          <el-input v-model="editProduct.category"></el-input>
        </el-form-item>
        <el-button type="primary" @click="saveEdit">{{ editProduct.id ? '保存' : '添加' }}</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      products: [],
      isEditDialogVisible: false,
      editProduct: {},
      newProduct: {},
    };
  },
  methods: {
    fetchData() {
      axios
        .get('http://localhost:5000/api/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    handleEdit(product) {
      this.editProduct = { ...product, stock: product.stock || '', category: product.category || '' };
      this.isEditDialogVisible = true;
    },
    closeEditDialog() {
      this.isEditDialogVisible = false;
    },
    saveEdit() {
      const { id, name, price, stock, category } = this.editProduct;
      if (id) {
        axios
          .put(`http://localhost:5000/api/products/${id}`, {
            name,
            price,
            stock,
            category,
          })
          .then(response => {
            console.log('Successfully updated product:', response.data);
            this.fetchData();
            this.isEditDialogVisible = false;
            Message.success('更新商品成功');
          })
          .catch(error => {
            console.error('Error updating product:', error);
            Message.error('更新商品失败');
          });
      } else {
        axios
          .post(`http://localhost:5000/api/products`, {
            name,
            price,
            stock,
            category,
          })
          .then(response => {
            console.log('Successfully added product:', response.data);
            this.fetchData();
            this.isEditDialogVisible = false;
            Message.success('添加商品成功');
          })
          .catch(error => {
            console.error('Error adding product:', error);
            Message.error('添加商品失败');
          });
      }
    },
    handleDelete(product) {
      axios
        .delete(`http://localhost:5000/api/products/${product.id}`)
        .then(response => {
          console.log('Successfully deleted product:', response.data);
          this.fetchData();
          Message.success('已删除该商品');
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          Message.error('删除商品失败');
        });
    },
    addProduct() {
      const { name, price, stock, category } = this.newProduct;
      axios
        .post(`http://localhost:5000/api/products`, {
          name,
          price,
          stock,
          category,
        })
        .then(response => {
          console.log('Successfully added product:', response.data);
          this.fetchData();
          this.newProduct = {};
          Message.success('添加商品成功');
        })
        .catch(error => {
          console.error('Error adding product:', error);
          Message.error('添加商品失败');
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.add-product {
  margin-bottom: 20px;
}

.el-row {
  margin-bottom: 20px;
}
</style>
