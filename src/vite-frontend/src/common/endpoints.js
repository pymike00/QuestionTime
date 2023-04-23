const baseEndpoint = "/api/v1/";

const endpoints = {
  questionsCRUD: `${baseEndpoint}questions/`,
  questionsAnswersList: `${baseEndpoint}questions-answers/`,
  questionsNewAnswer: `${baseEndpoint}questions-new-answer/`,

  answersDetail: `${baseEndpoint}answers-detail/`,
  answersLike: `${baseEndpoint}answers-like/`,

  usersDetail: "/auth/users/me/"
};

export { endpoints };