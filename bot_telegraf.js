const { Telegraf, Markup } = require('telegraf');

const TOKEN = process.env.TOKEN || process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TOKEN);

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

const keyboard = Markup.keyboard([
  ['🔮 Предсказание дня', '💘 Про любовь'],
  ['💼 Про работу', '🌿 Про здоровье'],
  ['🎲 Случайное', '❓ Помощь'],
]).resize();

bot.start(function(ctx) {
  var name = ctx.from.first_name || 'смертный';
  ctx.reply(
    '🔮 Приветствую, ' + name + '!\n\nЯ — Великий Оракул Карнавалий.\nОткрою тебе тайны дня... или просто посмеюсь над твоей участью.\n\nВыбери, о чём хочешь узнать 👇',
    keyboard
  );
});

bot.help(function(ctx) {
  ctx.reply(
    '📜 Команды Оракула:\n\n/start — начать заново\n/predict — предсказание дня\n/love — про любовь\n/work — про работу\n/health — про здоровье\n/random — случайное\n\nИли просто напиши что угодно 🔮',
    keyboard
  );
});

bot.command('predict', function(ctx) {
  ctx.reply('🔮 Великий Оракул вещает:\n\n' + getFortune(), keyboard);
});

bot.command('love', function(ctx) {
  ctx.reply('💘 О, сердечные дела!\n\n' + getRandom(lovefortunes) + '\n\n' + getFortune(), keyboard);
});

bot.command('work', function(ctx) {
  ctx.reply('💼 Вижу твои финансовые тревоги!\n\n' + getRandom(workFortunes) + '\n\n' + getFortune(), keyboard);
});

bot.command('health', function(ctx) {
  ctx.reply('🌿 Здоровье — это богатство!\n\n' + getRandom(healthFortunes) + '\n\n' + getFortune(), keyboard);
});

bot.command('random', function(ctx) {
  var all = fortunes.concat(lovefortunes).concat(workFortunes).concat(healthFortunes);
  ctx.reply('🎲 Случайное предсказание:\n\n' + getRandom(all), keyboard);
});

bot.hears('🔮 Предсказание дня', function(ctx) {
  ctx.reply('🔮 Великий Оракул вещает:\n\n' + getFortune(), keyboard);
});

bot.hears('💘 Про любовь', function(ctx) {
  ctx.reply('💘 О, сердечные дела!\n\n' + getRandom(lovefortunes) + '\n\n' + getFortune(), keyboard);
});

bot.hears('💼 Про работу', function(ctx) {
  ctx.reply('💼 Вижу твои финансовые тревоги!\n\n' + getRandom(workFortunes) + '\n\n' + getFortune(), keyboard);
});

bot.hears('🌿 Про здоровье', function(ctx) {
  ctx.reply('🌿 Здоровье — это богатство!\n\n' + getRandom(healthFortunes) + '\n\n' + getFortune(), keyboard);
});

bot.hears('🎲 Случайное', function(ctx) {
  var all = fortunes.concat(lovefortunes).concat(workFortunes).concat(healthFortunes);
  ctx.reply('🎲 Случайное предсказание:\n\n' + getRandom(all), keyboard);
});

bot.hears('❓ Помощь', function(ctx) {
  ctx.reply('📜 Команды:\n\n/start — начать заново\n/predict — предсказание\n/love — про любовь\n/work — про работу\n/health — про здоровье', keyboard);
});

bot.on('text', function(ctx) {
  var lower = ctx.message.text.toLowerCase();

  if (lower.indexOf('привет') !== -1 || lower.indexOf('hello') !== -1 || lower.indexOf('хай') !== -1) {
    return ctx.reply('✨ Приветствую! Звёзды уже смеются, предвкушая твой день.\n\n' + getFortune(), keyboard);
  }
  if (lower.indexOf('спасибо') !== -1 || lower.indexOf('благодарю') !== -1) {
    return ctx.reply('🙏 Не благодари — благодари звёзды!\nХотя они заняты и, возможно, не заметят.', keyboard);
  }
  if (lower.indexOf('скучно') !== -1 || lower.indexOf('грустно') !== -1) {
    return ctx.reply('😏 Скуке приходит конец!\n\n' + getFortune() + '\n\nВселенная рекомендует: поговори с кактусом — он выслушает.', keyboard);
  }

  ctx.reply('🔮 Оракул слышит тебя...\n\n' + getFortune(), keyboard);
});

bot.launch();

console.log('');
console.log('🔮 Оракул Карнавалий запущен на Bothost!');
console.log('');

process.once('SIGINT', function() { bot.stop('SIGINT'); });
process.once('SIGTERM', function() { bot.stop('SIGTERM'); });
