class CuratorAttestation {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.startTime = null;
        this.timer = null;
        this.session = null;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Инициализация панели куратора...');
            this.loadSessionFromURL();
            this.loadQuestions();
            this.setupUI();
            this.bindEvents();
            console.log('✅ Панель куратора готова');

            setTimeout(() => {
                this.startAttestation();
            }, 1000);
        } catch (error) {
            console.error('❌ Ошибка инициализации куратора:', error);
            this.showError('Ошибка инициализации системы');
        }
    }

    loadQuestions() {
        // ПОЛНЫЙ банк вопросов для ОБОИХ серверов
        this.questions = {
            "rublevo": {
                "helper": [
                    "Назови обязанности Хелпера",
                    "После захода на рабочий сервер, что нужно сделать перед началом работы?",
                    "Как проводится проверка на АФК?",
                    "Как снять пред? А выговор?",
                    "Какой срок хранения видеофиксаций с нарушением игрока?",
                    "Ты увидел, что игрок с 5 уровнем нарушил, что ты будешь делать?",
                    "Какой минимальный онлайн в день/месяц?",
                    "Что будешь делать если увидишь игрока летающего по карте?",
                    "Во сколько падает груз?",
                    "Можно ли продавать именные номера?",
                    "Как создать семью и какая на нее стоимость?",
                    "Для чего катализаторы?",
                    "Какие есть ветки развития в клане?",
                    "В каких фракциях нет выхода на крышу?",
                    "С какого звания можно писать в Объявление Фракций?",
                    "Где можно продать квартиру/дом?",
                    "Через стажировку каких фракций нельзя получить военный билет?",
                    "Какие кланы участвуют в битве за картель?",
                    "С какого ранга доступен сбор МЗДЫ с территорий?",
                    "С какого ранга можно присоединиться к битве за территории?",
                    "Сколько здоровья добавляет бафф Доритос максимальной прокачки?",
                    "Какое наказание за 1 стадию срыва МП?",
                    "Когда можно использовать голосовую отыгровку?",
                    "Что такое правило новой жизни?",
                    "Когда можно чинить машины игрокам?",
                    "Если ты увидел что сотрудник фракции нарушил без формы, будешь отправлять проблемник?",
                    "Тебя телепортирует модератор на репорт, где игрок жалуется на выданное тобой наказании. Что будешь делать?",
                    "Ты принимаешь репорт и видишь, как игрок давит второго на машине... Будешь наказывать?"
                ],
                "moderator": [
                    "Назови обязанности модератора?",
                    "Каким образом ты будешь изменять никнейм игроку?",
                    "Как убрать ограничение на аккаунте, связанное с продажей имущества?",
                    "Какие скины запрещено выдавать?",
                    "Что выдается за обход блокировки?",
                    "Что такое Абьюз?",
                    "Назови виды абьюза по правилам проекта",
                    "Когда игрок простреливает текстуру — это что?",
                    "В чём различие IC от OOC?",
                    "Какой транспорт нельзя продать на БУ рынке?",
                    "Ремонтируется ли колесо рем. комплектом?",
                    "Какие есть виды валют на проекте?",
                    "Какой должен быть уровень оружия, чтобы утилизировать?",
                    "Когда проходит аукцион в порту МСК?",
                    "С какого уровня можно купить широн на бу?",
                    "Какими способами можно изменить соц. рейтинг?",
                    "Назови способы получения парашюта на проекте",
                    "Глобальный — IC или OOC чат?",
                    "Какие виды гонок есть на проекте?",
                    "Где можно потратить биткоины?",
                    "Сколько видов лидербордов есть на проекте и какие?",
                    "Как часто обновляются Уникальные предложения?",
                    "Как включить неон на авто?",
                    "Что ответить игроку по поводу ×2 доната у друга?",
                    "Какие виды деталей в тюнинге есть?",
                    "Назови хобби проекта",
                    "Что ответить игроку, не согласному с наказанием?",
                    "Игрок перекрыл дорогу ТС. Что делать?",
                    "Передача аккаунта — какое наказание?",
                    "Читер везёт игрока. Действия?",
                    "Что выдается за передачу валюты через казино?",
                    "Как можно нанести ущерб серверу бездействием?",
                    "Игрок говорит Иди убейся. За что накажешь?",
                    "На спавне кричат Слава Украине. Действия?",
                    "ППС просит паспорт без инвиза. Что делать?",
                    "Оскорбляют в внеигровом чате. Действия?",
                    "Оскорбление в названии клана — что делать?",
                    "Репорт: не может передать деньги девушке. Почему?",
                    "Игрок вышел во время оформления ППС. Что делать?",
                    "Разговариваешь с игроками просто так — последствия?",
                    "Админ другого сервера просит сказать донат — можно?",
                    "Какие команды отыгрываются в голос?",
                    "Можно ли наказывать медиа партнёра по 6.16?",
                    "Война кланов — вмешался ППС. Что делать?",
                    "Репорт о передаче аккаунта — действия?",
                    "Блат от друга-админа. Действия?",
                    "Максимум замов во фракции МЗ?",
                    "Как выйти из ЧС лидеров?",
                    "Когда спутник не отслеживает местоположение?",
                    "Жалоба: лидер понизил с сержанта до стажёра. Что делать?",
                    "Можно ли фракциям использовать статьи из реала?",
                    "Инкассатор ничего не делает. Репорт. Действия?",
                    "Лидер переводит в другой город 3-й раз за неделю. Что делать?",
                    "Лидер видит чаты всех городов?",
                    "Человек попросил удалить аккаунт. Действия?",
                    "Медиа партнёр нарушает правила в эфире. Что делать?",
                    "Игрок использует багованные предметы. Действия?"
                ],
                "administrator": [
                    "Обязанности администратора",
                    "Как и в каких случаях нужно проверить игрока на передачу",
                    "Как проводить выдачу фракции",
                    "Назови конечный продукт некстрп",
                    "Назови все виды абьюза",
                    "Что такое Ущерб серверу",
                    "С какого уровня можно вступать во фракцию",
                    "Что теперь вместо трудовой книги",
                    "Какое КД на инструмент в ДПС",
                    "Какой инструмент в МЗ",
                    "Как прокачивать досье",
                    "Кто может покупать усилители для фракции",
                    "Лидер видит чаты всех городов, или только того, где находится?",
                    "Когда обновляется лимит премий во фракции?",
                    "Что обозначает звездочка в F3, рядом с бюджетом фракции?",
                    "Сколько замов может быть в МЗ? А во ФСИН?",
                    "Ты следишь за игроком, он начинает стрельбу из авто с тека, а затем с помощью бага переключается на абакан и стреляет уже с него из-за руля. Наказуемо?",
                    "Наказывается ли стрельба в щель в воротах армии?",
                    "Что делать, если работая по репорту увидел, как сотрудник ППС задержал своего коллегу?",
                    "Работая по репорту ты видишь, как в зеленой зоне игрок таранит другого в попытках вытолкать. Накажешь ?",
                    "Человек берет машину xpeng и прилетает на крышу, чтобы по ней кататься. Что делать?",
                    "Приходит репорт, игрок жалуется на то, что кто-то ловит макросами оружия в шопе. Что делать?",
                    "Мэр садится в личный транспорт игрока, который состоит в ОПГ и катает объезд в нем. Накажешь?",
                    "Если опгшник из этой ситуации стреляет по другим авто, а мэр ничего не делает - накажешь за нрп?",
                    "Тебе приходит репорт на ДМ, где два игрока находятся в клане, но у них союз. Наказываем или нет?"
                ]
            },
            "nevsky": {
                "helper": [
                    "Назови обязанности Хелпера",
                    "После захода на рабочий сервер, что нужно сделать перед началом работы?",
                    "Как проводится проверка на АФК?",
                    "Как снять пред? А выговор?",
                    "Какой срок хранения видеофиксаций с нарушением игрока?",
                    "Ты увидел, что игрок с 5 уровнем нарушил, что ты будешь делать?",
                    "Какой минимальный онлайн в день/месяц?",
                    "Что будешь делать если увидишь игрока летающего по карте?",
                    "Во сколько падает груз?",
                    "Можно ли продавать именные номера?",
                    "Как создать семью и какая на нее стоимость?",
                    "Для чего катализаторы?",
                    "Какие есть ветки развития в клане?",
                    "В каких фракциях нет выхода на крышу?",
                    "С какого звания можно писать в Объявление Фракций?",
                    "Где можно продать квартиру/дом?",
                    "Через стажировку каких фракций нельзя получить военный билет?",
                    "Какие кланы участвуют в битве за картель?",
                    "С какого ранга доступен сбор МЗДЫ с территорий?",
                    "С какого ранга можно присоединиться к битве за территории?",
                    "Сколько здоровья добавляет бафф Доритос максимальной прокачки?",
                    "Какое наказание за 1 стадию срыва МП?",
                    "Когда можно использовать голосовую отыгровку?",
                    "Что такое правило новой жизни?",
                    "Когда можно чинить машины игрокам?",
                    "Если ты увидел что сотрудник фракции нарушил без формы, будешь отправлять проблемник?",
                    "Тебя телепортирует модератор на репорт, где игрок жалуется на выданное тобой наказании. Что будешь делать?",
                    "Ты принимаешь репорт и видишь, как игрок давит второго на машине... Будешь наказывать?"
                ],
                "moderator": [
                    "Назови обязанности модератора?",
                    "Каким образом ты будешь изменять никнейм игроку?",
                    "Как убрать ограничение на аккаунте, связанное с продажей имущества?",
                    "Какие скины запрещено выдавать?",
                    "Что выдается за обход блокировки?",
                    "Что такое Абьюз?",
                    "Назови виды абьюза по правилам проекта",
                    "Когда игрок простреливает текстуру — это что?",
                    "В чём различие IC от OOC?",
                    "Какой транспорт нельзя продать на БУ рынке?",
                    "Ремонтируется ли колесо рем. комплектом?",
                    "Какие есть виды валют на проекте?",
                    "Какой должен быть уровень оружия, чтобы утилизировать?",
                    "Когда проходит аукцион в порту МСК?",
                    "С какого уровня можно купить широн на бу?",
                    "Какими способами можно изменить соц. рейтинг?",
                    "Назови способы получения парашюта на проекте",
                    "Глобальный — IC или OOC чат?",
                    "Какие виды гонок есть на проекте?",
                    "Где можно потратить биткоины?",
                    "Сколько видов лидербордов есть на проекте и какие?",
                    "Как часто обновляются Уникальные предложения?",
                    "Как включить неон на авто?",
                    "Что ответить игроку по поводу ×2 доната у друга?",
                    "Какие виды деталей в тюнинге есть?",
                    "Назови хобби проекта",
                    "Что ответить игроку, не согласному с наказанием?",
                    "Игрок перекрыл дорогу ТС. Что делать?",
                    "Передача аккаунта — какое наказание?",
                    "Читер везёт игрока. Действия?",
                    "Что выдается за передачу валюты через казино?",
                    "Как можно нанести ущерб серверу бездействием?",
                    "Игрок говорит Иди убейся. За что накажешь?",
                    "На спавне кричат Слава Украине. Действия?",
                    "ППС просит паспорт без инвиза. Что делать?",
                    "Оскорбляют в внеигровом чате. Действия?",
                    "Оскорбление в названии клана — что делать?",
                    "Репорт: не может передать деньги девушке. Почему?",
                    "Игрок вышел во время оформления ППС. Что делать?",
                    "Разговариваешь с игроками просто так — последствия?",
                    "Админ другого сервера просит сказать донат — можно?",
                    "Какие команды отыгрываются в голос?",
                    "Можно ли наказывать медиа партнёра по 6.16?",
                    "Война кланов — вмешался ППС. Что делать?",
                    "Репорт о передаче аккаунта — действия?",
                    "Блат от друга-админа. Действия?",
                    "Максимум замов во фракции МЗ?",
                    "Как выйти из ЧС лидеров?",
                    "Когда спутник не отслеживает местоположение?",
                    "Жалоба: лидер понизил с сержанта до стажёра. Что делать?",
                    "Можно ли фракциям использовать статьи из реала?",
                    "Инкассатор ничего не делает. Репорт. Действия?",
                    "Лидер переводит в другой город 3-й раз за неделю. Что делать?",
                    "Лидер видит чаты всех городов?",
                    "Человек попросил удалить аккаунт. Действия?",
                    "Медиа партнёр нарушает правила в эфире. Что делать?",
                    "Игрок использует багованные предметы. Действия?"
                ],
                "administrator": [
                    "Обязанности администратора",
                    "Как и в каких случаях нужно проверить игрока на передачу",
                    "Как проводить выдачу фракции",
                    "Назови конечный продукт некстрп",
                    "Назови все виды абьюза",
                    "Что такое Ущерб серверу",
                    "С какого уровня можно вступать во фракцию",
                    "Что теперь вместо трудовой книги",
                    "Какое КД на инструмент в ДПС",
                    "Какой инструмент в МЗ",
                    "Как прокачивать досье",
                    "Кто может покупать усилители для фракции",
                    "Лидер видит чаты всех городов, или только того, где находится?",
                    "Когда обновляется лимит премий во фракции?",
                    "Что обозначает звездочка в F3, рядом с бюджетом фракции?",
                    "Сколько замов может быть в МЗ? А во ФСИН?",
                    "Ты следишь за игроком, он начинает стрельбу из авто с тека, а затем с помощью бага переключается на абакан и стреляет уже с него из-за руля. Наказуемо?",
                    "Наказывается ли стрельба в щель в воротах армии?",
                    "Что делать, если работая по репорту увидел, как сотрудник ППС задержал своего коллегу?",
                    "Работая по репорту ты видишь, как в зеленой зоне игрок таранит другого в попытках вытолкать. Накажешь ?",
                    "Человек берет машину xpeng и прилетает на крышу, чтобы по ней кататься. Что делать?",
                    "Приходит репорт, игрок жалуется на то, что кто-то ловит макросами оружия в шопе. Что делать?",
                    "Мэр садится в личный транспорт игрока, который состоит в ОПГ и катает объезд в нем. Накажешь?",
                    "Если опгшник из этой ситуации стреляет по другим авто, а мэр ничего не делает - накажешь за нрп?",
                    "Тебе приходит репорт на ДМ, где два игрока находятся в клане, но у них союз. Наказываем или нет?"
                ]
            }
        };
        console.log('✅ ПОЛНЫЙ банк вопросов загружен');
    }

    loadSessionFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.session = {
            name: urlParams.get('name') || 'Неизвестный',
            server: urlParams.get('server') || 'rublevo',
            role: urlParams.get('role') || 'helper'
        };
        console.log('📋 Сессия загружена:', this.session);
    }

    setupUI() {
        this.updateSessionInfo();
        document.getElementById('questionCard').style.display = 'none';
        document.getElementById('resultsContainer').style.display = 'none';
        document.getElementById('controlsSection').style.display = 'none';
        console.log('🎨 Интерфейс настроен');
    }

    updateSessionInfo() {
        const elements = {
            sessionName: this.session.name,
            sessionRole: this.getRoleName(this.session.role),
            sessionServer: this.getServerName(this.session.server),
            sessionQuestions: this.getQuestionsCount()
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                console.log(`📝 ${id}: ${value}`);
            }
        });

        const statusEl = document.getElementById('sessionStatus');
        if (statusEl) {
            statusEl.textContent = 'Готов к запуску';
            statusEl.style.background = 'linear-gradient(135deg, var(--success), #00a693)';
        }
    }

    getQuestionsCount() {
        if (!this.questions || !this.questions[this.session.server] || !this.questions[this.session.server][this.session.role]) {
            console.error(`❌ Вопросы не найдены для ${this.session.server}/${this.session.role}`);
            return '0';
        }
        const count = this.questions[this.session.server][this.session.role].length;
        console.log(`📊 Вопросов для ${this.session.role} на ${this.session.server}: ${count}`);
        return count.toString();
    }

    bindEvents() {
        window.gradeAnswer = (grade) => this.gradeAnswer(grade);
        window.nextQuestion = () => this.nextQuestion();
        window.previousQuestion = () => this.previousQuestion();
        window.pauseAttestation = () => this.pauseAttestation();
        window.saveResults = () => this.saveResults();
        console.log('🔗 События привязаны');
    }

    startAttestation() {
        const questionsAvailable = this.questions[this.session.server][this.session.role];
        if (!questionsAvailable || questionsAvailable.length === 0) {
            this.showError('Вопросы для выбранной роли не найдены');
            return;
        }

        console.log(`🚀 Запуск аттестации: ${questionsAvailable.length} вопросов`);

        this.startTime = Date.now();
        this.currentQuestion = 0;
        this.answers = [];

        document.getElementById('progressSection').style.display = 'block';
        document.getElementById('questionCard').style.display = 'block';
        document.getElementById('controlsSection').style.display = 'flex';

        const statusEl = document.getElementById('sessionStatus');
        if (statusEl) {
            statusEl.textContent = 'В процессе';
            statusEl.style.background = 'linear-gradient(135deg, var(--blue-primary), var(--blue-secondary))';
        }

        this.showCurrentQuestion();
        this.startTimer();
        console.log('✅ Аттестация запущена');
    }

    showCurrentQuestion() {
        const questions = this.questions[this.session.server][this.session.role];
        const currentQuestionData = questions[this.currentQuestion];

        console.log(`❓ Вопрос ${this.currentQuestion + 1}/${questions.length}: ${currentQuestionData.substring(0, 50)}...`);

        const elements = {
            questionCounter: `Вопрос ${this.currentQuestion + 1}`,
            questionText: currentQuestionData,
            progressText: `Вопрос ${this.currentQuestion + 1} из ${questions.length}`
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });

        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const questions = this.questions[this.session.server][this.session.role];
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 0;
        }

        if (nextBtn) {
            if (this.currentQuestion === questions.length - 1) {
                nextBtn.innerHTML = `
                    Завершить аттестацию
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                `;
                nextBtn.style.background = 'linear-gradient(135deg, var(--success), #00a693)';
            } else {
                nextBtn.innerHTML = `
                    Следующий
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                `;
                nextBtn.style.background = '';
            }
        }
    }

    gradeAnswer(grade) {
        console.log(`📝 Оценка вопроса ${this.currentQuestion + 1}: ${grade} балл(а)`);

        const answer = {
            questionIndex: this.currentQuestion,
            question: this.questions[this.session.server][this.session.role][this.currentQuestion],
            grade: grade,
            timestamp: Date.now(),
            comment: ''
        };

        this.answers[this.currentQuestion] = answer;

        // Мягкая визуальная обратная связь
        const buttons = document.querySelectorAll('.grade-btn');
        buttons.forEach(btn => {
            btn.style.transform = 'scale(0.98)';
            btn.style.transition = 'all 0.2s ease';
        });

        setTimeout(() => {
            buttons.forEach(btn => {
                btn.style.transform = '';
            });
            
            // Автоматически переходим к следующему вопросу если не последний
            if (this.currentQuestion < this.questions[this.session.server][this.session.role].length - 1) {
                setTimeout(() => this.nextQuestion(), 300);
            }
        }, 150);
    }

    nextQuestion() {
        const questions = this.questions[this.session.server][this.session.role];
        
        if (this.currentQuestion >= questions.length - 1) {
            this.finishAttestation();
        } else {
            this.currentQuestion++;
            this.showCurrentQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showCurrentQuestion();
        }
    }

    pauseAttestation() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            const btn = event.target;
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Продолжить
            `;
            console.log('⏸️ Аттестация приостановлена');
        } else {
            this.startTimer();
            const btn = event.target;
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
                Пауза
            `;
            console.log('▶️ Аттестация продолжена');
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            const timerEl = document.getElementById('timer');
            if (timerEl) {
                timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    finishAttestation() {
        console.log('🏁 Завершение аттестации');
        if (this.timer) clearInterval(this.timer);

        // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Считаем только валидные ответы
        const validAnswers = this.answers.filter(a => a && typeof a.grade === 'number');
        
        // Сумма баллов (правильно)
        const totalScore = validAnswers.reduce((sum, answer) => sum + answer.grade, 0);
        
        // ИСПРАВЛЕННАЯ ФОРМУЛА: Делим на количество ОЦЕНЕННЫХ вопросов!
        const actualAnsweredCount = validAnswers.length;
        const finalScore = (totalScore / actualAnsweredCount) * 10;
        
        const passed = finalScore >= 6.0;
        const duration = Math.floor((Date.now() - this.startTime) / 1000);
        
        console.log(`📊 Детали расчета:`);
        console.log(`   Всего вопросов в банке: ${this.questions[this.session.server][this.session.role].length}`);
        console.log(`   Оценено вопросов: ${actualAnsweredCount}`);
        console.log(`   Сумма баллов: ${totalScore}`);
        console.log(`   Итоговый балл: (${totalScore} / ${actualAnsweredCount}) × 10 = ${finalScore.toFixed(1)}/10`);
        console.log(`   Статус: ${passed ? 'СДАНО' : 'НЕ СДАНО'}`);

        // Показываем экран результатов с детальным логом
        this.showDetailedResults(actualAnsweredCount, finalScore, passed, duration, validAnswers);
    }

    showDetailedResults(actualAnsweredCount, finalScore, passed, duration, validAnswers) {
        // Скрываем интерфейс аттестации
        document.getElementById('questionCard').style.display = 'none';
        document.getElementById('controlsSection').style.display = 'none';

        // Создаем детальный результат
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.innerHTML = this.createDetailedResultsHTML(actualAnsweredCount, finalScore, passed, duration, validAnswers);
            resultsContainer.style.display = 'block';
        }

        // Сохраняем результат
        this.finalResult = {
            name: this.session.name,
            server: this.session.server,
            role: this.session.role,
            score: finalScore,
            passed: passed,
            duration: duration,
            answers: this.answers,
            questionsCount: actualAnsweredCount  // Сохраняем реальное количество
        };
    }

    createDetailedResultsHTML(actualAnsweredCount, finalScore, passed, duration, validAnswers) {
        const stats = {
            correct: validAnswers.filter(a => a.grade === 1).length,
            partial: validAnswers.filter(a => a.grade === 0.5).length,
            incorrect: validAnswers.filter(a => a.grade === 0).length
        };
        
        console.log(`📊 Статистика ответов:`);
        console.log(`   Верных: ${stats.correct}`);
        console.log(`   Частично верных: ${stats.partial}`);
        console.log(`   Неверных: ${stats.incorrect}`);
        console.log(`   ИТОГО: ${stats.correct + stats.partial + stats.incorrect} = ${actualAnsweredCount}`);

        return `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">
                    ${passed ? '🎉' : '💔'}
                </div>
                <h2 style="font-size: 1.75rem; color: var(--text-primary); margin-bottom: 2rem;">
                    ${passed ? 'Аттестация успешно пройдена!' : 'Аттестация не пройдена'}
                </h2>
                
                <div style="font-size: 3rem; font-weight: 700; color: ${passed ? 'var(--success)' : 'var(--error)'}; margin-bottom: 2rem;">
                    ${finalScore.toFixed(1)}/10
                </div>
                
                <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid var(--border-light);">
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                        Оценено вопросов: <strong style="color: var(--text-primary);">${actualAnsweredCount}</strong> из ${this.questions[this.session.server][this.session.role].length}
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 3rem;">
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-light);">
                        <div style="font-size: 2rem; color: var(--success); font-weight: 700;">${stats.correct}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Верно</div>
                    </div>
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-light);">
                        <div style="font-size: 2rem; color: var(--warning); font-weight: 700;">${stats.partial}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Частично</div>
                    </div>
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-light);">
                        <div style="font-size: 2rem; color: var(--error); font-weight: 700;">${stats.incorrect}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Неверно</div>
                    </div>
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-light);">
                        <div style="font-size: 2rem; color: var(--blue-primary); font-weight: 700;">${this.formatDuration(duration)}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Время</div>
                    </div>
                </div>
                
                <div class="question-log">
                    <div class="question-log-header">
                        <h4>📝 Детальный лог по вопросам</h4>
                        <span style="color: var(--text-secondary); font-size: 0.9rem;">
                            Всего оценено: ${actualAnsweredCount} вопросов
                        </span>
                    </div>
                    
                    <div style="text-align: left;">
                        ${validAnswers.map((answer) => {
                            const gradeClass = answer.grade === 1 ? 'correct' : 
                                             answer.grade === 0.5 ? 'partial' : 'incorrect';
                            const gradeText = answer.grade === 1 ? 'Верно' : 
                                            answer.grade === 0.5 ? 'Частично' : 'Неверно';
                            const gradeColor = answer.grade === 1 ? 'var(--success)' : 
                                             answer.grade === 0.5 ? 'var(--warning)' : 'var(--error)';
                            const borderColor = answer.grade === 1 ? 'var(--success)' : 
                                              answer.grade === 0.5 ? 'var(--warning)' : 'var(--error)';

                            return `
                                <div class="question-item ${gradeClass}" style="margin-bottom: 1rem; border-left: 4px solid ${borderColor};">
                                    <div class="question-header">
                                        <span class="question-number">Вопрос ${answer.questionIndex + 1}</span>
                                        <span class="question-grade grade-${gradeClass}" style="background: ${gradeColor}22; color: ${gradeColor}; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                                            ${gradeText} (${answer.grade} балл${answer.grade === 1 ? '' : answer.grade === 0.5 ? 'а' : 'ов'})
                                        </span>
                                    </div>
                                    <div class="question-text">
                                        ${answer.question}
                                    </div>
                                    <div class="question-comment">
                                        <textarea 
                                            style="width: 100%; min-height: 60px; background: var(--bg-primary); border: 1px solid var(--border-light); border-radius: 8px; padding: 0.75rem; color: var(--text-primary); font-size: 0.9rem; resize: vertical; transition: all 0.3s ease;"
                                            placeholder="Добавьте комментарий для аттестуемого (объяснение ошибки, советы, дополнения)..."
                                            onchange="window.curatorAttestation.updateAnswerComment(${answer.questionIndex}, this.value)"
                                            onfocus="this.style.borderColor = 'var(--blue-primary)'; this.style.boxShadow = '0 0 0 2px var(--blue-subtle)';"
                                            onblur="this.style.borderColor = 'var(--border-light)'; this.style.boxShadow = 'none';"
                                        >${answer.comment || ''}</textarea>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 3rem; display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="window.curatorAttestation.saveResults()" class="btn-primary" style="padding: 1rem 2rem; font-size: 1rem;">
                        💾 Сохранить результат
                    </button>
                </div>
            </div>
        `;
    }

    updateAnswerComment(questionIndex, comment) {
        if (this.answers[questionIndex]) {
            this.answers[questionIndex].comment = comment;
            console.log(`💬 Комментарий к вопросу ${questionIndex + 1}: ${comment.substring(0, 50)}...`);
        }
    }

    saveResults() {
        if (!this.finalResult) {
            this.showError('Нет результатов для сохранения');
            return;
        }

        console.log('💾 Сохранение результатов...');

        // Обновляем комментарии в финальном результате
        this.finalResult.answers = this.answers;

        if (window.AttestationSystem && window.AttestationSystem.saveAttestationResult) {
            window.AttestationSystem.saveAttestationResult(this.finalResult);
        } else {
            const history = JSON.parse(localStorage.getItem('attestationHistory') || '[]');
            history.push({
                ...this.finalResult,
                date: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('attestationHistory', JSON.stringify(history));
        }

        alert(`Результат сохранен!\n\nАттестуемый: ${this.finalResult.name}\nРезультат: ${this.finalResult.score.toFixed(1)}/10\nСтатус: ${this.finalResult.passed ? 'СДАНО' : 'НЕ СДАНО'}`);

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    // Utility методы
    getRoleName(roleId) {
        const roles = {
            'helper': 'ХЕЛПЕР',
            'moderator': 'МОДЕРАТОР',
            'administrator': 'АДМИНИСТРАТОР'
        };
        return roles[roleId] || roleId.toUpperCase();
    }

    getServerName(serverId) {
        const servers = {
            'rublevo': 'Рублевский',
            'nevsky': 'Невский'
        };
        return servers[serverId] || serverId;
    }

    formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showError(message) {
        console.error('⚠️ Ошибка:', message);
        alert(message);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Запуск панели куратора...');
    window.curatorAttestation = new CuratorAttestation();
});