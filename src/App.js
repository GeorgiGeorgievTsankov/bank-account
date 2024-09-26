// import { type } from "@testing-library/user-event/dist/type";
import { useReducer } from "react";

import "./index.css";



import "./index.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
        balance: 500,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      if (state.balance >= 50) {
        return {
          ...state,
          balance: state.balance - action.payload,
        };
      }
      return state;
    case "requestLoan":
      if (state.loan === 0) {
        return {
          ...state,
          loan: 5000,
          balance: state.balance + 5000,
        };
      } else {
        return {
          ...state,
          loan: state.loan,
        };
      }
    case "payLoan":
      if (state.balance >= state.loan) {
        
        return {
          ...state,
          balance: state.balance - state.loan, 
          loan: 0,
        };
      }
      return state; 

    case "closeAccount":
      if (state.balance === 0 && state.loan === 0) {
        return initialState;
      }

      return state;

    default:
      break;
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="app-container">
      <h1 className="app-title">useReducer Bank Account</h1>

      <div className="account-info">
        <p className="balance-info">Balance: {balance}</p>
        <p className="loan-info">Loan: {loan}</p>
      </div>

      <div className="actions-container">
        
          <button
            className="action-btn open-account"
            onClick={() => dispatch({ type: "openAccount" })}
            disabled={isActive}
          >
            Open account
          </button>
        
      
          <button
            className="action-btn deposit"
            onClick={() => dispatch({ type: "deposit", payload: 150 })}
            disabled={!isActive}
          >
            Deposit 150
          </button>
       
          <button
            className="action-btn withdraw"
            onClick={() => dispatch({ type: "withdraw", payload: 50 })}
            disabled={!isActive}
          >
            Withdraw 50
          </button>
       
          <button
            className="action-btn request-loan"
            onClick={() => dispatch({ type: "requestLoan" })}
            disabled={!isActive}
          >
            Request a loan of 5000
          </button>
        
          <button
            className="action-btn pay-loan"
            onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
            disabled={!isActive}
          >
            Pay loan
          </button>
      
          <button
            className="action-btn close-account"
            onClick={() => dispatch({ type: "closeAccount" })}
            disabled={!isActive}
          >
            Close account
          </button>
       
      </div>
    </div>
  );
}
