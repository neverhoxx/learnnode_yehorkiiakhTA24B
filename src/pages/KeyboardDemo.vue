<script setup>
import { ref } from 'vue'

const score = ref(0)
const misses = ref(0)
const combo = ref(0)
const bestCombo = ref(0)
const timeLeft = ref(30)

const currentTarget = ref('')
const currentCode = ref('')

const gameRunning = ref(false)
const supported = ref(false)
const error = ref('')
const message = ref('')

const bestScore = ref(
  Number(localStorage.getItem('keyboardBestScore')) || 0
)

let gameTimer = null
let keyboardMap = null

const allowedKeys = [
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL'
]

async function loadKeyboardLayout() {
  try {
    keyboardMap = await navigator.keyboard.getLayoutMap()
    supported.value = true
    return true
  } catch (err) {
    error.value = err.message
    return false
  }
}

function nextChallenge() {
  const randomCode =
    allowedKeys[Math.floor(Math.random() * allowedKeys.length)]

  currentCode.value = randomCode
  currentTarget.value =
    keyboardMap.get(randomCode) || randomCode.replace('Key', '')
}

async function startGame() {
  error.value = ''

  const loaded = await loadKeyboardLayout()

  if (!loaded) return

  score.value = 0
  misses.value = 0
  combo.value = 0
  bestCombo.value = 0

  timeLeft.value = 30

  gameRunning.value = true

  nextChallenge()

  gameTimer = setInterval(() => {
    timeLeft.value--

    if (timeLeft.value <= 0) {
      stopGame()
    }
  }, 1000)
}

function stopGame() {
  gameRunning.value = false

  clearInterval(gameTimer)

  if (score.value > bestScore.value) {
    bestScore.value = score.value
    localStorage.setItem(
      'keyboardBestScore',
      score.value
    )
  }

  message.value = 'Game Over'
}

function handleKey(event) {
  if (!gameRunning.value) return

  if (event.code === currentCode.value) {
    score.value++
    combo.value++

    if (combo.value > bestCombo.value) {
      bestCombo.value = combo.value
    }

    message.value = 'Correct'

    nextChallenge()
  } else {
    misses.value++
    combo.value = 0
    message.value = 'Wrong Key'
  }
}

window.addEventListener('keydown', handleKey)
</script>

<template>
  <section class="section">
    <div class="container">

      <div class="card">
        <div class="card-content">

          <h1 class="title">
            Keyboard Challenge
          </h1>

          <div
            v-if="supported"
            class="notification is-success"
          >
            Keyboard API is working
          </div>

          <div
            v-if="error"
            class="notification is-danger"
          >
            {{ error }}
          </div>

          <div class="buttons">
            <button
              v-if="!gameRunning"
              class="button is-primary is-large"
              @click="startGame"
            >
              Start game
            </button>

            <button
              v-if="gameRunning"
              class="button is-danger"
              @click="stopGame"
            >
              Stop game
            </button>
          </div>

          <div
            v-if="gameRunning"
            class="has-text-centered mt-6"
          >
            <p class="heading">
              Press This Key
            </p>

            <div
              class="has-text-weight-bold"
              style="
                font-size:120px;
                color:#00d1b2;
              "
            >
              {{ currentTarget }}
            </div>
          </div>

          <progress
            class="progress is-primary mt-5"
            :value="timeLeft"
            max="30"
          >
            {{ timeLeft }}
          </progress>

          <div class="columns mt-5">

            <div class="column">
              <div class="notification is-primary">
                <strong>Score</strong>
                <br>
                {{ score }}
              </div>
            </div>

            <div class="column">
              <div class="notification is-warning">
                <strong>Misses</strong>
                <br>
                {{ misses }}
              </div>
            </div>

            <div class="column">
              <div class="notification is-info">
                <strong>Combo</strong>
                <br>
                {{ combo }}
              </div>
            </div>

            <div class="column">
              <div class="notification is-success">
                <strong>Best Combo</strong>
                <br>
                {{ bestCombo }}
              </div>
            </div>

          </div>

          <div class="columns">

            <div class="column">
              <div class="box">
                <strong>Accuracy</strong>

                <h2 class="title mt-2">
                  {{
                    score + misses === 0
                      ? 0
                      : (
                          score /
                          (score + misses)
                        * 100
                        ).toFixed(1)
                  }}%
                </h2>
              </div>
            </div>

            <div class="column">
              <div class="box">
                <strong>High Score</strong>

                <h2 class="title mt-2">
                  {{ bestScore }}
                </h2>
              </div>
            </div>

            <div class="column">
              <div class="box">
                <strong>Time Left</strong>

                <h2 class="title mt-2">
                  {{ timeLeft }}s
                </h2>
              </div>
            </div>

          </div>

          <article
            v-if="message"
            class="message"
            :class="
              message.includes('Correct')
                ? 'is-success'
                : 'is-danger'
            "
          >
            <div class="message-body">
              {{ message }}
            </div>
          </article>

        </div>
      </div>

    </div>
  </section>
</template>