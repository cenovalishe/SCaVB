// ==========================================
// GAME DATA - Events, Items, Games, Routes
// ==========================================

const GAME_DATA = {
    // Игроки
    players: [
        { id: 'manki', name: 'Manki', color: '#ff4444' },
        { id: 'shoker', name: 'Shoker', color: '#44ff44' },
        { id: 'marenyuk', name: 'Marenyuk', color: '#4444ff' },
        { id: 'sunekoi', name: 'Sunekoi', color: '#ffff44' },
        { id: 'smailgames', name: 'Smailgames', color: '#ff44ff' },
        { id: 'malekith', name: 'Malekith', color: '#44ffff' },
        { id: 'cenoval', name: 'Cenoval', color: '#ff8844' }
    ],

    // Маршрутные точки, организованные по цветам
    routePoints: {
        green: ['А', 'Б', 'В', 'Г', 'Д'],
        red: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        blue: ['X', 'Y']
    },

    // Вариации противников для каждой маршрутной точки
    // Каждая точка содержит массив возможных противников с их наборами игр
    enemies: {
        // Зелёные точки
        'А': [
            { name: 'Фредди', games: 'freddyGames' },
            { name: 'Бонни', games: 'bonnieGames' },
            { name: 'Чика', games: 'chicaGames' }
        ],
        'Б': [
            { name: 'Фокси', games: 'foxyGames' },
            { name: 'Голден Фредди', games: 'goldenFreddyGames' }
        ],
        'В': [
            { name: 'Марионетка', games: 'puppetGames' },
            { name: 'Балун Бой', games: 'balloonBoyGames' },
            { name: 'Мангл', games: 'mangleGames' }
        ],
        'Г': [
            { name: 'Спрингтрап', games: 'springtrapGames' },
            { name: 'Фантомы', games: 'phantomGames' }
        ],
        'Д': [
            { name: 'Найтмер', games: 'nightmareGames' },
            { name: 'Плюштрап', games: 'plushGames' }
        ],
        // Красные точки
        '1': [
            { name: 'Сёстра', games: 'sisterGames' },
            { name: 'Энард', games: 'ennardGames' }
        ],
        '2': [
            { name: 'Скрап Бейби', games: 'scrapBabyGames' },
            { name: 'Молтен Фредди', games: 'moltenFreddyGames' }
        ],
        '3': [
            { name: 'Рокстар Фредди', games: 'rockstarFreddyGames' },
            { name: 'Рокстар Бонни', games: 'rockstarBonnieGames' }
        ],
        '4': [
            { name: 'Гламрок Фредди', games: 'glamrockFreddyGames' },
            { name: 'Монтгомери', games: 'montgomeryGames' }
        ],
        '5': [
            { name: 'Роксана', games: 'roxanneGames' },
            { name: 'Чика SB', games: 'chicaSBGames' }
        ],
        '6': [
            { name: 'Ванни', games: 'vannyGames' },
            { name: 'Глитчтрап', games: 'glitchtrapGames' }
        ],
        '7': [
            { name: 'DJ Music Man', games: 'djMusicManGames' },
            { name: 'Эндоскелет', games: 'endoGames' }
        ],
        '8': [
            { name: 'Фантайм Фредди', games: 'funtimeFreddyGames' },
            { name: 'Фантайм Фокси', games: 'funtimeFoxyGames' }
        ],
        '9': [
            { name: 'Биби', games: 'bidybabGames' },
            { name: 'Баллора', games: 'balloraGames' }
        ],
        // Синие точки
        'X': [
            { name: 'Афтон', games: 'aftonGames' },
            { name: 'Кассиди', games: 'cassidyGames' }
        ],
        'Y': [
            { name: 'Элеонора', games: 'eleanorGames' },
            { name: 'Феттти', games: 'fetchGames' }
        ]
    },

    // ==========================================
    // ИВЕНТЫ (Первый этап)
    // ==========================================
    events: {
        default: [
            { name: 'Везение', desc: '+10% к шансам на хорошие предметы', weight: 20 },
            { name: 'Проклятие', desc: '-10% к шансам, +20% к наградам', weight: 15 },
            { name: 'Двойной риск', desc: 'Удвоенные награды и штрафы', weight: 10 },
            { name: 'Тишина', desc: 'Никаких особых эффектов', weight: 30 },
            { name: 'Страх', desc: 'Следующая игра на максимальной сложности', weight: 8 },
            { name: 'Удача новичка', desc: 'Первая попытка не засчитывается', weight: 12 },
            { name: 'Таймер смерти', desc: 'Ограничение времени на прохождение', weight: 5 }
        ],
        // Пресеты для ручного выбора
        presets: {
            'Только Везение': [
                { name: 'Везение', desc: '+10% к шансам на хорошие предметы', weight: 100 }
            ],
            'Высокий риск': [
                { name: 'Двойной риск', desc: 'Удвоенные награды и штрафы', weight: 30 },
                { name: 'Страх', desc: 'Следующая игра на максимальной сложности', weight: 30 },
                { name: 'Таймер смерти', desc: 'Ограничение времени', weight: 40 }
            ],
            'Нейтральный': [
                { name: 'Тишина', desc: 'Никаких особых эффектов', weight: 100 }
            ]
        }
    },

    // ==========================================
    // ПРЕДМЕТЫ (Второй этап)
    // ==========================================
    items: {
        default: [
            { name: 'Фонарик', desc: 'Базовый источник света', price: '100', weight: 25 },
            { name: 'Батарейки', desc: '+50% времени фонарика', price: '50', weight: 20 },
            { name: 'Маска Фредди', desc: 'Обмани аниматроников', price: '200', weight: 15 },
            { name: 'Музыкальная шкатулка', desc: 'Успокаивает Марионетку', price: '300', weight: 10 },
            { name: 'Вентилятор', desc: 'Охлаждение офиса', price: '150', weight: 18 },
            { name: 'Пицца', desc: 'Отвлекает Чику', price: '80', weight: 22 },
            { name: 'Золотой микрофон', desc: 'Легендарный предмет', price: '1000', weight: 3 },
            { name: 'Плюшевый Фредди', desc: 'Талисман удачи', price: '500', weight: 7 }
        ],
        presets: {
            'Дешёвые': [
                { name: 'Фонарик', desc: 'Базовый источник света', price: '100', weight: 30 },
                { name: 'Батарейки', desc: '+50% времени фонарика', price: '50', weight: 40 },
                { name: 'Пицца', desc: 'Отвлекает Чику', price: '80', weight: 30 }
            ],
            'Дорогие': [
                { name: 'Золотой микрофон', desc: 'Легендарный предмет', price: '1000', weight: 20 },
                { name: 'Музыкальная шкатулка', desc: 'Успокаивает Марионетку', price: '300', weight: 40 },
                { name: 'Плюшевый Фредди', desc: 'Талисман удачи', price: '500', weight: 40 }
            ],
            'Сбалансированные': [
                { name: 'Маска Фредди', desc: 'Обмани аниматроников', price: '200', weight: 25 },
                { name: 'Вентилятор', desc: 'Охлаждение офиса', price: '150', weight: 25 },
                { name: 'Батарейки', desc: '+50% времени фонарика', price: '50', weight: 25 },
                { name: 'Пицца', desc: 'Отвлекает Чику', price: '80', weight: 25 }
            ]
        }
    },

    // ==========================================
    // ИГРЫ (Третий этап) - По противникам
    // ==========================================
    games: {
        // Игры для каждого типа противника
        freddyGames: [
            { name: 'FNAF 1 - Ночь 5', desc: 'Классика выживания', award: 'Звезда Фредди', award_desc: 'Знак мастерства', award_price: '500', weight: 25 },
            { name: 'Ultimate Custom Night', desc: '50/20 режим', award: 'Золотой трофей', award_desc: 'За невозможное', award_price: '2000', weight: 5 },
            { name: 'FNAF 1 - Ночь 3', desc: 'Средняя сложность', award: 'Бронзовая звезда', award_desc: 'Начинающий', award_price: '200', weight: 40 },
            { name: 'FNAF 1 - Custom Night', desc: 'Только Фредди 20', award: 'Маска Фредди+', award_desc: 'Улучшенная защита', award_price: '350', weight: 30 }
        ],
        bonnieGames: [
            { name: 'FNAF 1 - Бонни Раш', desc: 'Бонни на максимуме', award: 'Гитара Бонни', award_desc: 'Рок-н-ролл!', award_price: '400', weight: 30 },
            { name: 'Help Wanted - Бонни', desc: 'VR испытание', award: 'VR-очки', award_desc: 'Погружение в ужас', award_price: '600', weight: 25 },
            { name: 'FNAF 2 - Withered Bonnie', desc: 'Безликий кошмар', award: 'Плюш Бонни', award_desc: 'Милый снаружи', award_price: '300', weight: 45 }
        ],
        chicaGames: [
            { name: 'FNAF 1 - Чика Атака', desc: 'Кухня под контролем', award: 'Пицца-токен', award_desc: 'Бесплатная пицца', award_price: '150', weight: 35 },
            { name: 'FNAF 2 - Withered Chica', desc: 'Сломанный клюв', award: 'Капкейк', award_desc: 'Сладкий приз', award_price: '250', weight: 40 },
            { name: 'Security Breach - Чика', desc: 'Мусорный пресс', award: 'Звуковой чип', award_desc: 'Отключение врага', award_price: '450', weight: 25 }
        ],
        foxyGames: [
            { name: 'FNAF 1 - Пиратская бухта', desc: 'Следи за занавеской', award: 'Крюк Фокси', award_desc: 'Опасный сувенир', award_price: '350', weight: 35 },
            { name: 'FNAF 2 - Mangle Run', desc: 'Потолочный ужас', award: 'Запчасти', award_desc: 'Для ремонта', award_price: '200', weight: 40 },
            { name: 'Ultimate - Фокси Марафон', desc: 'Скорость = смерть', award: 'Пиратский флаг', award_desc: 'Йо-хо-хо!', award_price: '500', weight: 25 }
        ],
        goldenFreddyGames: [
            { name: 'FNAF 1 - Золотой секрет', desc: 'Редкое появление', award: 'Золотой плюш', award_desc: 'Мистический артефакт', award_price: '1500', weight: 15 },
            { name: 'FNAF 2 - ГИГАЧЕЛ', desc: 'Голова везде', award: 'Золотая маска', award_desc: 'It\'s Me', award_price: '1000', weight: 30 },
            { name: 'Ultimate - Golden Challenge', desc: 'Только золотые', award: 'Золотой микрофон', award_desc: 'Легенда', award_price: '2500', weight: 10 }
        ],
        puppetGames: [
            { name: 'FNAF 2 - Шкатулка', desc: 'Не дай остановиться', award: 'Шкатулка', award_desc: 'Мелодия страха', award_price: '400', weight: 35 },
            { name: 'FNAF 3 - Phantom Puppet', desc: 'Фантом нападает', award: 'Маска Марионетки', award_desc: 'Пустые глаза', award_price: '550', weight: 30 },
            { name: 'Ultimate - Puppet Master', desc: 'Она контролирует', award: 'Нити судьбы', award_desc: 'Контроль над всем', award_price: '800', weight: 20 }
        ],
        balloonBoyGames: [
            { name: 'FNAF 2 - BB Attack', desc: 'Прощай, фонарик', award: 'Шарик', award_desc: 'Просто шарик', award_price: '100', weight: 50 },
            { name: 'Help Wanted - Вентиляция', desc: 'Ползучий ужас', award: 'Батарейки+', award_desc: 'Запас энергии', award_price: '200', weight: 35 },
            { name: 'UCN - BB & JJ Duo', desc: 'Двойная проблема', award: 'Двойной шар', award_desc: 'Два по цене одного', award_price: '250', weight: 15 }
        ],
        mangleGames: [
            { name: 'FNAF 2 - Потолок', desc: 'Смотри вверх', award: 'Радио Мангл', award_desc: 'Белый шум', award_price: '300', weight: 40 },
            { name: 'Ultimate - Mangle Chaos', desc: 'Полный хаос', award: 'Запчасти Мангл', award_desc: 'Сборная модель', award_price: '450', weight: 30 },
            { name: 'Help Wanted - Ремонт', desc: 'Собери Мангл', award: 'Полная Мангл', award_desc: 'Восстановлена', award_price: '600', weight: 20 }
        ],
        springtrapGames: [
            { name: 'FNAF 3 - Ночь 5', desc: 'Он идёт за тобой', award: 'Костюм Спринга', award_desc: 'Опасная реликвия', award_price: '700', weight: 30 },
            { name: 'FNAF 3 - Агрессивный', desc: 'Без вентиляции', award: 'Пружины', award_desc: 'Смертельные', award_price: '500', weight: 35 },
            { name: 'Pizzeria Sim - Афтон', desc: 'Лабиринт', award: 'Фиолетовый знак', award_desc: 'I always come back', award_price: '1000', weight: 20 }
        ],
        phantomGames: [
            { name: 'FNAF 3 - Все фантомы', desc: 'Призрачная армия', award: 'Эктоплазма', award_desc: 'Жуткая субстанция', award_price: '350', weight: 35 },
            { name: 'FNAF 3 - Phantom Foxy', desc: 'Призрак пирата', award: 'Туман', award_desc: 'Нематериальный', award_price: '250', weight: 40 },
            { name: 'Ultimate - Phantoms Only', desc: 'Только призраки', award: 'Духовный кристалл', award_desc: 'Мистическая сила', award_price: '600', weight: 25 }
        ],
        nightmareGames: [
            { name: 'FNAF 4 - Ночь 5', desc: 'Худшие кошмары', award: 'Ночной свет', award_desc: 'Против тьмы', award_price: '400', weight: 35 },
            { name: 'FNAF 4 - Nightmare Mode', desc: 'Невидимые враги', award: 'Сонный талисман', award_desc: 'Спокойный сон', award_price: '700', weight: 20 },
            { name: 'Ultimate - Кошмары', desc: 'Все найтмеры', award: 'Чёрный кристалл', award_desc: 'Сконцентрированный страх', award_price: '900', weight: 15 }
        ],
        plushGames: [
            { name: 'FNAF 4 - Плюштрап', desc: 'Мини-игра ужаса', award: 'Мини-плюш', award_desc: 'Карманный друг', award_price: '200', weight: 45 },
            { name: 'Help Wanted - Плюш', desc: 'VR версия', award: 'VR Плюш', award_desc: 'Виртуальный ужас', award_price: '350', weight: 35 },
            { name: 'UCN - Плюш хаос', desc: 'Максимальная сложность', award: 'Золотой плюш', award_desc: 'Редкий трофей', award_price: '600', weight: 20 }
        ],
        sisterGames: [
            { name: 'Sister Location - Ночь 1', desc: 'Добро пожаловать', award: 'ID-карта', award_desc: 'Доступ открыт', award_price: '150', weight: 40 },
            { name: 'Sister Location - Ночь 4', desc: 'Костюм Спрингбонни', award: 'Спринглок', award_desc: 'Механизм смерти', award_price: '500', weight: 25 },
            { name: 'Sister Location - Custom', desc: 'Свой режим', award: 'Бейджик техника', award_desc: 'Профессионал', award_price: '350', weight: 35 }
        ],
        ennardGames: [
            { name: 'Sister Location - Финал', desc: 'Скупинг рум', award: 'Провода Эннарда', award_desc: 'Спутанные кабели', award_price: '600', weight: 30 },
            { name: 'Custom Night - Эннард', desc: 'Только он', award: 'Маска клоуна', award_desc: 'Жуткий маскарад', award_price: '450', weight: 35 },
            { name: 'Ultimate - Ennard Rush', desc: 'Агрессивный режим', award: 'Глаз Эннарда', award_desc: 'Всевидящее око', award_price: '800', weight: 20 }
        ],
        scrapBabyGames: [
            { name: 'FFPS - Скрап Бейби', desc: 'Она вернулась', award: 'Коготь Бейби', award_desc: 'Смертельный захват', award_price: '550', weight: 35 },
            { name: 'Ultimate - Baby Challenge', desc: 'Испытание Бейби', award: 'Мороженое', award_desc: 'Сладкий приз', award_price: '300', weight: 40 },
            { name: 'FFPS - Сложный режим', desc: 'Без спасения', award: 'Огненный знак', award_desc: 'Пламя очищения', award_price: '700', weight: 25 }
        ],
        moltenFreddyGames: [
            { name: 'FFPS - Молтен Фредди', desc: 'Расплавленный ужас', award: 'Расплав', award_desc: 'Жидкий металл', award_price: '650', weight: 30 },
            { name: 'Ultimate - Molten Mode', desc: 'Агрессия', award: 'Ядро Эннарда', award_desc: 'Сердце машины', award_price: '900', weight: 20 },
            { name: 'FFPS - Лабиринт', desc: 'Найди выход', award: 'Карта вентиляции', award_desc: 'Путь к спасению', award_price: '400', weight: 35 }
        ],
        rockstarFreddyGames: [
            { name: 'FFPS - Рокстар Фредди', desc: 'Заплати 5 монет', award: 'Монета Рокстара', award_desc: 'Оплата ужаса', award_price: '250', weight: 40 },
            { name: 'Ultimate - Rockstar Night', desc: 'Все рокстары', award: 'Платиновая пластинка', award_desc: 'Хит сезона', award_price: '500', weight: 30 },
            { name: 'FFPS - Шоу Рокстаров', desc: 'Концерт смерти', award: 'Гитара Рокстара', award_desc: 'Рок навсегда', award_price: '600', weight: 20 }
        ],
        rockstarBonnieGames: [
            { name: 'FFPS - Потерянная гитара', desc: 'Найди гитару', award: 'Гитара Бонни', award_desc: 'Инструмент рока', award_price: '400', weight: 35 },
            { name: 'Ultimate - Бонни марафон', desc: 'Все версии Бонни', award: 'Ухо Бонни', award_desc: 'Коллекция', award_price: '550', weight: 30 },
            { name: 'FFPS - Агрессия', desc: 'Без гитары = смерть', award: 'Микрофон', award_desc: 'Запасной план', award_price: '300', weight: 35 }
        ],
        glamrockFreddyGames: [
            { name: 'Security Breach - Ночь', desc: 'Супермегапиццаплекс', award: 'Звезда Гламрока', award_desc: 'Сияющий приз', award_price: '500', weight: 35 },
            { name: 'Security Breach - Побег', desc: 'Выберись до 6 утра', award: 'Часы Фазбера', award_desc: 'Время истекло', award_price: '650', weight: 30 },
            { name: 'Ruin DLC', desc: 'Руины комплекса', award: 'Маска Руин', award_desc: 'Из разрушения', award_price: '800', weight: 20 }
        ],
        montgomeryGames: [
            { name: 'Security Breach - Гольф', desc: 'Поле для гольфа', award: 'Клюшка Монти', award_desc: 'Удар силы', award_price: '400', weight: 40 },
            { name: 'Security Breach - Монти Хаос', desc: 'Агрессивный аллигатор', award: 'Очки Монти', award_desc: 'Крутой стиль', award_price: '350', weight: 35 },
            { name: 'Ruin - Разбитый Монти', desc: 'Руины', award: 'Коготь Монти', award_desc: 'Сломанный, но опасный', award_price: '500', weight: 25 }
        ],
        roxanneGames: [
            { name: 'Security Breach - Гонки', desc: 'Трасса Роксаны', award: 'Руль гонщика', award_desc: 'Скорость!', award_price: '450', weight: 35 },
            { name: 'Security Breach - Охота', desc: 'Волчица на охоте', award: 'Глаза Рокси', award_desc: 'Видеть сквозь стены', award_price: '700', weight: 25 },
            { name: 'Ruin - Слепая Рокси', desc: 'Без глаз', award: 'Повязка Рокси', award_desc: 'Вслепую', award_price: '550', weight: 30 }
        ],
        chicaSBGames: [
            { name: 'Security Breach - Кухня', desc: 'Мусорная Чика', award: 'Пицца Чики', award_desc: 'Сомнительная свежесть', award_price: '200', weight: 45 },
            { name: 'Security Breach - Погоня', desc: 'Чика преследует', award: 'Голосовой чип', award_desc: 'Отключение', award_price: '400', weight: 30 },
            { name: 'Ruin - Чика руины', desc: 'Разрушенная', award: 'Клюв Чики', award_desc: 'Сломанный', award_price: '350', weight: 25 }
        ],
        vannyGames: [
            { name: 'Security Breach - Ванни', desc: 'Кролик-убийца', award: 'Маска Ванни', award_desc: 'Глитч-кролик', award_price: '600', weight: 30 },
            { name: 'Security Breach - Финал', desc: 'Все концовки', award: 'Ключ истины', award_desc: 'Секреты раскрыты', award_price: '900', weight: 20 },
            { name: 'Ruin - Ванесса', desc: 'Две личности', award: 'Бейджик Ванессы', award_desc: 'Охранник', award_price: '500', weight: 35 }
        ],
        glitchtrapGames: [
            { name: 'Help Wanted - Глитчтрап', desc: 'Виртуальный вирус', award: 'USB Глитча', award_desc: 'Цифровой ужас', award_price: '700', weight: 30 },
            { name: 'Help Wanted - Финал', desc: 'Не дай ему сбежать', award: 'Антивирус', award_desc: 'Защита', award_price: '850', weight: 25 },
            { name: 'Special Delivery - AR', desc: 'Дополненная реальность', award: 'AR-очки', award_desc: 'Реальный ужас', award_price: '600', weight: 35 }
        ],
        djMusicManGames: [
            { name: 'Security Breach - DJ Booth', desc: 'Паучий диджей', award: 'Пластинка DJ', award_desc: 'Электро-ужас', award_price: '450', weight: 35 },
            { name: 'Security Breach - Atrium', desc: 'Гигантский паук', award: 'Нога DJ', award_desc: 'Трофей гиганта', award_price: '650', weight: 25 },
            { name: 'Ruin - Mini Music Man', desc: 'Мини-версии', award: 'Мини DJ', award_desc: 'Карманный кошмар', award_price: '300', weight: 40 }
        ],
        endoGames: [
            { name: 'FNAF 1 - Backstage', desc: 'Эндоскелеты оживают', award: 'Запчасти Эндо', award_desc: 'Голый скелет', award_price: '200', weight: 45 },
            { name: 'Security Breach - Эндо армия', desc: 'Их много', award: 'Глаза Эндо', award_desc: 'Светящиеся', award_price: '350', weight: 35 },
            { name: 'Ruin - Эндо хаос', desc: 'Безумие машин', award: 'Ядро Эндо', award_desc: 'Сердце машины', award_price: '500', weight: 20 }
        ],
        funtimeFreddyGames: [
            { name: 'Sister Location - Бонни Хэнд', desc: 'Кукла Бонни', award: 'Бонни-перчатка', award_desc: 'Привет!', award_price: '400', weight: 35 },
            { name: 'Custom Night - Фантайм', desc: 'Только Фантаймы', award: 'Диск Фантайма', award_desc: 'Звуковая иллюзия', award_price: '550', weight: 30 },
            { name: 'UCN - Bon Bon', desc: 'Бон Бон атакует', award: 'Мини Бон Бон', award_desc: 'Карманный друг', award_price: '300', weight: 35 }
        ],
        funtimeFoxyGames: [
            { name: 'Sister Location - Шоу', desc: 'Занавес смерти', award: 'Занавес Фокси', award_desc: 'Шоу начинается', award_price: '350', weight: 40 },
            { name: 'Custom Night - Белая лиса', desc: 'Фокси-шоумен', award: 'Крюк Фантайма', award_desc: 'Элегантный ужас', award_price: '500', weight: 30 },
            { name: 'UCN - Фокси Раш', desc: 'Скорость белой лисы', award: 'Плюш Фокси Ф', award_desc: 'Милый снаружи', award_price: '400', weight: 30 }
        ],
        bidybabGames: [
            { name: 'Sister Location - Под столом', desc: 'Маленький ужас', award: 'Мини Биби', award_desc: 'Карманный кошмар', award_price: '150', weight: 50 },
            { name: 'Custom Night - Биби толпа', desc: 'Их много', award: 'Набор Биби', award_desc: 'Коллекция', award_price: '300', weight: 30 },
            { name: 'UCN - Электробаб', desc: 'Электрические малыши', award: 'Батарейки Биби', award_desc: 'Заряжено!', award_price: '250', weight: 20 }
        ],
        balloraGames: [
            { name: 'Sister Location - Галерея', desc: 'Танец смерти', award: 'Балетки Баллоры', award_desc: 'Танец на цыпочках', award_price: '400', weight: 35 },
            { name: 'Custom Night - Баллора', desc: 'Тишина', award: 'Музыкальная шкатулка Б', award_desc: 'Мелодия танца', award_price: '500', weight: 30 },
            { name: 'UCN - Minireena', desc: 'Маленькие танцовщицы', award: 'Мини Рина', award_desc: 'Балетная труппа', award_price: '350', weight: 35 }
        ],
        aftonGames: [
            { name: 'FFPS - Финал Афтона', desc: 'Конец Purple Guy', award: 'Фиолетовый значок', award_desc: 'I always come back', award_price: '1000', weight: 20 },
            { name: 'UCN - Афтон Ад', desc: 'Его личный ад', award: 'Ключ от ада', award_desc: 'Вечные муки', award_price: '1500', weight: 10 },
            { name: 'Help Wanted - Уильям', desc: 'Цифровой Афтон', award: 'Душа Афтона', award_desc: 'Бессмертный убийца', award_price: '1200', weight: 15 }
        ],
        cassidyGames: [
            { name: 'UCN - Золотой Фредди', desc: 'Месть Кассиди', award: 'Один из многих', award_desc: 'The One You Should Not Have Killed', award_price: '1500', weight: 15 },
            { name: 'FNAF World - Секрет', desc: 'Мистический путь', award: 'Часы Кассиди', award_desc: 'Время мести', award_price: '1000', weight: 25 },
            { name: 'Logbook - Пазл', desc: 'Расшифруй послание', award: 'Дневник Кассиди', award_desc: 'Скрытые страницы', award_price: '800', weight: 35 }
        ],
        eleanorGames: [
            { name: 'Fazbear Frights - Элеонора', desc: 'Книжный ужас', award: 'Браслет Элеоноры', award_desc: 'Красота смерти', award_price: '600', weight: 30 },
            { name: 'Tales - Красавица', desc: 'Зловещая красота', award: 'Зеркало Элеоноры', award_desc: 'Отражение зла', award_price: '800', weight: 25 },
            { name: 'Frights - 1:35 AM', desc: 'Ночной визит', award: 'Часы 1:35', award_desc: 'Время ужаса', award_price: '700', weight: 30 }
        ],
        fetchGames: [
            { name: 'Fazbear Frights - Fetch', desc: 'Послушный пёс', award: 'Ошейник Фетча', award_desc: 'Лучший друг?', award_price: '400', weight: 40 },
            { name: 'Tales - Собачья охота', desc: 'Он выполняет команды', award: 'Мячик Фетча', award_desc: 'Принеси!', award_price: '300', weight: 35 },
            { name: 'Frights - Финал', desc: 'Последняя команда', award: 'Программа Фетча', award_desc: 'Код верности', award_price: '550', weight: 25 }
        ]
    },

    // Дополнительные пресеты игр для ручного выбора
    gamePresets: {
        'Классика FNAF 1': [
            { name: 'FNAF 1 - Ночь 1', desc: 'Первое знакомство', award: 'Звезда новичка', award_desc: 'Первые шаги', award_price: '100', weight: 40 },
            { name: 'FNAF 1 - Ночь 3', desc: 'Средняя сложность', award: 'Бронзовая звезда', award_desc: 'Уже что-то', award_price: '250', weight: 35 },
            { name: 'FNAF 1 - Ночь 5', desc: 'Настоящий вызов', award: 'Серебряная звезда', award_desc: 'Мастер', award_price: '400', weight: 20 },
            { name: 'FNAF 1 - Ночь 6', desc: 'Кошмар', award: 'Золотая звезда', award_desc: 'Легенда', award_price: '600', weight: 5 }
        ],
        'Security Breach': [
            { name: 'SB - Исследование', desc: 'Изучи Пиццаплекс', award: 'Карта комплекса', award_desc: 'Знание - сила', award_price: '200', weight: 35 },
            { name: 'SB - Все боссы', desc: 'Победи всех', award: 'Медаль героя', award_desc: 'Победитель', award_price: '700', weight: 20 },
            { name: 'SB - Спидран', desc: 'На время', award: 'Секундомер', award_desc: 'Быстрее ветра', award_price: '500', weight: 25 },
            { name: 'SB - Истинный финал', desc: 'Секретная концовка', award: 'Ключ истины', award_desc: 'Правда открыта', award_price: '1000', weight: 10 }
        ],
        'Ультра-сложность': [
            { name: 'UCN 50/20', desc: 'Невозможное', award: 'Платиновый трофей', award_desc: 'Бог FNAF', award_price: '5000', weight: 5 },
            { name: 'FNAF 4 Nightmare', desc: 'Кошмар без света', award: 'Кристалл тьмы', award_desc: 'Победитель тьмы', award_price: '2000', weight: 15 },
            { name: 'SL Custom Night V.Hard', desc: 'Максимальный ужас', award: 'Значок эксперта', award_desc: 'Не для слабых', award_price: '1500', weight: 25 },
            { name: 'FNAF 3 Агрессив', desc: 'Спрингтрап на максимуме', award: 'Пружина смерти', award_desc: 'Выжил', award_price: '1000', weight: 30 }
        ],
        'Мини-игры': [
            { name: 'FNAF 2 - Мини-игра', desc: 'Пиксельный ужас', award: 'Ретро-монета', award_desc: '8-бит награда', award_price: '150', weight: 40 },
            { name: 'FNAF 3 - Мини-игры', desc: 'Соберы кексы', award: 'Пиксельный кекс', award_desc: 'Сладкое прошлое', award_price: '200', weight: 30 },
            { name: 'FNAF World', desc: 'RPG приключение', award: 'Чип FNAF World', award_desc: 'Другое измерение', award_price: '300', weight: 20 },
            { name: 'Security Breach Arcade', desc: 'Аркадные игры', award: 'Жетон аркады', award_desc: 'Геймер', award_price: '250', weight: 25 }
        ]
    }
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}
