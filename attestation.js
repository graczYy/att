class SelfAttestation {
    constructor() {
        this.session = null;
        this.currentQuestion = 0;
        this.answers = [];
        this.startTime = null;
        this.timer = null;
        this.autoSaveInterval = null;

        this.init();
    }

    async init() {
        console.log('🚀 Инициализация самостоятельной аттестации...');

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
            alert('Код доступа не найден');
            window.location.href = 'index.html';
            return;
        }

        await this.loadSession(code);
        this.bindEvents();
        this.startAttestation();
    }

    async loadSession(code) {
        console.log(`🔑 Загрузка сессии по коду: ${code}`);

        const sessions = JSON.parse(localStorage.getItem('attestationSessions') || '{}');
        this.session = sessions[code];

        if (!this.session) {
            alert('Сессия не найдена или истекла');
            window.location.href = 'index.html';
            return;
        }

        console.log('✅ Сессия загружена:', {
            name: this.session.name,
            role: this.session.role,
            server: this.session.server,
            questionsCount: this.session.questions.length
        });

        // Восстанавливаем состояние если есть сохраненные данные
        const savedData = localStorage.getItem(`attestation_${code}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            this.currentQuestion = data.currentQuestion || 0;
            this.answers = data.answers || [];
            console.log('📂 Восстановлено состояние:', {
                currentQuestion: this.currentQuestion,
                answersCount: this.answers.length
            });
        }

        this.session.code = code;
    }

    bindEvents() {
        // Автосохранение при изменении ответа
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.addEventListener('input', () => {
                this.saveCurrentAnswer();
                clearTimeout(this.autoSaveTimeout);
                this.autoSaveTimeout = setTimeout(() => {
                    this.autoSave();
                }, 2000);
            });
        }

        // Предотвращение случайного закрытия страницы
        window.addEventListener('beforeunload', (e) => {
            if (this.currentQuestion < this.session.questions.length) {
                e.preventDefault();
                e.returnValue = 'Ваши ответы могут быть потеряны. Вы уверены?';
            }
        });
    }

    startAttestation() {
        console.log('🎯 Запуск самостоятельной аттестации');

        this.startTime = Date.now();
        this.showCurrentQuestion();
        this.updateProgress();
        this.startTimer();
        this.startAutoSave();

        // Обновляем заголовок
        const titleEl = document.querySelector('.header-title');
        if (titleEl) {
            titleEl.textContent = `Аттестация: ${this.session.name}`;
        }
    }

    showCurrentQuestion() {
        if (this.currentQuestion >= this.session.questions.length) {
            this.finishAttestation();
            return;
        }

        const question = this.session.questions[this.currentQuestion];
        console.log(`❓ Показываем вопрос ${this.currentQuestion + 1}/${this.session.questions.length}`);

        // Обновляем элементы интерфейса
        document.getElementById('questionCounter').textContent = 
            `Вопрос ${this.currentQuestion + 1}`;
        document.getElementById('questionText').textContent = question;

        // Восстанавливаем сохраненный ответ
        const answerInput = document.getElementById('answerInput');
        if (answerInput && this.answers[this.currentQuestion]) {
            answerInput.value = this.answers[this.currentQuestion].text || '';
        } else if (answerInput) {
            answerInput.value = '';
        }

        // Обновляем кнопки навигации
        this.updateNavigation();

        // Фокусируемся на поле ввода
        if (answerInput) {
            answerInput.focus();
        }

        // Анимация появления вопроса
        const questionCard = document.getElementById('questionCard');
        if (questionCard) {
            questionCard.style.animation = 'none';
            setTimeout(() => {
                questionCard.style.animation = 'questionSlide 0.5s ease-out';
            }, 10);
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 0;
        }

        if (nextBtn) {
            if (this.currentQuestion === this.session.questions.length - 1) {
                nextBtn.textContent = 'Завершить аттестацию';
                nextBtn.classList.remove('btn-primary');
                nextBtn.classList.add('btn-primary');
                nextBtn.style.background = 'var(--system-orange)';
            } else {
                nextBtn.textContent = 'Следующий →';
                nextBtn.style.background = '';
            }
        }
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.session.questions.length) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');

        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        if (progressText) {
            progressText.textContent = 
                `Вопрос ${this.currentQuestion + 1} из ${this.session.questions.length}`;
        }
    }

    saveCurrentAnswer() {
        const answerInput = document.getElementById('answerInput');
        if (!answerInput) return;

        const answer = {
            questionIndex: this.currentQuestion,
            text: answerInput.value.trim(),
            timestamp: Date.now()
        };

        this.answers[this.currentQuestion] = answer;
    }

    autoSave() {
        const data = {
            currentQuestion: this.currentQuestion,
            answers: this.answers,
            lastSave: Date.now()
        };

        localStorage.setItem(`attestation_${this.session.code}`, JSON.stringify(data));

        // Показываем статус автосохранения
        const status = document.getElementById('autoSaveStatus');
        if (status) {
            status.textContent = '✅ Автосохранено';
            status.style.color = 'var(--success)';

            setTimeout(() => {
                status.textContent = 'Автосохранение каждые 5 секунд';
                status.style.color = '';
            }, 2000);
        }

        console.log('💾 Автосохранение выполнено');
    }

    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.autoSave();
        }, 5000);
    }

    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            const timerEl = document.getElementById('timer');
            if (timerEl) {
                timerEl.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    finishAttestation() {
        console.log('🏁 Завершение аттестации');

        // Останавливаем таймеры
        if (this.timer) clearInterval(this.timer);
        if (this.autoSaveInterval) clearInterval(this.autoSaveInterval);

        // Сохраняем финальный результат
        this.autoSave();

        // Скрываем вопрос и показываем результаты
        document.getElementById('questionCard').style.display = 'none';
        document.getElementById('controls').style.display = 'none';
        document.getElementById('resultsContainer').style.display = 'block';

        // Рассчитываем примерный результат (в реальной системе это делал бы куратор)
        const completedAnswers = this.answers.filter(a => a && a.text.length > 5).length;
        const totalQuestions = this.session.questions.length;
        const estimatedScore = (completedAnswers / totalQuestions) * 7; // Примерная оценка

        const finalScoreEl = document.getElementById('finalScore');
        const resultMessageEl = document.getElementById('resultMessage');

        if (finalScoreEl) {
            finalScoreEl.textContent = `${estimatedScore.toFixed(1)}/10`;
        }

        if (resultMessageEl) {
            if (estimatedScore >= 6) {
                resultMessageEl.textContent = '🎉 Предварительно: аттестация пройдена!';
                resultMessageEl.style.color = 'var(--success)';
            } else {
                resultMessageEl.textContent = '❌ Предварительно: аттестация не пройдена';
                resultMessageEl.style.color = 'var(--error)';
            }

            resultMessageEl.innerHTML += '<br><small>Окончательный результат определит куратор</small>';
        }
    }
}

// Глобальные функции для навигации
function nextQuestion() {
    const attestation = window.selfAttestation;
    if (!attestation) return;

    // Сохраняем текущий ответ
    attestation.saveCurrentAnswer();

    if (attestation.currentQuestion >= attestation.session.questions.length - 1) {
        // Последний вопрос - завершаем
        attestation.finishAttestation();
    } else {
        // Переходим к следующему вопросу
        attestation.currentQuestion++;
        attestation.showCurrentQuestion();
        attestation.updateProgress();
    }
}

function previousQuestion() {
    const attestation = window.selfAttestation;
    if (!attestation) return;

    if (attestation.currentQuestion > 0) {
        // Сохраняем текущий ответ
        attestation.saveCurrentAnswer();

        // Переходим к предыдущему вопросу
        attestation.currentQuestion--;
        attestation.showCurrentQuestion();
        attestation.updateProgress();
    }
}

function saveAndReturn() {
    const attestation = window.selfAttestation;
    if (!attestation) return;

    // Формируем результат для сохранения
    const result = {
        name: attestation.session.name,
        role: attestation.session.role,
        server: attestation.session.server,
        mode: 'self',
        score: 0, // Будет определено куратором
        passed: false, // Будет определено куратором
        duration: Math.floor((Date.now() - attestation.startTime) / 1000),
        answers: attestation.answers,
        questions: attestation.session.questions,
        status: 'pending_review'
    };

    // Сохраняем в специальную область для рассмотрения куратором
    const pendingReviews = JSON.parse(localStorage.getItem('pendingReviews') || '[]');
    pendingReviews.push(result);
    localStorage.setItem('pendingReviews', JSON.stringify(pendingReviews));

    // Удаляем временную сессию
    localStorage.removeItem(`attestation_${attestation.session.code}`);

    const sessions = JSON.parse(localStorage.getItem('attestationSessions') || '{}');
    delete sessions[attestation.session.code];
    localStorage.setItem('attestationSessions', JSON.stringify(sessions));

    alert('Результат сохранен! Куратор проверит ваши ответы и объявит окончательный результат.');
    window.location.href = 'index.html';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Запуск самостоятельной аттестации...');
    window.selfAttestation = new SelfAttestation();
});