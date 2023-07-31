<template>
  <div class="container">
    <div class="a">
      <div class="b" @mouseover="rotatecard" @click="flipcard">
      <div class="c">欢迎</div>
      <div class="d">welcom</div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data() {
  return{
    cardFlipped:true
  };
},
methods:{
  rotatecard() {
    const card = document.querySelector('.b');
    card.style.transform = 'rotateY(180deg)';
    //旋转Y轴180°
  },
  flipcard(){
    this.cardFlipped = !this.cardFlipped;
    if(this.cardFilpped){
      const card = document.querySelector('.b');
      card.style.transform = 'rotateY(0deg)';
    } else{
      const card = document.querySelector('.b');
      card.style.transform = 'rotateY(180deg)';
    }
    setTimeout(this.goToPage, 3000);
  },
    goToPage() {
      this.$router.push('./bbb');
    } 
}
};

</script>

<style scoped>
body {
  background-color: rgb(60, 60, 70) !important;
}

.container {
  display: flex;
  justify-content: center;
  perspective: 1000px;
}
.a {
  width: 300px;
  height: 400px;
  position: relative;
  top: 100px;
}

.a:hover .b {
  transform: rotateY(180deg);
}

.b {
  width: 300px;
  height: 400px;
  background-color: #000;
  display: flex;
  justify-content: center;
  transform-style: preserve-3d;
  background-image: url("../assets/image/1.gif");
  transition: 1.5s;
  box-shadow: 0 0 20px #000;
}

.c,
.d {
  position: absolute;
  color: rgba(255, 255, 255, 0.8);
  font: 900 60px '';
 
  letter-spacing: 10px;
  line-height: 400px;
}

.c {
  transform: translateZ(70px);
}

.d {
  transform: translateZ(-70px) rotateY(180deg);
}
</style>