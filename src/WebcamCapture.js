import React, { useCallback, useRef } from 'react'
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import "./WebcamCapture.css";

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
}

export default function WebcamCapture() {
    const webcamRef = useRef(null) //To get access to the webcam reference
    const dispatch = useDispatch();
    //BEM naming
    const navigate = useNavigate();

    //This function will save the output, saves the previous answer, saves the calculations
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate("/preview");
    }, [webcamRef])

    return (
        <div className='webcamCapture'>
            <Webcam
                audio = {false}
                height={videoConstraints.height}
                ref = {webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints = {videoConstraints}
            />
            <RadioButtonUncheckedIcon
                className='webcamCapture_button'
                onClick={capture}
                fontSize="large"
            />
        </div>
    )
}
