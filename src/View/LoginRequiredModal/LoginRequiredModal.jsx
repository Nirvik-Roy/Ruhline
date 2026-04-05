import React from "react";
import "./LoginRequiredModal.css";
import { useDispatch } from "react-redux";
import { OpenglobalLogin } from '../../../Store/Slices/Loginslice/GlobalLoginSlice'
const LoginRequiredModal = ({ setloginRequiredModal }) => {
    const dispatch = useDispatch()
    const proccedToLogin = () => {
        dispatch(OpenglobalLogin())
        setloginRequiredModal(false)
    }
    return (
        <div className="ylgAuthReq__overlay">
            <div className="ylgAuthReq__modal">
                <button
                    className="ylgAuthReq__closeBtn"
                    onClick={(() => setloginRequiredModal(false))}
                    aria-label="Close modal"
                >
                    ×
                </button>

                <div className="ylgAuthReq__iconWrap">
                    <div className="ylgAuthReq__iconCircle">🧘</div>
                </div>

                <h2 className="ylgAuthReq__title">Login Required</h2>

                <p className="ylgAuthReq__text">
                    You need to log in before booking a program. Please sign in to
                    continue your wellness journey.
                </p>

                <div className="ylgAuthReq__actions">
                    <button className="ylgAuthReq__secondaryBtn" onClick={(() => setloginRequiredModal(false))}>
                        Maybe Later
                    </button>
                    <button className="ylgAuthReq__primaryBtn" onClick={proccedToLogin}>
                        Login to Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModal;