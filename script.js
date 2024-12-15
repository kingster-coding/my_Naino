// Vocabulary data
const vocabulary = [
  { word: "Affection", meaning: "A gentle feeling of fondness" },
  { word: "Bliss", meaning: "Perfect happiness" },
  { word: "Cherish", meaning: "To care deeply for someone" },
  { word: "Devotion", meaning: "Love and loyalty" },
  { word: "Euphoria", meaning: "A feeling of intense happiness" },
  { word: "Fascinate", meaning: "To attract and hold attention" },
  { word: "Generosity", meaning: "The quality of being kind and giving" },
  { word: "Harmony", meaning: "A pleasing arrangement of parts" },
  { word: "Intuition", meaning: "The ability to understand something instinctively" },
  { word: "Jubilant", meaning: "Feeling or expressing great happiness" },
  { word: "Kindness", meaning: "The quality of being friendly, generous, and considerate" },
  { word: "Love", meaning: "An intense feeling of deep affection" },
  { word: "Motivation", meaning: "The reason or reasons one has for acting or behaving in a particular way" },
  { word: "Nurture", meaning: "To care for and encourage the growth or development of something or someone" },
  { word: "Optimism", meaning: "Hopefulness and confidence about the future" },
  { word: "Passion", meaning: "A strong feeling of enthusiasm or excitement for something" },
  { word: "Quality", meaning: "The standard of something as measured against other things of a similar kind" },
  { word: "Resilience", meaning: "The capacity to recover quickly from difficulties" },
  { word: "Serenity", meaning: "The state of being calm, peaceful, and untroubled" },
  { word: "Trust", meaning: "Firm belief in the reliability, truth, or ability of someone or something" },
  { word: "Understanding", meaning: "The ability to comprehend something" },
  { word: "Valiant", meaning: "Possessing or showing courage or determination" },
  { word: "Wisdom", meaning: "The quality of having experience, knowledge, and good judgment" },
  { word: "Zeal", meaning: "Great energy or enthusiasm in pursuit of a cause" },
  { word: "Ambition", meaning: "A strong desire to do or achieve something" },
  { word: "Brilliance", meaning: "Exceptional talent or intelligence" },
  { word: "Calmness", meaning: "The state of being free from agitation" },
  { word: "Diligence", meaning: "Careful and persistent work or effort" },
  { word: "Empathy", meaning: "The ability to understand and share the feelings of another" },
  { word: "Flourish", meaning: "To grow or develop in a healthy or vigorous way" },
  { word: "Gratefulness", meaning: "The quality of being thankful" },
  { word: "Hope", meaning: "A feeling of expectation and desire for a particular thing to happen" },
  { word: "Imagination", meaning: "The ability of the mind to be creative or resourceful" },
  { word: "Justice", meaning: "Just behavior or treatment" },
  { word: "Knowledge", meaning: "Facts, information, and skills acquired by a person" },
  { word: "Liveliness", meaning: "The quality of being full of life and energy" },
  { word: "Maturity", meaning: "The state of being mature or fully developed" },
  { word: "Nurture", meaning: "To care for and encourage the growth or development of something" },
  { word: "Opportunity", meaning: "A set of circumstances that makes it possible to do something" },
  { word: "Patience", meaning: "The capacity to accept or tolerate delay, problems, or suffering without becoming annoyed" },
  { word: "Quietude", meaning: "A state of stillness, calmness, and quiet" },
  { word: "Radiance", meaning: "Light or heat as emitted or reflected by something" },
  { word: "Strength", meaning: "The quality or state of being physically strong" },
  { word: "Tranquility", meaning: "The quality or state of being tranquil" },
  { word: "Unity", meaning: "The state of being united or joined as a whole" },
  { word: "Victory", meaning: "An act of defeating an enemy or opponent" },
  { word: "Wonder", meaning: "A feeling of surprise and admiration caused by something beautiful or unexpected" },
  { word: "Excellence", meaning: "The quality of being outstanding or extremely good" },
  { word: "Yonder", meaning: "At or in that place" },
  { word: "Zealous", meaning: "Having or showing zeal" },
  { word: "Affluence", meaning: "The state of having a great deal of money" },
  { word: "Benevolent", meaning: "Well meaning and kindly" },
  { word: "Courageous", meaning: "Not deterred by danger or pain" },
  { word: "Delightful", meaning: "Highly pleasing" },
  { word: "Elegant", meaning: "Tastefully fine or luxurious in dress, style, design, etc." },
  { word: "Fearless", meaning: "Lacking fear" },
  { word: "Gratitude", meaning: "The quality of being thankful" },
  { word: "Humility", meaning: "A modest or low view of one's importance" },
  { word: "Idealism", meaning: "The belief or pursuit of noble ideals" },
  { word: "Jubilance", meaning: "A feeling of great happiness and joy" },
  { word: "Kindhearted", meaning: "Having a kind and compassionate nature" },
  { word: "Liberty", meaning: "The state of being free within society" },
  { word: "Motivation", meaning: "The reason or reasons one has for acting or behaving in a particular way" },
  { word: "Noble", meaning: "Having or showing high moral qualities" }
];


// Global settings
let voices = [];
let selectedVoice = null;
let speechRate = 1; // Default speed
let volume = 1; // Default volume

// Fetch and populate voices
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  const femaleVoices = voices.filter((voice) => voice.gender === "female" || voice.name.includes("Female"));
  selectedVoice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0]; // Use female voice
}

// Pronunciation function
function speak(word) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.voice = selectedVoice;
  utterance.rate = speechRate;
  utterance.volume = volume;
  synth.speak(utterance);
}

// Spelling Quiz Feature (within the word)
function showSpellingQuiz(word, liElement) {
  const quizContainer = document.createElement("div");
  quizContainer.innerHTML = `
    <h4>Spell the word: ${word}</h4>
    <input type="text" id="spellingInput-${word}" placeholder="Enter spelling">
    <button onclick="checkSpelling('${word}', '${liElement}')">Submit</button>
    <p id="quizFeedback-${word}"></p>
  `;
  liElement.appendChild(quizContainer);
}

function checkSpelling(correctSpelling, liElement) {
  const userInput = document.getElementById(`spellingInput-${correctSpelling}`).value.trim();
  const feedback = document.getElementById(`quizFeedback-${correctSpelling}`);
  if (userInput.toLowerCase() === correctSpelling.toLowerCase()) {
    feedback.textContent = "Correct! Well done!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `Oops! The correct spelling is "${correctSpelling}".`;
    feedback.style.color = "red";
  }
}

// Speech-to-Text for pronunciation check
function startRecording(word, liElement) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  
  recognition.start();
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const feedback = document.createElement("p");
    if (transcript.toLowerCase() === word.toLowerCase()) {
      feedback.textContent = `Correct pronunciation: "${transcript}"`;
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Incorrect pronunciation. Try again.`;
      feedback.style.color = "red";
    }
    liElement.appendChild(feedback);
  };

  recognition.onerror = function(event) {
    console.error("Speech recognition error", event);
  };
}

// Display words dynamically
function displayWords() {
  const wordList = document.getElementById("wordList");
  wordList.innerHTML = ""; // Clear any existing list items
  vocabulary.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.word}: ${item.meaning}</span>
      <button onclick="speak('${item.word}')">🔊 Pronounce</button>
      <button onclick="showSpellingQuiz('${item.word}', this.parentElement)">📝 Spell the word</button>
      <button onclick="startRecording('${item.word}', this.parentElement)">🎤 Pronounce it!</button>
    `;
    wordList.appendChild(li);
  });
}

// Update speed
document.getElementById("speedControl").addEventListener("input", (e) => {
  speechRate = parseFloat(e.target.value);
  document.getElementById("speedValue").textContent = `${speechRate}x`;
});

// Update volume
document.getElementById("volumeControl").addEventListener("input", (e) => {
  volume = parseFloat(e.target.value);
  document.getElementById("volumeValue").textContent = `${Math.round(volume * 100)}%`;
});

// Initialize
window.onload = function () {
  populateVoices();
  displayWords();
};

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}
if (userInput.toLowerCase() === correctSpelling.toLowerCase()) {
  feedback.textContent = "Correct! Well done!";
  feedback.className = "success";
} else {
  feedback.textContent = `Oops! The correct spelling is "${correctSpelling}".`;
  feedback.className = "error";
}

