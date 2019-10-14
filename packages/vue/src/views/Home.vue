<template>
  <Layout>
    <PageContainer class="has-text-white">
      <div style="padding: 1rem">
        <div class="head-title lim-width">
          <br />
          <br />
          <br />
          <br />
          <h1 class="cursive is-size-3">CHULA ENGINNERING STUDENT CONCIL</h1>
          <h1 class="cursive is-size-4">
            กรรมการนิสิตคณะวิศวกรรมศาสตร์
            จุฬาลงกรณ์มหาวิทยาลัย
          </h1>
          <br />
          <br />
          <br />
        </div>
        <hr class="minimal" />
        <br />
        <br />
        <br />
        <br />
        <div class="lim-width">
          <b class="cursive is-size-5">Main Function</b>
          <br />
          <br />
          <br />
          <div class="box__wrapper ้has-text-white cursive columns is-mobile">
            <div class="column" v-for="{label, icon, href} in mainFunctions" :key="label">
              <router-link :to="href" class="box is-inverted is-flex-center has-text-white">
                <div style="text-align: center;">
                  <br />
                  <b-icon :icon="icon" class="is-size-1"></b-icon>

                  <br />
                  <br />
                  <div class="label has-text-white">{{label}}</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <hr class="minimal" />
      <br />
      <br />
      <br />

      <div class="lim-width" align="center">
        <b-icon icon="facebook" pack="fab"></b-icon>
        <b-icon icon="line" pack="fab"></b-icon>
        <b-icon icon="instagram" pack="fab"></b-icon>

        <!-- <img
          src="https://esc.eng.chula.ac.th/assets/images/chula-engineering.png"
          height="30px"
          style="margin-right: 30px;"
        />-->
      </div>
      <!-- <div class="section content">
        <div class="container text-center" align="center">
          <img
            class="footer-logo"
            src="https://esc.eng.chula.ac.th/assets/images/logo-footer.png"
            style="filter: brightness(0);"
            alt
          />

          <p>กรรมการนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</p>
          <br />
          <div class="margin-top-20">
            <a
              href="https://www.facebook.com/escchula"
              class="social-icon social-icon-border social-facebook"
              data-toggle="tooltip"
              data-placement="top"
              title
              data-original-title="Facebook"
            >
              <i class="icon-facebook"></i>
              <i class="icon-facebook"></i>
            </a>

            <a
              href="#"
              class="social-icon social-icon-border social-twitter"
              data-toggle="tooltip"
              data-placement="top"
              title
              data-original-title="Twitter"
            >
              <i class="icon-twitter"></i>
              <i class="icon-twitter"></i>
            </a>
          </div>
        </div>
        <br />
        <div class="copyright">
          <div class="container text-center">
            <div style="margin-bottom: 10px;">
              <img
                src="https://esc.eng.chula.ac.th/assets/images/chula-engineering.png"
                height="30px"
                style="margin-right: 30px;"
              />
            </div>
            <span
              class="is-size-7"
            >© สงวนลิขสิทธิ์, กรรมการนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</span>
          </div>
        </div>
      </div>-->
    </PageContainer>
  </Layout>
</template>

<script>
import Layout from "@/layouts/default";

export default {
  name: "home",
  components: {
    Layout
  },
  data() {
    return {
      mainFunctions: [
        { label: "จองห้องประชุม", icon: "table", href: "/reservation" },
        { label: "เปิด/ปิด โครงการ", icon: "file-alt", href: "/" },
        { label: "ยืม/คืน พัสดุ", icon: "boxes", href: "/" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
a.box.is-inverted {
  transition: all 200ms ease-out;
  border-radius: 25px;
  background-color: #2221;

  height: 100%;
  &:hover {
    transform: scale(1.02) translateY(-5px) rotateY(360deg);
    transform: scale(1.02) translateY(-5px);
  }
}
.lim-width {
  max-width: 800px;
  margin: 0 auto;
}

.box__wrapper:hover a.box.is-inverted:not(:hover) {
  transform: scale(0.98);
  filter: brightness(0.6);
}
</style>
