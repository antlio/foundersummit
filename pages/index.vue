<template>
  <div id="home">
    <div class="background-icons">
      <div class="triangle triangle-1"></div>
      <div class="triangle triangle-2"></div>
      <div class="triangle triangle-3"></div>
      <div class="triangle triangle-4"></div>
      <div class="triangle triangle-5"></div>
      <div class="triangle triangle-6"></div>
      <div class="triangle triangle-7"></div>
      <div class="triangle triangle-8"></div>
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
      <div class="circle circle-5"></div>
      <div class="circle circle-6"></div>
      <div class="circle circle-7"></div>
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
          <app-skeleton 
            v-if="loading" 
            width="100%"
            height="10px">
          </app-skeleton>
          <div v-else-if="!loading && timeLeft > 0" class="value">
            <div><span v-if="days < 10">0</span>{{ days }}</div>
            <div><span v-if="hours < 10">0</span>{{ hours }}</div>
            <div><span v-if="minutes < 10">0</span>{{ minutes }}</div>
            <div><span v-if="seconds < 10">0</span>{{ seconds }}</div>
          </div>
          <div v-else class="value notimeleft">
            <span>L'évènement a commencé</span>
          </div>
          <div v-if="!loading && timeLeft > 0" class="label">
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
    <section class="description">
      <div class="description__images">
        <div class="description__images--image"></div>
        <div class="description__images--image"></div>
        <div class="description__images--image"></div>
      </div>
      <div class="description__content">
        <h3>Bienvenue au Founder Summit</h3>
        <p class="description__content--text">Vous souhaitez créer votre entreprise mais vous n’avez pas encore toutes les cartes en main pour le faire ?<br /><br />
          Vous êtes intéressé par le monde de l’entrepreneuriat en général et souhaitez en apprendre plus sur la création d’entreprise ?<br /><br />
          Le <a href="#">Founder Summit</a> vous apportera les réponses dont vous avez besoin.<br /><br />
          Inscrivez-vous à cette demi-journée d’incubation durant laquelle vous pourrez rencontrer des experts métiers de domaines divers, tels que la <strong>comptabilité</strong>, la <strong>levée de fonds</strong>, la <strong>communication</strong> ou encore le <strong>marketing</strong>.
        </p>
        <div class="btn btn-red">S'inscrire</div>
      </div>
    </section>
    <section class="conduct">
      <h2>Le <span class="tag tag-red">déroulement</span></h2>
      <div class="conduct__cards">
        <div v-for="(card, index) in cards" :key="index" class="conduct__cards--card">
          <span class="step">{{ index + 1 }}</span>
          <h4>{{ card.title }}</h4>
          <p class="content">{{ card.content }}</p>
        </div>
      </div>
    </section>
    <section class="slider">
      <h2>Les <span class="tag tag-yellow">intervenants</span></h2>
    </section>
  </div>
</template>

<script>
import SkeletonBox from "@/components/SkeletonBox.vue";

export default {
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      timeLeft: null,
      loading: true,
      cards: [
        {
          title: "Selection d'un intervenant",
          content:
            "Choisissez un ou plusieurs expert(s) métier selon le domaine qui vous intéresse, de la comptabilité à la communication."
        },
        {
          title: "Rencontre avec l'expert",
          content:
            "Vous disposez de 10 minutes avec le fondateur choisi pour discuter de vos problématiques et lui poser toutes les questions nécessaires."
        },
        {
          title: "Gain d'expérience",
          content:
            "Une fois les 10 minutes terminées, vous disposez des réponses à vos questions et pouvez passer à un autre intervenant selon vos besoins."
        }
      ]
    };
  },
  components: {
    "app-skeleton": SkeletonBox
  },
  methods: {
    countDown() {
      const countDownDate = new Date("Apr 4, 2019 12:00:00").getTime();
      const self = this;
      const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        self.timeLeft = distance;

        self.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        self.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        self.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        self.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }, 0);
    }
  },
  mounted() {
    this.countDown();
    this.$nextTick(() => {
      setTimeout(() => (this.loading = false), 200);
    });
  }
};
</script>


<style lang="postcss" scoped>
.banner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  height: 800px;
  align-content: center;
  padding: 50px var(--spacing-base) 0 var(--spacing-base);
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
      animation: ping 2s ease-in-out infinite both;
    }
    &--time {
      width: 100%;
      font-family: var(--font-head-medium);
      display: flex;
      flex-flow: column;
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
.description {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  height: 450px;
  position: relative;
  margin-top: 250px;
  padding: 0 var(--spacing-base);
  &__images {
    &--image {
      border-radius: 3px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
      &:nth-child(2),
      &:last-child {
        left: 120px;
      }
      &:first-child {
        width: 377px;
        height: 283px;
        background: linear-gradient(
            rgba(253, 16, 21, 0.1),
            rgba(253, 16, 21, 0.1)
          ),
          url(../assets/images/le-wagon-talk-1.jpg) no-repeat center;
        background-size: cover;
        margin: 0 auto;
      }
      &:nth-child(2) {
        width: 225px;
        height: 150px;
        background: linear-gradient(
            rgba(253, 16, 21, 0.2),
            rgba(253, 16, 21, 0.2)
          ),
          url(../assets/images/le-wagon-talk-2.jpg) no-repeat center;
        background-size: cover;
        position: absolute;
        top: 0;
        z-index: -1;
        opacity: 0.4;
      }
      &:last-child {
        width: 245px;
        height: 163px;
        background: linear-gradient(
            rgba(253, 16, 21, 0.2),
            rgba(253, 16, 21, 0.2)
          ),
          url(../assets/images/le-wagon-talk-3.jpg) no-repeat center;
        background-size: cover;
        position: absolute;
        bottom: 0;
        z-index: -1;
        opacity: 0.4;
      }
    }
  }
  &__content {
    width: 591px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 20px 0;
    &--text {
      line-height: 20px;
      a {
        color: var(--color-red);
      }
      strong {
        padding: 0 2px;
        position: relative;
        &:before {
          content: "";
          display: inline-block;
          position: absolute;
          bottom: -2px;
          transform: translateX(50%);
          left: -50%;
          width: 100%;
          height: 9px;
          background-color: var(--color-lightyellow);
          border-radius: 2px;
          z-index: -1;
          transition: height 0.15s ease;
        }
        &:hover:before {
          height: 20px;
        }
      }
    }
  }
}
.conduct {
  text-align: center;
  margin-top: 150px;
  position: relative;
  padding: 150px var(--spacing-base);
  width: 100%;
  left: 0;
  &:before {
    content: "";
    position: absolute;
    background: url(../assets/images/conduct-background-1.svg) no-repeat center;
    background-size: cover;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    background: url(../assets/images/conduct-background-2.svg) no-repeat center;
    background-size: cover;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    &:before {
      content: "";
      position: absolute;
      background: url(../assets/images/conduct-line.svg) no-repeat center;
      background-size: contain;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 100%;
      height: 228px;
    }
    &--card {
      display: grid;
      align-content: center;
      justify-content: center;
      grid-gap: 20px;
      margin-top: 40px;
      &:first-child {
        justify-self: start;
      }
      &:nth-child(2) {
        .step {
          padding-top: 40px;
        }
      }
      &:last-child {
        justify-self: end;
      }
      &:first-child,
      &:last-child {
        .step {
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
      }
      .step {
        font-family: var(--font-head-black);
        color: white;
        font-size: 9.375em;
        height: 270px;
      }
      .content {
        padding: 0 25px;
      }
    }
  }
}
.slider {
}
@keyframes ping {
  0% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.15);
  }
  50% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.05);
  }
  100% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.15);
  }
}
</style>
