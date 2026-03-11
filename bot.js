const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8718231033:AAHBTy632wR7YSq5D8eE1Dh8zqotGrgPRZY';
const bot = new TelegramBot(TOKEN, { polling: true });

const fortunes = [
  "Сегодня тебя укусит кот соседа. Это хорошая примета — теперь ты официально популярен.",
  "Судьба готовит тебе сюрприз: ты найдёшь носок, который потерял три года назад. В кармане куртки.",
  "Звёзды говорят: не ешь этот йогурт. Ты знаешь о каком.",
  "Великое открытие дня: ты наконец поймёшь, куда уходят деньги. Ответ тебя расстроит.",
  "Встреча с незнакомцем изменит твой день. Это будет курьер. Он будет злым.",
  "Вселенная посылает тебе знак. Это будет голубь на балконе. Он уже там.",
  "Сегодня ты будешь необычайно умным. Это займёт около 11 минут.",
  "Удача на твоей стороне! Но она немного устала, поэтому особо не рассчитывай.",
  "Важное решение поджидает тебя сегодня: чай или кофе. Выбор определит всё.",
  "Кто-то думает о тебе прямо сейчас. Это твой банк. Счёт не оплачен.",
  "Жизнь преподнесёт урок мудрости. Стоимость урока: 1500 рублей плюс нервы.",
  "Сегодня ты обнаружишь в себе скрытый талант. К сожалению, это умение спать сидя.",
  "Меркурий в ретрограде, поэтому всё пойдёт не так. Но зато по-новому!",
  "Успех ждёт тебя! Осталось подождать всего 14 лет.",
  "Сегодня ты будешь загадочным и привлекательным. С 14:23 до 14:41.",
  "Твои враги завидуют тебе. Пока ты не узнаешь почему, живи этим.",
  "Большие перемены грядут. Предположительно, это будет новый сезон сериала.",
  "Деньги придут к тебе неожиданно. Скорее всего, ты найдёшь монету под диваном.",
  "Сегодня тебя ждёт романтика. Свидание с холодильником в 2 ночи считается.",
  "Ангелы следят за тобой. Им немного скучно, но они следят.",
];

const lovefortunes = [
  "Сердце твоё откроется навстречу новому. Но сначала помой посуду — это романтично.",
  "Звёзды видят твою любовь. Она тоже видит тебя. Из соседнего подъезда.",
  "Романтика грядёт! По прогнозам — в районе холодильника, около 2 ночи.",
  "Венера говорит: ты достоин любви. Марс говорит: сначала завяжи шнурки.",
];

const workFortunes = [
  "Карьерный рост неизбежен. Правда, лифт сломан — придётся идти пешком.",
  "Деньги любят тишину. Твои деньги — особенно. Они молчат уже давно.",
  "Начальник сегодня добрый. Пользуйся моментом — это ненадолго.",
  "Финансовый успех близко! Монетка под диваном уже нашла тебя.",
];

const healthFortunes = [
  "Здоровье — это богатство. Встать с дивана тоже считается физической нагрузкой.",
  "Звёзды рекомендуют больше воды. Чай тоже вода. Почти.",
  "Сегодня ты полон сил! Правда, это займёт минут 20 после кофе.",
  "Организм говорит тебе спасибо. Ему просто больше некому говорить.",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getFortune() {
  return getRandom(fortunes);
}

const mainKeyboard = {
  reply_markup: {
    keyboard: [
      ['🔮 Предсказание дня', '💘 Про любовь'],
      ['💼 Про работу', '🌿 Про здоровье'],
      ['🎲 Случайное', '❓ Помощь'],
    ],
    resize_keyboard: true,
  },
};

bot.onText(/\/start/, function(msg) {
  var name = msg.from.first_name || 'смертный';
  bot.sendMessage(
    msg.chat.id,
    '🔮 Приветствую, ' + name + '!\n\nЯ — Великий Оракул Карнавалий.\nОткрою тебе тайны дня... или просто посмеюсь над твоей участью.\n\nВыбери, о чём хочешь узнать 👇',
    mainKeyboard
  );
});

bot.onText(/\/help/, function(msg) {
  bot.sendMessage(
    msg.chat.id,
    '📜 Команды Оракула:\n\n/start — начать заново\n/predict — предсказание дня\n/love — про любовь\n/work — про работу\n/health — про здоровье\n/random — случайное предсказание\n\nИли просто напиши что угодно — Оракул всегда ответит 🔮',
    mainKeyboard
  );
});

bot.onText(/\/predict/, function(msg) {
  bot.sendMessage(
    msg.chat.id,
    '🔮 Великий Оракул вещает:\n\n' + getFortune(),
    mainKeyboard
  );
});

bot.onText(/\/love/, function(msg) {
  bot.sendMessage(
    msg.chat.id,
    '💘 О, сердечные дела!\n\n' + getRandom(lovefortunes) + '\n\n' + getFortune(),
    mainKeyboard
  );
});

bot.onText(/\/work/, function(msg) {
  bot.sendMessage(
    msg.chat.id,
    '💼 Вижу твои финансовые тревоги!\n\n' + getRandom(workFortunes) + '\n\n' + getFortune(),
    mainKeyboard
  );
});

bot.onText(/\/health/, function(msg) {
  bot.sendMessage(
    msg.chat.id,
    '🌿 Здоровье — это богатство!\n\n' + getRandom(healthFortunes) + '\n\n' + getFortune(),
    mainKeyboard
  );
});

bot.onText(/\/random/, function(msg) {
  var all = fortunes.concat(lovefortunes).concat(workFortunes).concat(healthFortunes);
  bot.sendMessage(
    msg.chat.id,
    '🎲 Случайное предсказание:\n\n' + getRandom(all),
    mainKeyboard
  );
});

bot.on('message', function(msg) {
  if (!msg.text) return;
  if (msg.text.startsWith('/')) return;

  if (msg.text === '🔮 Предсказание дня') {
    return bot.sendMessage(msg.chat.id, '🔮 Великий Оракул вещает:\n\n' + getFortune(), mainKeyboard);
  }
  if (msg.text === '💘 Про любовь') {
    return bot.sendMessage(msg.chat.id, '💘 О, сердечные дела!\n\n' + getRandom(lovefortunes) + '\n\n' + getFortune(), mainKeyboard);
  }
  if (msg.text === '💼 Про работу') {
    return bot.sendMessage(msg.chat.id, '💼 Вижу твои финансовые тревоги!\n\n' + getRandom(workFortunes) + '\n\n' + getFortune(), mainKeyboard);
  }
  if (msg.text === '🌿 Про здоровье') {
    return bot.sendMessage(msg.chat.id, '🌿 Здоровье — это богатство!\n\n' + getRandom(healthFortunes) + '\n\n' + getFortune(), mainKeyboard);
  }
  if (msg.text === '🎲 Случайное') {
    var all = fortunes.concat(lovefortunes).concat(workFortunes).concat(healthFortunes);
    return bot.sendMessage(msg.chat.id, '🎲 Случайное предсказание:\n\n' + getRandom(all), mainKeyboard);
  }
  if (msg.text === '❓ Помощь') {
    return bot.sendMessage(msg.chat.id, '📜 Команды:\n\n/start — начать заново\n/predict — предсказание\n/love — про любовь\n/work — про работу\n/health — про здоровье', mainKeyboard);
  }

  var lower = msg.text.toLowerCase();

  if (lower.indexOf('привет') !== -1 || lower.indexOf('hello') !== -1 || lower.indexOf('хай') !== -1) {
    return bot.sendMessage(msg.chat.id, '✨ Приветствую! Звёзды уже смеются, предвкушая твой день.\n\n' + getFortune(), mainKeyboard);
  }
  if (lower.indexOf('спасибо') !== -1 || lower.indexOf('благодарю') !== -1) {
    return bot.sendMessage(msg.chat.id, '🙏 Не благодари — благодари звёзды!\nХотя они заняты и, возможно, не заметят.', mainKeyboard);
  }
  if (lower.indexOf('скучно') !== -1 || lower.indexOf('грустно') !== -1) {
    return bot.sendMessage(msg.chat.id, '😏 Скуке приходит конец!\n\n' + getFortune() + '\n\nВселенная рекомендует: поговори с кактусом — он выслушает.', mainKeyboard);
  }

  bot.sendMessage(
    msg.chat.id,
    '🔮 Оракул слышит тебя...\n\n' + getFortune(),
    mainKeyboard
  );
});

bot.on('polling_error', function(error) {
  console.log('Ошибка: ' + error.message);
});

console.log('');
console.log('🔮 Оракул Карнавалий запущен!');
console.log('   Бот слушает сообщения...');
console.log('   Нажми Ctrl+C чтобы остановить');
console.log('');
