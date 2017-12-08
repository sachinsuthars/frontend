const localAPI = 'http://localhost:3010/';

const initialState = {
    initial : 'Main',
    role : 'generic',
    api: liveAPI,
    htmlContent: {},
    client: 'NONE'

};

const reducer = (state = initialState, action) => {

  switch (action.type) {

      case "ChangeInitial":
          state = {
              ...state,
              initial : action.payload,
          };
          break;

        case "ChangeRole":
            state = {
                ...state,
                role : action.payload,
            };
            break;

        case "ChangeHTML":
            state = {
                ...state,
                htmlContent : action.payload,
            };
            break;

        case "ChangeClient":
            state = {
                ...state,
                client : action.payload,
            };
            break;

  }
  return state;

};


export default reducer;
