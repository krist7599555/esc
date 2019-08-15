<template>
  <Layout>
    <PageContainer>
      <div class="section content">
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
            <!-- /Social Icons -->
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
      </div>
    </PageContainer>
  </Layout>
</template>

<script>
import Layout from "@/layouts/default";

export default {
  name: "home",
  components: {
    Layout
  }
};
</script>
