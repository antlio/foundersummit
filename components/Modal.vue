<template>
  <div v-if="isVisible" @click="isVisible = !isVisible" class="modal">
    <div @click.stop class="modal__content">
      <div class="modal__content--header">
        <canvas id="confetti"></canvas>
        <h2>Merci pour votre présence</h2>
        <div @click="isVisible = !isVisible" class="cross__container">
          <img src="~/assets/icons/cross.svg"  class="cross__container--element" alt="cross icon" />
        </div>
      </div>
      <div class="modal__content--body">
        <div class="body__text">
          <div class="metrics-container">
            <div class="metrics-container__element">
              <span>19</span>
              <span>Intervenants</span>
            </div>
            <div class="metrics-container__element">
              <span>35</span>
              <span>Participants</span>
            </div>
            <div class="metrics-container__element">
              <span>250</span>
              <span>Meetings</span>
            </div>
          </div>
          <div class="modal__footer">
            <p>Être tenu informé de la seconde édition</p>
            <span @click="slide" class="btn btn-red">Suivant</span>
          </div>
        </div>
        <div v-if="!subscribed" class="body__email">
          <p>Vous êtes entrepreuneur, porteur de projet, et souhaitez (re)participer à la prochaine édition du Founder Summit ? </p>
          <form @submit.prevent="createProspect">
            <input aria-label="text" v-model="full_name" type="text" placeholder="Prénom et Nom">
            <input aria-label="email" v-model="email" type="email" placeholder="Email">
            <button class="btn btn-red" :disabled="!isEmailValid()">
              <svg v-if="loading" class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
              <span v-else id="post">S'inscrire</span>
            </button>
          </form>
        </div>
        <div v-else class="body__text">
          <h3>Merci, vous serez tenu informé de la prochaine édition</h3>
          <span @click="isVisible = !isVisible" class="btn btn-red" style="width: 100%; font-size: 14px;">Accéder au site</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isVisible: true,
      full_name: "",
      email: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      loading: false,
      subscribed: false
    };
  },
  methods: {
    isEmailValid() {
      return this.email == "" ? "" : this.reg.test(this.email);
    },
    confettis() {
      var canvas = document.getElementById("confetti");
      var ctx = canvas.getContext("2d");
      //canvas dimensions
      var W = window.innerWidth;
      var H = 600;
      canvas.width = W;
      canvas.height = H;

      //particles
      var mp = 150; //max particles
      var types = ["circle", "circle", "triangle", "triangle"];
      var colors = [
        [255, 233, 231],
        [253, 245, 231],
        [30, 221, 136],
        [98, 221, 245],
        [255, 201, 107]
      ];
      var angles = [[6, 0, 6, 6], [4, 4, 0, 6], [0, 6, 4, 4], [0, 6, 6, 6]];
      var particles = [];
      for (var i = 0; i < mp; i++) {
        particles.push({
          x: Math.random() * W, //x-coordinate
          y: Math.random() * H, //y-coordinate
          r: Math.random() * 4 + 1, //radius
          d: Math.random() * mp, //density
          l: Math.floor(Math.random() * 65 + -30), // line angle
          a: angles[Math.floor(Math.random() * angles.length)], // triangle rotation
          c: colors[Math.floor(Math.random() * colors.length)], // color
          t: types[Math.floor(Math.random() * types.length)] //shape
        });
      }

      function draw() {
        ctx.clearRect(0, 0, W, H);

        for (var i = 0; i < mp; i++) {
          var p = particles[i];
          var op = p.r <= 3 ? 0.4 : 0.8;

          if (p.t == "circle") {
            ctx.fillStyle = "rgba(" + p.c + ", " + op + ")";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.fill();
          } else if (p.t == "triangle") {
            ctx.fillStyle = "rgba(" + p.c + ", " + op + ")";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.r * p.a[0], p.y + p.r * p.a[1]);
            ctx.lineTo(p.x + p.r * p.a[2], p.y + p.r * p.a[3]);
            ctx.closePath();
            ctx.fill();
          }
        }
        update();
      }

      function update() {
        for (var i = 0; i < mp; i++) {
          var p = particles[i];
          p.y += Math.cos(p.d) + 1 + p.r / 2;
          p.x += Math.sin(0) * 2;

          if (p.x > W + 5 || p.x < -5 || p.y > H) {
            particles[i] = {
              x: Math.random() * W,
              y: -10,
              r: p.r,
              d: p.d,
              l: p.l,
              a: p.a,
              c: p.c,
              t: p.t
            };
          }
        }
      }

      //animation loop
      setInterval(draw, 23);
    },
    slide() {
      const text = document.querySelector(".body__text");
      const email = document.querySelector(".body__email");
      text.style.right = "500px";
      email.style.right = "0px";
    },
    createProspect() {
      this.loading = true;
      axios
        .post("https://api.trello.com/1/cards", {
          name: this.full_name,
          desc: `Email : ${this.email}`,
          idList: process.env.trelloList,
          keepFromSource: "all",
          key: process.env.trelloKey,
          token: process.env.trelloToken
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      setTimeout(() => {
        this.loading = false;
        this.subscribed = true;
      }, 1500);
    }
  },
  mounted() {
    this.confettis();
  }
};
</script>


<style lang="postcss" scoped>
.modal {
  display: block;
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  &__content {
    z-index: -1;
    background-color: white;
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    border-radius: 3px;
    width: 100%;
    max-width: 500px;
    overflow: hidden;
    &--header {
      width: 100%;
      background-color: #d73c3c;
      overflow: visible;
      mask: url(~assets/images/modal-banner.svg) no-repeat;
      mask-size: cover;
      max-height: 200px;
      height: 200px;
      margin-bottom: 20px;
      .cross__container {
        width: 25px;
        height: 25px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        margin: 10px;
        cursor: pointer;
        position: absolute;
        &--element {
          width: 15px;
        }
      }
      h2 {
        position: absolute;
        top: 0;
        margin-top: 50px;
        color: white;
        text-align: center;
        font-family: var(--font-head-medium);
        width: 100%;
        z-index: 0;
      }
    }
    &--body {
      position: relative;
      height: 300px;
      .body__text,
      .body__email {
        transition: 0.5s;
        position: absolute;
        width: 100%;
        padding: 30px 40px;
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
      }
      .body__text {
        align-items: center;
        text-align: center;
        font-family: var(--font-head-medium);
        right: 0;
        bottom: 0;
        .metrics-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
          &__element {
            height: 90px;
            display: flex;
            flex-flow: column;
            justify-content: center;
            margin: 20px;
            &:first-child {
              background: url(~assets/images/speaker.svg) no-repeat center;
              background-size: contain;
            }
            &:nth-child(2) {
              background: url(~assets/images/attendees.svg) no-repeat center;
              background-size: contain;
            }
            &:last-child {
              background: url(~assets/images/meeting.svg) no-repeat center;
              background-size: contain;
            }
            span {
              &:first-child {
                font-size: 3em;
              }
              &:last-child {
                color: var(--color-yellow);
              }
            }
          }
        }
        .modal__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875em;
          position: relative;
          width: 100%;
          border-top: 1px solid #e6e6e6;
          padding-top: 30px;
          span {
            width: 120px;
            height: 45px;
            font-size: 14px;
            padding-right: 10px;
            position: relative;
            &:after {
              content: "";
              background: url(~assets/images/arrow-right.svg) no-repeat;
              background-size: cover;
              height: 11px;
              width: 6px;
              position: absolute;
              right: 25px;
            }
          }
        }
      }
      .body__email {
        right: -500px;
        font-size: 14px;
        p {
          line-height: 20px;
        }
        form {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          height: 175px;
          input,
          button {
            width: 100%;
            font-size: 14px;
            height: 45px;
          }
          input {
            background-color: #e5e5e5;
            border-radius: 3px;
            border: 0;
            box-sizing: border-box;
            padding-left: 20px;
            font-family: var(--font-head-medium);
            &::placeholder {
              color: #7a7a7a;
              font-family: var(--font-head-medium);
            }
          }
          button {
            color: white;
            border: 0;
            &:disabled {
              filter: grayscale(100%);
              opacity: 0.5;
            }
            .spinner {
              animation: rotate 2s linear infinite;
              z-index: 2;
              width: 20px;
              height: 20px;
              .path {
                stroke: white;
                stroke-linecap: round;
                animation: dash 1.5s ease-in-out infinite;
              }
            }
            @keyframes rotate {
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes dash {
              0% {
                stroke-dasharray: 1, 150;
                stroke-dashoffset: 0;
              }
              50% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -35;
              }
              100% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -124;
              }
            }
          }
        }
      }
    }
  }
}

@media (--mobile) {
  .modal {
    &__content {
      &--body {
        .body__text {
          padding: 30px;
          .metrics-container {
            grid-gap: 20px;
            &__element {
              margin: 0;
            }
          }
          .modal__footer {
            flex-flow: column;
            p {
              margin-bottom: 30px;
            }
            span {
              width: 100%;
            }
          }
        }
        .body__email {
          padding: 10px 30px 30px 30px;
        }
      }
    }
  }
}

@media (--mobile) and (orientation: landscape) {
  .modal {
    &__content {
      height: 100%;
      overflow-y: scroll;
    }
  }
}
</style>
