export function EditReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "open_drawer":
      console.log("reachedhere", action);
      const { selectedStudent } = action;
      return {
        ...state,
        id: action?.selectedStudent?.id,
        first_name: action.selectedStudent?.user_detail?.first_name,
        last_name: action.selectedStudent?.user_detail?.last_name,
        phone: action.selectedStudent?.user_detail?.phone,
        title: action.selectedStudent?.user_detail?.title,
        dob: action.selectedStudent?.dob,
        grade: action.selectedStudent?.grade,
        institute: action.selectedStudent?.institute,
        gender: selectedStudent?.gender,
        fathers_name: action?.selectedStudent.first_name,
        mother_name: "",
        occupation: "",
        mother_tongue: "",
        income: "",
        dream_career: "",
        parents_dream: "",
        a_concern: "",
        extra: "",
        relationship: null,
      };

    default:
      return state;
  }
}
