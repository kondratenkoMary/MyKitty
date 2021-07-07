<template>
  <div>
    <div class="main">
      <div class="menu-panel">
        <div class="content-menu-panel">
          <div class="content-items">
            <nuxt-link class="content-links" to="/doctors">Список докторов</nuxt-link>
            <nuxt-link class="content-links" to="/patients">Список пациентов</nuxt-link>
            <nuxt-link class="content-links" to="/illness">Список заболеваний</nuxt-link>
            <nuxt-link class="content-links" to="/appointments">Страница записей</nuxt-link>
          </div>
        </div>
      </div>
       <div class="curtain">
           <div class="title-with-img">
              <img class="menu-main-image" src="/images/iconDisp.svg.png">
              <h1 class="menu-title">Диспансер</h1>
          </div>
      </div>
  </div>
   <div class="content">
      <Nuxt />
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.menu-panel {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #8abcfc;
  width: 300px;
  height: 100vh;
  z-index: 2;

}

.menu-main-image{
  width: 50px;
  height: 50px;
}

.content-menu-panel {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.content-items {
  margin-top: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.title-with-img{
  display: flex;
  align-items: center;
}

.menu-title {
font-family: 'Roboto', sans-serif;
  font-size: 48px;
  color:#f6fca1;
  margin:0 0 0 10px;
}

.curtain {
  position: fixed;
  top: 0;
  left:0;
  width: 100%;
  display: flex;
  z-index: 2;
  background:  #302a68;
  padding: 16px 10px;
  /* background:rgba(255, 255, 255, 0.3); */
}

.content-links {
  width: 270px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
  font-family: Roboto;
  text-decoration: none;
  font-size: 30px;
  text-align: center;
  color: #302a68;
}
/* .content-links-active{

} */

.main {
  background-color: #e5e5e5;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #e5e5e5;
}

.content {
  padding-left: 400px;
  padding-top: 90px;
}
</style>
