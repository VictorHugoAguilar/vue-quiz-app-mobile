export default async function () {
  return fetch('https://opentdb.com/api.php?amount=10&category=18')
    .then(res => {
      return res.json();
    })
    .then(data => {
      // map json to fit our own arrangement
      const newQuestions = data.results.map(serverQuestion => {
        const totalAnswers = serverQuestion.incorrect_answers.length + 1;
        const arrangedQuestion = {
          question: serverQuestion.question,
          choices: '',
          answer: ''
        };
        const choices = serverQuestion.incorrect_answers;
        arrangedQuestion.answer = Math.floor(Math.random() * totalAnswers + 1);
        choices.splice(arrangedQuestion.answer - 1, 0, serverQuestion.correct_answer);
        arrangedQuestion.choices = choices;
        return arrangedQuestion;
      });
      return newQuestions;
    });
}
