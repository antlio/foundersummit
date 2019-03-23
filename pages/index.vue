<template>
  <div id="home">
    <div class="background-icons">
      <div class="triangle" v-for="triangleEl in 16" :key="triangleEl.id" :class="'triangle-' + triangleEl"></div>
      <div class="circle" v-for="circleEl in 18" :key="circleEl.id" :class="'circle-' + circleEl"></div>
    </div>
    <section class="banner">
      <div class="banner__title">
        <h1>Founder Summit 2019</h1>
        <p class="banner__title--catchline">L'événement qui rassemble les différents experts de la tech lyonnaise pour vous aider à créer ou à développer vos projets.</p>
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
            <span>L'événement a commencé</span>
          </div>
          <div v-if="!loading && timeLeft > 0" class="label">
            <span>j.</span>
            <span>h.</span>
            <span>m.</span>
            <span>s.</span>
          </div>
        </div>
        <div class="banner__countdown--buttons">
          <a id="number3-58542912427" class="btn btn-red" @click="getId($event)">Billetterie</a>
          <a href="#description" class="btn btn-white" v-smooth-scroll="{ duration: 1000, offset: -150 }">En savoir plus</a>
        </div>
      </div>
    </section>
    <section id="description" class="description">
      <div class="description__images">
        <div class="description__images--image">
          <picture>
            <source type="image/webp" srcset="../assets/images/le-wagon-talk-1.webp">
            <source type="image/jpeg" srcset="../assets/images/le-wagon-talk-1.jpg">
            <img src="../assets/images/le-wagon-talk-1.jpg" alt="conference image" />
          </picture>
        </div>
        <div class="description__images--image">
          <picture>
            <source type="image/webp" srcset="../assets/images/le-wagon-talk-2.webp">
            <source type="image/jpeg" srcset="../assets/images/le-wagon-talk-2.jpg">
            <img src="../assets/images/le-wagon-talk-2.jpg" alt="conference image" />
          </picture>
        </div>
        <div class="description__images--image">
          <picture>
            <source type="image/webp" srcset="../assets/images/le-wagon-talk-3.webp">
            <source type="image/jpeg" srcset="../assets/images/le-wagon-talk-3.jpg">
            <img src="../assets/images/le-wagon-talk-3.jpg" alt="conference image" />
          </picture>
        </div>
      </div>
      <div class="description__content">
        <h3>Bienvenue au Founder Summit</h3>
        <p class="description__content--text">Vous souhaitez créer votre startup ou êtes en cours de création mais n’avez pas encore toutes les cartes en main pour le faire ?
          Vous êtes intéressé par le monde de l’entrepreneuriat en général et souhaitez en apprendre plus sur la création d’entreprise ?<br /><br />
          Le <strong>Founder Summit</strong> vous apportera les réponses dont vous avez besoin à travers des entretiens individuels avec l’expert métier choisi en amont par vous-même.<br />
          Vous disposerez de 10 minutes en tête-à-tête avec l’intervenant de votre choix pour exposer vos problématiques.<br /><br/>
          Inscrivez-vous à cette demi-journée d’incubation durant laquelle vous pourrez rencontrer des experts métiers de domaines divers, tels que la <strong>comptabilité</strong>, la <strong>levée de fonds</strong>, la <strong>communication</strong> ou encore le <strong>marketing</strong>.
        </p>
        <a id="number4-58542912427" class="btn btn-red" @click="getId($event)">Billetterie</a>
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
    <section id="intervenants" class="slider">
      <h2>Les <span class="tag tag-yellow">intervenants</span></h2>
      <p class="slider__subtitle">Venez parler aux différents experts métier de la tech présents pour vous lors de cet événement.</p>
      <div class="slider__slides">
        <div class="slider__slides--tabs gradient" @scroll="handleScroll">
          <div v-for="(attendee, index) in attendeesShuffled" :key="index" @click="activeTab = index" :class="['tab', activeTab === index ? 'active' : '']">
            <span class="tab__name">{{ attendee.full_name }}</span>
            <span class="tab__activity">{{ attendee.activity }}</span>
          </div>
        </div>
        <div class="slider__slides--content">
          <div class="content">
            <span class="content__title animated fadeIn" :key="currentTab.title">{{ currentTab.title }}</span>
            <div class="content__photo">
              <transition-group tag="div" class="content__photo--image" name="slide">
                <div v-for="photo in currentTab.photo" :key="photo.url">
                  <img :src="photo.url" :alt="currentTab.full_name + ' photo'">
                </div>
              </transition-group>
            </div>
            <span class="content__fullname" :key="currentTab.full_name">
              <img src="../assets/icons/arrow.svg" v-if="activeTab > 0" @click="activeTab--" class="content__fullname--mobile left" alt="left arrow icon">
              <span class="animated fadeIn">{{ currentTab.full_name }}</span>
              <img src="../assets/icons/arrow.svg" v-if="activeTab < 14" @click="activeTab++" class="content__fullname--mobile right" alt="right arrow icon">
            </span>
            <span class="content__activity animated fadeIn" :key="currentTab.activity">
              {{ currentTab.activity }}
            </span>
            <div v-if="currentTab.company" class="content__company">
              <a v-for="photo in currentTab.company" :key="photo.id" :href="currentTab.link" target="_blank" rel="noreferrer noopener">
                <img class="content__company animated fadeIn" :src="photo.url" :alt="currentTab.full_name + ' logo'" :key="photo.id">
              </a>
            </div>
            <div class="content__description">
              <span class="content__description--description animated fadeIn" :key="currentTab.description">{{ currentTab.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="talk">
      <h2>Le <span class="tag tag-red">Talk</span></h2>
      <div class="talk__content">
        <div class="talk__content--image">
          <picture>
            <source type="image/webp" srcset="../assets/images/sylvain-tillon.webp">
            <source type="image/png" srcset="../assets/images/sylvain-tillon.png">
            <img src="../assets/images/sylvain-tillon.png" alt="Sylvain Tillon">
          </picture>
        </div>
        <div class="talk__content--text">
          <h3>L'esprit d'entreprendre avec Sylvain Tillon</h3>
          <p>Sylvain Tillon, 35 ans, lorsqu’il présente son parcours, donne l’impression d’avoir vécu plusieurs vies. En l’espace d’une décennie à peine, il crée 4 sociétés (dont <strong>Sydo</strong> et <strong>Tilkee</strong>) et écrit plusieurs livres dont “100 conseils pratiques pour couler sa boîte”. 
            Pour lui, il n’existe pas de recette magique pour créer son entreprise, seule la détermination et le soutien d’un entourage bienveillant suffisent. Et quand bien même le projet tomberait à l’eau, l’important est de savoir <strong>rebondir</strong> et <strong>apprendre</strong> de ses erreurs.
            Sa devise :"Ce n’est pas parce que les choses sont difficiles que nous n’osons pas, c’est parce que nous n’osons pas qu’elles sont difficiles" (Sénèque).
            Réelle personnalité de la tech lyonnaise, venez écouter son point de vue sur l’état d’esprit que doit avoir un <strong>entrepreneur</strong>.
          </p>
        </div>
      </div>
    </section>
    <section class="planning">
      <h2>Le <span class="tag tag-yellow">planning</span></h2>
      <div class="planning__timeline">
        <div :class="['planning__timeline--meeting shift', active.greenShift ? 'active' : '']" @mouseenter="active.greenCard = true" @mouseleave="active.greenCard = false">
          <span class="shift--start">14:00</span>
          🤝
        </div>
        <div :class="['planning__timeline--talk shift', active.blueShift ? 'active' : '']" @mouseenter="active.blueCard = true" @mouseleave="active.blueCard = false">
          <span class="shift--start">17:00</span>
          🗣
        </div>
        <div :class="['planning__timeline--toast shift', active.redShift ? 'active' : '']" @mouseenter="active.redCard = true" @mouseleave="active.redCard = false">
          <span class="shift--start">17:30</span>
          🍸
          <span class="shift--end">19:00</span>
        </div>
      </div>
      <div class="planning__cards">
        <div id="meeting" :class="['planning__cards--card', active.greenCard ? 'active' : '']" @mouseenter="active.greenShift = true" @mouseleave="active.greenShift = false">
          <div class="head">
            <div class="tag tag-green">Meeting</div>
            <div class="hours">14:00 - 17:00</div>
          </div>
          <p>Début de l’événement et de l’animation des stands</p>
        </div>
        <div id="talk" :class="['planning__cards--card', active.blueCard ? 'active' : '']" @mouseenter="active.blueShift = true" @mouseleave="active.blueShift = false">
          <div class="head">
            <div class="tag tag-blue">Talk</div>
            <div class="hours">17:00 - 17:30</div>
          </div>
          <p>L'esprit entrepreneur avec<br />Sylvain Tillon</p>
        </div>
        <div id="toast" :class="['planning__cards--card', active.redCard ? 'active' : '']" @mouseenter="active.redShift = true" @mouseleave="active.redShift = false">
          <div class="head">
            <div class="tag tag-red">Networking</div>
            <div class="hours">17:30 - 19:00</div>
          </div>
          <p>Apéro de <br />fin de journée</p>
        </div>
      </div>
    </section>
    <section class="informations">
      <div class="information">
        <div class="information__date">
          <span class="information__date--day">04</span>
          <div class="information__date--content">
            <span class="month">avril 2019</span>
            <span class="hours"> 14:00 - 19:00</span>
          </div>

        </div>
        <div class="information__direction">
          <img src="../assets/icons/map.svg" alt="map icon">
          <div class="information__direction--content">
            <span>Le wagon Lyon</span>
            <a href="http://maps.google.com/maps?q=20+rue+des+capucins,+69001+lyon" target="_blank" rel="noreferrer noopener">S'y rendre</a>
          </div>
        </div>
        <div class="information__social">
          <a href="https://facebook.com/lewagonlyon/"><img src="../assets/icons/facebook.svg" alt="facebook icon" target="_blank" rel="noreferrer noopener"></a>
          <a href="https://instagram.com/lewagonlyon/"><img src="../assets/icons/instagram.svg" alt="instagram icon" target="_blank" rel="noreferrer noopener"></a>
          <a href="https://twitter.com/lewagonlyon/"><img src="../assets/icons/twitter.svg" alt="twitter icon" target="_blank" rel="noreferrer noopener"></a>
          <a href="https://www.linkedin.com/showcase/le-wagon-lyon/about/"><img src="../assets/icons/linkedin.svg" alt="linkedin icon" target="_blank" rel="noreferrer noopener"></a>
        </div>
        <a id="number5-58542912427" class="btn btn-white" @click="getId($event)">Billetterie</a>
      </div>
    </section>
    <footer>
      <div class="footer__images">
        <img src="../assets/images/lewagon-lyon-logo.svg" alt="le wagon lyon logo">
        <img src="../assets/images/smartup-logo.svg" alt="smart up logo">
      </div>
      <div class="footer__menu">
        <a href="mailto:lyon@lewagon.org">
          <span>Contactez-nous</span>
        </a>
        <a href="https://www.lewagon.com/fr/lyon/" target="_blank" rel="noreferrer noopener">
          <span>Programme</span>
        </a>
        <a href="http://maps.google.com/maps?q=20+rue+des+capucins,+69001+lyon" target="_blank" rel="noreferrer noopener">
          <span>Où nous trouver</span>
        </a>
      </div>
    </footer>
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
          title: "Sélection d'un intervenant",
          content:
            "Choisissez un ou plusieurs expert(s) métier selon le domaine qui vous intéresse, de la comptabilité à la communication, selon le créneau de votre choix."
        },
        {
          title: "Rencontre avec l'expert",
          content:
            "Vous disposez de 10 minutes avec le fondateur choisi pour discuter de vos problématiques et lui poser toutes les questions nécessaires."
        },
        {
          title: "Retour d'expérience",
          content:
            "Une fois les 10 minutes terminées, vous disposez des réponses à vos questions et pouvez passer à un autre intervenant selon vos besoins."
        }
      ],
      attendees: [],
      attendeesShuffled: [],
      activeTab: 0,
      tabScrolled: false,
      active: [
        {
          greenCard: false,
          greenShift: false,
          blueCard: false,
          blueShirt: false,
          blueShift: false,
          redCard: false
        }
      ],
      currentTab: []
    };
  },
  watch: {
    activeTab() {
      return (this.currentTab = this.attendeesShuffled[this.activeTab]);
    }
  },
  components: {
    "app-skeleton": SkeletonBox
  },
  head() {
    return {
      title: "Founder Summit 2019",
      meta: [
        // Open Graph
        {
          name: "og:title",
          hid: "og:title",
          content: "Founder Summit 2019"
        },
        {
          name: "og:description",
          hid: "og:description",
          content:
            "L’événement qui rassemble les différents experts de la tech lyonnaise pour vous aider à créer ou à développer vos projets."
        },
        { name: "og:url", content: "https://foundersummit.tech" },
        {
          name: "og:site_name",
          hid: "og:site_name",
          content: "Founder Summit"
        },
        {
          name: "og:image",
          content: "https://foundersummit.tech/thumbnail.png"
        },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "Founder Summit" },
        {
          name: "twitter:title",
          content: "Founder Summit 2019"
        },
        {
          name: "twitter:description",
          content:
            "L’événement qui rassemble les différents experts de la tech lyonnaise pour vous aider à créer ou à développer vos projets."
        },
        {
          name: "twitter:image",
          content: "https://foundersummit.tech/thumbnail.png"
        },
        { name: "twitter:image:alt", content: "Founder Summit image" }
      ]
    };
  },
  methods: {
    countDown() {
      const countDownDate = new Date("Apr 4, 2019 14:00:00").getTime();
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
    },
    handleScroll(evt) {
      let bottom = evt.srcElement.clientHeight - evt.srcElement.scrollTop;
      const tab = document.querySelector(".slider__slides--tabs");
      if (bottom < 144) {
        tab.classList.remove("gradient");
      } else {
        tab.classList.add("gradient");
      }
    },
    fetchAttendees() {
      const Airtable = require("airtable");
      Airtable.configure({
        endpointUrl: "https://api.airtable.com",
        apiKey: process.env.airtableKey
      });
      const base = Airtable.base(process.env.airtableId);
      this.attendees = [];
      const self = this;
      base("List")
        .select({
          view: "Gallery"
        })
        .all()
        .then(records => {
          records.forEach(function(record) {
            self.attendees.push(record.fields);
          });
          this.randomAttendeesList();
          this.currentTab = this.attendeesShuffled[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    randomAttendeesList() {
      const attendees = this.attendees;
      let currentIndex = attendees.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = attendees[currentIndex];
        attendees[currentIndex] = attendees[randomIndex];
        attendees[randomIndex] = temporaryValue;
      }
      this.attendeesShuffled = attendees;
    },
    getId: function(id) {
      this.$root.$emit("buttonId", id.target.id);
    }
  },
  mounted() {
    this.countDown();
    this.$nextTick(() => {
      setTimeout(() => (this.loading = false), 200);
    });
    this.fetchAttendees();
  }
};
</script>


<style lang="postcss" scoped>
.banner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  height: 750px;
  align-content: center;
  padding: 0 var(--spacing-base);
  &:before {
    content: "";
    background: url(../assets/images/background-banner.svg) no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    background-size: contain;
    width: 650px;
    height: 100%;
  }
  &__title {
    margin-bottom: 50px;
    align-self: center;
    &--catchline {
      padding: 0 5px;
      margin-top: 30px;
      line-height: 20px;
      font-size: 1.125em;
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
      .btn-red {
        color: white;
      }
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
  height: 500px;
  position: relative;
  margin-top: 250px;
  padding: 0 var(--spacing-base);
  &__images {
    &--image {
      border-radius: 3px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
      img {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
      .gradient {
      }
      &:nth-child(2),
      &:last-child {
        left: 120px;
      }
      &:first-child {
        width: 377px;
        height: 283px;
        margin: 0 auto;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          background: linear-gradient(
            rgba(253, 16, 21, 0.1),
            rgba(253, 16, 21, 0.1)
          );
        }
      }
      &:nth-child(2) {
        width: 225px;
        height: 150px;
        position: absolute;
        top: 0;
        opacity: 0.4;
        z-index: -1;
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          background: linear-gradient(
            rgba(253, 16, 21, 0.2),
            rgba(253, 16, 21, 0.2)
          );
        }
      }
      &:last-child {
        width: 245px;
        height: 163px;
        position: absolute;
        bottom: 0;
        z-index: -1;
        opacity: 0.4;
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          background: linear-gradient(
            rgba(253, 16, 21, 0.2),
            rgba(253, 16, 21, 0.2)
          );
        }
      }
    }
  }
  &__content {
    width: 591px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    &--text {
      line-height: 20px;
    }
    a {
      color: white;
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
    grid-column-gap: 50px;
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
      grid-gap: 20px;
      margin-top: 40px;
      text-align: left;
      &:first-child {
        justify-self: start;
      }
      &:nth-child(2) {
        padding-left: 25px;
        .step {
          padding-top: 40px;
          text-align: center;
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
        padding-right: 25px;
      }
      .content {
        text-align: left;
      }
    }
  }
}
.slider {
  text-align: center;
  margin-top: 160px;
  padding: 0 var(--spacing-base);
  &__subtitle {
    margin-top: 30px;
  }
  &__slides {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 130px;
    margin-top: 87px;
    position: relative;
    &--tabs {
      height: 522px;
      overflow-y: scroll;
      display: grid;
      grid-row-gap: 8px;
      &.gradient {
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 20%;
          width: 100%;
          opacity: 1;
          background-image: linear-gradient(
            to top,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
        }
      }
      .tab {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
        background: white;
        border: 0.5px solid rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        height: 67px;
        padding: 0 15px;
        text-align: left;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.2s ease;
        &__name {
          font-family: var(--font-head-medium);
          font-size: 1.25em;
        }
        &__activity {
          font-family: var(--font-head-regular);
          font-size: 0.875em;
        }
        &.active,
        &:hover {
          color: var(--color-red);
          background-color: var(--color-lightyellow);
          border: 0.5px solid transparent;
        }
      }
    }
    &--content {
      .content {
        display: grid;
        grid-template-columns: 0.8fr 1fr;
        grid-template-rows: repeat(3, auto) 100px 1fr;
        text-align: left;
        height: 100%;
        position: relative;
        &__title {
          padding: 10px 20px;
          color: var(--color-blue);
          background-color: var(--color-lightblue);
          width: fit-content;
          height: fit-content;
          border-radius: 3px;
          font-size: 1.125em;
          font-family: var(--font-head-medium);
          animation-delay: 0.1s;
        }
        &__fullname {
          font-family: var(--font-head-black);
          font-size: 2em;
          align-self: end;
          animation-delay: 0.2s;
          &--mobile {
            display: none;
          }
        }
        &__activity {
          font-family: var(--font-head-regular);
          font-size: 1.125em;
          margin-top: 10px;
          animation-delay: 0.3s;
          position: relative;
        }
        &__photo {
          grid-column: 2;
          grid-row: 1 / span 4;
          justify-self: center;
          background: url(../assets/icons/background-photo-dots.svg) center
            no-repeat;
          background-size: cover;
          height: 335px;
          width: 100%;
          max-width: 335px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 50px;
          position: relative;
          animation-delay: 0.8s;
          &:before {
            content: "";
            background-image: url(../assets/icons/rectangle.svg);
            background-size: cover;
            height: 82px;
            width: 82px;
            position: absolute;
            z-index: -1;
            left: -40px;
            bottom: 13px;
          }
          &:after {
            content: "";
            background-image: url(../assets/icons/rectangle.svg);
            height: 109px;
            width: 109px;
            position: absolute;
            z-index: -1;
            top: -14px;
            right: -7px;
          }
          &--image {
            height: 235px;
            width: 235px;
            border-radius: 50%;
            background-color: var(--color-lightyellow);
            overflow: hidden;
            position: relative;
            transform: translate3d(0, 0, 0);
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        &__company {
          align-self: center;
          position: relative;
          animation-delay: 0.4s;
          img {
            width: auto;
          }
        }
        &__description {
          grid-column: span 2;
          align-self: start;
          margin-top: 50px;
          height: fit-content;
          &--description {
            line-height: 20px;
            animation-delay: 0.5s;
          }
        }
      }
    }
  }
}
.talk {
  margin-top: 200px;
  text-align: center;
  padding: 0 var(--spacing-base);
  &__content {
    display: grid;
    grid-template-columns: 1fr 0.9fr;
    align-items: center;
    grid-column-gap: 70px;
    margin-top: 100px;
    &--image {
      img {
        width: 100%;
      }
    }
    &--text {
      text-align: left;
      p {
        margin-top: 45px;
        line-height: 20px;
      }
    }
  }
}
.planning {
  text-align: center;
  margin-top: 200px;
  padding: 0 var(--spacing-base);
  &__timeline {
    width: 100%;
    height: 60px;
    background-color: rgba(229, 229, 229, 0.1);
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-column-gap: 1px;
    align-items: center;
    margin-top: 100px;
    .shift {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 38px;
      border-radius: 50px;
      position: relative;
      transition: background-color 0.2s ease;
      &:before {
        content: "";
        background: url(../assets/icons/hour-pin.svg) no-repeat left;
        height: 73px;
        width: 100%;
        position: absolute;
        left: -3px;
        bottom: -11px;
      }
      &--start {
        position: absolute;
        top: -50px;
        left: -20px;
        color: rgba(0, 0, 0, 0.5);
      }
      &--end {
        position: absolute;
        top: -50px;
        right: -25px;
        color: rgba(0, 0, 0, 0.5);
      }
      &:after {
        content: "";
        background: url(../assets/icons/hour-pin.svg) no-repeat right;
        height: 73px;
        width: 100%;
        position: absolute;
        right: -3px;
        bottom: -11px;
      }
    }
    &--meeting {
      grid-column: 1 / span 6;
      background-color: var(--color-lightgreen);
      &.active {
        background-color: #1edd8860;
      }
    }
    &--talk {
      grid-column: 7 / span 1;
      background-color: var(--color-lightblue);
      &.active {
        background-color: #62ddf560;
      }
    }
    &--toast {
      grid-column: 8 / span 3;
      background-color: var(--color-lightred);
      &.active {
        background-color: #fd101560;
      }
    }
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 25px;
    margin-top: 100px;
    #meeting {
      &.active {
        box-shadow: 0px 4px 15px #1edd8860;
      }
    }
    #talk {
      &.active {
        box-shadow: 0px 4px 15px #62ddf560;
      }
    }
    #toast {
      &.active {
        box-shadow: 0px 4px 15px #fd101560;
      }
    }
    &--card {
      background-color: white;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      height: 174px;
      padding: 20px;
      display: flex;
      flex-flow: column;
      position: relative;
      transition: box-shadow 0.2s ease;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .tag {
          width: fit-content;
          font-family: var(--font-head-medium);
        }
        .hours {
          font-family: var(--font-head-regular);
        }
      }
      p {
        text-align: left;
        font-size: 1.125em;
        margin-top: auto;
        margin-right: auto;
        margin-bottom: auto;
        line-height: 20px;
      }
      &:last-child {
        &:after {
          content: "";
          background: url(../assets/icons/dots-small.svg) no-repeat;
          position: absolute;
          height: 140px;
          width: 154px;
          top: -29px;
          right: -35px;
          z-index: -1;
        }
      }
    }
  }
}
.informations {
  margin: 250px 0;
  padding: 0 var(--spacing-base);
  .information {
    background-color: var(--color-lightyellow);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 50px 0;
    font-family: var(--font-head-medium);
    color: var(--color-red);
    position: relative;
    &__date {
      display: flex;
      align-items: center;
      position: relative;
      &--day {
        font-size: 3em;
        margin-right: 10px;
      }
      &--content {
        display: flex;
        flex-flow: column;
        line-height: 20px;
        .month {
          font-size: 1.125em;
        }
        .hours {
          font-size: 0.75em;
        }
      }
      &:after {
        content: "";
        border: 1px dashed white;
        height: 91px;
        position: absolute;
        right: -70px;
      }
    }
    &__direction {
      display: flex;
      align-items: center;
      position: relative;
      img {
        margin-right: 20px;
      }
      &--content {
        display: flex;
        flex-flow: column;
        line-height: 20px;
        span {
          font-size: 1.125em;
        }
        a {
          font-size: 0.75em;
          text-decoration: underline;
        }
      }
      &:after {
        content: "";
        border: 1px dashed white;
        height: 91px;
        position: absolute;
        right: -70px;
      }
    }
    &__social {
      display: flex;
      justify-content: space-between;
      width: 150px;
      position: relative;
      align-items: center;
      &:after {
        content: "";
        border: 1px dashed white;
        height: 91px;
        position: absolute;
        right: -70px;
      }
    }
    a {
      justify-self: end;
    }
    &:before {
      content: "";
      background: url(../assets/icons/dots-small.svg) no-repeat;
      position: absolute;
      height: 140px;
      width: 154px;
      bottom: -32px;
      left: -35px;
      z-index: -1;
    }
  }
}
footer {
  display: grid;
  justify-items: center;
  .footer {
    &__images {
      display: flex;
      justify-content: space-between;
      width: 230px;
    }
    &__menu {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 50px;
      justify-items: center;
      margin: 50px 0;
      a {
        position: relative;
        &:after {
          border-bottom: 1.5px solid var(--color-black);
          content: "";
          display: block;
          position: absolute;
          margin: 0.25em auto 0;
          transition: width 250ms ease-in-out 0s;
          width: 0;
        }
        &:hover {
          &:after {
            width: 100%;
            transition: width 100ms ease-in-out 0s;
          }
        }
      }
    }
  }
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

@media (--mobile) {
  h2 {
    font-size: 2.5em;
    line-height: 1.5em;
    text-align: left;
  }
  h3 {
    font-size: 1.8em;
  }
  .background-icons {
    display: none;
  }
  .banner {
    padding: 0 20px;
    grid-template-columns: 1fr;
    &:before {
      display: none;
    }
    &__title {
      margin: 0;
      h1 {
        font-size: 2.5em;
      }
      &--catchline {
        margin: 50px 0 120px 0;
        font-size: 1em;
      }
    }
    &__countdown {
      width: 100%;
      padding: 30px;
      &--buttons {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
        .btn {
          width: 100%;
        }
      }
      &--date {
        width: 200px;
        height: auto;
        padding: 15px 0;
        .content {
          .date {
            font-size: 2em;
            &.day {
              font-size: 3.5em;
            }
          }
        }
      }
      &--badge {
        margin-top: 40px;
      }
      &--time {
        .value {
          font-size: 2.5em;
        }
      }
    }
  }
  .description {
    padding: 0 20px;
    margin-top: 25px;
    &__content {
      width: 100%;
      display: grid;
      grid-row-gap: 40px;
    }
    &__images {
      display: none;
    }
  }
  .conduct {
    padding: 130px 20px 100px 20px;
    &__cards {
      grid-template-columns: 1fr;
      &:before {
        display: none;
      }
      &--card {
        h4,
        .content {
          text-align: left;
          padding: 0;
        }
        &:nth-child(2) {
          padding: 0;
          .step {
            padding-top: 0;
          }
        }
        .step {
          padding: 0;
          height: auto;
        }
      }
    }
  }
  .slider {
    margin-top: 50px;
    padding: 0 20px;
    &__subtitle {
      text-align: left;
    }
    &__slides {
      grid-template-columns: 1fr;
      grid-row-gap: 30px;
      margin-top: 30px;
      &--tabs {
        display: none;
      }
      &--content {
        .content {
          grid-template-columns: 1fr;
          grid-template-rows: repeat(4, auto) 45px auto;
          grid-row-gap: 30px;
          position: relative;
          &__photo {
            grid-column: 1;
            grid-row: 2;
            margin-right: 0;
            width: 100%;
            &--image > .slide-enter,
            .slide-leave-to {
              transform: none;
              opacity: 0;
            }
          }
          &__title {
            justify-self: center;
          }
          &__fullname {
            position: relative;
            grid-column: 1;
            grid-row: 3;
            font-size: 1.8em;
            justify-self: center;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 100%;
            height: 85px;
            padding: 0 50px;
            &--mobile {
              display: block;
              position: absolute;
              background-color: var(--color-lightyellow);
              padding: 20px 2px 20px 7px;
              &.left {
                left: 0;
              }
              &.right {
                right: 0;
                transform: rotate(180deg);
              }
            }
          }
          &__company {
            grid-column: 1;
            grid-row: 5;
            align-self: center;
          }
          &__activity {
            grid-column: 1;
            grid-row: 4;
            margin-top: 0;
          }
          &__description {
            margin-top: 0;
          }
        }
      }
    }
  }
  .talk {
    padding: 0 20px;
    margin-top: 80px;
    &__content {
      grid-template-columns: 1fr;
      margin-top: 50px;
      &--text {
        margin-top: 50px;
      }
    }
  }
  .planning {
    padding: 0 20px;
    margin-top: 80px;
    &__timeline {
      display: none;
    }
    &__cards {
      margin-top: 50px;
      grid-template-columns: 1fr;
      grid-row-gap: 50px;
    }
  }
  .informations {
    padding: 0 20px;
    margin: 50px 0;
    .information {
      display: grid;
      grid-row-gap: 50px;
      justify-items: center;
      a {
        justify-self: center;
      }
      &__date {
        &:after {
          display: none;
        }
      }
      &__direction {
        &:after {
          display: none;
        }
      }
      &__social {
        &:after {
          display: none;
        }
      }
    }
  }
  footer {
    .footer {
      &__images {
        grid-row: 2;
        margin-bottom: 50px;
      }
      &__menu {
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
        justify-items: start;
      }
    }
  }
}
</style>
