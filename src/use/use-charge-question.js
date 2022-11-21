export default async function (category) {
  const categories = {
    "general-knowledge" : 9,
    "entertainment-film" : 11,
    "science-geography" : 22,
    "science-mathematics" : 19,
    "science-computer" : 18
  }
  return fetch(`https://opentdb.com/api.php?amount=10&category=${categories[category]}`)
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
