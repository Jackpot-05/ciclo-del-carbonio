import QuizQuestion from '../QuizQuestion'

export default function QuizQuestionExample() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <QuizQuestion
        question="Quale di questi è il principale serbatoio di carbonio sulla Terra?"
        options={[
          "L'atmosfera",
          "Gli oceani", 
          "Le piante e gli animali",
          "I combustibili fossili"
        ]}
        correctAnswer={1}
        onAnswer={(isCorrect) => console.log('Answer:', isCorrect)}
        questionNumber={1}
        totalQuestions={5}
      />
    </div>
  )
}