class AttestationSystem {
    constructor() {
        this.PASSWORD = 'adminsaplZ413xc#4';
        this.selectedServer = null;
        this.selectedRole = null;
        this.attesteeName = null;
        this.questions = null;

        this.init();
    }

    async init() {
        try {
            console.log('🚀 Инициализация системы аттестации...');
            this.loadQuestions();
            this.bindEvents();
            this.loadHistory();
            this.updateStats();
            this.startUIAnimations();
            console.log('✅ Система готова к работе');
        } catch (error) {
            console.error('❌ Ошибка инициализации:', error);
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
                    "Тебя телепортирует модератор на репорт, где игрок жалуется на выданное тобой наказание. Что будешь делать?",
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
                    "Тебя телепортирует модератор на репорт, где игрок жалуется на выданное тобой наказание. Что будешь делать?",
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

    startUIAnimations() {
        // Анимированное появление карточек
        const cards = document.querySelectorAll('.card-animate');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animationPlayState = 'running';
            }, index * 150);
        });

        // Интерактивные анимации для кнопок  
        this.addButtonHoverEffects();
        this.setupScrollAnimations();

        console.log('✨ UI анимации активированы');
    }

    addButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const rect = button.getBoundingClientRect();
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: ${e.clientY - rect.top}px;
                    left: ${e.clientX - rect.left}px;
                    width: 0;
                    height: 0;
                    background: rgba(255,255,255,0.1);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                button.style.position = 'relative';
                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.history-table-container').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    bindEvents() {
        console.log('🔗 Настройка событий...');

        const startBtn = document.getElementById('startAttestationBtn');
        const downloadBtn = document.getElementById('downloadHistoryBtn');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.showModal('passwordModal');
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadHistory();
            });
        }

        this.bindModalEvents();
        this.bindSelectionEvents();

        console.log('✅ События настроены');
    }

    bindModalEvents() {
        const closeButtons = document.querySelectorAll('.close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.hideModal(modal.id);
            });
        });

        const actionButtons = [
            { id: 'cancelPasswordBtn', action: () => this.hideModal('passwordModal') },
            { id: 'submitPasswordBtn', action: () => this.checkPassword() },
            { id: 'cancelNameBtn', action: () => this.hideModal('nameModal') },
            { id: 'submitNameBtn', action: () => this.checkName() }
        ];

        actionButtons.forEach(({ id, action }) => {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener('click', action);
        });

        const inputs = [
            { id: 'passwordInput', action: () => this.checkPassword() },
            { id: 'attesteeName', action: () => this.checkName() }
        ];

        inputs.forEach(({ id, action }) => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') action();
                });
            }
        });

        document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideAllModals();
            }
        });
    }

    bindSelectionEvents() {
        const serverCards = document.querySelectorAll('[data-server]');
        serverCards.forEach(card => {
            card.addEventListener('click', () => {
                const serverId = card.dataset.server;
                console.log(`🖥️ Выбран сервер: ${serverId}`);
                this.selectServer(serverId);
            });
        });

        const roleCards = document.querySelectorAll('[data-role]');
        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                const roleId = card.dataset.role;
                console.log(`👤 Выбрана роль: ${roleId}`);
                this.selectRole(roleId);
            });
        });
    }

    showModal(modalId) {
        console.log(`📋 Открытие: ${modalId}`);

        const overlay = document.getElementById('modalOverlay');
        const modal = document.getElementById(modalId);

        if (!overlay || !modal) {
            console.error(`❌ Модальное окно не найдено: ${modalId}`);
            return;
        }

        document.querySelectorAll('.modal').forEach(m => {
            m.classList.remove('show');
        });

        overlay.classList.add('show');
        modal.classList.add('show');

        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 150);
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.remove('show');

        const visibleModals = document.querySelectorAll('.modal.show');
        if (visibleModals.length === 0) {
            document.getElementById('modalOverlay').classList.remove('show');
        }

        modal.querySelectorAll('input').forEach(input => input.value = '');
        modal.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    }

    hideAllModals() {
        console.log('🚫 Закрытие всех модальных окон');

        document.getElementById('modalOverlay').classList.remove('show');
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });

        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');

        this.resetState();
    }

    resetState() {
        this.selectedServer = null;
        this.selectedRole = null;
        this.attesteeName = null;
    }

    checkPassword() {
        const input = document.getElementById('passwordInput');
        const errorElement = document.getElementById('passwordError');
        const password = input?.value?.trim();

        if (!password) {
            this.showError('Введите пароль доступа', errorElement);
            return;
        }

        if (password !== this.PASSWORD) {
            this.showError('Неверный пароль доступа', errorElement);
            input.value = '';
            input.focus();

            input.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => input.style.animation = '', 500);
            return;
        }

        console.log('✅ Доступ разрешен');
        this.hideModal('passwordModal');

        setTimeout(() => {
            this.showModal('nameModal');
        }, 200);
    }

    checkName() {
        const input = document.getElementById('attesteeName');
        const errorElement = document.getElementById('nameError');
        const name = input?.value?.trim();

        if (!name) {
            this.showError('Укажите имя аттестуемого', errorElement);
            return;
        }

        if (name.length < 2) {
            this.showError('Имя должно содержать минимум 2 символа', errorElement);
            return;
        }

        this.attesteeName = name;
        console.log(`👤 Аттестуемый: ${this.attesteeName}`);

        this.hideModal('nameModal');

        setTimeout(() => {
            this.showModal('serverModal');
        }, 200);
    }

    selectServer(serverId) {
        if (!serverId || !this.questions?.[serverId]) {
            console.error(`❌ Сервер "${serverId}" недоступен`);
            this.showError('Выбранный сервер недоступен');
            return;
        }

        this.selectedServer = serverId;
        console.log(`✅ Сервер: ${this.getServerName(serverId)}`);

        this.hideModal('serverModal');

        setTimeout(() => {
            this.showModal('roleModal');
        }, 200);
    }

    selectRole(roleId) {
        if (!roleId || !this.questions?.[this.selectedServer]?.[roleId]) {
            console.error(`❌ Роль "${roleId}" недоступна`);
            this.showError('Выбранная роль недоступна');
            return;
        }

        const questionsCount = this.questions[this.selectedServer][roleId].length;
        this.selectedRole = roleId;

        console.log(`✅ Роль: ${this.getRoleName(roleId)} (${questionsCount} вопросов)`);

        this.hideModal('roleModal');

        setTimeout(() => {
            this.startAttestation();
        }, 300);
    }

    startAttestation() {
        const config = {
            name: this.attesteeName,
            server: this.selectedServer,
            role: this.selectedRole,
            questions: this.questions[this.selectedServer][this.selectedRole],
            startTime: Date.now()
        };

        console.log('🚀 Запуск аттестации:', config);

        localStorage.setItem('currentAttestation', JSON.stringify(config));

        const params = new URLSearchParams({
            server: config.server,
            role: config.role,
            name: config.name
        });

        const url = `curator.html?${params.toString()}`;
        console.log(`🔄 Переход: ${url}`);

        window.location.href = url;
    }

    loadHistory() {
        const history = JSON.parse(localStorage.getItem('attestationHistory') || '[]');
        const tbody = document.getElementById('historyTableBody');

        if (!tbody) return;

        if (history.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">📊 История пуста</div>
                        <div style="font-size: 0.9rem;">Результаты аттестаций будут отображаться здесь</div>
                    </td>
                </tr>
            `;
            return;
        }

        // Сортируем по дате (новые сверху)
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        // ИСПРАВЛЯЕМ БАГ С ИСТОРИЕЙ: передаем правильный индекс из отсортированного массива
        tbody.innerHTML = history.map((record, sortedIndex) => {
            // Находим оригинальный индекс в несортированном массиве
            const originalHistory = JSON.parse(localStorage.getItem('attestationHistory') || '[]');
            const originalIndex = originalHistory.findIndex(r => r.id === record.id);

            return `
                <tr onclick="window.attestationSystem.viewAttestation(${originalIndex})">
                    <td><strong>${record.name}</strong></td>
                    <td>${this.getRoleName(record.role)}</td>
                    <td>${this.getServerName(record.server)}</td>
                    <td>${new Date(record.date).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</td>
                    <td><strong>${record.score.toFixed(1)}/10</strong></td>
                    <td>${this.formatDuration(record.duration)}</td>
                    <td>
                        <span class="status-badge ${record.passed ? 'status-passed' : 'status-failed'}">
                            ${record.passed ? 'Сдано' : 'Не сдано'}
                        </span>
                    </td>
                    <td>
                        <button class="view-btn" onclick="event.stopPropagation(); window.attestationSystem.viewAttestation(${originalIndex})">
                            Детали
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    updateStats() {
        const history = JSON.parse(localStorage.getItem('attestationHistory') || '[]');

        const totalCount = history.length;
        const passedCount = history.filter(record => record.passed).length;
        const averageScore = totalCount > 0 
            ? (history.reduce((sum, record) => sum + record.score, 0) / totalCount).toFixed(1)
            : '0.0';

        this.animateNumber('totalAttestations', totalCount);
        this.animateNumber('passedAttestations', passedCount);
        this.animateNumber('averageScore', parseFloat(averageScore), true);
    }

    animateNumber(elementId, targetValue, isFloat = false) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (targetValue - startValue) * easeOutQuart;

            element.textContent = isFloat 
                ? currentValue.toFixed(1)
                : Math.floor(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    viewAttestation(index) {
        const history = JSON.parse(localStorage.getItem('attestationHistory') || '[]');
        const record = history[index];

        if (!record) {
            this.showError('Запись не найдена');
            console.error(`❌ Запись с индексом ${index} не найдена. Всего записей: ${history.length}`);
            return;
        }

        console.log('👁️ Просмотр аттестации:', record.name, 'индекс:', index);

        const detailsHtml = this.createAttestationDetails(record);
        const detailsEl = document.getElementById('attestationDetails');

        if (detailsEl) {
            detailsEl.innerHTML = detailsHtml;
        }

        this.showModal('attestationModal');
    }

    createAttestationDetails(record) {
        const stats = record.answers ? {
            correct: record.answers.filter(a => a && a.grade === 1).length,
            partial: record.answers.filter(a => a && a.grade === 0.5).length,
            incorrect: record.answers.filter(a => a && a.grade === 0).length
        } : { correct: 0, partial: 0, incorrect: 0 };

        // ДОБАВЛЯЕМ ДЕТАЛЬНЫЙ ЛОГ ВОПРОСОВ
        let questionLogHtml = '';
        if (record.answers && record.answers.length > 0) {
            questionLogHtml = `
                <div class="question-log">
                    <div class="question-log-header">
                        <h4>📝 Детальный лог по вопросам</h4>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">
                            Всего вопросов: ${record.answers.length}
                        </div>
                    </div>

                    ${record.answers.map((answer, index) => {
                        if (!answer) return '';

                        const gradeClass = answer.grade === 1 ? 'correct' : 
                                         answer.grade === 0.5 ? 'partial' : 'incorrect';
                        const gradeText = answer.grade === 1 ? 'Верно' : 
                                        answer.grade === 0.5 ? 'Частично' : 'Неверно';
                        const gradeColor = answer.grade === 1 ? 'grade-correct' : 
                                         answer.grade === 0.5 ? 'grade-partial' : 'grade-incorrect';

                        return `
                            <div class="question-item ${gradeClass}">
                                <div class="question-header">
                                    <div class="question-number">
                                        Вопрос ${index + 1}
                                    </div>
                                    <div class="question-grade ${gradeColor}">
                                        ${gradeText} (${answer.grade} балл${answer.grade === 1 ? '' : answer.grade === 0.5 ? 'а' : 'ов'})
                                    </div>
                                </div>

                                <div class="question-text">
                                    ${answer.question}
                                </div>

                                <div class="question-comment">
                                    <textarea 
                                        class="comment-input" 
                                        placeholder="Добавьте комментарий для аттестуемого (объяснение ошибки, советы)..."
                                        data-question-index="${index}"
                                    >${answer.comment || ''}</textarea>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        return `
            <div class="attestation-summary" style="
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
                gap: 1rem; 
                margin-bottom: 2rem;
            ">
                <div style="
                    background: var(--bg-tertiary); 
                    padding: 1.5rem; 
                    border-radius: 12px; 
                    text-align: center;
                    border: 1px solid var(--border-light);
                ">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--blue-primary); margin-bottom: 0.5rem;">
                        ${record.score.toFixed(1)}/10
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Итоговый балл</div>
                </div>

                <div style="
                    background: var(--bg-tertiary); 
                    padding: 1.5rem; 
                    border-radius: 12px; 
                    text-align: center;
                    border: 1px solid var(--border-light);
                ">
                    <div style="font-size: 1.8rem; font-weight: 700; color: var(--success); margin-bottom: 0.5rem;">
                        ${stats.correct}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Верно</div>
                </div>

                <div style="
                    background: var(--bg-tertiary); 
                    padding: 1.5rem; 
                    border-radius: 12px; 
                    text-align: center;
                    border: 1px solid var(--border-light);
                ">
                    <div style="font-size: 1.8rem; font-weight: 700; color: var(--warning); margin-bottom: 0.5rem;">
                        ${stats.partial}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Частично</div>
                </div>

                <div style="
                    background: var(--bg-tertiary); 
                    padding: 1.5rem; 
                    border-radius: 12px; 
                    text-align: center;
                    border: 1px solid var(--border-light);
                ">
                    <div style="font-size: 1.8rem; font-weight: 700; color: var(--error); margin-bottom: 0.5rem;">
                        ${stats.incorrect}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Неверно</div>
                </div>
            </div>

            <div style="
                background: var(--bg-tertiary); 
                padding: 1.5rem; 
                border-radius: 12px; 
                margin-bottom: 1rem;
                border: 1px solid var(--border-light);
            ">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1.1rem;">
                    📋 Информация об аттестации
                </h4>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; font-size: 0.9rem;">
                    <div>
                        <strong style="color: var(--blue-primary);">Аттестуемый:</strong><br>
                        <span style="color: var(--text-secondary);">${record.name}</span>
                    </div>
                    <div>
                        <strong style="color: var(--blue-primary);">Роль:</strong><br>
                        <span style="color: var(--text-secondary);">${this.getRoleName(record.role)}</span>
                    </div>
                    <div>
                        <strong style="color: var(--blue-primary);">Сервер:</strong><br>
                        <span style="color: var(--text-secondary);">${this.getServerName(record.server)}</span>
                    </div>
                    <div>
                        <strong style="color: var(--blue-primary);">Дата:</strong><br>
                        <span style="color: var(--text-secondary);">${new Date(record.date).toLocaleString('ru-RU')}</span>
                    </div>
                    <div>
                        <strong style="color: var(--blue-primary);">Время прохождения:</strong><br>
                        <span style="color: var(--text-secondary);">${this.formatDuration(record.duration)}</span>
                    </div>
                    <div>
                        <strong style="color: var(--blue-primary);">Статус:</strong><br>
                        <span style="color: ${record.passed ? 'var(--success)' : 'var(--error)'};">
                            ${record.passed ? '✅ Аттестация пройдена' : '❌ Аттестация не пройдена'}
                        </span>
                    </div>
                </div>
            </div>

            ${questionLogHtml}
        `;
    }

    downloadHistory() {
        const history = JSON.parse(localStorage.getItem('attestationHistory') || '[]');

        if (history.length === 0) {
            this.showError('История аттестаций пуста');
            return;
        }

        console.log(`📁 Экспорт ${history.length} записей`);

        let content = 'ИСТОРИЯ АТТЕСТАЦИЙ АДМИНИСТРАЦИИ\n';
        content += '='.repeat(60) + '\n\n';
        content += `Дата экспорта: ${new Date().toLocaleString('ru-RU')}\n`;
        content += `Всего записей: ${history.length}\n\n`;

        history.forEach((record, index) => {
            const passed = record.passed ? 'СДАНО' : 'НЕ СДАНО';

            content += `${index + 1}. ${record.name.toUpperCase()}\n`;
            content += `   Роль: ${this.getRoleName(record.role)}\n`;
            content += `   Сервер: ${this.getServerName(record.server)}\n`;
            content += `   Дата: ${new Date(record.date).toLocaleString('ru-RU')}\n`;
            content += `   Результат: ${record.score.toFixed(1)}/10 (${passed})\n`;
            content += `   Время: ${this.formatDuration(record.duration)}\n`;
            content += '   ' + '-'.repeat(50) + '\n\n';
        });

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `attestation-history-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('✅ Файл экспортирован');
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

    showError(message, element = null) {
        console.error('⚠️', message);

        if (element) {
            element.textContent = message;
            element.style.color = 'var(--error)';

            element.style.transform = 'translateY(-10px)';
            element.style.opacity = '0';

            requestAnimationFrame(() => {
                element.style.transition = 'all 0.3s ease';
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            });

        } else {
            alert(message);
        }
    }

    // Статический метод для сохранения результатов
    static saveAttestationResult(result) {
        const history = JSON.parse(localStorage.getItem('attestationHistory') || '[]');

        const record = {
            ...result,
            date: new Date().toISOString(),
            id: Date.now() // Добавляем уникальный ID для корректной идентификации
        };

        history.push(record);
        localStorage.setItem('attestationHistory', JSON.stringify(history));

        console.log('💾 Результат сохранен:', record.name, record.score.toFixed(1) + '/10');
        return record;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Система аттестации загружается...');

    const additionalStyles = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;

    const style = document.createElement('style');
    style.textContent = additionalStyles;
    document.head.appendChild(style);

    window.attestationSystem = new AttestationSystem();
});

window.AttestationSystem = AttestationSystem;