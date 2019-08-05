<template>
  <div>
    <svg style="position: absolute; width: 0; height: 0; display: none;">
      <symbol id="icon-arrow" viewBox="0 0 96 96">
        <title>Arrow</title>
        <path
          d="M39.66,13.34A8,8,0,0,0,28.34,24.66L51.69,48,28.34,71.34A8,8,0,0,0,39.66,82.66l29-29a8,8,0,0,0,0-11.31Z"
        />
      </symbol>
    </svg>

    <div class="wrapper">
      <!-- <h1>Calendar</h1> -->
      <!-- <div class="sticky-header">
        <span>Calendar</span>
      </div>-->
      <div class="table">
        <div class="headers">
          <div class="buttons">
            <button class="btn-left">
              <svg>
                <use xlink:href="#icon-arrow" />
              </svg>
            </button>
            <button class="btn-right">
              <svg>
                <use xlink:href="#icon-arrow" />
              </svg>
            </button>
          </div>
          <div class="scroller syncscroll" name="myElements">
            <div class="track time">
              <div class="heading">Time</div>
            </div>
            <div class="track">
              <div class="heading">Monday</div>
            </div>
            <div class="track">
              <div class="heading">Tuesday</div>
            </div>
            <div class="track">
              <div class="heading">Wednesday</div>
            </div>
            <div class="track">
              <div class="heading">Thursday</div>
            </div>
            <div class="track">
              <div class="heading">Friday</div>
            </div>
            <div class="track">
              <div class="heading">Saturday</div>
            </div>
            <div class="track">
              <div class="heading">Sunday</div>
            </div>
          </div>
        </div>
        <div class="tracks syncscroll" name="myElements">
          <div class="track time">
            <div class="entry">
              <time>09.00</time>
            </div>
            <div class="entry">
              <time>10.00</time>
            </div>
            <div class="entry">
              <time>11.00</time>
            </div>
            <div class="entry">
              <time>12.00</time>
            </div>
            <div class="entry">
              <time>13.00</time>
            </div>
            <div class="entry">
              <time>14.00</time>
            </div>
            <div class="entry">
              <time>15.00</time>
            </div>
            <div class="entry">
              <time>16.00</time>
            </div>
            <div class="entry">
              <time>17.00</time>
            </div>
          </div>
          <div class="track yellow">
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry double">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere!</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div class="track turq">
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div class="track blue">
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry double">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
          </div>
          <div class="track green">
            <div class="entry treble">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, omnis voluptas?</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
          </div>
          <div class="track purple">
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry double">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry"></div>
          </div>
          <div class="track gray">
            <div class="entry"></div>
            <div class="entry">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry treble">
              <div class="details">
                <h3>Lorem ipsum dolor sit.</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div class="entry"></div>
            <div class="entry"></div>
          </div>
          <div class="track">
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
            <div class="entry"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const btnR = document.querySelector(".btn-right");
    const btnL = document.querySelector(".btn-left");
    const tracks = document.querySelector(".tracks");
    const tracksW = tracks.offsetWidth;

    btnR.addEventListener("click", () => {
      tracks.scrollBy({
        left: tracksW / 2,
        behavior: "smooth"
      });
    });

    btnL.addEventListener("click", () => {
      tracks.scrollBy({
        left: -tracksW / 2,
        behavior: "smooth"
      });
    });

    let observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        document.body.classList.add("reveal");
      } else {
        document.body.classList.remove("reveal");
      }
    });
    observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
  }
};
</script>


<style lang="scss" scoped>
$body-bg: #fdfdfd;
$thead-bg: #f7f9fb;
$thead-color: hsl(210, 5%, 40%);
$bd-color: #ebebeb;
$time-color: hsl(210, 5%, 70%);

$time-width: 75px;
$sticky-height: 40px;

$theme-color: hsl(40, 50%, 30%);
$theme-bg: #ffd800;

body {
  background: $body-bg;
  overflow-x: hidden;
}

.wrapper {
  padding: 15px;
  margin: 10em auto 30em;
  margin: 0em auto 10em;
  max-width: 1080px;
}

h1 {
  font-size: 9vmin;
  text-align: center;
  line-height: 1;
  color: #333;
  font-family: "Courgette", cursive;
}

.sticky-header {
  height: $sticky-height;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $body-bg;
  z-index: 7;
  position: sticky;
  top: 0;
  font-weight: 700;
  overflow: hidden;
}

.sticky-header span {
  opacity: 0;
  transform: translateY(-100%);
  transition: 0.4s;
}

.reveal .sticky-header span {
  opacity: 1;
  transform: none;
}

.table {
  position: relative;
  border: solid $bd-color;
  border-width: 0 1px 0 0;
  overscroll-behavior: contain;
}

.headers {
  top: $sticky-height;
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.04);
}

.tracks,
.scroller {
  display: flex;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

.scroller {
  overflow-x: hidden;
  flex: 1;
}

.tracks {
  overflow: auto;
}

.tracks::-webkit-scrollbar,
.scroller::-webkit-scrollbar {
  display: none;
}

.track {
  flex: 1 0 22%;
}

.track + .track {
  margin-left: -1px;
}

.time {
  flex: 0 0 $time-width;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
}

.headers .time {
  z-index: 5;
}

.tracks .time {
  box-shadow: 20px 0 50px rgba(0, 0, 0, 0.05);
}

time {
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.03em;
}

time {
  color: hsl(210, 5%, 70%);
  text-align: right;
}

.time .heading {
  justify-content: flex-end;
  padding-right: 1em;
  font-weight: 500;
  background: #f9f9f9;
}

.heading {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  border: solid $bd-color;
  border-width: 1px;
  color: hsla(210, 5%, 40%, 1);
  z-index: 1;
  background: $thead-bg;
  font-weight: 700;
}

.entry {
  border: 1px solid #ebebeb;
  border-top: 0;
  background: $body-bg;
  height: 9em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.entry:not(:last-of-type) {
  border-bottom-style: dashed;
}

.track:last-of-type > div {
  border-right: 0;
}

.time .entry,
.time .heading {
  position: relative;
  border-color: transparent $bd-color $bd-color transparent;
  border-color: transparent $bd-color transparent transparent;
}

.time .entry:after,
.time .heading:after {
  content: "";
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 50%;
  height: 1px;
  z-index: 3;
  background: linear-gradient(to left, $bd-color, $body-bg);
}

.double {
  height: 18em;
}
.treble {
  height: 27em;
}

.details {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid #ebecee;
  padding: 10px;
  border-left: 5px solid $theme-bg;
  height: 100%;
}

h3 {
  font-size: 12px;
  background: $theme-bg;
  padding: 2px 5px;
  font-weight: 600;
  line-height: 1.4;
  border-radius: 2px;
  color: $theme-color;
  width: max-content;
}

// .yellow {
//   $theme-color: hsl(40, 50%, 30%);
//   $theme-bg: #ffd800;
// }

// .turq {
//   $theme-color: hsl(180, 50%, 30%);
//   $theme-bg: #00facd;
// }

// .blue {
//   $theme-color: hsl(200, 50%, 30%);
//   $theme-bg: #52f0fa;
// }

// .purple {
//   $theme-color: hsl(235, 75%, 90%);
//   $theme-bg: #473bbe;
// }

// .green {
//   $theme-color: #2d4710;
//   $theme-bg: #86f250;
// }

// .gray {
//   $theme-color: $thead-bg;
//   $theme-bg: #bbbcbc;
// }

p {
  font-size: 12px;
  color: #333;
  font-weight: 500;
  margin: 0;
}

p + p {
  color: #858585;
  margin-top: 5px;
  font-weight: 400;
}

.buttons {
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 6;
  height: 100%;
  padding: 1px 0;
  width: calc(100% - $time-width);
}

button {
  border-radius: 0;
  border: 0;
  padding: 5px;
  font: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none !important;
  cursor: pointer;
  background: $thead-bg;
}

button > svg {
  line-height: 0;
  width: 30px;
  height: 30px;
  fill: $thead-color;
  pointer-events: none;
}

.btn-left {
  transform: scaleX(-1);
}

#top-of-site-pixel-anchor {
  position: absolute;
  width: 1px;
  height: 1px;
  top: 15em;
  left: 0;
}

@media (max-width: 767px) {
  .track:not(.time) {
    flex: 1 0 calc(50% + 7px);
  }
}
</style>
