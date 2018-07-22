
export const applySetComplaint = (state, action) => {

    var previousComplaints = state.complaints;
    previousComplaints.push(action.newComplaint);
    return {
        ...state,
        complaints: previousComplaints,
        addflag:true
    }
}


export const applyGetComplaint = (state, action) => {
    var userComplaints = action.complaints.reverse();
    return {
        ...state,
        complaints: userComplaints,
        flag:true
    }
}