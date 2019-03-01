<template>
  <div id="home">
    <div class="background-icons">
      <div class="triangle triangle-one"></div>
      <div class="triangle triangle-two"></div>
      <div class="triangle triangle-three"></div>
      <div class="triangle triangle-four"></div>
      <div class="triangle triangle-five"></div>
      <div class="circle circle-one"></div>
      <div class="circle circle-two"></div>
      <div class="circle circle-two"></div>
      <div class="circle circle-three"></div>
      <div class="circle circle-four"></div>
      <div class="circle circle-five"></div>
    </div>
    <section class="banner">
      <div class="banner__background">
        <img src="../assets/images/background-banner.png" alt="" width="950px">
      </div>
      <div class="banner__title">
        <h1>Founder Summit 2019</h1>
        <p class="banner__title--catchline">L’événement qui rassemble les différents experts de la tech lyonnaise pour vous aider à créer ou à développer vos projets.</p>
      </div>
      <div class="banner__countdown">
        <div class="banner__countdown--date">
          <div class="content">
            <span class="date day">04</span>
            <span class="date">avril 2019</span>
          </div>
        </div>
        <div class="banner__countdown--badge">Commence dans</div>
        <div class="banner__countdown--time">
          <div v-if="timeLeft > 0" class="value">
            <div><span v-if="days < 10">0</span>{{ days }}</div>
            <div><span v-if="hours < 10">0</span>{{ hours }}</div>
            <div><span v-if="minutes < 10">0</span>{{ minutes }}</div>
            <div><span v-if="seconds < 10">0</span>{{ seconds }}</div>
          </div>
          <div v-else class="value notimeleft">
            <span>L'évènement a commencé</span>
          </div>
          <div v-if="timeLeft > 0" class="label">
            <span>j.</span>
            <span>h.</span>
            <span>m.</span>
            <span>s.</span>
          </div>
        </div>
        <div class="banner__countdown--buttons">
          <div class="btn btn-red">S'inscrire</div>
          <div class="btn btn-white">En savoir plus</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      timeLeft: null
    }
  },
  methods: {
    countDown() {
      const countDownDate = new Date('Apr 4, 2019 12:00:00').getTime()
      const self = this
      const x = setInterval(function() {
        const now = new Date().getTime()
        const distance = countDownDate - now
        self.timeLeft = distance

        self.days = Math.floor(distance / (1000 * 60 * 60 * 24))
        self.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        self.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        self.seconds = Math.floor((distance % (1000 * 60)) / 1000)
      }, 0)
    }
  },
  mounted() {
    this.countDown()
  }
}
</script>


<style lang="postcss" scoped>
.banner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  height: 100vh;
  align-content: center;
  padding-top: 50px;
  &__background {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
  }
  &__title {
    margin-top: 50px;
    &--catchline {
      padding: 0 5px;
      margin-top: 60px;
      line-height: 20px;
    }
  }
  &__countdown {
    width: 451px;
    height: 361px;
    box-shadow: var(--shadow);
    border-radius: 3px;
    position: relative;
    padding: 110px 40px 45px 40px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    justify-self: end;
    background-color: white;
    &--date {
      position: absolute;
      top: -70px;
      transform: translateX(-50%);
      left: 50%;
      border-radius: 3px;
      height: 150px;
      width: 267px;
      background-color: var(--color-lightred);
      display: flex;
      justify-content: center;
      align-items: center;
      .content {
        display: flex;
        flex-flow: column;
        .date {
          color: var(--color-red);
          font-size: 3em;
          font-family: var(--font-head-medium);
          &.day {
            font-size: 4.5em;
          }
        }
      }
    }
    &--badge {
      width: 122px;
      font-size: 0.75em;
      text-align: center;
      padding: 6px 0;
      border-radius: 3px;
      font-family: var(--font-head-medium);
      color: var(--color-red);
      box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.1);
      animation: ping 1.8s ease-in-out infinite both;
    }
    &--time {
      width: 100%;
      font-family: var(--font-head-medium);
      .value {
        display: grid;
        grid-template-columns: repeat(4, 55px);
        font-size: 3em;
        justify-content: space-between;
        div {
          &:last-child {
            color: var(--color-gray);
            justify-self: end;
          }
        }
        &.notimeleft {
          grid-template-columns: 1fr;
          font-size: 1.9em;
        }
      }
      .label {
        display: grid;
        grid-template-columns: repeat(4, 55px);
        justify-content: space-between;
        justify-items: end;
        font-size: 1.125em;
        color: var(--color-gray);
      }
    }
    &--buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .btn-white {
        width: 169px;
      }
    }
  }
}
@keyframes ping {
  0% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.15);
  }
  50% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.1);
  }
  100% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.15);
  }
}
</style>
