const baseAcademyEndpoint = "/api/v1/";

const endpoints = {
  questionsCRUD: `${baseAcademyEndpoint}questions/`,
  questionsAnswersList: `${baseAcademyEndpoint}questions-answers/`,
  questionsNewAnswer: `${baseAcademyEndpoint}questions-new-answer/`,
  
  answersDetail: `${baseAcademyEndpoint}answers-detail/`,
  answersLike: `${baseAcademyEndpoint}answers-like/`,

  usersDetail: "/auth/users/me/"
};

export { endpoints };