// 設定中文字型名稱
const CHINESE_FONT = "Noto Serif TC";

// 設定英文與數字字型名稱
const ENGLISH_FONT = "Libre Caslon Condensed";

// 設定每次測驗題目總數
const TOTAL_QUESTIONS = 5;

// 設定網站背景顏色
const PAGE_BACKGROUND_COLOR = "#e5e5e5";

// 設定主要藍色
const PRIMARY_BLUE = "#219ebc";

// 設定深藍色
const DARK_BLUE = "#023047";

// 設定答對顏色
const CORRECT_COLOR = "#a7c957";

// 設定答錯顏色
const WRONG_COLOR = "#c1121f";

// 設定按鈕邊框顏色
const BORDER_COLOR = "#8ecae6";

// 設定目前頁面狀態
let currentScreen = "start";

// 儲存隨機數學題
let quizQuestions = [];

// 設定目前題目編號
let currentQuestion = 0;

// 設定答對題數
let score = 0;

// 設定是否已經作答
let answered = false;

// 設定是否答錯
let wrongAnswer = false;

// 設定是否顯示作答提示
let showInstruction = true;

// 儲存選項按鈕
let optionButtons = [];

// 儲存開始作答按鈕
let startButton;

// 儲存下一題按鈕
let nextButton;

// 儲存重新測驗按鈕
let restartButton;

// 儲存畫布物件
let canvasElement;

// 設定響應式版面變數
let pagePadding = 20;
let cardWidth = 500;
let cardHeight = 500;
let buttonWidth = 300;
let buttonHeight = 50;
let buttonGap = 12;
let optionsStartY = 240;
let titleSize = 32;
let questionSize = 24;
let normalTextSize = 20;

// 建立畫布與介面
function setup() {
  // 建立全螢幕畫布
  canvasElement = createCanvas(windowWidth, windowHeight);

  // 設定網頁外距為零
  document.body.style.margin = "0";

  // 設定網頁背景顏色
  document.body.style.backgroundColor = PAGE_BACKGROUND_COLOR;

  // 隱藏網頁捲軸
  document.body.style.overflow = "hidden";

  // 設定畫布顯示方式
  canvasElement.style("display", "block");

  // 設定文字水平與垂直置中
  textAlign(CENTER, CENTER);

  // 設定預設中文字型
  textFont(CHINESE_FONT);

  // 建立開始作答按鈕
  createStartButton();

  // 建立選項按鈕
  createOptionButtons();

  // 建立下一題按鈕
  createNextButton();

  // 建立重新測驗按鈕
  createRestartButton();

  // 計算響應式版面
  calculateLayout();

  // 顯示開始介面
  showStartScreen();
}

// 建立開始作答按鈕
function createStartButton() {
  // 建立開始作答按鈕
  startButton = createButton("開始作答");

  // 設定開始按鈕字型
  startButton.style("font-family", '"' + CHINESE_FONT + '", serif');

  // 設定開始按鈕文字大小
  startButton.style("font-size", "24px");

  // 設定開始按鈕文字粗體
  startButton.style("font-weight", "700");

  // 設定開始按鈕內距
  startButton.style("padding", "14px 40px");

  // 設定開始按鈕文字顏色
  startButton.style("color", "#ffffff");

  // 設定開始按鈕背景顏色
  startButton.style("background-color", PRIMARY_BLUE);

  // 設定開始按鈕邊框為虛線
  startButton.style("border", "3px dashed " + DARK_BLUE);

  // 設定開始按鈕圓角
  startButton.style("border-radius", "10px");

  // 設定開始按鈕最小高度
  startButton.style("min-height", "56px");

  // 設定開始按鈕觸控操作
  startButton.style("touch-action", "manipulation");

  // 設定滑鼠游標
  startButton.style("cursor", "pointer");

  // 設定開始按鈕點擊事件
  startButton.mousePressed(startQuiz);

  // 顯示開始作答按鈕
  startButton.show();
}

// 建立四個選項按鈕
function createOptionButtons() {
  // 建立四個選項
  for (let i = 0; i < 4; i++) {
    // 建立空白按鈕
    let button = createButton("");

    // 設定按鈕字型
    button.style(
      "font-family",
      '"' + ENGLISH_FONT + '", "' + CHINESE_FONT + '", serif'
    );

    // 設定按鈕文字大小
    button.style("font-size", "20px");

    // 設定按鈕內距
    button.style("padding", "10px 16px");

    // 設定按鈕背景顏色
    button.style("background-color", "#ffffff");

    // 設定按鈕文字顏色
    button.style("color", DARK_BLUE);

    // 設定按鈕邊框
    button.style("border", "2px solid " + BORDER_COLOR);

    // 設定按鈕圓角
    button.style("border-radius", "8px");

    // 設定按鈕盒模型
    button.style("box-sizing", "border-box");

    // 設定按鈕最小高度
    button.style("min-height", "44px");

    // 設定按鈕文字換行
    button.style("white-space", "normal");

    // 設定按鈕觸控操作
    button.style("touch-action", "manipulation");

    // 設定滑鼠游標
    button.style("cursor", "pointer");

    // 設定選項按鈕點擊事件
    button.mousePressed(function () {
      // 判斷使用者答案
      checkAnswer(i);
    });

    // 將按鈕加入陣列
    optionButtons.push(button);
  }
}

// 建立下一題按鈕
function createNextButton() {
  // 建立下一題按鈕
  nextButton = createButton("下一題");

  // 設定下一題按鈕字型
  nextButton.style("font-family", '"' + CHINESE_FONT + '", serif');

  // 設定下一題按鈕文字大小
  nextButton.style("font-size", "20px");

  // 設定下一題按鈕內距
  nextButton.style("padding", "10px 28px");

  // 設定下一題按鈕文字顏色
  nextButton.style("color", "#ffffff");

  // 設定下一題按鈕背景顏色
  nextButton.style("background-color", DARK_BLUE);

  // 設定下一題按鈕無邊框
  nextButton.style("border", "none");

  // 設定下一題按鈕圓角
  nextButton.style("border-radius", "8px");

  // 設定下一題按鈕最小高度
  nextButton.style("min-height", "44px");

  // 設定下一題按鈕觸控操作
  nextButton.style("touch-action", "manipulation");

  // 設定滑鼠游標
  nextButton.style("cursor", "pointer");

  // 設定下一題按鈕點擊事件
  nextButton.mousePressed(nextQuestion);

  // 隱藏下一題按鈕
  nextButton.hide();
}

// 建立重新測驗按鈕
function createRestartButton() {
  // 建立重新測驗按鈕
  restartButton = createButton("重新測驗");

  // 設定重新測驗按鈕字型
  restartButton.style("font-family", '"' + CHINESE_FONT + '", serif');

  // 設定重新測驗按鈕文字大小
  restartButton.style("font-size", "20px");

  // 設定重新測驗按鈕內距
  restartButton.style("padding", "10px 28px");

  // 設定重新測驗按鈕文字顏色
  restartButton.style("color", "#ffffff");

  // 設定重新測驗按鈕背景顏色
  restartButton.style("background-color", PRIMARY_BLUE);

  // 設定重新測驗按鈕無邊框
  restartButton.style("border", "none");

  // 設定重新測驗按鈕圓角
  restartButton.style("border-radius", "8px");

  // 設定重新測驗按鈕點擊事件
  restartButton.mousePressed(startQuiz);

  // 隱藏重新測驗按鈕
  restartButton.hide();
}

// 顯示開始作答介面
function showStartScreen() {
  // 設定目前畫面為開始介面
  currentScreen = "start";

  // 顯示開始作答按鈕
  startButton.show();

  // 隱藏所有選項按鈕
  for (let button of optionButtons) {
    // 隱藏選項按鈕
    button.hide();
  }

  // 隱藏下一題按鈕
  nextButton.hide();

  // 隱藏重新測驗按鈕
  restartButton.hide();
}

// 開始新的隨機測驗
function startQuiz() {
  // 設定目前畫面為測驗介面
  currentScreen = "quiz";

  // 隨機產生五道數學題
  quizQuestions = generateMathQuestions(TOTAL_QUESTIONS);

  // 設定目前題目為第一題
  currentQuestion = 0;

  // 將答對題數歸零
  score = 0;

  // 隱藏開始作答按鈕
  startButton.hide();

  // 更新題目內容
  updateQuestion();

  // 更新按鈕位置
  positionButtons();
}

// 產生五道數學題
function generateMathQuestions(amount) {
  // 建立題目陣列
  let generatedQuestions = [];

  // 重複產生指定數量題目
  for (let i = 0; i < amount; i++) {
    // 將隨機數學題加入陣列
    generatedQuestions.push(generateOneMathQuestion());
  }

  // 回傳題目陣列
  return generatedQuestions;
}

// 產生一道數學題
function generateOneMathQuestion() {
  // 隨機選擇運算類型
  let operation = random(["+", "-", "×", "÷"]);

  // 宣告第一個數字
  let firstNumber;

  // 宣告第二個數字
  let secondNumber;

  // 宣告正確答案
  let correctAnswer;

  // 判斷是否為加法
  if (operation === "+") {
    // 產生第一個數字
    firstNumber = floor(random(1, 51));

    // 產生第二個數字
    secondNumber = floor(random(1, 51));

    // 計算答案
    correctAnswer = firstNumber + secondNumber;
  }

  // 判斷是否為減法
  if (operation === "-") {
    // 產生較大的數字
    firstNumber = floor(random(20, 101));

    // 產生較小的數字
    secondNumber = floor(random(1, firstNumber + 1));

    // 計算答案
    correctAnswer = firstNumber - secondNumber;
  }

  // 判斷是否為乘法
  if (operation === "×") {
    // 產生第一個數字
    firstNumber = floor(random(2, 13));

    // 產生第二個數字
    secondNumber = floor(random(2, 13));

    // 計算答案
    correctAnswer = firstNumber * secondNumber;
  }

  // 判斷是否為除法
  if (operation === "÷") {
    // 先產生整數答案
    correctAnswer = floor(random(1, 13));

    // 產生除數
    secondNumber = floor(random(2, 13));

    // 產生可整除的被除數
    firstNumber = correctAnswer * secondNumber;
  }

  // 產生三個錯誤答案
  let wrongAnswers = generateWrongAnswers(correctAnswer);

  // 建立選項陣列
  let options = [
    correctAnswer,
    wrongAnswers[0],
    wrongAnswers[1],
    wrongAnswers[2]
  ];

  // 將選項隨機排列
  options = shuffle(options);

  // 找出正確答案索引
  let answerIndex = options.indexOf(correctAnswer);

  // 建立題目文字
  let questionText =
    "請計算：" +
    firstNumber +
    " " +
    operation +
    " " +
    secondNumber +
    " = ？";

  // 回傳題目資料
  return {
    question: questionText,
    options: options,
    answer: answerIndex
  };
}

// 產生錯誤答案
function generateWrongAnswers(correctAnswer) {
  // 建立錯誤答案陣列
  let wrongAnswers = [];

  // 持續產生錯誤答案
  while (wrongAnswers.length < 3) {
    // 產生隨機差值
    let difference = floor(random(1, 11));

    // 隨機選擇增加或減少
    let direction = random([-1, 1]);

    // 計算錯誤答案
    let wrongAnswer = correctAnswer + difference * direction;

    // 確保錯誤答案不小於零
    if (wrongAnswer < 0) {
      wrongAnswer = correctAnswer + difference;
    }

    // 確認答案沒有重複
    if (
      wrongAnswer !== correctAnswer &&
      !wrongAnswers.includes(wrongAnswer)
    ) {
      // 加入錯誤答案
      wrongAnswers.push(wrongAnswer);
    }
  }

  // 回傳錯誤答案
  return wrongAnswers;
}

// 每一幀繪製畫面
function draw() {
  // 設定畫布背景顏色
  background(PAGE_BACKGROUND_COLOR);

  // 判斷目前是否為開始介面
  if (currentScreen === "start") {
    // 繪製開始介面
    drawStartScreen();

    // 結束目前函式
    return;
  }

  // 判斷是否完成測驗
  if (currentQuestion >= quizQuestions.length) {
    // 繪製結果畫面
    drawResult();

    // 結束目前函式
    return;
  }

  // 計算響應式版面
  calculateLayout();

  // 繪製測驗畫面
  drawQuizScreen();
}

// 繪製開始作答介面
function drawStartScreen() {
  // 設定卡片寬度
  let startCardWidth = min(width * 0.86, 580);

  // 設定卡片高度
  let startCardHeight = min(height * 0.72, 520);

  // 計算卡片左側位置
  let cardX = width / 2 - startCardWidth / 2;

  // 計算卡片上方位置
  let cardY = height / 2 - startCardHeight / 2;

  // 繪製卡片陰影
  noStroke();

  // 設定陰影顏色
  fill(0, 0, 0, 25);

  // 繪製陰影卡片
  rect(cardX + 8, cardY + 8, startCardWidth, startCardHeight, 18);

  // 設定卡片背景顏色
  fill("#ffffff");

  // 繪製白色卡片
  rect(cardX, cardY, startCardWidth, startCardHeight, 18);

  // 設定標題顏色
  fill(PRIMARY_BLUE);

  // 設定標題大小
  textSize(constrain(width * 0.075, 30, 52));

  // 設定標題粗體
  textStyle(BOLD);

  // 顯示主標題
  drawChineseText(
    "隨機數學題測驗",
    width / 2,
    cardY + startCardHeight * 0.25
  );

  // 恢復一般文字
  textStyle(NORMAL);

  // 設定副標題顏色
  fill(DARK_BLUE);

  // 設定副標題大小
  textSize(constrain(width * 0.042, 18, 28));

  // 顯示副標題
  drawChineseText(
    "數學挑戰開始！",
    width / 2,
    cardY + startCardHeight * 0.40
  );

  // 設定說明文字大小
  textSize(constrain(width * 0.032, 16, 22));

  // 顯示測驗說明
  drawChineseText(
    "本次測驗共有 5 道隨機數學題",
    width / 2,
    cardY + startCardHeight * 0.54
  );

  // 顯示第二行說明
  drawChineseText(
    "請選擇正確的答案",
    width / 2,
    cardY + startCardHeight * 0.62
  );

  // 計算開始按鈕位置
  startButton.position(
    width / 2 - min(width * 0.34, 150),
    cardY + startCardHeight * 0.72
  );

  // 設定開始按鈕寬度
  startButton.style("width", min(width * 0.68, 300) + "px");

  // 設定開始按鈕高度
  startButton.style("height", "58px");
}

// 繪製測驗介面
function drawQuizScreen() {
  // 設定標題顏色
  fill(DARK_BLUE);

  // 設定標題大小
  textSize(titleSize);

  // 設定標題粗體
  textStyle(BOLD);

  // 顯示測驗標題
  drawMixedText(
    "隨機數學題測驗",
    width / 2,
    pagePadding + titleSize / 2
  );

  // 恢復一般文字
  textStyle(NORMAL);

  // 設定題數顏色
  fill(PRIMARY_BLUE);

  // 設定題數大小
  textSize(normalTextSize);

  // 顯示題數
  drawMixedText(
    "第 " +
      (currentQuestion + 1) +
      " 題 / 共 " +
      quizQuestions.length +
      " 題",
    width / 2,
    pagePadding + titleSize + 28
  );

  // 設定題目顏色
  fill(DARK_BLUE);

  // 設定題目大小
  textSize(questionSize);

  // 顯示題目
  drawWrappedText(
    quizQuestions[currentQuestion].question,
    width / 2,
    pagePadding + titleSize + 78,
    width - pagePadding * 2
  );

  // 判斷是否顯示作答提示
  if (showInstruction) {
    // 設定提示文字顏色
    fill(DARK_BLUE);

    // 設定提示文字大小
    textSize(normalTextSize + 4);

    // 設定提示文字粗體
    textStyle(BOLD);

    // 顯示作答提示
    drawChineseText(
      "請點擊一個選項作答",
      width / 2,
      getInstructionY()
    );

    // 恢復一般文字
    textStyle(NORMAL);
  }
}

// 計算響應式版面
function calculateLayout() {
  // 設定左右留白
  pagePadding = constrain(width * 0.06, 16, 60);

  // 設定標題大小
  titleSize = constrain(width * 0.055, 24, 42);

  // 設定題目大小
  questionSize = constrain(width * 0.042, 18, 30);

  // 設定一般文字大小
  normalTextSize = constrain(width * 0.032, 16, 24);

  // 設定選項按鈕寬度
  buttonWidth = min(width - pagePadding * 2, 680);

  // 設定選項按鈕高度
  buttonHeight = constrain(height * 0.065, 44, 62);

  // 設定選項按鈕間距
  buttonGap = constrain(height * 0.018, 8, 18);

  // 設定選項起始位置
  optionsStartY = pagePadding + titleSize + 145;

  // 更新選項按鈕樣式
  for (let button of optionButtons) {
    // 設定選項文字大小
    button.style("font-size", normalTextSize + "px");

    // 設定選項按鈕高度
    button.style("height", buttonHeight + "px");
  }

  // 更新下一題按鈕樣式
  if (nextButton) {
    // 設定下一題按鈕文字大小
    nextButton.style("font-size", normalTextSize + "px");
  }

  // 更新重新測驗按鈕樣式
  if (restartButton) {
    // 設定重新測驗按鈕文字大小
    restartButton.style("font-size", normalTextSize + "px");
  }
}

// 更新目前題目
function updateQuestion() {
  // 判斷是否完成所有題目
  if (currentQuestion >= quizQuestions.length) {
    // 隱藏所有選項按鈕
    for (let button of optionButtons) {
      // 隱藏選項按鈕
      button.hide();
    }

    // 隱藏下一題按鈕
    nextButton.hide();

    // 顯示重新測驗按鈕
    restartButton.show();

    // 隱藏作答提示
    showInstruction = false;

    // 設定重新測驗按鈕位置
    restartButton.position(width / 2 - 60, height / 2 + 120);

    // 結束函式
    return;
  }

  // 隱藏重新測驗按鈕
  restartButton.hide();

  // 重設作答狀態
  answered = false;

  // 重設答錯狀態
  wrongAnswer = false;

  // 顯示作答提示
  showInstruction = true;

  // 取得目前題目
  let questionData = quizQuestions[currentQuestion];

  // 更新四個選項按鈕
  for (let i = 0; i < optionButtons.length; i++) {
    // 設定選項文字
    optionButtons[i].html(
      String.fromCharCode(65 + i) + ". " + questionData.options[i]
    );

    // 顯示選項按鈕
    optionButtons[i].show();

    // 恢復選項背景顏色
    optionButtons[i].style("background-color", "#ffffff");

    // 恢復選項文字顏色
    optionButtons[i].style("color", DARK_BLUE);

    // 恢復選項邊框顏色
    optionButtons[i].style(
      "border",
      "2px solid " + BORDER_COLOR
    );
  }

  // 隱藏下一題按鈕
  nextButton.hide();

  // 設定按鈕位置
  positionButtons();
}

// 判斷答案
function checkAnswer(selectedIndex) {
  // 防止重複作答
  if (answered) {
    // 結束函式
    return;
  }

  // 取得正確答案索引
  let correctIndex = quizQuestions[currentQuestion].answer;

  // 判斷答案是否正確
  if (selectedIndex === correctIndex) {
    // 增加答對題數
    score++;

    // 設定已作答
    answered = true;

    // 隱藏作答提示
    showInstruction = false;

    // 將正確選項設定為綠色
    optionButtons[selectedIndex].style(
      "background-color",
      CORRECT_COLOR
    );

    // 將正確選項文字設定為深色
    optionButtons[selectedIndex].style(
      "color",
      DARK_BLUE
    );

    // 顯示下一題按鈕
    nextButton.show();

    // 更新按鈕位置
    positionButtons();
  } else {
    // 設定答錯狀態
    wrongAnswer = true;

    // 隱藏作答提示
    showInstruction = false;

    // 將選錯的選項設定為紅色
    optionButtons[selectedIndex].style(
      "background-color",
      WRONG_COLOR
    );

    // 將選錯的選項文字設定為白色
    optionButtons[selectedIndex].style(
      "color",
      "#ffffff"
    );

    // 將正確選項設定為綠色
    optionButtons[correctIndex].style(
      "background-color",
      CORRECT_COLOR
    );

    // 將正確選項文字設定為深色
    optionButtons[correctIndex].style(
      "color",
      DARK_BLUE
    );

    // 顯示下一題按鈕
    nextButton.show();

    // 更新按鈕位置
    positionButtons();
  }
}

// 切換到下一題
function nextQuestion() {
  // 增加目前題目編號
  currentQuestion++;

  // 更新題目內容
  updateQuestion();
}

// 計算作答提示位置
function getInstructionY() {
  // 將提示文字放在選項下方
  return (
    optionsStartY +
    optionButtons.length * (buttonHeight + buttonGap) +
    normalTextSize
  );
}

// 設定按鈕位置
function positionButtons() {
  // 確認選項按鈕已經建立
  if (optionButtons.length === 0) {
    // 尚未建立按鈕時停止
    return;
  }

  // 重新計算版面
  calculateLayout();

  // 設定四個選項按鈕
  for (let i = 0; i < optionButtons.length; i++) {
    // 計算選項按鈕垂直位置
    let y = optionsStartY + i * (buttonHeight + buttonGap);

    // 設定選項按鈕位置
    optionButtons[i].position(
      width / 2 - buttonWidth / 2,
      y
    );

    // 設定選項按鈕寬度
    optionButtons[i].style("width", buttonWidth + "px");

    // 設定選項按鈕高度
    optionButtons[i].style("height", buttonHeight + "px");
  }

  // 確認下一題按鈕存在
  if (!nextButton || !nextButton.elt) {
    // 尚未建立按鈕時停止
    return;
  }

  // 取得下一題按鈕顯示狀態
  let displayValue = window.getComputedStyle(nextButton.elt).display;

  // 判斷下一題按鈕是否顯示
  if (displayValue !== "none") {
    // 設定下一題按鈕位置
    nextButton.position(
      width / 2 - 60,
      getInstructionY() + normalTextSize + 24
    );
  }
}

// 使用中文字型繪製文字
function drawChineseText(message, x, y) {
  // 設定中文字型
  textFont(CHINESE_FONT);

  // 繪製文字
  text(message, x, y);
}

// 使用對應字型繪製中英文數字
function drawMixedText(message, x, y) {
  // 設定文字總寬度
  let totalWidth = 0;

  // 計算各字元寬度
  for (let character of message) {
    // 判斷是否為中文字
    if (isChineseCharacter(character)) {
      // 使用中文字型
      textFont(CHINESE_FONT);
    } else {
      // 使用英數字型
      textFont(ENGLISH_FONT);
    }

    // 累加字元寬度
    totalWidth += textWidth(character);
  }

  // 設定第一個字元位置
  let currentX = x - totalWidth / 2;

  // 逐字繪製
  for (let character of message) {
    // 判斷是否為中文字
    if (isChineseCharacter(character)) {
      // 使用中文字型
      textFont(CHINESE_FONT);
    } else {
      // 使用英數字型
      textFont(ENGLISH_FONT);
    }

    // 取得字元寬度
    let characterWidth = textWidth(character);

    // 顯示目前字元
    text(character, currentX + characterWidth / 2, y);

    // 移動到下一個字元
    currentX += characterWidth;
  }
}

// 判斷字元是否為中文字
function isChineseCharacter(character) {
  // 使用 Unicode 範圍判斷中文字
  return /[\u3400-\u9fff]/.test(character);
}

// 繪製自動換行文字
function drawWrappedText(message, x, y, maxWidth) {
  // 設定中文字型
  textFont(CHINESE_FONT);

  // 將文字拆成字元
  let characters = message.split("");

  // 設定目前文字行
  let line = "";

  // 儲存所有文字行
  let lines = [];

  // 逐字處理文字
  for (let character of characters) {
    // 建立測試文字
    let testLine = line + character;

    // 判斷是否超過最大寬度
    if (textWidth(testLine) > maxWidth && line.length > 0) {
      // 儲存目前文字行
      lines.push(line);

      // 開始新的一行
      line = character;
    } else {
      // 將字元加入文字行
      line = testLine;
    }
  }

  // 儲存最後一行
  lines.push(line);

  // 設定文字行距
  let lineHeight = questionSize * 1.35;

  // 計算全部文字高度
  let totalHeight = lines.length * lineHeight;

  // 逐行顯示文字
  for (let i = 0; i < lines.length; i++) {
    // 計算目前文字行位置
    let lineY =
      y - totalHeight / 2 + lineHeight / 2 + i * lineHeight;

    // 顯示文字行
    text(lines[i], x, lineY);
  }
}

// 顯示測驗結果
function drawResult() {
  // 設定結果標題顏色
  fill(DARK_BLUE);

  // 設定結果標題大小
  textSize(constrain(width * 0.08, 28, 48));

  // 設定結果標題粗體
  textStyle(BOLD);

  // 顯示測驗完成
  drawChineseText("測驗完成！", width / 2, height / 2 - 80);

  // 恢復一般文字
  textStyle(NORMAL);

  // 設定成績文字顏色
  fill(PRIMARY_BLUE);

  // 設定成績文字大小
  textSize(constrain(width * 0.06, 24, 36));

  // 顯示成績
  drawMixedText(
    "你答對了 " + score + " / " + quizQuestions.length + " 題",
    width / 2,
    height / 2
  );

  // 設定鼓勵文字顏色
  fill(DARK_BLUE);

  // 設定鼓勵文字大小
  textSize(constrain(width * 0.04, 18, 26));

  // 顯示鼓勵文字
  drawChineseText(
    "歡迎繼續練習數學！",
    width / 2,
    height / 2 + 75
  );

  // 顯示重新測驗按鈕
  restartButton.show();

  // 設定重新測驗按鈕位置
  restartButton.position(width / 2 - 60, height / 2 + 120);
}

// 當視窗大小改變時重新排版
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算響應式版面
  calculateLayout();

  // 判斷目前是否為開始介面
  if (currentScreen === "start") {
    // 重新繪製開始介面
    drawStartScreen();
  } else {
    // 重新設定測驗按鈕位置
    positionButtons();
  }
}